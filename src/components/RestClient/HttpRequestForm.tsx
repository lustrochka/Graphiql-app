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
import styles from "./HttpRequestForm.module.css";

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

  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    setMethod(initialMethod);
    setUrl(initialUrl);
    setBody(initialBody);
    setHeaders(initialHeaders);
  }, [
    initialMethod,
    initialUrl,
    initialBody,
    initialHeaders,
    setMethod,
    setUrl,
    setBody,
    setHeaders,
  ]);

  useEffect(() => {
    clearResponse();
  }, [method, url, headers, body, variables]);

  const handleSendRequest = useCallback(async () => {
    const validationErrors: string[] = [];

    if (!url) {
      validationErrors.push("URL не должен быть пустым.");
    }

    if (headers.some((header) => !header.key)) {
      validationErrors.push("Заголовки не должны содержать пустые ключи.");
    }

    if (isMethodWithBody && body) {
      try {
        JSON.parse(body);
      } catch (error) {
        validationErrors.push("Некорректный JSON в теле запроса.");
      }
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);

    let requestBody = body;

    if (method === "POST") {
      const headersObject = headers.reduce(
        (acc, { key, value }) => {
          acc[key] = value;
          return acc;
        },
        {} as Record<string, string>,
      );

      const variablesObject = variables.reduce(
        (acc, { key, value }) => {
          acc[key] = value;
          return acc;
        },
        {} as Record<string, string>,
      );

      const combinedBody = {
        body: body ? JSON.parse(body) : {},
        headers: headersObject,
        variables: variablesObject,
      };

      requestBody = JSON.stringify(combinedBody, null, 2);
    }

    await sendRequest(method, url, headers, requestBody);

    if (!validationErrors.length) {
      saveRequestToHistory();
    }
  }, [
    method,
    url,
    headers,
    body,
    variables,
    isMethodWithBody,
    sendRequest,
    saveRequestToHistory,
  ]);

  return (
    <form
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
      <VariablesEditor variables={variables} setVariables={setVariables} />
      <HeadersEditor headers={headers} setHeaders={setHeaders} />
      {isMethodWithBody && <BodyEditor body={body} setBody={setBody} />}

      {errors.length > 0 && (
        <div className={styles.errorContainer}>
          <ul>
            {errors.map((error, index) => (
              <li key={index} className={styles.errorMessage}>
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}

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
