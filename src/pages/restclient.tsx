import React from "react";
import RestClientUI from "../components/RestClient/HttpRequestForm";

const RestClientPage: React.FC = () => {
  return (
    <main>
      <h1>REST Client</h1>
      <RestClientUI
        initialMethod="GET"
        initialUrl=""
        initialBody=""
        initialHeaders={[]}
      />
    </main>
  );
};

export default RestClientPage;
