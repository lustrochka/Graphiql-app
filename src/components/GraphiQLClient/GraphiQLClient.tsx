import { useState, useEffect } from "react";
import RequestBlock from "./RequestBlock";
import ResponseBlock from "./ResponseBlock";
import DocsBlock from "./DocsBlock";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import getGraphql from "../../api/getGraphql";
import { getGraphqlDocs } from "../../api/getGraphqlDocs";
import styles from "./GraphiQLClient.module.css";

type FormData = {
  url: string;
  sdl: string;
  query: string;
  variables: string;
  headers: string;
};

const GraphQLClient: React.FC = () => {
  const [jsonError, setJsonError] = useState("");
  const [status, setStatus] = useState("");
  const [response, setResponse] = useState("");
  const [docs, setDocs] = useState("");

  const methods = useForm<FormData>();
  const { watch, setValue, handleSubmit } = methods;

  const url = watch("url");

  useEffect(() => {
    if (url) {
      setValue("sdl", `${url}?sdl`);
    }
  }, [url, setValue]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    getGraphql(data).then((res) => {
      if (res.jsonError) setJsonError(res.jsonError);
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
        <ResponseBlock {...{ response, status, docs }} />
        <DocsBlock docs={docs} />
      </form>
    </FormProvider>
  );
};

export default GraphQLClient;
