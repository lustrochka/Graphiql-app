import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { decodeBase64 } from "../../../utils/decodeBase64";
import RestClientUI from "../../../components/RestClient/RestClientUI";

const RequestPage = () => {
  const router = useRouter();
  const { method, encodedUrl, encodedBody } = router.query;

  const [decodedUrl, setDecodedUrl] = useState<string>("");
  const [decodedBody, setDecodedBody] = useState<string>("");

  useEffect(() => {
    console.log("RequestPage received query params:", {
      method,
      encodedUrl,
      encodedBody,
    });

    if (encodedUrl) {
      const url = decodeBase64(encodedUrl as string);
      console.log("Decoded URL:", url);
      setDecodedUrl(url);
    }

    if (encodedBody) {
      const body = decodeBase64(encodedBody as string);
      console.log("Decoded Body:", body);
      setDecodedBody(body);
    }
  }, [encodedUrl, encodedBody]);

  if (!decodedUrl || !method) {
    return <p>Loading...</p>;
  }

  console.log("Rendering RestClientUI with:", {
    method,
    decodedUrl,
    decodedBody,
  });

  return (
    <RestClientUI
      initialMethod={method as string}
      initialUrl={decodedUrl}
      initialBody={decodedBody}
    />
  );
};

export default RequestPage;
