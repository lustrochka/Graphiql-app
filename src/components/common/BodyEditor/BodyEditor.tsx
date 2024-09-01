import React from "react";
import styles from "./BodyEditor.module.css";

interface BodyEditorProps {
  body: string;
  setBody: (body: string) => void;
}

const BodyEditor: React.FC<BodyEditorProps> = ({ body, setBody }) => {
  return (
    <textarea
      value={body}
      onChange={(e) => setBody(e.target.value)}
      placeholder="Enter request body (JSON or plain text)"
      className={`${styles.inputContainer} ${styles.textareaContainer}`}
    />
  );
};

export default BodyEditor;
