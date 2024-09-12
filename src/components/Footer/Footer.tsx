import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <a
          href="https://github.com/lustrochka"
          target="_blank"
          rel="noopener noreferrer"
        >
          Olga Borisevich (@lustrochka)
        </a>
        <a
          href="https://github.com/Alex-prokop"
          target="_blank"
          rel="noopener noreferrer"
        >
          Aliaksandr Prakapovich (@Alex-prokop)
        </a>
        <a
          href="https://github.com/aleksandramuraveva"
          target="_blank"
          rel="noopener noreferrer"
        >
          Aleksandra Muraveva (@aleksandramuraveva)
        </a>
        <a
          href="https://github.com/lustrochka/Graphiql-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Project Repository
        </a>
      </div>
      <div className={styles.copyright}>
        <span>© 2024</span>
        <Link href="https://rs.school/react/" passHref>
          <Image
            src="/images/rss-logo-CM8B7fA7.svg"
            alt="rss-logo"
            width={16}
            height={16}
          />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
