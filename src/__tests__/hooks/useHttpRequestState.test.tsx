import { renderHook, act } from "@testing-library/react";
import useHttpRequestState from "../../hooks/useHttpRequestState";
import useRequestHeaders from "../../hooks/useRequestHeaders";
import useRequestVariables from "../../hooks/useRequestVariables";
import useRequestBodyBuilder from "../../hooks/useRequestBodyBuilder";
import useRequestUrlUpdater from "../../hooks/useRequestUrlUpdater";

jest.mock("../../hooks/useRequestHeaders");
jest.mock("../../hooks/useRequestVariables");
jest.mock("../../hooks/useRequestBodyBuilder");
jest.mock("../../hooks/useRequestUrlUpdater");

describe("useHttpRequestState Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useRequestHeaders as jest.Mock).mockReturnValue({
      headers: [],
      setHeaders: jest.fn(),
      addHeader: jest.fn(),
      removeHeader: jest.fn(),
    });

    (useRequestVariables as jest.Mock).mockReturnValue({
      variables: [],
      setVariables: jest.fn(),
      addVariable: jest.fn(),
      removeVariable: jest.fn(),
    });

    (useRequestBodyBuilder as jest.Mock).mockReturnValue({
      buildRequestBody: jest.fn().mockReturnValue("{}"),
    });

    (useRequestUrlUpdater as jest.Mock).mockReturnValue({
      updateBrowserUrl: jest.fn(),
    });
  });

  it("should initialize with correct default values", () => {
    const { result } = renderHook(() => useHttpRequestState());

    expect(result.current.method).toBe("GET");
    expect(result.current.url).toBe("");
    expect(result.current.body).toBe("");
    expect(result.current.headers).toEqual([]);
    expect(result.current.variables).toEqual([]);
    expect(result.current.isMethodWithBody).toBe(false);
  });

  it("should update method and check isMethodWithBody correctly", () => {
    const { result } = renderHook(() => useHttpRequestState());

    act(() => {
      result.current.setMethod("POST");
    });

    expect(result.current.method).toBe("POST");
    expect(result.current.isMethodWithBody).toBe(true);
  });

  it("should update url and trigger user interaction", () => {
    const { result } = renderHook(() => useHttpRequestState());

    act(() => {
      result.current.setUrl("https://example.com");
      result.current.handleUserInteraction();
    });

    expect(result.current.url).toBe("https://example.com");
    expect(result.current.updateBrowserUrl).toHaveBeenCalled();
  });
});
