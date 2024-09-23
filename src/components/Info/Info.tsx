import React from "react";
import Link from "next/link";
import styles from "./Info.module.css";

const Info: React.FC = () => (
  <div className={styles.info}>
    <h3>About the Project:</h3>
    <p>
      This REST/GraphiQL Client was developed by Olga Borisevich, Aliaksandr
      Prakapovich and Aleksandra Muraveva as part of the{" "}
      <Link href="https://rs.school/react/" className={styles.link}>
        Rolling Scopes React Course.
      </Link>{" "}
    </p>
    <h3>Demo Account Details:</h3>
    <p>
      Email: <span className={styles.red}>projectrss24@gmail.com</span>
    </p>
    <p>
      Password: <span className={styles.red}>password!1</span>
    </p>
  </div>
);

export default Info;
