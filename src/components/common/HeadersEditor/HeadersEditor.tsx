import React from "react";
import styles from "./HeadersEditor.module.css";
import { useRestClient } from "../../RestClient/RestClientContext";

const HeadersEditor: React.FC = () => {
  const { headers, setHeaders } = useRestClient();

  const addHeader = () => {
    setHeaders([...headers, { key: "", value: "" }]);
  };

  const updateHeader = (index: number, key: string, value: string) => {
    const updatedHeaders = headers.map((header, i) =>
      i === index ? { key, value } : header,
    );
    setHeaders(updatedHeaders);
  };

  return (
    <div className={styles.headersEditor}>
      <button className={styles.addHeaderButton} onClick={addHeader}>
        Add Header
      </button>
      {headers.map((header, index) => (
        <div className={styles.headerEntry} key={index}>
          <input
            type="text"
            className={styles.headerInput}
            placeholder="Header Key"
            value={header.key}
            onChange={(e) => updateHeader(index, e.target.value, header.value)}
          />
          <input
            type="text"
            className={styles.headerInput}
            placeholder="Header Value"
            value={header.value}
            onChange={(e) => updateHeader(index, header.key, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default HeadersEditor;
