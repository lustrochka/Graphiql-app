import React from "react";
import { render, fireEvent } from "@testing-library/react";
import VariablesEditor, {
  Variable,
} from "../../../components/common/VariablesEditor/VariablesEditor";

describe("VariablesEditor", () => {
  let variables: Variable[];
  let setVariables: jest.Mock;

  beforeEach(() => {
    variables = [{ key: "testKey", value: "testValue" }];
    setVariables = jest.fn();
  });

  test("renders the initial variables", () => {
    const { getByDisplayValue } = render(
      <VariablesEditor variables={variables} setVariables={setVariables} />,
    );

    expect(getByDisplayValue("testKey")).toBeInTheDocument();
    expect(getByDisplayValue("testValue")).toBeInTheDocument();
  });

  test("adds a new variable when 'Add Variable' button is clicked", () => {
    const { getByText } = render(
      <VariablesEditor variables={variables} setVariables={setVariables} />,
    );

    fireEvent.click(getByText("Add Variable"));

    expect(setVariables).toHaveBeenCalledWith([
      { key: "testKey", value: "testValue" },
      { key: "", value: "" },
    ]);
  });

  test("removes the variable when the remove button is clicked", () => {
    const { getByText } = render(
      <VariablesEditor variables={variables} setVariables={setVariables} />,
    );

    fireEvent.click(getByText("✖"));

    expect(setVariables).toHaveBeenCalledWith([]);
  });

  test("does not update variable key with an invalid key", () => {
    const { getByPlaceholderText } = render(
      <VariablesEditor variables={variables} setVariables={setVariables} />,
    );

    const keyInput = getByPlaceholderText("Variable Key") as HTMLInputElement;
    fireEvent.change(keyInput, { target: { value: "1invalidKey" } });

    expect(setVariables).not.toHaveBeenCalled();
  });

  test("renders the 'Add Variable' button", () => {
    const { getByText } = render(
      <VariablesEditor variables={variables} setVariables={setVariables} />,
    );

    expect(getByText("Add Variable")).toBeInTheDocument();
  });

  test("displays a remove button for each variable", () => {
    const { getAllByText } = render(
      <VariablesEditor variables={variables} setVariables={setVariables} />,
    );

    const removeButtons = getAllByText("✖");
    expect(removeButtons).toHaveLength(variables.length);
  });

  test("handles empty variables array", () => {
    const { queryByDisplayValue, getByText } = render(
      <VariablesEditor variables={[]} setVariables={setVariables} />,
    );

    expect(queryByDisplayValue("testKey")).toBeNull();
    expect(queryByDisplayValue("testValue")).toBeNull();

    expect(getByText("Add Variable")).toBeInTheDocument();
  });

  test("updates only the value of an existing variable", () => {
    const { getByPlaceholderText } = render(
      <VariablesEditor variables={variables} setVariables={setVariables} />,
    );

    const valueInput = getByPlaceholderText(
      "Variable Value",
    ) as HTMLInputElement;

    fireEvent.change(valueInput, { target: { value: "newTestValue" } });

    expect(setVariables).toHaveBeenCalledWith([
      { key: "testKey", value: "newTestValue" },
    ]);
  });

  test("shows warning when invalid key is entered", () => {
    const consoleWarnMock = jest
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    const { getByPlaceholderText } = render(
      <VariablesEditor variables={variables} setVariables={setVariables} />,
    );

    const keyInput = getByPlaceholderText("Variable Key") as HTMLInputElement;

    fireEvent.change(keyInput, { target: { value: "123invalid" } });

    // Проверка, что консоль выдала предупреждение об ошибке
    expect(consoleWarnMock).toHaveBeenCalledWith(
      'Invalid variable key: "123invalid"',
    );
    consoleWarnMock.mockRestore();
  });
});
