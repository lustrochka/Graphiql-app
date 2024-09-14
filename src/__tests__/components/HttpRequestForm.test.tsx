import React from "react";
import { render, screen } from "@testing-library/react";
import HttpRequestForm from "../../components/RestClient/HttpRequestForm";
import useHttpRequestState from "../../hooks/useHttpRequestState";

jest.mock("../../hooks/useHttpRequestState");

describe("HttpRequestForm", () => {
  const mockSetMethod = jest.fn();
  const mockSetUrl = jest.fn();
  const mockSetHeaders = jest.fn();
  const mockSetBody = jest.fn();
  const mockSetVariables = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    useHttpRequestState.mockReturnValue({
      method: "GET",
      setMethod: mockSetMethod,
      url: "https://example.com",
      setUrl: mockSetUrl,
      headers: [{ key: "Authorization", value: "Bearer token" }],
      setHeaders: mockSetHeaders,
      variables: [],
      setVariables: mockSetVariables,
      body: "",
      setBody: mockSetBody,
      isMethodWithBody: false,
      handleUserInteraction: jest.fn(),
      updateBrowserUrl: jest.fn(),
    });
  });

  it("should render with initial data", () => {
    render(
      <HttpRequestForm
        initialMethod="GET"
        initialUrl="https://example.com"
        initialBody=""
        initialHeaders={[{ key: "Authorization", value: "Bearer token" }]}
      />,
    );

    expect(screen.getByDisplayValue("GET")).toBeInTheDocument();
    expect(screen.getByDisplayValue("https://example.com")).toBeInTheDocument();
  });
});
