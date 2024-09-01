import React from "react";
import styles from "./UrlInput.module.css";

interface UrlInputProps {
  url: string;
  setUrl: (url: string) => void;
}

const UrlInput: React.FC<UrlInputProps> = ({ url, setUrl }) => {
  return (
    <input
      type="text"
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      placeholder="Enter API Endpoint"
      className={styles.urlInput}
    />
  );
};

export default UrlInput;
