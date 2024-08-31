import RestClient from "../components/RestClient/RestClient";
import withPrivateRoute from "../hoc/withPrivateRoute";

const RestClientPage: React.FC = () => {
  return (
    <main>
      <RestClient />
    </main>
  );
};

RestClientPage.displayName = "RestClientPage";

const WrappedRestClientPage = withPrivateRoute(RestClientPage);

export default WrappedRestClientPage;
