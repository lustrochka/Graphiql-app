import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { auth, db } from "../../lib/firebase";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  const [isSticky, setSticky] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "EN" ? "RU" : "EN"));
  };

  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <header className={`${styles.header} ${isSticky ? styles.sticky : ""}`}>
      <div className={styles.logo}>
        <Link href="/" passHref>
          <Image
            src="/images/rss-logo-CM8B7fA7.svg"
            alt="rss-logo"
            width={50}
            height={50}
          />
        </Link>
      </div>
      <div className={styles.nav}>
        <button className={styles.langToggle} onClick={toggleLanguage}>
          {language}
        </button>
        {user ? (
          <>
            <Link href="/" passHref>
              <button className={styles.authButton}>Main Page</button>
            </Link>
            <button className={styles.authButton} onClick={handleSignOut}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link href="/signin" passHref>
              <button className={styles.authButton}>Sign In</button>
            </Link>
            <Link href="/signup" passHref>
              <button className={styles.authButton}>Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
