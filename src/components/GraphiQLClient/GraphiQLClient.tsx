import axios from "axios";
import { useState } from "react";

const GraphQLClient: React.FC = () => {
  const [url, setUrl] = useState("");
  const [body, setBody] = useState("");
  return (
    <div>
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
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></textarea>
      <button onClick={() => fetchData(url, body)}>Send</button>
    </div>
  );
};

const fetchData = async (url, query) => {
  const response = await axios.post(
    url,
    {
      query,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};

export default GraphQLClient;
