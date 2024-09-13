import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import useRequestHeaders from "../../hooks/useRequestHeaders";

const HookWrapper = () => {
  const { headers, addHeader, removeHeader } = useRequestHeaders();

  return (
    <div>
      {headers.map((header, index) => (
        <div key={index} data-testid={`header-${index}`}>
          {header.key}: {header.value}
        </div>
      ))}
      <button
        data-testid="add-header"
        onClick={() => addHeader("Content-Type", "application/json")}
      >
        Add Header
      </button>
      <button data-testid="remove-header" onClick={() => removeHeader(0)}>
        Remove Header
      </button>
    </div>
  );
};

describe("useRequestHeaders Hook", () => {
  it("should initialize with an empty headers array", () => {
    render(<HookWrapper />);

    expect(screen.queryByTestId("header-0")).toBeNull();
  });

  it("should add a header correctly", () => {
    render(<HookWrapper />);

    fireEvent.click(screen.getByTestId("add-header"));

    expect(screen.getByTestId("header-0").textContent).toBe(
      "Content-Type: application/json",
    );
  });

  it("should remove a header by index", () => {
    render(<HookWrapper />);

    fireEvent.click(screen.getByTestId("add-header"));

    expect(screen.getByTestId("header-0").textContent).toBe(
      "Content-Type: application/json",
    );

    fireEvent.click(screen.getByTestId("remove-header"));

    expect(screen.queryByTestId("header-0")).toBeNull();
  });
});
