import { useState, useEffect } from "react";
import RequestBlock from "./RequestBlock";
import ResponseSection from "../common/ResponseSection/ResponseSection";
import DocsBlock from "./DocsBlock";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import getGraphql from "../../api/getGraphql";
import { getGraphqlDocs } from "../../api/getGraphqlDocs";
import { Header } from "../common/HeadersEditor/HeadersEditor";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import styles from "./GraphiQLClient.module.css";

export type FormData = {
  url: string;
  sdl: string;
  query: string;
  variables: string;
  headers: Header[];
};

const GraphiQLClient: React.FC = () => {
  const [jsonError, setJsonError] = useState("");
  const [status, setStatus] = useState(null);
  const [response, setResponse] = useState("");
  const [docs, setDocs] = useState("");

  const methods = useForm<FormData>();
  const { handleSubmit } = methods;

  const { saveToStorage } = useLocalStorage();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    saveToStorage(data);
    getGraphql(data).then((res) => {
      if (res.status) setStatus(res.status);
      if (res.response) setResponse(res.response);
    });
    getGraphqlDocs(data.sdl).then((res) => {
      if (res) setDocs(res);
    });
  };

  return (
    <FormProvider {...methods}>
      <form className={styles.graphql} onSubmit={handleSubmit(onSubmit)}>
        <RequestBlock />
        <p>{jsonError}</p>
        <ResponseSection statusCode={status} responseBody={response} />
        <DocsBlock docs={docs} />
      </form>
    </FormProvider>
  );
};

export default GraphiQLClient;
