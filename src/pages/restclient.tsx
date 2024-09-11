import React from "react";
import HttpRequestForm from "../components/RestClient/HttpRequestForm";

const RestClientPage: React.FC = () => {
  return (
    <main>
      <h1>REST Client</h1>
      <HttpRequestForm
        initialMethod="GET"
        initialUrl=""
        initialBody=""
        initialHeaders={[]}
      />
    </main>
  );
};

export default RestClientPage;
