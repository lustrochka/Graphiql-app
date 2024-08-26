import Link from "next/link";
import styles from "../components/WelcomePage/WelcomePage.module.css";

const WelcomePage: React.FC = () => {
  return (
    <main className={styles.welcomePage}>
      <h1>Welcome!</h1>
      <nav>
        <ul className={styles.primaryLinks}>
          <li>
            <Link href="/signin">Sign In</Link>
          </li>
          <li>
            <Link href="/signup">Sign Up</Link>
          </li>
        </ul>
        <ul className={styles.secondaryLinks}>
          <li>
            <Link href="/restclient">REST Client</Link>
          </li>
          <li>
            <Link href="/graphiql">GraphiQL Client </Link>
          </li>
          <li>
            <Link href="/history">History</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
};

export default WelcomePage;
