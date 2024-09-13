import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import useSendHttpRequest from "../../hooks/useSendHttpRequest";
import {
  createRequestOptions,
  handleResponse,
  isValidUrl,
  validateHeaders,
} from "../../utils/httpRequestUtils";

jest.mock("../../utils/httpRequestUtils", () => ({
  createRequestOptions: jest.fn(() => ({})),
  handleResponse: jest.fn(async () => "Mocked response"),
  isValidUrl: jest.fn(() => true),
  validateHeaders: jest.fn(() => true),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve("Mocked response"),
    text: () => Promise.resolve("Mocked response"),
  }),
) as jest.Mock;

interface Header {
  name: string;
  value: string;
}

interface HookWrapperProps {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  headers: Header[];
  body: string;
}

const HookWrapper: React.FC<HookWrapperProps> = ({
  method,
  url,
  headers,
  body,
}) => {
  const { statusCode, responseBody, sendRequest } = useSendHttpRequest(
    method,
    url,
    headers,
    body,
  );

  return (
    <div>
      <div data-testid="statusCode">{statusCode}</div>
      <div data-testid="responseBody">{responseBody}</div>
      <button onClick={sendRequest} data-testid="sendRequestButton">
        Send Request
      </button>
    </div>
  );
};

describe("useSendHttpRequest Hook", () => {
  afterEach(() => jest.clearAllMocks());

  const setupHookWrapper = (props: HookWrapperProps) =>
    render(<HookWrapper {...props} />);

  it("initializes with null statusCode and empty responseBody", () => {
    setupHookWrapper({
      method: "GET",
      url: "https://example.com",
      headers: [],
      body: "",
    });
    expect(screen.getByTestId("statusCode").textContent).toBe("");
    expect(screen.getByTestId("responseBody").textContent).toBe("");
  });

  it("sets statusCode and responseBody on successful request", async () => {
    setupHookWrapper({
      method: "GET",
      url: "https://example.com",
      headers: [],
      body: "",
    });
    fireEvent.click(screen.getByTestId("sendRequestButton"));
    await waitFor(() => {
      expect(screen.getByTestId("statusCode").textContent).toBe("200");
      expect(screen.getByTestId("responseBody").textContent).toBe(
        "Mocked response",
      );
    });
  });

  it("handles network error", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("Network error")));
    setupHookWrapper({
      method: "GET",
      url: "https://example.com",
      headers: [],
      body: "",
    });
    fireEvent.click(screen.getByTestId("sendRequestButton"));
    await waitFor(() => {
      expect(screen.getByTestId("statusCode").textContent).toBe("500");
      expect(screen.getByTestId("responseBody").textContent).toBe(
        "Network error",
      );
    });
  });

  it("handles invalid URL", async () => {
    jest.mocked(isValidUrl).mockReturnValue(false);
    setupHookWrapper({
      method: "GET",
      url: "invalid-url",
      headers: [],
      body: "",
    });
    fireEvent.click(screen.getByTestId("sendRequestButton"));
    await waitFor(() => {
      expect(screen.getByTestId("statusCode").textContent).toBe("400");
      expect(screen.getByTestId("responseBody").textContent).toBe(
        "Invalid URL. Please enter a valid HTTP or HTTPS URL.",
      );
    });
  });

  it("handles invalid headers", async () => {
    jest.mocked(isValidUrl).mockReturnValue(true);
    jest.mocked(validateHeaders).mockReturnValue(false);
    setupHookWrapper({
      method: "GET",
      url: "https://example.com",
      headers: [{ name: "", value: "" }],
      body: "",
    });
    fireEvent.click(screen.getByTestId("sendRequestButton"));
    await waitFor(() => {
      expect(screen.getByTestId("statusCode").textContent).toBe("400");
      expect(screen.getByTestId("responseBody").textContent).toBe(
        "Invalid headers.",
      );
    });
  });
});
