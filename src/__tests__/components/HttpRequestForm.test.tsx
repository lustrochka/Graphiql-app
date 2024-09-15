import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HttpRequestForm from "../../components/RestClient/HttpRequestForm";
import useHttpRequestState from "../../hooks/useHttpRequestState";
import useHttpRequestValidation from "../../hooks/useHttpRequestValidation";
import useHttpRequest from "../../hooks/useHttpRequest";
import useRequestHistory from "../../hooks/useRequestHistory";

jest.mock("../../hooks/useHttpRequestState");
jest.mock("../../hooks/useHttpRequestValidation");
jest.mock("../../hooks/useHttpRequest");
jest.mock("../../hooks/useRequestHistory");

describe("HttpRequestForm", () => {
  const mockSetMethod = jest.fn();
  const mockSetUrl = jest.fn();
  const mockSetHeaders = jest.fn();
  const mockSetBody = jest.fn();
  const mockSetVariables = jest.fn();
  const mockSendRequest = jest.fn();
  const mockSaveRequestToHistory = jest.fn();

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

    useHttpRequestValidation.mockReturnValue([]);
    useHttpRequest.mockReturnValue({
      statusCode: 200,
      responseBody: "{}",
      sendRequest: mockSendRequest,
      clearResponse: jest.fn(),
    });

    useRequestHistory.mockReturnValue({
      saveRequestToHistory: mockSaveRequestToHistory,
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

  it("should display validation errors if present", () => {
    useHttpRequestValidation.mockReturnValue([
      { field: "url", message: "Invalid URL" },
    ]);

    render(
      <HttpRequestForm
        initialMethod="GET"
        initialUrl="https://example.com"
        initialBody=""
        initialHeaders={[{ key: "Authorization", value: "Bearer token" }]}
      />,
    );

    fireEvent.submit(screen.getByTestId("http-request-form"));

    expect(screen.getByText("Field url: Invalid URL")).toBeInTheDocument();
    expect(mockSendRequest).not.toHaveBeenCalled();
  });

  it("should render BodyEditor if method supports body", () => {
    useHttpRequestState.mockReturnValue({
      method: "POST",
      setMethod: mockSetMethod,
      url: "https://example.com",
      setUrl: mockSetUrl,
      headers: [{ key: "Authorization", value: "Bearer token" }],
      setHeaders: mockSetHeaders,
      variables: [],
      setVariables: mockSetVariables,
      body: "",
      setBody: mockSetBody,
      isMethodWithBody: true,
      handleUserInteraction: jest.fn(),
      updateBrowserUrl: jest.fn(),
    });

    render(
      <HttpRequestForm
        initialMethod="POST"
        initialUrl="https://example.com"
        initialBody=""
        initialHeaders={[{ key: "Authorization", value: "Bearer token" }]}
      />,
    );

    expect(
      screen.getByPlaceholderText("Enter request body (JSON or plain text)"),
    ).toBeInTheDocument();
  });

  it("should call sendRequest and saveRequestToHistory on form submit", async () => {
    render(
      <HttpRequestForm
        initialMethod="GET"
        initialUrl="https://example.com"
        initialBody=""
        initialHeaders={[{ key: "Authorization", value: "Bearer token" }]}
      />,
    );

    fireEvent.submit(screen.getByTestId("http-request-form"));

    await waitFor(() => {
      expect(mockSendRequest).toHaveBeenCalled();
      expect(mockSaveRequestToHistory).toHaveBeenCalled();
    });
  });
});
