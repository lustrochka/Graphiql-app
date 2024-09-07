import React from "react";
import styles from "./BodyEditor.module.css";

interface BodyEditorProps {
  body: string;
  setBody: (body: string) => void;
}

const BodyEditor: React.FC<BodyEditorProps> = ({ body, setBody }) => {
  const prettifyJson = () => {
    try {
      const parsedJson = JSON.parse(body);
      const prettyJson = JSON.stringify(parsedJson, null, 2);
      setBody(prettyJson);
    } catch (error) {
      console.error("Invalid JSON format:", error);
    }
  };

  return (
    <div className={styles.bodyEditorContainer}>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Enter request body (JSON or plain text)"
        className={`${styles.inputContainer} ${styles.textareaContainer}`}
      />
      <button
        type="button"
        onClick={prettifyJson}
        className={styles.prettifyButton}
      >
        Prettify JSON
      </button>
    </div>
  );
};

export default BodyEditor;