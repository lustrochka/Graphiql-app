import React from "react";
import styles from "./ResponseSection.module.css";
import { useRestClient } from "../RestClientContext";

const ResponseSection: React.FC = () => {
  const { statusCode, responseBody } = useRestClient();

  return (
    <div className={styles.response_section}>
      <div className={styles.response_status}>
        Status: {statusCode !== null ? statusCode : "No status"}
      </div>
      <div className={styles.response_body}>
        <pre>{responseBody ? responseBody : "No response body"}</pre>
      </div>
    </div>
  );
};

export default ResponseSection;
