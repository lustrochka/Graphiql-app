import React, { useEffect, useState } from "react";
import styles from "./RestClientUI.module.css";
import MethodSelector from "../common/MethodSelector/MethodSelector";
import UrlInput from "../common/UrlInput/UrlInput";
import HeadersEditor from "../common/HeadersEditor/HeadersEditor";
import BodyEditor from "../common/BodyEditor/BodyEditor";
import ResponseSection from "../common/ResponseSection/ResponseSection";
import { RestClientProvider, useRestClient } from "./RestClientContext";

const RestClientUI: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <RestClientProvider>
      <RestClientContent />
    </RestClientProvider>
  );
};

const RestClientContent: React.FC = () => {
  const { sendRequest } = useRestClient();

  return (
    <div className={styles.container}>
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
      <button className={styles.sendRequestButton} onClick={sendRequest}>
        Send Request
      </button>
      <ResponseSection />
    </div>
  );
};

export default RestClientUI;
