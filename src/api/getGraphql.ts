import axios from "axios";
import { Variable } from "../components/common/VariablesEditor/VariablesEditor";
import { Header } from "../components/common/HeadersEditor/HeadersEditor";

interface RequestData {
  url: string;
  query: string;
  variables: Variable[];
  headers: Header[];
}

type Items = { [key: string]: string };

export default async function getGraphql({
  url,
  query,
  variables,
  headers,
}: RequestData) {
  const headersObject: Items = {};
  const variablesObject: Items = {};
  headers.forEach(({ key, value }) => {
    if (key) {
      headersObject[key] = value;
    }
  });
  variables.forEach(({ key, value }) => {
    if (key) {
      variablesObject[key] = value;
    }
  });
  try {
    const result = await axios.post(
      url,
      {
        query,
        variables: variablesObject,
      },
      {
        headers: {
          "Content-Type": "application/json",
          ...headersObject,
        },
      },
    );

    if (result.data.errors) {
      return {
        response: JSON.stringify(result.data.errors[0].message),
        status: result.status,
      };
    } else {
      return {
        response: JSON.stringify(result.data),
        status: result.status,
      };
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        response: JSON.stringify(error.response.data),
        status: error.response.status,
      };
    } else {
      return {
        response: "Unknown error",
        status: 500,
      };
    }
  }
}
