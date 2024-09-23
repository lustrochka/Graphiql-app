import React from "react";
import { render, screen } from "@testing-library/react";
import ResponseSection from "../../../components/common/ResponseSection/ResponseSection";

describe("ResponseSection Component", () => {
  const defaultProps = {
    statusCode: 200,
    responseBody: '{"message": "success"}',
    requestBody: '{"data": "test"}',
  };

  it("should render the status code", () => {
    render(<ResponseSection {...defaultProps} />);
    const statusElement = screen.getByText(/status: 200/i);
    expect(statusElement).toBeInTheDocument();
  });

  it("should render 'No status' when statusCode is null", () => {
    render(<ResponseSection {...defaultProps} statusCode={null} />);
    const statusElement = screen.getByText(/status: no status/i);
    expect(statusElement).toBeInTheDocument();
  });

  it("should combine and display request and response bodies as JSON", () => {
    render(<ResponseSection {...defaultProps} />);
    const responseElement = screen.getByText(
      (content) =>
        content.includes('"data": "test"') &&
        content.includes('"message": "success"'),
    );
    expect(responseElement).toBeInTheDocument();
  });

  it("should display 'No response body' when responseBody is empty", () => {
    render(
      <ResponseSection
        statusCode={200}
        responseBody=""
        requestBody='{"data": "test"}'
      />,
    );
    const noResponseBodyElement = screen.getByText(/no response body/i);
    expect(noResponseBodyElement).toBeInTheDocument();
  });

  it("should handle invalid JSON in responseBody gracefully", () => {
    render(
      <ResponseSection
        statusCode={200}
        responseBody="Invalid JSON"
        requestBody='{"data": "test"}'
      />,
    );
    const invalidJsonElement = screen.getByText("Invalid JSON");
    expect(invalidJsonElement).toBeInTheDocument();
  });

  it("should return the original string if JSON is invalid in formatJson", () => {
    const instance = render(
      <ResponseSection {...defaultProps} responseBody="Invalid JSON" />,
    ).container;
    const result = instance.querySelector("pre")?.textContent;

    expect(result).toBe("Invalid JSON");
  });

  it("should handle empty requestBody and responseBody", () => {
    render(<ResponseSection statusCode={200} responseBody="" requestBody="" />);
    const responseElement = screen.getByText(/no response body/i);
    expect(responseElement).toBeInTheDocument();
  });

  it("should display large JSON data correctly", () => {
    const largeRequestBody = JSON.stringify({ data: "x".repeat(1000) });
    const largeResponseBody = JSON.stringify({
      message: "success",
      detail: "y".repeat(1000),
    });

    render(
      <ResponseSection
        statusCode={200}
        responseBody={largeResponseBody}
        requestBody={largeRequestBody}
      />,
    );

    const responseElement = screen.getByText(/"data":/);
    expect(responseElement).toBeInTheDocument();
  });

  it("should correctly format valid JSON in formatJson", () => {
    const props = {
      statusCode: 200,
      responseBody: '{"key":"value"}',
      requestBody: "",
    };

    render(<ResponseSection {...props} />);

    const preElement = screen.getByText('{"key":"value"}');
    expect(preElement).toBeInTheDocument();
  });

  it("should return responseBody if parsing responseBody throws an error", () => {
    const props = {
      statusCode: 200,
      responseBody: "Invalid JSON",
      requestBody: '{"data": "test"}',
    };

    render(<ResponseSection {...props} />);
    const preElement = screen.getByText("Invalid JSON");
    expect(preElement).toBeInTheDocument();
  });

  it("should return the original string if formatJson catches an error", () => {
    const result = render(
      <ResponseSection
        statusCode={200}
        responseBody="Invalid JSON"
        requestBody=""
      />,
    ).container;

    const preElement = result.querySelector("pre");
    expect(preElement?.textContent).toBe("Invalid JSON");
  });

  it("should render 'No response body' when both requestBody and responseBody are empty", () => {
    render(<ResponseSection statusCode={200} responseBody="" requestBody="" />);
    const noResponseBodyElement = screen.getByText(/no response body/i);
    expect(noResponseBodyElement).toBeInTheDocument();
  });

  it("should handle null statusCode and empty requestBody and responseBody", () => {
    render(
      <ResponseSection statusCode={null} responseBody="" requestBody="" />,
    );
    const statusElement = screen.getByText(/status: no status/i);
    expect(statusElement).toBeInTheDocument();

    const noResponseBodyElement = screen.getByText(/no response body/i);
    expect(noResponseBodyElement).toBeInTheDocument();
  });
});
