import React from "react";
import styles from "./MethodSelector.module.css";

interface MethodSelectorProps {
  method: string;
  setMethod: (method: string) => void;
}

const MethodSelector: React.FC<MethodSelectorProps> = ({
  method,
  setMethod,
}) => {
  return (
    <select
      value={method}
      onChange={(e) => setMethod(e.target.value)}
      className={styles.methodSelector}
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
