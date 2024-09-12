import React from "react";
import styles from "./ErrorsSection.module.css";

interface ValidationError {
  field: string;
  message: string;
}

interface ErrorsSectionProps {
  errors: ValidationError[];
}

const ErrorsSection: React.FC<ErrorsSectionProps> = ({ errors }) => {
  if (errors.length === 0) {
    return null;
  }

  return (
    <div className={styles.errorContainer}>
      <ul>
        {errors.map((error, index) => (
          <li key={index} className={styles.errorMessage}>
            {`Field ${error.field}: ${error.message}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorsSection;
