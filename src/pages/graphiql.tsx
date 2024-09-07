import GraphQLClient from "../components/GraphiQLClient/GraphiQLClient";
import withPrivateRoute from "../hoc/withPrivateRoute";

const GraphiQLPage: React.FC = () => {
  return (
    <main>
      <h1>GraphiQL</h1>
      <GraphQLClient></GraphQLClient>
    </main>
  );
};

GraphiQLPage.displayName = "GraphiQLPage";

const WrappedGraphiQLPage = withPrivateRoute(GraphiQLPage);

export default WrappedGraphiQLPage;
