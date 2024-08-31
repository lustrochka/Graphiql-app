import { useEffect, useState } from "react";
import Link from "next/link";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import styles from "../components/WelcomePage/WelcomePage.module.css";

interface UserData {
  email: string;
}

const WelcomePage: React.FC = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data() as UserData;
          setUserName(userData.name);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className={styles.welcomePage}>
      <h1>{user ? `Welcome Back!` : "Welcome!"}</h1>
      <nav>
        <ul className={styles.primaryLinks}>
          {user ? (
            <li>
              <button onClick={() => auth.signOut()}>Sign Out</button>
            </li>
          ) : (
            <>
              <li>
                <Link href="/signin">Sign In</Link>
              </li>
              <li>
                <Link href="/signup">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
        {user && (
          <ul className={styles.secondaryLinks}>
            <li>
              <Link href="/restclient">REST Client</Link>
            </li>
            <li>
              <Link href="/graphiql">GraphiQL Client</Link>
            </li>
            <li>
              <Link href="/history">History</Link>
            </li>
          </ul>
        )}
      </nav>
    </main>
  );
};

export default WelcomePage;
