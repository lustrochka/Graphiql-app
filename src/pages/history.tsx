import React from "react";
import History from "../components/History/History";
import withPrivateRoute from "../hoc/withPrivateRoute";

const HistoryPage: React.FC = () => {
  return (
    <main>
      <History />
    </main>
  );
};

HistoryPage.displayName = "HistoryPage";

const WrappedHistoryPage = withPrivateRoute(HistoryPage);

export default WrappedHistoryPage;
