import { useState, useEffect } from "react";
import RequestBlock from "./RequestBlock";
import ResponseSection from "../common/ResponseSection/ResponseSection";
import DocsBlock from "./DocsBlock";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import getGraphql from "../../api/getGraphql";
import { getGraphqlDocs } from "../../api/getGraphqlDocs";
import { Header } from "../common/HeadersEditor/HeadersEditor";
import { Variable } from "../common/VariablesEditor/VariablesEditor";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import styles from "./GraphiQLClient.module.css";

export type FormData = {
  url: string;
  sdl: string;
  query: string;
  variables: Variable[];
  headers: Header[];
};

const GraphiQLClient: React.FC = () => {
  const [status, setStatus] = useState<number | null>(null);
  const [response, setResponse] = useState("");
  const [docs, setDocs] = useState("");
  const [urlError, setUrlError] = useState("");
  const [queryError, setQueryError] = useState("");

  const methods = useForm<FormData>();
  const { handleSubmit } = methods;

  const { saveToStorage } = useLocalStorage();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    data.url ? setUrlError("") : setUrlError("Please enter url");
    data.query ? setQueryError("") : setQueryError("Please enter query");

    if (data.url && data.query) {
      try {
        new URL(data.url);
        saveToStorage(data);
        getGraphql(data).then((res) => {
          if (res.status) setStatus(res.status);
          if (res.response) setResponse(res.response);
        });
        getGraphqlDocs(data.sdl).then((res) => {
          if (res) setDocs(res);
        });
      } catch {
        setUrlError("Invalid URL");
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form className={styles.graphql} onSubmit={handleSubmit(onSubmit)}>
        <RequestBlock urlError={urlError} queryError={queryError} />
        <ResponseSection statusCode={status} responseBody={response} />
        <DocsBlock docs={docs} />
      </form>
    </FormProvider>
  );
};

export default GraphiQLClient;
