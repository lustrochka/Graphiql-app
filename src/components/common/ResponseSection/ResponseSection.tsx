import React, { useEffect } from "react";
import styles from "./ResponseSection.module.css";

interface ResponseSectionProps {
  statusCode: number | null;
  responseBody: string;
}

const ResponseSection: React.FC<ResponseSectionProps> = ({
  statusCode,
  responseBody,
}) => {
  useEffect(() => {
    console.log("ResponseSection received statusCode:", statusCode);
    console.log("ResponseSection received responseBody:", responseBody);
  }, [statusCode, responseBody]);

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
