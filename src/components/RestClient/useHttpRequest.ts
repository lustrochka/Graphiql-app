import { useState } from "react";
import { Header } from "../common/HeadersEditor/HeadersEditor";

interface UseHttpRequestResult {
  statusCode: number | null;
  responseBody: string;
  sendRequest: (
    method: string,
    url: string,
    headers: Header[],
    body: string,
  ) => Promise<{ statusCode: number | null; responseBody: string }>;
}

const useHttpRequest = (): UseHttpRequestResult => {
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [responseBody, setResponseBody] = useState<string>("");

  const isValidUrl = (url: string): boolean => {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
    } catch {
      return false;
    }
  };

  const isValidHeader = (header: Header): boolean => {
    const isValid = header.key.trim() !== "" && !/\s/.test(header.key);
    if (!isValid) {
      console.error(`Header validation failed for key: "${header.key}"`);
    }
    return isValid;
  };

  const sendRequest = async (
    method: string,
    url: string,
    headers: Header[],
    body: string,
  ): Promise<{ statusCode: number | null; responseBody: string }> => {
    console.group("HTTP Request");
    console.log("%cStarting request...", "color: green; font-weight: bold;");

    console.log(`Validating URL: ${url}`);
    if (!isValidUrl(url)) {
      console.error(
        "%cInvalid URL provided.",
        "color: red; font-weight: bold;",
      );
      setStatusCode(400);
      setResponseBody("Invalid URL. Please enter a valid HTTP or HTTPS URL.");
      console.groupEnd();
      return { statusCode: 400, responseBody: "Invalid URL" };
    }
    console.log("%cURL is valid.", "color: green;");

    console.log("Validating headers...");
    for (const header of headers) {
      console.log(`Validating header: ${header.key}: ${header.value}`);
      if (!isValidHeader(header)) {
        console.error(
          `%cInvalid header key: "${header.key}".`,
          "color: red; font-weight: bold;",
        );
        setStatusCode(400);
        setResponseBody(
          `Invalid header key "${header.key}". Header keys should not be empty or contain spaces.`,
        );
        console.groupEnd();
        return { statusCode: 400, responseBody: `Invalid header` };
      }
    }
    console.log("%cHeaders are valid.", "color: green;");

    try {
      const options: RequestInit = {
        method,
        headers: headers.reduce(
          (acc, header) => {
            acc[header.key] = header.value;
            return acc;
          },
          {} as Record<string, string>,
        ),
      };

      if (method !== "GET" && method !== "DELETE") {
        options.body = body;
      }

      console.log("%cSending request with options:", "color: blue;", options);
      const response = await fetch(url, options);
      const text = await response.text();

      console.log(
        `%cResponse received with status: ${response.status}`,
        "color: green;",
      );
      setStatusCode(response.status);
      setResponseBody(text);

      let formattedResponseBody = "";
      try {
        const json = JSON.parse(text);
        formattedResponseBody = JSON.stringify(json, null, 2);
        console.log(
          "%cResponse is JSON, parsed successfully.",
          "color: green;",
        );
      } catch {
        formattedResponseBody = text;
        console.log(
          "%cResponse is not JSON, returning raw text.",
          "color: orange;",
        );
      }

      setResponseBody(formattedResponseBody);
      console.log("%cResponse Body:", "color: blue;", formattedResponseBody);

      return {
        statusCode: response.status,
        responseBody: formattedResponseBody,
      };
    } catch (error) {
      const errorMessage = `Error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`;
      setStatusCode(500);
      setResponseBody(errorMessage);
      console.error(
        "%cRequest failed with error:",
        "color: red; font-weight: bold;",
        errorMessage,
      );

      return { statusCode: 500, responseBody: errorMessage };
    } finally {
      console.groupEnd();
    }
  };

  return { statusCode, responseBody, sendRequest };
};

export default useHttpRequest;
