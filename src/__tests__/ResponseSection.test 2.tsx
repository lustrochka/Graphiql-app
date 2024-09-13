import React from "react";
import { render, screen } from "@testing-library/react";
import ResponseSection from "../components/common/ResponseSection/ResponseSection";

global.console = {
  ...global.console,
  log: jest.fn(),
};

describe("ResponseSection Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with initial props", () => {
    render(
      <ResponseSection
        statusCode={200}
        responseBody='{"message": "Success"}'
        requestBody='{"request": "Test"}'
      />,
    );

    expect(screen.getByText("Status: 200")).toBeInTheDocument();
    expect(screen.getByText(/"message": "Success"/)).toBeInTheDocument();
  });

  it("renders 'No status' when statusCode is null", () => {
    render(
      <ResponseSection
        statusCode={null}
        responseBody='{"message": "Success"}'
        requestBody='{"request": "Test"}'
      />,
    );

    expect(screen.getByText("Status: No status")).toBeInTheDocument();
  });

  it("renders 'No response body' when responseBody is empty", () => {
    render(
      <ResponseSection
        statusCode={200}
        responseBody=""
        requestBody='{"request": "Test"}'
      />,
    );

    expect(screen.getByText("No response body")).toBeInTheDocument();
  });

  it("correctly combines request and response body", () => {
    render(
      <ResponseSection
        statusCode={200}
        responseBody='{"response": "Test response"}'
        requestBody='{"request": "Test request"}'
      />,
    );

    const combinedJson = screen.getByText(/"request": "Test request"/);
    expect(combinedJson).toBeInTheDocument();
    expect(screen.getByText(/"response": "Test response"/)).toBeInTheDocument();
  });

  it("logs the correct values on useEffect", () => {
    render(
      <ResponseSection
        statusCode={200}
        responseBody='{"message": "Success"}'
        requestBody='{"request": "Test"}'
      />,
    );

    expect(console.log).toHaveBeenCalledWith(
      "ResponseSection received statusCode:",
      200,
    );
    expect(console.log).toHaveBeenCalledWith(
      "ResponseSection received responseBody:",
      '{"message": "Success"}',
    );
    expect(console.log).toHaveBeenCalledWith(
      "ResponseSection received requestBody:",
      '{"request": "Test"}',
    );
  });

  it("renders non-JSON response body as is", () => {
    render(
      <ResponseSection
        statusCode={200}
        responseBody="This is a plain text response"
        requestBody="{}"
      />,
    );

    expect(
      screen.getByText("This is a plain text response"),
    ).toBeInTheDocument();
  });
});
