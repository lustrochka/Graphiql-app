import { useRouter } from "next/router";
import { FormData } from "../components/GraphiQLClient/GraphiQLClient";

export function useLocalStorage() {
  const router = useRouter();

  const saveToStorage = (data: FormData) => {
    if (typeof window !== "undefined") {
      const history = JSON.parse(
        localStorage.getItem("requestHistory") || "[]",
      );

      const { url, headers, variables, query } = data;

      const requestData = {
        method: "graphql",
        url,
        headers,
        variables,
        body: query,
        time: new Date().toISOString(),
        path: router.asPath,
      };

      history.push(requestData);
      localStorage.setItem("requestHistory", JSON.stringify(history));
    }
  };

  return { saveToStorage };
}
