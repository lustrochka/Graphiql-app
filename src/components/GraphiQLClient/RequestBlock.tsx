import { useFormContext } from "react-hook-form";
import UrlBlock from "./UrlBlock";
import BodyEditor from "./BodyEditor";
import VariablesWrapper from "./VariablesWrapper";
import HeadersWrapper from "./HeadersWrapper";
import SDLInput from "./SdlInput";
import { useRouter } from "next/router";
import { decodeBase64 } from "../../utils/decodeBase64";
import SendRequestButton from "../common/SendRequestButton/SendRequestButton";
import { useEffect, useState } from "react";

const RequestBlock: React.FC = () => {
  const { setValue } = useFormContext();
  const [searchQuery, setSearchQuery] = useState({});
  const [variables, setVariables] = useState({});

  const router = useRouter();
  const { slug, ...queryParams } = router.query;

  useEffect(() => {
    if (slug) {
      if (slug[0] && slug[0] !== "[[...slug]]") {
        setValue("url", decodeBase64(slug[0]));
      }
      if (slug[1] && slug[1] !== "[[...slug]]") {
        const body = JSON.parse(decodeBase64(slug[1]));
        if (body.query) setValue("query", body.query);
        if (body.variables) setVariables(body.variables);
      }
    }

    if (queryParams) {
      setSearchQuery(queryParams);
    }
  }, [router.isReady]);

  return (
    <>
      <UrlBlock />
      <SDLInput />
      <BodyEditor />
      <VariablesWrapper value={variables} />
      <HeadersWrapper searchQuery={searchQuery} />
      <SendRequestButton />
    </>
  );
};

export default RequestBlock;
