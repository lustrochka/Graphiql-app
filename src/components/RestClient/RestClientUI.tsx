import React, { useEffect, useState } from "react";
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
    handleUserInteraction,
    updateBrowserUrl,
  } = useHttpRequestState();

  const { statusCode, responseBody, sendRequest } = useHttpRequest();
  const { saveRequestToHistory } = useRequestHistory(
    method,
    url,
    headers,
    variables,
    body,
  );

  const [errors, setErrors] = useState<string[]>([]); // Состояние для ошибок

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

  // Функция проверки корректности URL
  const isValidUrl = (url: string) => {
    const urlPattern =
      /^(https?:\/\/)[\w.-]+(?:\.[\w.-]+)+[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    return urlPattern.test(url);
  };

  // Функция для отправки запроса с валидацией
  const handleSendRequest = async () => {
    const validationErrors: string[] = [];

    // Проверка корректности URL
    if (!url || !isValidUrl(url)) {
      validationErrors.push("Некорректный URL. Введите корректный URL.");
    }

    // Проверка корректности переменных
    const isValidVariables = variables.every((variable) =>
      /^[a-zA-Z_$][a-zA-Z_$0-9]*$/.test(variable.key),
    );
    if (!isValidVariables) {
      validationErrors.push(
        "Некорректные ключи переменных. Ключи должны содержать только буквы, цифры, $, _.",
      );
    }

    // Проверка заголовков на наличие пустых ключей
    const isValidHeaders = headers.every((header) => header.key.trim() !== "");
    if (!isValidHeaders) {
      validationErrors.push(
        "Некорректные заголовки. Ключи заголовков не должны быть пустыми.",
      );
    }

    // Проверка корректности тела запроса (если есть тело)
    if (isMethodWithBody && body) {
      try {
        JSON.parse(body); // проверка, является ли тело корректным JSON
      } catch (error) {
        validationErrors.push("Некорректный JSON в теле запроса.");
      }
    }

    // Если есть ошибки, сохраняем их и прекращаем выполнение
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Если ошибок нет, очищаем список ошибок и отправляем запрос
    setErrors([]);

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
      console.log("Запрос успешно отправлен. Сохранение в историю...");
      saveRequestToHistory();
    } else {
      console.log("Неверные данные, запрос не будет сохранен в историю");
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

      {/* Отображение ошибок */}
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
      <ResponseSection statusCode={statusCode} responseBody={responseBody} />
    </form>
  );
};

export default RestClientUI;
