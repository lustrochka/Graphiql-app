import GraphQLClient from "../components/GraphiQLClient/GraphiQLClient";

const GraphiQLPage: React.FC = () => {
  return (
    <main>
      <h1>GraphiQL</h1>
      <GraphQLClient></GraphQLClient>
    </main>
  );
};

export default GraphiQLPage;
