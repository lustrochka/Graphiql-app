import React, { useState } from "react";
import styles from "./UrlInput.module.css";

interface UrlInputProps {
  url: string;
  setUrl: (url: string) => void;
}

const UrlInput: React.FC<UrlInputProps> = ({ url, setUrl }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <input
      type="text"
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      placeholder="Enter API Endpoint"
      className={`${styles.urlInput} ${isFocused ? styles.active : ""}`}
    />
  );
};

export default UrlInput;
