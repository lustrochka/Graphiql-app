import { encodeBase64 } from "../../utils/encodeBase64";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./History.module.css";

interface HistoryItem {
  method: string;
  url: string;
  body: string | null;
  headers: Record<string, string>;
}

const History: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedHistory = JSON.parse(
      localStorage.getItem("requestHistory") || "[]",
    );
    setHistory(storedHistory);
  }, []);

  const handleClick = (item: HistoryItem) => {
    const encodedUrl = encodeBase64(item.url);
    const encodedBody = item.body ? encodeBase64(item.body) : null;
    const encodedHeaders = encodeBase64(JSON.stringify(item.headers));

    const queryParams = new URLSearchParams({
      method: item.method,
      url: encodedUrl,
      body: encodedBody || "",
      headers: encodedHeaders,
    });

    router.push(`/rest?${queryParams.toString()}`);
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
          {history.map((item, index) => (
            <li key={index} className={styles.historyItem}>
              <a
                className={styles.historyItem}
                onClick={() => handleClick(item)}
              >
                [{item.method}] {item.url}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
