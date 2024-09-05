import React from "react";
import MethodSelector from "../common/MethodSelector/MethodSelector";
import UrlInput from "../common/UrlInput/UrlInput";
import styles from "./RequestConfigSection.module.css";

interface RequestConfigSectionProps {
  method: string;
  setMethod: (method: string) => void;
  url: string;
  setUrl: (url: string) => void;
  handleUserInteraction: () => void;
  updateBrowserUrl: () => void;
}

const RequestConfigSection: React.FC<RequestConfigSectionProps> = ({
  method,
  setMethod,
  url,
  setUrl,
  handleUserInteraction,
  updateBrowserUrl,
}) => {
  return (
    <div className={styles.apiRequestConfig}>
      <div className={`${styles.methodSelector} ${styles.inputContainer}`}>
        <label htmlFor="method">Method:</label>
        <MethodSelector
          method={method}
          setMethod={(newMethod) => {
            handleUserInteraction();
            setMethod(newMethod);
          }}
          updateBrowserUrl={updateBrowserUrl}
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
  );
};

export default RequestConfigSection;
