import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import UrlInput from "../../../components/common/UrlInput/UrlInput";

describe("UrlInput Component", () => {
  const mockSetUrl = jest.fn();

  it("should render the input field", () => {
    render(<UrlInput url="" setUrl={mockSetUrl} />);

    const inputElement = screen.getByPlaceholderText("Enter API Endpoint");
    expect(inputElement).toBeInTheDocument();
  });

  it("should display the correct placeholder", () => {
    render(<UrlInput url="" setUrl={mockSetUrl} />);

    const inputElement = screen.getByPlaceholderText("Enter API Endpoint");
    expect(inputElement).toHaveAttribute("placeholder", "Enter API Endpoint");
  });

  it("should call setUrl on input change", () => {
    render(<UrlInput url="" setUrl={mockSetUrl} />);

    const inputElement = screen.getByPlaceholderText("Enter API Endpoint");
    fireEvent.change(inputElement, {
      target: { value: "https://api.example.com" },
    });

    expect(mockSetUrl).toHaveBeenCalledWith("https://api.example.com");
  });

  it("should apply active class on focus", () => {
    render(<UrlInput url="" setUrl={mockSetUrl} />);

    const inputElement = screen.getByPlaceholderText("Enter API Endpoint");
    fireEvent.focus(inputElement);

    expect(inputElement).toHaveClass("active");
  });

  it("should remove active class on blur", () => {
    render(<UrlInput url="" setUrl={mockSetUrl} />);

    const inputElement = screen.getByPlaceholderText("Enter API Endpoint");
    fireEvent.focus(inputElement);
    fireEvent.blur(inputElement);

    expect(inputElement).not.toHaveClass("active");
  });
});
