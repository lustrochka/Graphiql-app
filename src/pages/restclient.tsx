import withPrivateRoute from "../hoc/withPrivateRoute";
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

RestClientPage.displayName = "RestClientPage";

const WrappedRestClientPage = withPrivateRoute(RestClientPage);

export default WrappedRestClientPage;
