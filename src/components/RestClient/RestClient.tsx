import React, { useState } from "react";
import styles from "./components/page.module.css";
import MethodSelector from "./components/MethodSelector";
import UrlInput from "./components/UrlInput";
import HeadersEditor from "./components/HeadersEditor";
import BodyEditor from "./components/BodyEditor";
import ResponseSection from "./components/ResponseSection";

const RestClient: React.FC = () => {
  const [method, setMethod] = useState<string>("GET");
  const [url, setUrl] = useState<string>("");
  const [headers, setHeaders] = useState<{ key: string; value: string }[]>([]);
  const [body, setBody] = useState<string>("");
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [responseBody, setResponseBody] = useState<string>("");

  const sendRequest = async () => {
    try {
      const options: RequestInit = {
        method,
        headers: headers.reduce(
          (acc, header) => {
            acc[header.key] = header.value;
            return acc;
          },
          {} as Record<string, string>,
        ),
      };

      if (method !== "GET" && method !== "DELETE") {
        options.body = body;
      }

      const response = await fetch(url, options);
      const text = await response.text();

      setStatusCode(response.status);

      try {
        const json = JSON.parse(text);
        setResponseBody(JSON.stringify(json, null, 2));
      } catch {
        setResponseBody(text);
      }
    } catch (error) {
      setStatusCode(500);
      setResponseBody(`Error: ${error.message}`);
    }
  };

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

export default RestClient;
