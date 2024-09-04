// pages/[method]/[encodedUrl]/[[...encodedBody]].tsx

import { GetServerSideProps } from "next";
import RestClientUI from "../../../components/RestClient/RestClientUI";
import { decodeBase64 } from "../../../utils/decodeBase64";

interface RequestPageProps {
  method: string;
  url: string;
  body: string | null;
  headers: Record<string, string>;
}

const RequestPage: React.FC<RequestPageProps> = ({
  method,
  url,
  body,
  headers,
}) => {
  return (
    <RestClientUI
      initialMethod={method}
      initialUrl={url}
      initialBody={body}
      initialHeaders={Object.entries(headers).map(([key, value]) => ({
        key,
        value,
      }))}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { method, encodedUrl, encodedBody } = context.params!;

    console.log("Method:", method);
    console.log("Encoded URL:", encodedUrl);
    console.log("Encoded Body:", encodedBody);

    // Декодируем URL
    const url = decodeBase64(encodedUrl as string);

    // Декодируем тело запроса, если оно передано
    const body = encodedBody
      ? decodeBase64((encodedBody as string[]).join("/"))
      : null;

    console.log("Decoded URL:", url);
    console.log("Decoded Body:", body);

    const headers: Record<string, string> = {};

    Object.keys(context.query).forEach((key) => {
      headers[key] = context.query[key] as string;
    });

    return {
      props: {
        method,
        url,
        body,
        headers,
      },
    };
  } catch (error) {
    console.error("Error decoding base64 or processing request:", error);
    return {
      props: {
        method: "GET",
        url: "",
        body: null,
        headers: {},
      },
    };
  }
};

export default RequestPage;
