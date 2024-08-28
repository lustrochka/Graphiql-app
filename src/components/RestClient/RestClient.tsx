import React, { useState } from "react";
import styles from "./components/page.module.css";
import MethodSelector from "./components/MethodSelector";
import UrlInput from "./components/UrlInput";
import HeadersEditor, { Header } from "./components/HeadersEditor";
import BodyEditor from "./components/BodyEditor";
import ResponseSection from "./components/ResponseSection";

const isValidUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
};

const isValidHeader = (header: Header): boolean => {
  return header.key.trim() !== "" && !/\s/.test(header.key);
};

const RestClient: React.FC = () => {
  const [method, setMethod] = useState<string>("GET");
  const [url, setUrl] = useState<string>("");
  const [headers, setHeaders] = useState<Header[]>([]);
  const [body, setBody] = useState<string>("");
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [responseBody, setResponseBody] = useState<string>("");

  const sendRequest = async () => {
    if (!isValidUrl(url)) {
      setStatusCode(400);
      setResponseBody("Invalid URL. Please enter a valid HTTP or HTTPS URL.");
      return;
    }

    for (const header of headers) {
      if (!isValidHeader(header)) {
        setStatusCode(400);
        setResponseBody(
          `Invalid header key "${header.key}". Header keys should not be empty or contain spaces.`,
        );
        return;
      }
    }

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
      setResponseBody(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
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
