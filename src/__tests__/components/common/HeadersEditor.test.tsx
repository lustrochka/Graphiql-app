import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import HeadersEditor, {
  Header,
} from "../../../components/common/HeadersEditor/HeadersEditor";

describe("HeadersEditor", () => {
  const mockSetHeaders = jest.fn();
  const initialHeaders: Header[] = [
    { key: "Content-Type", value: "application/json" },
  ];

  beforeEach(() => {
    mockSetHeaders.mockClear();
  });

  it("should render initial headers", () => {
    render(
      <HeadersEditor headers={initialHeaders} setHeaders={mockSetHeaders} />,
    );

    expect(screen.getByDisplayValue("Content-Type")).toBeInTheDocument();
    expect(screen.getByDisplayValue("application/json")).toBeInTheDocument();
  });

  it("should call setHeaders when a new header is added", () => {
    render(
      <HeadersEditor headers={initialHeaders} setHeaders={mockSetHeaders} />,
    );

    fireEvent.click(screen.getByText("Add Header"));

    expect(mockSetHeaders).toHaveBeenCalledWith([
      ...initialHeaders,
      { key: "", value: "" },
    ]);
  });

  it("should update header when input is changed", () => {
    render(
      <HeadersEditor headers={initialHeaders} setHeaders={mockSetHeaders} />,
    );

    const keyInput = screen.getByDisplayValue("Content-Type");

    fireEvent.change(keyInput, { target: { value: "Authorization" } });

    expect(mockSetHeaders).toHaveBeenCalledWith([
      { key: "Authorization", value: "application/json" },
    ]);
  });

  it("should call setHeaders when a header is removed", () => {
    render(
      <HeadersEditor headers={initialHeaders} setHeaders={mockSetHeaders} />,
    );

    fireEvent.click(screen.getByText("✖"));

    expect(mockSetHeaders).toHaveBeenCalledWith([]);
  });
});
