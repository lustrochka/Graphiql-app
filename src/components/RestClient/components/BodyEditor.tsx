import React from "react";

interface BodyEditorProps {
  body: string;
  setBody: (body: string) => void;
}

const BodyEditor: React.FC<BodyEditorProps> = ({ body, setBody }) => (
  <textarea
    value={body}
    onChange={(e) => setBody(e.target.value)}
    placeholder="Enter request body (JSON or plain text)"
  />
);

export default BodyEditor;
