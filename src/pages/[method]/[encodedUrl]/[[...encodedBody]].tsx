import { GetServerSideProps } from "next";
import { useEffect } from "react";
import RestClientUI from "../../../components/RestClient/HttpRequestForm";
import { decodeBase64 } from "../../../utils/decodeBase64";
import { toast } from "react-toastify";
import withPrivateRoute from "../../../hoc/withPrivateRoute";

interface RequestPageProps {
  method: string;
  url: string;
  body: string | null;
  headers: Record<string, string>;
  error?: string;
}

const RequestPage: React.FC<RequestPageProps> = ({
  method,
  url,
  body,
  headers,
  error,
}) => {
  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`, {
        toastId: "unique-error-toast",
      });
    }
  }, [error]);

  return (
    <RestClientUI
      initialMethod={method}
      initialUrl={url}
      initialBody={body}
      initialHeaders={Object.entries(headers).map(([key, value], index) => ({
        key,
        value,
      }))}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {

    const { method, encodedUrl, encodedBody } = context.params!;
    const url = decodeBase64(encodedUrl as string);
    const body = encodedBody
      ? decodeBase64((encodedBody as string[]).join("/"))
      : null;

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
    return {
      props: {
        method: "GET",
        url: "",
        body: null,
        headers: {},
        error: error.message || "Unknown error occurred",
      },
    };
  }
};

const WrappedRequestPage = withPrivateRoute(RequestPage);

export default WrappedRequestPage;
