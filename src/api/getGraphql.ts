import axios from "axios";

interface GraphqlRequest {
  url: string;
  query: string;
  variables?: string;
  headers?: string;
}

export default async function getGraphql({
  url,
  query,
  variables,
  headers,
}: GraphqlRequest) {
  let parsedVars;
  let parsedHeaders;
  try {
    parsedVars = JSON.parse(variables || "{}");
    parsedHeaders = JSON.parse(headers || "{}");
  } catch {
    return { jsonError: "Variables and headers should be in JSON format" };
  }
  try {
    const result = await axios.post(
      url,
      {
        query,
        variables: parsedVars,
      },
      {
        headers: {
          "Content-Type": "application/json",
          ...parsedHeaders,
        },
      },
    );

    if (result.data.errors) {
      return {
        response: JSON.stringify(result.data.errors[0].message),
        status: result.status.toString(),
      };
    } else {
      return {
        response: JSON.stringify(result.data),
        status: result.status.toString(),
      };
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        response: error.message,
        status: error.response.status.toString(),
      };
    } else {
      return { response: "An unknown error occurred", status: "500" };
    }
  }
}
