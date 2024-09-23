import { renderHook } from "@testing-library/react";
import useRequestBodyBuilder from "../../hooks/useRequestBodyBuilder";
import { Variable } from "../../components/common/VariablesEditor/VariablesEditor";

describe("useRequestBodyBuilder Hook", () => {
  it("should return an empty object when no variables are provided", () => {
    const variables: Variable[] = [];
    const { result } = renderHook(() => useRequestBodyBuilder(variables));

    const body = result.current.buildRequestBody();
    expect(body).toBe("{}");
  });

  it("should correctly build the request body from variables", () => {
    const variables: Variable[] = [
      { key: "name", value: "John" },
      { key: "age", value: "30" },
    ];
    const { result } = renderHook(() => useRequestBodyBuilder(variables));

    const body = result.current.buildRequestBody();
    expect(body).toBe(JSON.stringify({ name: "John", age: "30" }));
  });
});
