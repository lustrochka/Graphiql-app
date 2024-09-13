import { renderHook } from "@testing-library/react";
import { useRouter } from "next/router";
import useRequestUrlUpdater from "../../hooks/useRequestUrlUpdater";
import { encodeBase64 } from "../../utils/encodeBase64";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../utils/encodeBase64", () => ({
  encodeBase64: jest.fn(),
}));

describe("useRequestUrlUpdater Hook", () => {
  const mockReplaceState = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ replace: jest.fn() });
    global.window.history.replaceState = mockReplaceState;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should not update the browser URL if user did not interact", () => {
    const { result } = renderHook(() =>
      useRequestUrlUpdater("GET", "https://example.com", [], "{}", false),
    );

    result.current.updateBrowserUrl();

    expect(mockReplaceState).not.toHaveBeenCalled();
  });

  it("should update the browser URL with encoded URL and body", () => {
    (encodeBase64 as jest.Mock)
      .mockReturnValueOnce("encodedUrl")
      .mockReturnValueOnce("encodedBody");

    const { result } = renderHook(() =>
      useRequestUrlUpdater(
        "POST",
        "https://example.com",
        [],
        "{key: value}",
        true,
      ),
    );

    result.current.updateBrowserUrl();

    expect(mockReplaceState).toHaveBeenCalledWith(
      null,
      "",
      "/POST/encodedUrl/encodedBody",
    );
  });

  it("should update the browser URL with headers in query params", () => {
    const headers = [{ key: "Authorization", value: "Bearer token" }];

    (encodeBase64 as jest.Mock).mockReturnValueOnce("encodedUrl");

    const { result } = renderHook(() =>
      useRequestUrlUpdater("POST", "https://example.com", headers, "{}", true),
    );

    result.current.updateBrowserUrl();

    expect(mockReplaceState).toHaveBeenCalledWith(
      null,
      "",
      "/POST/encodedUrl?Authorization=Bearer%20token",
    );
  });
});
