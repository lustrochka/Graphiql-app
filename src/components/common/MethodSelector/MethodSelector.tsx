import React from "react";
import { useRestClient } from "../../RestClient/RestClientContext";

const MethodSelector: React.FC = () => {
  const { method, setMethod } = useRestClient();

  return (
    <select value={method} onChange={(e) => setMethod(e.target.value)}>
      {["GET", "POST", "PUT", "DELETE", "PATCH"].map((method) => (
        <option key={method} value={method}>
          {method}
        </option>
      ))}
    </select>
  );
};

export default MethodSelector;
