import { useEffect } from "react";

interface RequestData {
  method: string;
  url: string;
  headers: { key: string; value: string }[];
  variables: { key: string; value: string }[];
  body: string | null;
  time: string;
}

const useRequestHistory = (
  method: string,
  url: string,
  headers: { key: string; value: string }[],
  variables: { key: string; value: string }[],
  body: string | null,
) => {
  const saveRequestToHistory = () => {
    if (typeof window !== "undefined") {
      const history: RequestData[] = JSON.parse(
        localStorage.getItem("requestHistory") || "[]",
      );

      const requestData: RequestData = {
        method,
        url,
        headers,
        variables,
        body,
        time: new Date().toISOString(),
      };

      history.push(requestData);
      localStorage.setItem("requestHistory", JSON.stringify(history));

      console.log("Request saved to history:", requestData);
    }
  };

  useEffect(() => {
    console.log("useRequestHistory triggered");
    saveRequestToHistory();
  }, [method, url, headers, variables, body]);

  return {
    saveRequestToHistory,
  };
};

export default useRequestHistory;
