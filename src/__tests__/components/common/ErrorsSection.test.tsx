import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorsSection from "../../../components/common/ErrorsSection/ ErrorsSection";

describe("ErrorsSection", () => {
  it("should not render when there are no errors", () => {
    render(<ErrorsSection errors={[]} />);

    const errorContainer = screen.queryByRole("list");
    expect(errorContainer).not.toBeInTheDocument();
  });

  it("should render error messages when errors are present", () => {
    const errors = [
      { field: "username", message: "Username is required" },
      { field: "password", message: "Password must be at least 8 characters" },
    ];

    render(<ErrorsSection errors={errors} />);

    const errorMessages = screen.getAllByRole("listitem");
    expect(errorMessages).toHaveLength(errors.length);

    expect(
      screen.getByText("Field username: Username is required"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Field password: Password must be at least 8 characters",
      ),
    ).toBeInTheDocument();
  });
});
