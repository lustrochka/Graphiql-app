import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import useRequestVariables from "../../hooks/useRequestVariables";

const HookWrapper = () => {
  const { variables, addVariable, removeVariable } = useRequestVariables();

  return (
    <div>
      {variables.map((variable, index) => (
        <div key={index} data-testid={`variable-${index}`}>
          <span
            data-testid={`variable-text-${index}`}
          >{`${variable.key}: ${variable.value}`}</span>
          <button
            data-testid={`remove-btn-${index}`}
            onClick={() => removeVariable(index)}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={() => addVariable("newKey", "newValue")}
        data-testid="add-btn"
      >
        Add Variable
      </button>
    </div>
  );
};

describe("useRequestVariables Hook", () => {
  it("should initialize with an empty variables array", () => {
    render(<HookWrapper />);

    expect(screen.queryByTestId("variable-0")).toBeNull();
  });

  it("should correctly add a variable", () => {
    render(<HookWrapper />);

    const addButton = screen.getByTestId("add-btn");

    fireEvent.click(addButton);

    expect(screen.getByTestId("variable-text-0").textContent).toBe(
      "newKey: newValue",
    );
  });

  it("should correctly remove a variable by index", () => {
    render(<HookWrapper />);

    const addButton = screen.getByTestId("add-btn");

    fireEvent.click(addButton);
    fireEvent.click(addButton);

    expect(screen.getByTestId("variable-text-0").textContent).toBe(
      "newKey: newValue",
    );
    expect(screen.getByTestId("variable-text-1").textContent).toBe(
      "newKey: newValue",
    );

    const removeButton = screen.getByTestId("remove-btn-0");
    fireEvent.click(removeButton);

    expect(screen.queryByTestId("variable-0")).not.toBeNull();
    expect(screen.queryByTestId("variable-1")).toBeNull();
  });
});
