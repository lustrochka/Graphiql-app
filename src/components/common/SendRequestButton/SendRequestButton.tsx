import React from "react";
import styles from "./SendRequestButton.module.css";

const SendRequestButton: React.FC = () => {
  return (
    <button type="submit" className={styles.sendRequestButton}>
      Send Request
    </button>
  );
};

export default SendRequestButton;
