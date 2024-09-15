import { render, screen } from "@testing-library/react";
import HistoryPage from "../../pages/history";
import History from "../../components/History/History";

jest.mock("../../hoc/withPrivateRoute", () => {
  const mockWithPrivateRoute = (Component: React.FC) => {
    const WrappedComponent = (props: Record<string, unknown>) => (
      <Component {...props} />
    );
    WrappedComponent.displayName = "MockWithPrivateRoute";
    return WrappedComponent;
  };
  return {
    __esModule: true,
    default: mockWithPrivateRoute,
  };
});

jest.mock("../../components/History/History", () => {
  return jest.fn(() => <div>Mocked History</div>);
});

describe("HistoryPage", () => {
  it("should render the History page with History component", () => {
    render(<HistoryPage />);

    expect(screen.getByText("Mocked History")).toBeInTheDocument();
  });
});
