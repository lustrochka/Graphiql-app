import { render, screen } from "@testing-library/react";
import WelcomePage from "../../pages/index";
import { auth } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

jest.mock("../../lib/firebase", () => ({
  auth: jest.fn(),
  db: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  onAuthStateChanged: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
}));

jest.mock("next/link", () => {
  const MockedLink = ({ children }) => <div>{children}</div>;
  MockedLink.displayName = "MockedLink";
  return MockedLink;
});

jest.mock("../../components/Info/Info", () => {
  const MockedInfo = () => <div>Mocked Info Component</div>;
  MockedInfo.displayName = "MockedInfo";
  return MockedInfo;
});

describe("WelcomePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render 'Welcome!' when no user is authenticated", () => {
    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback(null);
      return () => {};
    });

    render(<WelcomePage />);

    expect(screen.getByText("Welcome!")).toBeInTheDocument();
    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
    expect(screen.getByText("Mocked Info Component")).toBeInTheDocument();
  });

  it("should render 'Welcome Back!' when user is authenticated", async () => {
    const mockUser = { uid: "123", email: "test@test.com" };

    onAuthStateChanged.mockImplementation((auth, callback) => {
      callback(mockUser);
      return () => {};
    });

    getDoc.mockResolvedValue({
      exists: () => true,
      data: () => ({ email: "test@test.com" }),
    });

    render(<WelcomePage />);

    expect(screen.getByText("Welcome Back!")).toBeInTheDocument();
    expect(screen.getByText("Mocked Info Component")).toBeInTheDocument();
    expect(screen.getByText("REST Client")).toBeInTheDocument();
    expect(screen.getByText("GraphiQL Client")).toBeInTheDocument();
    expect(screen.getByText("History")).toBeInTheDocument();
  });
});
