
import withPrivateRoute from "../hoc/withPrivateRoute";
import React from "react";
import RestClientUI from "../components/RestClient/RestClientUI";


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

RestClientPage.displayName = "RestClientPage";

const WrappedRestClientPage = withPrivateRoute(RestClientPage);

export default WrappedRestClientPage;
