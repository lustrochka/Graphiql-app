import { useState } from "react";
import { Header } from "../components/common/HeadersEditor/HeadersEditor";

const useRequestHeaders = () => {
  const [headers, setHeaders] = useState<Header[]>([]);

  const addHeader = (key: string, value: string) => {
    setHeaders([...headers, { key, value }]);
  };

  const removeHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  return {
    headers,
    setHeaders,
    addHeader,
    removeHeader,
  };
};

export default useRequestHeaders;
