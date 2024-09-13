import axios from "axios";

export default async function getGraphql({ url, query, variables, headers }) {
  const headersObject = {};
  const variablesObject = {};
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
    return { response: error, status: error.response };
  }
}
