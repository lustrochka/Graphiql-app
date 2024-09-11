import { useFormContext } from "react-hook-form";
import UrlBlock from "./UrlBlock";
import BodyEditor from "./BodyEditor";
import VariablesEditor from "./VariablesEditor";
import HeadersWrapper from "./HeadersWrapper";
import SDLInput from "./SdlInput";
import { useRouter } from "next/router";
import { decodeBase64 } from "../../utils/decodeBase64";
import { useEffect } from "react";

const RequestBlock: React.FC = () => {
  const { setValue } = useFormContext();

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
        if (body.variables) setValue("variables", body.variables);
      }
    }

    if (queryParams) {
      setValue("headers", decodeURIComponent(JSON.stringify(queryParams)));
    }
  }, [router.isReady]);

  return (
    <>
      <UrlBlock />
      <SDLInput />
      <BodyEditor />
      <VariablesEditor />
      <HeadersWrapper />
      <button type="submit">Send</button>
    </>
  );
};

export default RequestBlock;
