import React, { useState, useEffect } from "react";
import MethodSelector from "../common/MethodSelector/MethodSelector";
import UrlInput from "../common/UrlInput/UrlInput";
import HeadersEditor, { Header } from "../common/HeadersEditor/HeadersEditor";
import BodyEditor from "../common/BodyEditor/BodyEditor";
import ResponseSection from "../common/ResponseSection/ResponseSection";
import SendRequestButton from "../common/SendRequestButton/SendRequestButton";
import useHttpRequest from "./useHttpRequest";
import { encodeBase64 } from "../../utils/encodeBase64";
import styles from "./RestClientUI.module.css";
import { useRouter } from "next/router";

const RestClientUI: React.FC = () => {
  const [method, setMethod] = useState<string>("GET");
  const [url, setUrl] = useState<string>("");
  const [headers, setHeaders] = useState<Header[]>([]);
  const [body, setBody] = useState<string>("");
  const { statusCode, responseBody, sendRequest } = useHttpRequest();
  const router = useRouter();

  const isMethodWithBody = ["POST", "PUT", "PATCH", "DELETE"].includes(method);

  useEffect(() => {
    window.history.replaceState(null, "", "/");
  }, []);

  const handleSendRequest = async () => {
    if (!url) {
      console.log("URL пустой, запрос не будет отправлен");
      return;
    }

    if (
      isMethodWithBody &&
      !headers.some((header) => header.key.toLowerCase() === "content-type")
    ) {
      setHeaders([
        ...headers,
        { key: "Content-Type", value: "application/json" },
      ]);
    }

    const encodedUrl = encodeBase64(url);

    const encodedBody = body && isMethodWithBody ? encodeBase64(body) : "";

    const headersQueryParams = headers
      .filter((header) => header.key && header.value)
      .map(
        (header) =>
          `${encodeURIComponent(header.key)}=${encodeURIComponent(header.value)}`,
      )
      .join("&");

    const requestUrl = `/${method}/${encodedUrl}${encodedBody ? `/${encodedBody}` : ""}${
      headersQueryParams ? `?${headersQueryParams}` : ""
    }`;

    console.log("Generated URL for request:", requestUrl);

    window.history.replaceState(null, "", requestUrl);

    console.log("Starting sendRequest with:", { method, url, headers, body });
    await sendRequest(method, url, headers, body);
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
      {isMethodWithBody && <BodyEditor body={body} setBody={setBody} />}
      <SendRequestButton onClick={handleSendRequest} />
      <ResponseSection statusCode={statusCode} responseBody={responseBody} />
    </form>
  );
};

export default RestClientUI;
