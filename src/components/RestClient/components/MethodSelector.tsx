import React from 'react';

interface MethodSelectorProps {
  method: string;
  setMethod: (method: string) => void;
}

const MethodSelector: React.FC<MethodSelectorProps> = ({
  method,
  setMethod,
}) => (
  <select value={method} onChange={(e) => setMethod(e.target.value)}>
    {['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].map((method) => (
      <option key={method} value={method}>
        {method}
      </option>
    ))}
  </select>
);

export default MethodSelector;
