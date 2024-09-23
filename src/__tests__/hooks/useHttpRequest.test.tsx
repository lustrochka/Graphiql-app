import { renderHook, act } from "@testing-library/react";
import useHttpRequest from "../../hooks/useHttpRequest";
import {
  isValidUrl,
  validateHeaders,
  createRequestOptions,
  handleResponse,
} from "../../utils/httpRequestUtils";

jest.mock("../../utils/httpRequestUtils", () => ({
  isValidUrl: jest.fn(),
  validateHeaders: jest.fn(),
  createRequestOptions: jest.fn(),
  handleResponse: jest.fn(),
}));

global.fetch = jest.fn();

describe("useHttpRequest hook", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return initial state", () => {
    const { result } = renderHook(() => useHttpRequest());
    expect(result.current.statusCode).toBeNull();
    expect(result.current.responseBody).toBe("");
  });

  it("should handle invalid URL", async () => {
    (isValidUrl as jest.Mock).mockReturnValue(false);

    const { result } = renderHook(() => useHttpRequest());

    await act(async () => {
      await result.current.sendRequest("GET", "invalid-url", [], "");
    });

    expect(result.current.statusCode).toBe(400);
    expect(result.current.responseBody).toBe(
      "Invalid URL. Please enter a valid HTTP or HTTPS URL.",
    );
  });

  it("should handle invalid headers", async () => {
    (isValidUrl as jest.Mock).mockReturnValue(true);
    (validateHeaders as jest.Mock).mockReturnValue(false);

    const { result } = renderHook(() => useHttpRequest());

    await act(async () => {
      await result.current.sendRequest("GET", "https://valid-url.com", [], "");
    });

    expect(result.current.statusCode).toBe(400);
    expect(result.current.responseBody).toBe("Invalid headers.");
  });

  it("should handle successful request", async () => {
    (isValidUrl as jest.Mock).mockReturnValue(true);
    (validateHeaders as jest.Mock).mockReturnValue(true);
    (createRequestOptions as jest.Mock).mockReturnValue({});
    (handleResponse as jest.Mock).mockResolvedValue("Response body");

    (global.fetch as jest.Mock).mockResolvedValue({
      status: 200,
    });

    const { result } = renderHook(() => useHttpRequest());

    await act(async () => {
      await result.current.sendRequest("GET", "https://valid-url.com", [], "");
    });

    expect(result.current.statusCode).toBe(200);
    expect(result.current.responseBody).toBe("Response body");
  });

  it("should handle network error", async () => {
    (isValidUrl as jest.Mock).mockReturnValue(true);
    (validateHeaders as jest.Mock).mockReturnValue(true);
    (createRequestOptions as jest.Mock).mockReturnValue({});

    (global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useHttpRequest());

    await act(async () => {
      await result.current.sendRequest("GET", "https://valid-url.com", [], "");
    });

    expect(result.current.statusCode).toBe(500);
    expect(result.current.responseBody).toBe("Network error");
  });

  it("should clear the response", () => {
    const { result } = renderHook(() => useHttpRequest());

    act(() => {
      result.current.clearResponse();
    });

    expect(result.current.statusCode).toBeNull();
    expect(result.current.responseBody).toBe("");
  });
});
