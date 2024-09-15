import React, { useEffect, useState, useCallback } from "react";
import RequestConfigSection from "./RequestConfigSection";
import HeadersEditor from "../common/HeadersEditor/HeadersEditor";
import VariablesEditor from "../common/VariablesEditor/VariablesEditor";
import BodyEditor from "../common/BodyEditor/BodyEditor";
import ResponseSection from "../common/ResponseSection/ResponseSection";
import SendRequestButton from "../common/SendRequestButton/SendRequestButton";
import useHttpRequestState from "../../hooks/useHttpRequestState";
import useHttpRequest from "../../hooks/useHttpRequest";
import useRequestHistory from "../../hooks/useRequestHistory";
import useHttpRequestValidation from "../../hooks/useHttpRequestValidation";
import { createObjectFromKeyValuePairs } from "../../utils/createObjectFromKeyValuePairs";
import ErrorsSection from "../common/ErrorsSection/ ErrorsSection";
import styles from "./HttpRequestForm.module.css";

interface ValidationError {
  field: string;
  message: string;
}

interface HttpRequestFormProps {
  initialMethod: string;
  initialUrl: string;
  initialBody: string;
  initialHeaders: { key: string; value: string }[];
}

const HttpRequestForm: React.FC<HttpRequestFormProps> = ({
  initialMethod,
  initialUrl,
  initialBody,
  initialHeaders,
}) => {
  const {
    method,
    setMethod,
    url,
    setUrl,
    headers,
    setHeaders,
    variables,
    setVariables,
    body,
    setBody,
    isMethodWithBody,
    handleUserInteraction,
    updateBrowserUrl,
  } = useHttpRequestState();

  const { statusCode, responseBody, sendRequest, clearResponse } =
    useHttpRequest();
  const { saveRequestToHistory } = useRequestHistory(
    method,
    url,
    headers,
    variables,
    body,
  );

  const [errors, setErrors] = useState<ValidationError[]>([]);

  useEffect(() => {
    setMethod(initialMethod);
    setUrl(initialUrl);
    setBody(initialBody);
    setHeaders(initialHeaders);
  }, [initialMethod, initialUrl, initialBody, initialHeaders]);

  const validationErrors = useHttpRequestValidation(
    url,
    headers,
    variables,
    body,
    isMethodWithBody,
  );

  const handleSendRequest = useCallback(async () => {
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);
    let requestBody = body;

    if (method === "POST") {
      const headersObject = createObjectFromKeyValuePairs(headers);
      const variablesObject = createObjectFromKeyValuePairs(variables);

      const combinedBody = {
        body: body ? JSON.parse(body) : {},
        headers: headersObject,
        variables: variablesObject,
      };

      requestBody = JSON.stringify(combinedBody, null, 2);
    }

    await sendRequest(method, url, headers, requestBody);
    saveRequestToHistory();
  }, [
    method,
    url,
    headers,
    body,
    variables,
    isMethodWithBody,
    sendRequest,
    saveRequestToHistory,
    validationErrors,
  ]);

  return (
    <form
      data-testid="http-request-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSendRequest();
      }}
      className={styles.container}
    >
      <RequestConfigSection
        method={method}
        setMethod={setMethod}
        url={url}
        setUrl={setUrl}
        handleUserInteraction={handleUserInteraction}
        updateBrowserUrl={updateBrowserUrl}
      />

      <HeadersEditor headers={headers} setHeaders={setHeaders} />
      <VariablesEditor variables={variables} setVariables={setVariables} />
      {isMethodWithBody && <BodyEditor body={body} setBody={setBody} />}

      <ErrorsSection errors={errors} />

      <SendRequestButton />
      <ResponseSection
        statusCode={statusCode}
        responseBody={responseBody}
        requestBody={body}
      />
    </form>
  );
};

export default HttpRequestForm;
