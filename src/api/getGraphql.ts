import axios from "axios";

export default async function getGraphql({ url, query, variables, headers }) {
  let parsedVars;
  try {
    parsedVars = JSON.parse(variables || "{}");
  } catch {
    return { jsonError: "Variables should be in JSON format" };
  }

  const headersObject = {};
  headers.forEach(({ key, value }) => {
    if (key) {
      headersObject[key] = value;
    }
  });
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
