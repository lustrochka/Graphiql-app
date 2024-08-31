import React, { useEffect, useState } from "react";
import styles from "./RestClientUI.module.css";
import MethodSelector from "../common/MethodSelector/MethodSelector";
import UrlInput from "../common/UrlInput/UrlInput";
import HeadersEditor from "../common/HeadersEditor/HeadersEditor";
import BodyEditor from "../common/BodyEditor/BodyEditor";
import ResponseSection from "../common/ResponseSection/ResponseSection";
import { RestClientProvider, useRestClient } from "./RestClientContext";

interface RestClientUIProps {
  initialMethod: string;
  initialUrl: string;
  initialBody?: string | null;
  initialHeaders?: Record<string, string>;
}

const RestClientUI: React.FC<RestClientUIProps> = ({
  initialMethod,
  initialUrl,
  initialBody,
  initialHeaders,
}) => {
  const [isClient, setIsClient] = useState(false);
  const [url, setUrl] = useState(initialUrl);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!initialUrl) {
      setUrl(""); // Если initialUrl отсутствует, поле ввода очищается
    }
  }, [initialUrl]);

  if (!isClient) {
    return null;
  }

  return (
    <RestClientProvider
      initialMethod={initialMethod}
      initialUrl={url}
      initialBody={initialBody}
      initialHeaders={initialHeaders}
    >
      <RestClientContent />
    </RestClientProvider>
  );
};

const RestClientContent: React.FC = () => {
  const { sendRequest } = useRestClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendRequest(); // Отправляем запрос и ждем ответа
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.apiRequestConfig}>
        <div className={`${styles.methodSelector} ${styles.inputContainer}`}>
          <label htmlFor="method">Method:</label>
          <MethodSelector />
        </div>
        <div className={`${styles.urlInput} ${styles.inputContainer}`}>
          <label htmlFor="url">URL:</label>
          <UrlInput />
        </div>
      </div>
      <HeadersEditor />
      <BodyEditor />
      <button type="submit" className={styles.sendRequestButton}>
        Send Request
      </button>
      <ResponseSection />
    </form>
  );
};

export default RestClientUI;
