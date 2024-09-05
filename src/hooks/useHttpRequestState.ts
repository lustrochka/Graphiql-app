import { useState, useEffect } from "react";
import useRequestHeaders from "./useRequestHeaders";
import useRequestVariables from "./useRequestVariables";
import useRequestBodyBuilder from "./useRequestBodyBuilder";
import useRequestUrlUpdater from "./useRequestUrlUpdater";

const useHttpRequestState = () => {
  const [method, setMethod] = useState<string>("GET");
  const [url, setUrl] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [userInteracted, setUserInteracted] = useState<boolean>(false);

  const { headers, setHeaders, addHeader, removeHeader } = useRequestHeaders();
  const { variables, setVariables, addVariable, removeVariable } =
    useRequestVariables();
  const { buildRequestBody } = useRequestBodyBuilder(variables);
  const { updateBrowserUrl } = useRequestUrlUpdater(
    method,
    url,
    headers,
    buildRequestBody(),
    userInteracted,
  );

  const isMethodWithBody = ["POST", "PUT", "PATCH", "DELETE"].includes(method);

  useEffect(() => {
    if (userInteracted) {
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
    addHeader,
    removeHeader,
    variables,
    setVariables,
    addVariable,
    removeVariable,
    body,
    setBody,
    isMethodWithBody,
    updateBrowserUrl,
    handleUserInteraction,
  };
};

export default useHttpRequestState;
