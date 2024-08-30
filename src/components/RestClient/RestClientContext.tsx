import { useRouter } from "next/router";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Header } from "../common/HeadersEditor/HeadersEditor";
import useHttpRequest from "./useHttpRequest";
import { encodeBase64 } from "../../utils/encodeBase64";

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

export const RestClientProvider: React.FC<{
  children: React.ReactNode;
  initialMethod: string;
  initialUrl: string;
  initialBody?: string | null;
  initialHeaders?: Record<string, string>;
}> = ({ children, initialMethod, initialUrl, initialBody, initialHeaders }) => {
  const router = useRouter();
  const [method, setMethod] = useState<string>(initialMethod || "GET");
  const [url, setUrl] = useState<string>(initialUrl || "");
  const [headers, setHeaders] = useState<Header[]>(
    Object.entries(initialHeaders || {}).map(([key, value]) => ({
      key,
      value,
    })),
  );
  const [body, setBody] = useState<string>(initialBody || "");
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [responseBody, setResponseBody] = useState<string>("");

  const { sendRequest: makeRequest } = useHttpRequest();

  useEffect(() => {
    console.log("RestClientContext initialized with:", {
      method,
      url,
      headers,
      body,
    });

    // Восстановление состояния из localStorage
    const savedStatusCode = localStorage.getItem("statusCode");
    const savedResponseBody = localStorage.getItem("responseBody");

    if (savedStatusCode && savedResponseBody) {
      setStatusCode(parseInt(savedStatusCode, 10));
      setResponseBody(savedResponseBody);

      // Очистка сохраненных данных, чтобы они не использовались в будущем
      localStorage.removeItem("statusCode");
      localStorage.removeItem("responseBody");
    }
  }, []);

  const sendRequest = async () => {
    const requestBody = method !== "GET" && method !== "DELETE" ? body : "";

    console.log("Starting sendRequest with:", { method, url, headers, body });

    const { statusCode, responseBody } = await makeRequest(
      method,
      url,
      headers,
      requestBody,
    );

    setStatusCode(statusCode);
    setResponseBody(responseBody);

    console.log("Request finished with statusCode:", statusCode);
    console.log("Request finished with responseBody:", responseBody);

    if (statusCode === 200) {
      // Сохранение данных в localStorage перед переходом на новый URL
      localStorage.setItem("statusCode", statusCode.toString());
      localStorage.setItem("responseBody", responseBody);

      const encodedUrl = encodeBase64(url);
      const encodedBody = requestBody ? encodeBase64(requestBody) : "";

      const newUrl = `/request/${method}/${encodedUrl}${
        encodedBody ? `/${encodedBody}` : ""
      }`;

      console.log("Navigating to new URL:", newUrl);

      router.replace(newUrl, undefined, { shallow: true });
    } else {
      console.warn("Request did not succeed, not updating URL.");
    }
  };

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
