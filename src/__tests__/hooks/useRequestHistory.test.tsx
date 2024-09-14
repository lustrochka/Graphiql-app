import { render, act } from "@testing-library/react";
import useRequestHistory from "../../hooks/useRequestHistory";

interface HookWrapperProps {
  method: string;
  url: string;
  headers: { key: string; value: string }[];
  variables: { key: string; value: string }[];
  body: string | null;
}

const HookWrapper: React.FC<HookWrapperProps> = ({
  method,
  url,
  headers,
  variables,
  body,
}) => {
  const { saveRequestToHistory } = useRequestHistory(
    method,
    url,
    headers,
    variables,
    body,
  );

  return <button onClick={saveRequestToHistory}>Save Request</button>;
};

describe("useRequestHistory Hook", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should save request to localStorage", () => {
    const { getByText } = render(
      <HookWrapper
        method="POST"
        url="https://example.com"
        headers={[{ key: "Authorization", value: "Bearer token" }]}
        variables={[{ key: "id", value: "123" }]}
        body='{ "name": "John" }'
      />,
    );

    act(() => {
      getByText("Save Request").click();
    });

    const history = JSON.parse(localStorage.getItem("requestHistory") || "[]");
    expect(history.length).toBe(1);
    expect(history[0]).toMatchObject({
      method: "POST",
      url: "https://example.com",
      headers: [{ key: "Authorization", value: "Bearer token" }],
      variables: [{ key: "id", value: "123" }],
      body: '{ "name": "John" }',
    });
  });

  it("should append new requests to localStorage", () => {
    localStorage.setItem(
      "requestHistory",
      JSON.stringify([
        {
          method: "POST",
          url: "https://example.com",
          headers: [{ key: "Authorization", value: "Bearer token" }],
          variables: [{ key: "id", value: "123" }],
          body: '{ "name": "John" }',
          time: new Date().toISOString(),
        },
      ]),
    );

    const { getByText } = render(
      <HookWrapper
        method="GET"
        url="https://example.com/resource"
        headers={[{ key: "Authorization", value: "Bearer another-token" }]}
        variables={[]}
        body={null}
      />,
    );

    act(() => {
      getByText("Save Request").click();
    });

    const history = JSON.parse(localStorage.getItem("requestHistory") || "[]");
    expect(history.length).toBe(2);
    expect(history[1]).toMatchObject({
      method: "GET",
      url: "https://example.com/resource",
      headers: [{ key: "Authorization", value: "Bearer another-token" }],
      body: null,
    });
  });
});
