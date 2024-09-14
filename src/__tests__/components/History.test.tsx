import { render, screen, fireEvent } from "@testing-library/react";
import History from "../../components/History/History";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("History Component", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    localStorage.clear();
  });

  it("renders empty history message when there are no requests", () => {
    render(<History />);

    expect(screen.getByText("No requests in history.")).toBeInTheDocument();

    expect(
      screen.getByText(/It's empty here. Try those options:/i),
    ).toBeInTheDocument();

    expect(screen.getByText("REST Client")).toBeInTheDocument();
    expect(screen.getByText("GraphiQL Client")).toBeInTheDocument();
  });

  it("renders request history correctly when there are requests", () => {
    const mockHistory = [
      {
        method: "GET",
        url: "https://api.example.com/data",
        headers: [],
        variables: [],
        body: null,
        time: new Date().toISOString(),
      },
      {
        method: "POST",
        url: "https://api.example.com/data",
        headers: [],
        variables: [],
        body: '{"query":"{data}"}',
        time: new Date().toISOString(),
      },
    ];

    localStorage.setItem("requestHistory", JSON.stringify(mockHistory));

    render(<History />);

    expect(screen.getByText("REST Client Requests")).toBeInTheDocument();
    expect(screen.getByText("GET")).toBeInTheDocument();
    expect(screen.getByText("POST")).toBeInTheDocument();
  });

  it("navigates to correct route when clicking on a request", () => {
    const mockHistory = [
      {
        method: "GET",
        url: "https://api.example.com/data",
        headers: [],
        variables: [],
        body: null,
        time: new Date().toISOString(),
      },
    ];

    localStorage.setItem("requestHistory", JSON.stringify(mockHistory));

    render(<History />);

    const historyRow = screen.getByText("GET");
    fireEvent.click(historyRow);

    expect(mockRouter.push).toHaveBeenCalledWith(
      "/GET/aHR0cHM6Ly9hcGkuZXhhbXBsZS5jb20vZGF0YQ==",
    );
  });
});
