import React, { useEffect, useState } from "react";
import styles from "./components/page.module.css";
import MethodSelector from "./components/MethodSelector";
import UrlInput from "./components/UrlInput";
import HeadersEditor from "./components/HeadersEditor";
import BodyEditor from "./components/BodyEditor";
import ResponseSection from "./components/ResponseSection";
import { useRestClientLogic } from "./RestClientLogic";

const RestClientUI: React.FC = () => {
  const {
    method,
    setMethod,
    url,
    setUrl,
    headers,
    setHeaders,
    body,
    setBody,
    statusCode,
    responseBody,
    sendRequest,
  } = useRestClientLogic();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className={styles.container}>
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
      <BodyEditor body={body} setBody={setBody} />
      <button className={styles.sendRequestButton} onClick={sendRequest}>
        Send Request
      </button>
      <ResponseSection statusCode={statusCode} responseBody={responseBody} />
    </div>
  );
};

export default RestClientUI;
