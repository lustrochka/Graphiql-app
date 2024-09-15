import {
  isValidUrl,
  validateHeaders,
  createRequestOptions,
  handleResponse,
} from "../../utils/httpRequestUtils";
import { Header } from "../../components/common/HeadersEditor/HeadersEditor";

describe("isValidUrl", () => {
  it("should return true for valid http and https URLs", () => {
    expect(isValidUrl("http://example.com")).toBe(true);
    expect(isValidUrl("https://example.com")).toBe(true);
  });

  it("should return false for invalid URLs", () => {
    expect(isValidUrl("ftp://example.com")).toBe(false);
    expect(isValidUrl("invalid-url")).toBe(false);
  });
});

describe("validateHeaders", () => {
  it("should return true for valid headers", () => {
    const headers: Header[] = [
      { key: "Authorization", value: "Bearer token" },
      { key: "Content-Type", value: "application/json" },
    ];
    expect(validateHeaders(headers)).toBe(true);
  });

  it("should return false for headers with empty or invalid keys", () => {
    const invalidHeaders: Header[] = [
      { key: "", value: "Bearer token" },
      { key: "Invalid Key", value: "application/json" }, // содержит пробел
    ];
    expect(validateHeaders(invalidHeaders)).toBe(false);
  });
});

describe("createRequestOptions", () => {
  it("should create options with method and headers", () => {
    const headers: Header[] = [{ key: "Authorization", value: "Bearer token" }];
    const options = createRequestOptions("POST", headers, "test body");

    expect(options.method).toBe("POST");
    expect(options.headers).toEqual({ Authorization: "Bearer token" });
    expect(options.body).toBe("test body");
  });

  it("should not include body for GET and HEAD requests", () => {
    const headers: Header[] = [{ key: "Authorization", value: "Bearer token" }];
    const getRequestOptions = createRequestOptions("GET", headers, "test body");
    const headRequestOptions = createRequestOptions(
      "HEAD",
      headers,
      "test body",
    );

    expect(getRequestOptions.body).toBeUndefined();
    expect(headRequestOptions.body).toBeUndefined();
  });
});

describe("handleResponse", () => {
  it("should parse and format JSON response", async () => {
    const mockResponse = {
      text: jest.fn().mockResolvedValue('{"key": "value"}'),
    } as unknown as Response;

    const result = await handleResponse(mockResponse);
    expect(result).toBe('{\n  "key": "value"\n}');
  });

  it("should return plain text if response is not valid JSON", async () => {
    const mockResponse = {
      text: jest.fn().mockResolvedValue("plain text response"),
    } as unknown as Response;

    const result = await handleResponse(mockResponse);
    expect(result).toBe("plain text response");
  });
});
