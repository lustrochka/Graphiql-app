import React, { useState } from "react";
import styles from "./MethodSelector.module.css";

interface MethodSelectorProps {
  method: string;
  setMethod: (method: string) => void;
  updateBrowserUrl: () => void;
}

const MethodSelector: React.FC<MethodSelectorProps> = ({
  method,
  setMethod,
  updateBrowserUrl,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleBlur = () => {
    setIsFocused(false);
    updateBrowserUrl();
  };

  return (
    <select
      value={method}
      onChange={(e) => setMethod(e.target.value)}
      onFocus={() => setIsFocused(true)}
      onBlur={handleBlur}
      className={`${styles.methodSelector} ${isFocused ? styles.active : ""}`}
    >
      {["GET", "POST", "PUT", "DELETE", "PATCH"].map((methodOption) => (
        <option key={methodOption} value={methodOption}>
          {methodOption}
        </option>
      ))}
    </select>
  );
};

export default MethodSelector;
