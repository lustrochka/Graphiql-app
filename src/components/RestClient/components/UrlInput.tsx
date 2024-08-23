import React from 'react';

interface UrlInputProps {
  url: string;
  setUrl: (url: string) => void;
}

const UrlInput: React.FC<UrlInputProps> = ({ url, setUrl }) => (
  <input
    type="text"
    value={url}
    onChange={(e) => setUrl(e.target.value)}
    placeholder="Enter API Endpoint"
  />
);

export default UrlInput;
