import React from "react";
import { useRestClient } from "../../RestClient/RestClientContext";

const UrlInput: React.FC = () => {
  const { url, setUrl } = useRestClient();

  return (
    <input
      type="text"
      value={url || ""}
      onChange={(e) => setUrl(e.target.value)}
      placeholder="Enter API Endpoint"
    />
  );
};

export default UrlInput;
