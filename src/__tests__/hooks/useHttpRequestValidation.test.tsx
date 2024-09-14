import { renderHook } from "@testing-library/react";
import useHttpRequestValidation from "../../hooks/useHttpRequestValidation";

describe("useHttpRequestValidation", () => {
  it("should return an error for an invalid URL", () => {
    const { result } = renderHook(() =>
      useHttpRequestValidation("invalid-url", [], [], "", false),
    );

    expect(result.current).toEqual([
      { field: "url", message: "Invalid URL. Please enter a valid URL." },
    ]);
  });

  it("should return an error for empty header keys", () => {
    const headers = [{ key: "", value: "value" }];
    const { result } = renderHook(() =>
      useHttpRequestValidation("https://valid-url.com", headers, [], "", false),
    );

    expect(result.current).toEqual([
      {
        field: "headers[0]",
        message: "Header at position 1 has an empty key.",
      },
    ]);
  });

  it("should return an error for missing required headers", () => {
    const headers = [{ key: "Content-Type", value: "application/json" }];
    const requiredHeaders = ["Authorization"];
    const { result } = renderHook(() =>
      useHttpRequestValidation(
        "https://valid-url.com",
        headers,
        [],
        "",
        false,
        requiredHeaders,
      ),
    );

    expect(result.current).toEqual([
      {
        field: "headers.Authorization",
        message: "Missing required header: Authorization.",
      },
    ]);
  });

  it("should return an error for an invalid JSON body", () => {
    const { result } = renderHook(() =>
      useHttpRequestValidation(
        "https://valid-url.com",
        [],
        [],
        "{ invalid JSON }",
        true,
      ),
    );

    expect(result.current).toEqual([
      { field: "body", message: "Invalid JSON in the request body." },
    ]);
  });

  it("should return no errors for valid input", () => {
    const headers = [{ key: "Content-Type", value: "application/json" }];
    const variables = [{ key: "id", value: "123" }];
    const body = JSON.stringify({ name: "John Doe" });

    const { result } = renderHook(() =>
      useHttpRequestValidation(
        "https://valid-url.com",
        headers,
        variables,
        body,
        true,
      ),
    );

    expect(result.current).toEqual([]);
  });
});
