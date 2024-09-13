import { useFormContext } from "react-hook-form";
import UrlWrapper from "./UrlWrapper";
import VariablesWrapper from "./VariablesWrapper";
import HeadersWrapper from "./HeadersWrapper";
import BodyWrapper from "./BodyWrapper";
import SDLInput from "./SdlInput";
import { useRouter } from "next/router";
import { decodeBase64 } from "../../utils/decodeBase64";
import SendRequestButton from "../common/SendRequestButton/SendRequestButton";
import { useEffect, useState } from "react";
import styles from "./GraphiQLClient.module.css";

const RequestBlock: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState({});
  const [variables, setVariables] = useState({});
  const [query, setQuery] = useState("");
  const [url, setUrl] = useState("");

  const router = useRouter();
  const { slug, ...queryParams } = router.query;

  useEffect(() => {
    if (slug) {
      if (slug[0] && slug[0] !== "[[...slug]]") {
        setUrl(decodeBase64(slug[0]));
      }
      if (slug[1] && slug[1] !== "[[...slug]]") {
        const body = JSON.parse(decodeBase64(slug[1]));
        if (body.query) setQuery(body.query);
        if (body.variables) setVariables(body.variables);
      }
    }

    if (queryParams) {
      setSearchQuery(queryParams);
    }
  }, [router.isReady]);

  return (
    <div className={styles.requestBlock}>
      <div className={styles.urlWrapper}>
        <div>
          <label htmlFor="url">URL</label>
          <UrlWrapper value={url} />
        </div>
        <SDLInput />
      </div>
      <BodyWrapper value={query} />
      <VariablesWrapper value={variables} />
      <HeadersWrapper searchQuery={searchQuery} />
      <SendRequestButton />
    </div>
  );
};

export default RequestBlock;
