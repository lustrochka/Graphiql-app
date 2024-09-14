import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./History.module.css";

interface RequestData {
  method: string;
  url: string;
  headers: { key: string; value: string }[];
  variables: { key: string; value: string }[];
  body: string | null;
  time: string;
  path?: string;
}

const History: React.FC = () => {
  const [history, setHistory] = useState<RequestData[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedHistory = localStorage.getItem("requestHistory");
    if (storedHistory) {
      const parsedHistory = JSON.parse(storedHistory);
      setHistory(parsedHistory);
    }
  }, []);

  const handleRequestClick = (request: RequestData) => {
    const encodedUrl = btoa(request.url);
    const encodedBody = request.body ? btoa(request.body) : null;
    const route = `/${request.method}/${encodedUrl}${
      encodedBody ? `/${encodedBody}` : ""
    }`;
    console.log(request.body);
    router.push(route);
  };

  const handleGraphqlClick = (request: RequestData) => {
    if (request.path) router.push(request.path);
  };

  const restRequests = history.filter((request) =>
    ["GET", "POST", "PUT", "DELETE"].includes(request.method),
  );
  const graphqlRequests = history.filter(
    (request) => request.method === "graphql",
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Request History</h2>
      {history.length === 0 ? (
        <div className={styles.emptyHistory}>
          <p>No requests in history.</p>
          <p>It&apos;s empty here. Try those options:</p>
          <button
            className={styles.clientButton}
            onClick={() => router.push("/restclient")}
          >
            REST Client
          </button>
          <button
            className={styles.clientButton}
            onClick={() => router.push("/graphql")}
          >
            GraphiQL Client
          </button>
        </div>
      ) : (
        <div className={styles.tableContainer}>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>REST Client Requests</h3>
            {restRequests.length > 0 ? (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Method</th>
                    <th>URL</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {restRequests.map((request, index) => (
                    <tr
                      key={index}
                      onClick={() => handleRequestClick(request)}
                      className={styles.historyRow}
                    >
                      <td>{request.method}</td>
                      <td>{request.url}</td>
                      <td>{new Date(request.time).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No REST requests found.</p>
            )}
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>GraphQL Client Requests</h3>
            {graphqlRequests.length > 0 ? (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Method</th>
                    <th>URL</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {graphqlRequests.map((request, index) => (
                    <tr
                      key={index}
                      onClick={() => handleGraphqlClick(request)}
                      className={styles.historyRow}
                    >
                      <td>{request.method}</td>
                      <td>{request.url}</td>
                      <td>{new Date(request.time).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No GraphQL requests found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
