// pages/rest.tsx

import { GetServerSideProps } from "next";
import RestClientUI from "../components/RestClient/RestClientUI";
import { decodeBase64 } from "../utils/decodeBase64";

interface RestPageProps {
  method: string;
  url: string;
  body: string | null;
  headers: Record<string, string>;
}

const RestClientPage: React.FC<RestPageProps> = ({
  method,
  url,
  body,
  headers,
}) => {
  return (
    <main>
      <h1>REST Client</h1>
      <RestClientUI
        initialMethod={method}
        initialUrl={url}
        initialBody={body}
        initialHeaders={Object.entries(headers).map(([key, value]) => ({
          key,
          value,
        }))}
      />
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { method, url, body, headers } = context.query;

    const decodedUrl = decodeBase64(url as string);
    const decodedBody = body ? decodeBase64(body as string) : null;
    const decodedHeaders = JSON.parse(decodeBase64(headers as string));

    return {
      props: {
        method: method as string,
        url: decodedUrl,
        body: decodedBody,
        headers: decodedHeaders,
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

export default RestClientPage;
