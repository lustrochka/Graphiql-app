import { useState, useEffect } from "react";
import { encodeBase64 } from "../../utils/encodeBase64";
import { useRouter } from "next/router";
import { Header } from "../common/HeadersEditor/HeadersEditor";
import { Variable } from "../common/VariablesEditor/VariablesEditor";

const useRequestState = () => {
  const [method, setMethod] = useState<string>("GET");
  const [url, setUrl] = useState<string>("");
  const [headers, setHeaders] = useState<Header[]>([]);
  const [variables, setVariables] = useState<Variable[]>([]);
  const [body, setBody] = useState<string>("");
  const [userInteracted, setUserInteracted] = useState<boolean>(false);
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
    return requestBody;
  };

  const updateBrowserUrl = () => {
    if (!userInteracted) return;

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

    const requestUrl = `/${method}${encodedUrl ? `/${encodedUrl}` : ""}${
      encodedBody ? `/${encodedBody}` : ""
    }${headersQueryParams ? `?${headersQueryParams}` : ""}`;

    if (router.asPath !== requestUrl) {
      window.history.replaceState(null, "", requestUrl);
      console.log("Updating browser URL to:", requestUrl);
    }
  };

  useEffect(() => {
    if (userInteracted) {
      console.log("URL, Headers, Variables или Body изменились, обновление...");
      updateBrowserUrl();
    }
  }, [url, headers, variables, body, method, userInteracted]);

  const handleUserInteraction = () => {
    if (!userInteracted) {
      setUserInteracted(true);
    }
  };

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
    handleUserInteraction,
  };
};

export default useRequestState;
