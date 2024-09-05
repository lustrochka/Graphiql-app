import React from "react";
import RequestConfigSection from "./RequestConfigSection";
import HeadersEditor from "../common/HeadersEditor/HeadersEditor";
import VariablesEditor from "../common/VariablesEditor/VariablesEditor";
import BodyEditor from "../common/BodyEditor/BodyEditor";
import ResponseSection from "../common/ResponseSection/ResponseSection";
import SendRequestButton from "../common/SendRequestButton/SendRequestButton";
import useHttpRequestState from "../../hooks/useHttpRequestState";
import useHttpRequest from "../../hooks/useHttpRequest";
import useRequestHistory from "../../hooks/useRequestHistory";
import styles from "./RestClientUI.module.css";

interface RestClientUIProps {
  initialMethod: string;
  initialUrl: string;
  initialBody: string;
  initialHeaders: { key: string; value: string }[];
}

const RestClientUI: React.FC<RestClientUIProps> = ({
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
    updateBrowserUrl,
    handleUserInteraction,
  } = useHttpRequestState();

  const { statusCode, responseBody, sendRequest } = useHttpRequest();

  const { saveRequestToHistory } = useRequestHistory(
    method,
    url,
    headers,
    variables,
    body,
  );

  React.useEffect(() => {
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

  const handleSendRequest = async () => {
    if (!url) {
      console.log("URL пустой, запрос не будет отправлен");
      return;
    }

    const requestBody = isMethodWithBody
      ? JSON.stringify(
          variables.reduce(
            (acc, variable) => {
              acc[variable.key] = variable.value;
              return acc;
            },
            {} as Record<string, string>,
          ),
        )
      : body;

    await sendRequest(method, url, headers, requestBody);

    if (url !== "") {
      console.log("Запрос прошел успешно. Сохранение в историю...");
      saveRequestToHistory();
    } else {
      console.log("Некорректные данные, запрос не будет сохранен в историю");
    }
  };

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
      <SendRequestButton onClick={handleSendRequest} />
      <ResponseSection statusCode={statusCode} responseBody={responseBody} />
    </form>
  );
};

export default RestClientUI;
