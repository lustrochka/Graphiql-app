import React from "react";
import styles from "./SendRequestButton.module.css";

interface SendRequestButtonProps {
  onClick: () => void;
}

const SendRequestButton: React.FC<SendRequestButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.sendRequestButton}>
      Send Request
    </button>
  );
};

export default SendRequestButton;
