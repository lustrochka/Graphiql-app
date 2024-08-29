import React, { createContext, useContext, useState } from "react";
import { Header } from "../common/HeadersEditor";
import useHttpRequest from "./useHttpRequest";

interface RestClientContextType {
  method: string;
  setMethod: (method: string) => void;
  url: string;
  setUrl: (url: string) => void;
  headers: Header[];
  setHeaders: (headers: Header[]) => void;
  body: string;
  setBody: (body: string) => void;
  statusCode: number | null;
  responseBody: string;
  sendRequest: () => Promise<void>;
}

const RestClientContext = createContext<RestClientContextType | null>(null);

export const RestClientProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [method, setMethod] = useState<string>("GET");
  const [url, setUrl] = useState<string>("");
  const [headers, setHeaders] = useState<Header[]>([]);
  const [body, setBody] = useState<string>("");

  const {
    statusCode,
    responseBody,
    sendRequest: makeRequest,
  } = useHttpRequest();

  const sendRequest = () => makeRequest(method, url, headers, body);

  return (
    <RestClientContext.Provider
      value={{
        method,
        setMethod,
        url,
        setUrl,
        headers,
        setHeaders,
        body,
        setBody,
        statusCode,
        responseBody,
        sendRequest,
      }}
    >
      {children}
    </RestClientContext.Provider>
  );
};

export const useRestClient = () => {
  const context = useContext(RestClientContext);
  if (!context) {
    throw new Error("useRestClient must be used within a RestClientProvider");
  }
  return context;
};
