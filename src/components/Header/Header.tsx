import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./Header.module.css";
import { getDictionary, Dictionary } from "../../i18n";

const Header: React.FC = () => {
  const { locale, push, asPath } = useRouter();
  const [isSticky, setSticky] = useState(false);
  const [dictionary, setDictionary] = useState<Dictionary | null>(null);

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
    const loadDictionary = async () => {
      const dict = await getDictionary(locale || "en");
      setDictionary(dict);
    };

    loadDictionary();
  }, [locale]);

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "ru" : "en";
    push(asPath, asPath, { locale: newLocale });
  };

  if (!dictionary) {
    return null;
  }

  return (
    <header className={`${styles.header} ${isSticky ? styles.sticky : ""}`}>
      <div className={styles.logo}>
        <Link href="/" passHref>
          <Image
            src="/images/rss-logo-CM8B7fA7.svg"
            alt={dictionary.logoAlt}
            width={50}
            height={50}
          />
        </Link>
      </div>
      <div className={styles.nav}>
        <button className={styles.langToggle} onClick={toggleLanguage}>
          {locale === "en" ? "RU" : "EN"}
        </button>
        <Link href="/signin" passHref>
          <button className={styles.authButton}>{dictionary.signin}</button>{" "}
        </Link>
        <Link href="/signup" passHref>
          <button className={styles.authButton}>{dictionary.signup}</button>{" "}
        </Link>
      </div>
    </header>
  );
};

export default Header;
