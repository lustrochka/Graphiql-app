import axios from "axios";
import { useState } from "react";
import styles from "./GraphiQLClient.module.css";

const GraphQLClient: React.FC = () => {
  const DEFAULT_URL = "https://rickandmortyapi.com/graphql";
  const DEFAULT_BODY = `
    query GetCharacter($id: ID!) {
      character(id: $id) {
        name
        species
      }
    }
    `;
  const DEFAULT_VARIABLES = `{"id": 1}`;

  const [url, setUrl] = useState(DEFAULT_URL);
  const [query, setQuery] = useState(DEFAULT_BODY);
  const [variables, setVariables] = useState(DEFAULT_VARIABLES);
  const [headers, setHeaders] = useState("");
  const [response, setResponse] = useState("");

  const fetchData = async ({ url, query, variables, headers }) => {
    let parsedVars;
    let parsedHeaders;
    try {
      parsedVars = JSON.parse(variables || "{}");
      parsedHeaders = JSON.parse(headers || "{}");
    } catch {
      return setResponse("Variables and headers should be in JSON format");
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
        setResponse(JSON.stringify(result.data.errors[0].message));
      } else {
        setResponse(JSON.stringify(result.data));
      }
    } catch (error) {
      setResponse(error);
    }
  };

  return (
    <div className={styles.graphql}>
      <label htmlFor="url">url</label>
      <input
        type="text"
        id="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      ></input>
      <label htmlFor="body">request</label>
      <textarea
        id="body"
        value={query}
        rows={10}
        cols={33}
        onChange={(e) => setQuery(e.target.value)}
      ></textarea>
      <label htmlFor="variables">variables</label>
      <textarea
        id="variables"
        value={variables}
        onChange={(e) => setVariables(e.target.value)}
      ></textarea>
      <textarea
        id="headers"
        value={headers}
        onChange={(e) => setHeaders(e.target.value)}
      ></textarea>
      <textarea id="response" readOnly value={response}></textarea>
      <button onClick={() => fetchData({ url, query, variables, headers })}>
        Send
      </button>
    </div>
  );
};

export default GraphQLClient;
