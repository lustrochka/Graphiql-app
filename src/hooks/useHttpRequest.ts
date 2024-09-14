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
  };

  const sendRequest = async (
    method: string,
    url: string,
    headers: Header[],
    body: string,
  ): Promise<void> => {
   

    if (!isValidUrl(url)) {
      setStatusCode(400);
      setResponseBody("Invalid URL. Please enter a valid HTTP or HTTPS URL.");
      return;
    }

    if (!validateHeaders(headers)) {
      setStatusCode(400);
      setResponseBody("Invalid headers.");
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
    }
  };

  return { statusCode, responseBody, sendRequest, clearResponse };
};

export default useHttpRequest;
