import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MethodSelector from "../../../components/common/MethodSelector/MethodSelector";

describe("MethodSelector", () => {
  const mockSetMethod = jest.fn();
  const mockUpdateBrowserUrl = jest.fn();

  it("should display the correct method initially", () => {
    render(
      <MethodSelector
        method="GET"
        setMethod={mockSetMethod}
        updateBrowserUrl={mockUpdateBrowserUrl}
      />,
    );

    const selectElement = screen.getByDisplayValue("GET");
    expect(selectElement).toBeInTheDocument();
  });

  it("should call setMethod when a new method is selected", () => {
    render(
      <MethodSelector
        method="GET"
        setMethod={mockSetMethod}
        updateBrowserUrl={mockUpdateBrowserUrl}
      />,
    );

    const selectElement = screen.getByDisplayValue("GET");
    fireEvent.change(selectElement, { target: { value: "POST" } });

    expect(mockSetMethod).toHaveBeenCalledWith("POST");
  });

  it("should call updateBrowserUrl when losing focus", () => {
    render(
      <MethodSelector
        method="GET"
        setMethod={mockSetMethod}
        updateBrowserUrl={mockUpdateBrowserUrl}
      />,
    );

    const selectElement = screen.getByDisplayValue("GET");
    fireEvent.focus(selectElement);
    fireEvent.blur(selectElement);

    // Проверяем, что updateBrowserUrl был вызван при потере фокуса
    expect(mockUpdateBrowserUrl).toHaveBeenCalled();
  });

  it("should apply active class when focused", () => {
    render(
      <MethodSelector
        method="GET"
        setMethod={mockSetMethod}
        updateBrowserUrl={mockUpdateBrowserUrl}
      />,
    );

    const selectElement = screen.getByDisplayValue("GET");
    fireEvent.focus(selectElement);

    expect(selectElement).toHaveClass("active");
  });
});
