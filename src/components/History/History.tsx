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

    const route = `/${request.method}/${encodedUrl}${encodedBody ? `/${encodedBody}` : ""}`;
    router.push(route);
  };

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
            onClick={() => router.push("/graphiql")}
          >
            GraphiQL Client
          </button>
        </div>
      ) : (
        <ul className={styles.historyList}>
          {history.map((request, index) => (
            <li key={index} className={styles.historyItem}>
              <a
                className={styles.historyLink}
                onClick={() => handleRequestClick(request)}
              >
                [{request.method}] {request.url} -{" "}
                {new Date(request.time).toLocaleString()}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
