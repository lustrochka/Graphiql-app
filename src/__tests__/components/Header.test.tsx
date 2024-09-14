/* eslint-disable @next/next/no-img-element */

import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../../components/Header/Header";
import { getAuth, onAuthStateChanged } from "firebase/auth";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    signOut: jest.fn(),
  })),
  onAuthStateChanged: jest.fn((callback) => {
    callback({
      displayName: "Test User",
      email: "test@example.com",
    });
    return jest.fn();
  }),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

describe("Header Component", () => {
  beforeEach(() => {
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(null);
      return jest.fn();
    });
  });

  it("renders logo and language toggle button", () => {
    render(<Header />);
    expect(screen.getByAltText("rss-logo")).toBeInTheDocument();
    expect(screen.getByText("EN")).toBeInTheDocument();
  });

  it("toggles language between EN and RU", () => {
    render(<Header />);
    const langButton = screen.getByText("EN");
    fireEvent.click(langButton);
    expect(screen.getByText("RU")).toBeInTheDocument();
    fireEvent.click(screen.getByText("RU"));
    expect(screen.getByText("EN")).toBeInTheDocument();
  });

  it("renders sign in and sign up buttons if user is not authenticated", () => {
    render(<Header />);
    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  it("renders sign out button if user is authenticated", () => {
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback({ uid: "user123" });
      return jest.fn();
    });
    render(<Header />);
    expect(screen.getByText("Sign Out")).toBeInTheDocument();
    expect(screen.getByText("Main Page")).toBeInTheDocument();
  });

  it("adds sticky class to header on scroll", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header).not.toHaveClass("sticky");

    fireEvent.scroll(window, { target: { scrollY: 100 } });
    expect(header).toHaveClass("sticky");
  });
});
