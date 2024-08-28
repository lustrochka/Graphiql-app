import { useState } from "react";
import { Header } from "./HeadersEditor";

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

export const useRestClientLogic = () => {
  const [method, setMethod] = useState<string>("GET");
  const [url, setUrl] = useState<string>("");
  const [headers, setHeaders] = useState<Header[]>([]);
  const [body, setBody] = useState<string>("");
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [responseBody, setResponseBody] = useState<string>("");

  const sendRequest = async () => {
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
      return;
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
        return;
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

      try {
        const json = JSON.parse(text);
        console.log(
          "%cResponse is JSON, parsed successfully.",
          "color: green;",
        );
        setResponseBody(JSON.stringify(json, null, 2));
      } catch {
        console.log(
          "%cResponse is not JSON, returning raw text.",
          "color: orange;",
        );
        setResponseBody(text);
      }
    } catch (error) {
      console.error(
        "%cRequest failed with error:",
        "color: red; font-weight: bold;",
        error,
      );
      setStatusCode(500);
      setResponseBody(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }

    console.groupEnd();
  };

  return {
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
  };
};
