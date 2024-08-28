import React, { useEffect, useState } from "react";
import styles from "./RestClientUI.module.css";
import MethodSelector from "./components/MethodSelector";
import UrlInput from "./components/UrlInput";
import HeadersEditor from "./components/HeadersEditor";
import BodyEditor from "./components/BodyEditor";
import ResponseSection from "./components/ResponseSection";
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
