import React, { useEffect } from "react";
import MethodSelector from "../common/MethodSelector/MethodSelector";
import UrlInput from "../common/UrlInput/UrlInput";
import HeadersEditor from "../common/HeadersEditor/HeadersEditor";
import VariablesEditor from "../common/VariablesEditor/VariablesEditor";
import BodyEditor from "../common/BodyEditor/BodyEditor";
import ResponseSection from "../common/ResponseSection/ResponseSection";
import SendRequestButton from "../common/SendRequestButton/SendRequestButton";
import useHttpRequest from "./useHttpRequest";
import useRequestState from "./useRequestState";
import styles from "./RestClientUI.module.css";

const RestClientUI: React.FC = () => {
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
  } = useRequestState();

  const { statusCode, responseBody, sendRequest, clearResponse } =
    useHttpRequest();

  useEffect(() => {
    console.log("Method changed, clearing response");
    clearResponse();
  }, [method]);

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

    if (
      isMethodWithBody &&
      !headers.some((header) => header.key.toLowerCase() === "content-type")
    ) {
      setHeaders([
        ...headers,
        { key: "Content-Type", value: "application/json" },
      ]);
    }

    console.log("Sending request with the following data:");
    console.log("Method:", method);
    console.log("URL:", url);
    console.log("Headers:", headers);
    console.log("Request Body:", requestBody);

    await sendRequest(method, url, headers, requestBody);
    console.log("Request finished with statusCode:", statusCode);
    console.log("Request finished with responseBody:", responseBody);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSendRequest();
      }}
      className={styles.container}
    >
      <div className={styles.apiRequestConfig}>
        <div className={`${styles.methodSelector} ${styles.inputContainer}`}>
          <label htmlFor="method">Method:</label>
          <MethodSelector method={method} setMethod={setMethod} />
        </div>
        <div className={`${styles.urlInput} ${styles.inputContainer}`}>
          <label htmlFor="url">URL:</label>
          <UrlInput url={url} setUrl={setUrl} />
        </div>
      </div>
      <HeadersEditor headers={headers} setHeaders={setHeaders} />
      <VariablesEditor variables={variables} setVariables={setVariables} />
      {isMethodWithBody && <BodyEditor body={body} setBody={setBody} />}
      <SendRequestButton onClick={handleSendRequest} />
      <ResponseSection statusCode={statusCode} responseBody={responseBody} />
    </form>
  );
};

export default RestClientUI;
