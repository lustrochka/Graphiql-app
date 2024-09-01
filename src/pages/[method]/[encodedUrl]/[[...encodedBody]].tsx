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
      initialHeaders={headers}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { method, encodedUrl, encodedBody } = context.params!;

  const url = decodeBase64(encodedUrl as string);
  const body = encodedBody ? decodeBase64(encodedBody as string) : null;

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
};

export default RequestPage;
