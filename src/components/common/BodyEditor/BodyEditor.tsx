import React from "react";
import { useRestClient } from "../../RestClient/RestClientContext";

const BodyEditor: React.FC = () => {
  const { body, setBody } = useRestClient();
  return (
    <textarea
      value={body}
      onChange={(e) => setBody(e.target.value)}
      placeholder="Enter request body (JSON or plain text)"
    />
  );
};

export default BodyEditor;
