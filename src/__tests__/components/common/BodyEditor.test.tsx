import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import BodyEditor from "../../../components/common/BodyEditor/BodyEditor";

describe("BodyEditor", () => {
  const mockSetBody = jest.fn();

  beforeEach(() => {
    mockSetBody.mockClear();
  });

  it("should render the body value in the textarea", () => {
    render(<BodyEditor body='{"name":"John"}' setBody={mockSetBody} />);

    expect(screen.getByDisplayValue('{"name":"John"}')).toBeInTheDocument();
  });

  it("should call setBody when the textarea value changes", () => {
    render(<BodyEditor body="" setBody={mockSetBody} />);

    fireEvent.change(
      screen.getByPlaceholderText("Enter request body (JSON or plain text)"),
      {
        target: { value: '{"name":"Doe"}' },
      },
    );

    expect(mockSetBody).toHaveBeenCalledWith('{"name":"Doe"}');
  });

  it("should prettify valid JSON when the Prettify JSON button is clicked", () => {
    const initialBody = '{"name":"John","age":30}';
    const prettyBody = `{
  "name": "John",
  "age": 30
}`;

    render(<BodyEditor body={initialBody} setBody={mockSetBody} />);

    fireEvent.click(screen.getByText("Prettify JSON"));

    expect(mockSetBody).toHaveBeenCalledWith(prettyBody);
  });

  it("should not change the body if the JSON is invalid when Prettify JSON is clicked", () => {
    const invalidJson = '{"name": "John", "age": 30';

    render(<BodyEditor body={invalidJson} setBody={mockSetBody} />);

    fireEvent.click(screen.getByText("Prettify JSON"));

    expect(mockSetBody).not.toHaveBeenCalled();
  });
});
