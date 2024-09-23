import React from "react";
import { render, screen } from "@testing-library/react";
import SendRequestButton from "../../../components/common/SendRequestButton/SendRequestButton";

describe("SendRequestButton Component", () => {
  it("should render the button", () => {
    render(<SendRequestButton />);
    const buttonElement = screen.getByRole("button", { name: /send request/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it("should have the correct text content", () => {
    render(<SendRequestButton />);
    const buttonElement = screen.getByRole("button", { name: /send request/i });
    expect(buttonElement).toHaveTextContent("Send Request");
  });

  it("should apply the correct class", () => {
    render(<SendRequestButton />);
    const buttonElement = screen.getByRole("button", { name: /send request/i });
    expect(buttonElement).toHaveClass("sendRequestButton");
  });
});
