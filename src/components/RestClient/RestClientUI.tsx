import React, { useEffect, useState } from "react";
import MethodSelector from "../common/MethodSelector/MethodSelector";
import UrlInput from "../common/UrlInput/UrlInput";
import HeadersEditor from "../common/HeadersEditor/HeadersEditor";
import VariablesEditor from "../common/VariablesEditor/VariablesEditor"; // Импортируем VariablesEditor
import BodyEditor from "../common/BodyEditor/BodyEditor";
import ResponseSection from "../common/ResponseSection/ResponseSection";
import SendRequestButton from "../common/SendRequestButton/SendRequestButton";
import useHttpRequest from "./useHttpRequest";
import useRequestState from "./useRequestState";
import styles from "./RestClientUI.module.css";

interface RestClientUIProps {
  initialMethod?: string;
  initialUrl?: string;
  initialBody?: string | null;
  initialHeaders?: { key: string; value: string }[];
  initialVariables?: { key: string; value: string }[]; // Добавляем начальные переменные
}

const RestClientUI: React.FC<RestClientUIProps> = ({
  initialMethod = "GET",
  initialUrl = "",
  initialBody = "",
  initialHeaders = [],
  initialVariables = [], // Добавляем начальные переменные
}) => {
  const {
    method,
    setMethod,
    url,
    setUrl,
    headers,
    setHeaders,
    variables, // Получаем переменные
    setVariables, // Функция для установки переменных
    body,
    setBody,
    isMethodWithBody,
    handleUserInteraction,
  } = useRequestState();

  const { statusCode, responseBody, sendRequest, clearResponse } =
    useHttpRequest();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMethod(initialMethod);
      setUrl(initialUrl);
      setBody(initialBody || "");
      setHeaders(initialHeaders);
      setVariables(initialVariables); // Устанавливаем начальные переменные
    }
  }, []);

  useEffect(() => {
    clearResponse();
  }, [method]);

  const saveRequestToHistory = () => {
    if (typeof window !== "undefined") {
      const history = JSON.parse(
        localStorage.getItem("requestHistory") || "[]",
      );

      const requestData = {
        method,
        url,
        headers,
        variables, // Сохраняем переменные
        body: isMethodWithBody ? body : null,
        time: new Date().toISOString(),
      };

      history.push(requestData);
      localStorage.setItem("requestHistory", JSON.stringify(history));
    }
  };

  const handleSendRequest = async () => {
    if (!url) {
      console.log("URL пустой, запрос не будет отправлен");
      return;
    }

    // Формируем тело запроса на основе переменных, если они существуют
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
    saveRequestToHistory();
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
          <MethodSelector
            method={method}
            setMethod={(newMethod) => {
              handleUserInteraction();
              setMethod(newMethod);
            }}
          />
        </div>
        <div className={`${styles.urlInput} ${styles.inputContainer}`}>
          <label htmlFor="url">URL:</label>
          <UrlInput
            url={url}
            setUrl={(newUrl) => {
              handleUserInteraction();
              setUrl(newUrl);
            }}
          />
        </div>
      </div>

      {/* Добавляем редактор переменных */}
      <VariablesEditor
        variables={variables}
        setVariables={(newVariables) => {
          handleUserInteraction();
          setVariables(newVariables);
        }}
      />

      <HeadersEditor
        headers={headers}
        setHeaders={(newHeaders) => {
          handleUserInteraction();
          setHeaders(newHeaders);
        }}
      />

      {isMethodWithBody && (
        <BodyEditor
          body={body}
          setBody={(newBody) => {
            handleUserInteraction();
            setBody(newBody);
          }}
        />
      )}

      <SendRequestButton onClick={handleSendRequest} />
      <ResponseSection statusCode={statusCode} responseBody={responseBody} />
    </form>
  );
};

export default RestClientUI;
