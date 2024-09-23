import { render, screen } from "@testing-library/react";
import RestClientPage from "../../pages/restclient";
import HttpRequestForm from "../../components/RestClient/HttpRequestForm";

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

jest.mock("../../components/RestClient/HttpRequestForm", () => {
  return jest.fn(() => <div>Mocked HttpRequestForm</div>);
});

describe("RestClientPage", () => {
  it("should render the REST Client page with HttpRequestForm", () => {
    render(<RestClientPage />);

    expect(screen.getByText("REST Client")).toBeInTheDocument();
    expect(screen.getByText("Mocked HttpRequestForm")).toBeInTheDocument();
  });
});
