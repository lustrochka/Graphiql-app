import React from "react";
import styles from "./ResponseSection.module.css";

interface ResponseSectionProps {
  statusCode: number | null;
  responseBody: string;
}

const ResponseSection: React.FC<ResponseSectionProps> = ({
  statusCode,
  responseBody,
}) => {
  return (
    <div className={styles.response_section}>
      <div className={styles.response_status}>
        Status: {statusCode !== null ? statusCode : ""}
      </div>
      <div className={styles.response_body}>
        <pre>{responseBody}</pre>
      </div>
    </div>
  );
};

export default ResponseSection;
