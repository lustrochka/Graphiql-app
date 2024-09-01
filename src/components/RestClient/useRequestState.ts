import { useState, useEffect } from "react";
import { encodeBase64 } from "../../utils/encodeBase64";
import { useRouter } from "next/router";
import { Header } from "../common/HeadersEditor/HeadersEditor";
import { Variable } from "../common/VariablesEditor/VariablesEditor";

const useRequestState = () => {
  const [method, setMethod] = useState<string>("POST");
  const [url, setUrl] = useState<string>("");
  const [headers, setHeaders] = useState<Header[]>([]);
  const [variables, setVariables] = useState<Variable[]>([]);
  const [body, setBody] = useState<string>("");
  const router = useRouter();

  const isMethodWithBody = ["POST", "PUT", "PATCH", "DELETE"].includes(method);

  const buildRequestBody = () => {
    const bodyObject = variables.reduce(
      (acc, variable) => {
        acc[variable.key] = variable.value;
        return acc;
      },
      {} as Record<string, string>,
    );

    const requestBody = JSON.stringify(bodyObject);
    console.log("Generated Request Body:", requestBody);
    return requestBody;
  };

  const updateBrowserUrl = () => {
    const encodedUrl = url ? encodeBase64(url) : "";
    let encodedBody = "";

    if (isMethodWithBody) {
      const requestBody = buildRequestBody();
      encodedBody = requestBody !== "{}" ? encodeBase64(requestBody) : "";
    }

    const headersQueryParams = headers
      .filter((header) => header.key && header.value)
      .map(
        (header) =>
          `${encodeURIComponent(header.key)}=${encodeURIComponent(header.value)}`,
      )
      .join("&");

    const requestUrl = `/${method}${encodedUrl ? `/${encodedUrl}` : ""}${encodedBody ? `/${encodedBody}` : ""}${
      headersQueryParams ? `?${headersQueryParams}` : ""
    }`;

    console.log("Updating browser URL to:", requestUrl);
    window.history.replaceState(null, "", requestUrl);
  };

  useEffect(() => {
    console.log("Method changed to:", method);
    console.log("URL changed to:", url);
    console.log("Headers updated:", headers);
    console.log("Variables updated:", variables);
    console.log("Body updated:", body);

    updateBrowserUrl();
  }, [method, url, headers, variables, body]);

  return {
    method,
    setMethod,
    url,
    setUrl,
    headers,
    setHeaders,
    variables,
    setVariables,
    body,
    setBody,
    isMethodWithBody,
    updateBrowserUrl,
  };
};

export default useRequestState;
