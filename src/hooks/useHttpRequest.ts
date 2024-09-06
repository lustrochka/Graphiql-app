// /hooks/useHttpRequest.ts
import { useState } from "react";
import { Header } from "../components/common/HeadersEditor/HeadersEditor";
import {
  createRequestOptions,
  handleResponse,
  isValidUrl,
  validateHeaders,
} from "../utils/httpRequestUtils";

const useHttpRequest = () => {
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [responseBody, setResponseBody] = useState<string>("");

  const clearResponse = () => {
    setStatusCode(null);
    setResponseBody("");
    console.log("Response cleared");
  };

  const sendRequest = async (
    method: string,
    url: string,
    headers: Header[],
    body: string,
  ): Promise<void> => {
    console.group("HTTP Request");
    console.log("%cStarting request...", "color: green; font-weight: bold;");

    if (!isValidUrl(url)) {
      setStatusCode(400);
      setResponseBody("Invalid URL. Please enter a valid HTTP or HTTPS URL.");
      console.groupEnd();
      return;
    }

    if (!validateHeaders(headers)) {
      setStatusCode(400);
      setResponseBody("Invalid headers.");
      console.groupEnd();
      return;
    }

    try {
      const options = createRequestOptions(method, headers, body);
      const response = await fetch(url, options);
      const formattedResponseBody = await handleResponse(response);

      setStatusCode(response.status);
      setResponseBody(formattedResponseBody);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setStatusCode(500);
      setResponseBody(errorMessage);
    } finally {
      console.groupEnd();
    }
  };

  return { statusCode, responseBody, sendRequest, clearResponse };
};

export default useHttpRequest;
