import React, { useEffect } from "react";
import styles from "./ResponseSection.module.css";

interface ResponseSectionProps {
  statusCode: number | null;
  responseBody: string;
  requestBody: string;
}

const ResponseSection: React.FC<ResponseSectionProps> = ({
  statusCode,
  responseBody,
  requestBody,
}) => {
  useEffect(() => {
  }, [statusCode, responseBody, requestBody]);

  const formatJson = (jsonString: string): string => {
    try {
      const json = JSON.parse(jsonString);
      return JSON.stringify(json, null, 2);
    } catch (e) {
      return jsonString;
    }
  };

  const combinedResponse = (): string => {
    try {
      const parsedRequest = JSON.parse(requestBody);
      const parsedResponse = JSON.parse(responseBody);
      const combined = { ...parsedRequest, ...parsedResponse };
      return JSON.stringify(combined, null, 2);
    } catch (e) {
      return responseBody;
    }
  };

  return (
    <div className={styles.response_section}>
      <div className={styles.response_status}>
        Status: {statusCode !== null ? statusCode : "No status"}
      </div>

      <div className={styles.response_body}>
        <pre>{responseBody ? combinedResponse() : "No response body"}</pre>
      </div>
    </div>
  );
};

export default ResponseSection;
