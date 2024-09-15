import VariablesWrapper from "../../../components/GraphiQLClient/VariablesWrapper";
import { render, screen, fireEvent } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { useChangeURL } from "../../../hooks/useChangeURL";
import { VariablesWrapperProps } from "../../../components/GraphiQLClient/VariablesWrapper";

jest.mock("../../../hooks/useChangeURL");

const mockChangeURL = jest.fn();

(useChangeURL as jest.Mock).mockReturnValue({
  changeURL: mockChangeURL,
});

const Form: React.FC<VariablesWrapperProps> = ({ value }) => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <VariablesWrapper value={value} />
    </FormProvider>
  );
};

test("renders correct data", () => {
  const header = "testing-header";
  const value = "testing-value";
  const variable = { [header]: value };

  render(<Form value={variable} />);

  const keyInput = screen.getByPlaceholderText("Variable Key");
  const valueInput = screen.getByPlaceholderText("Variable Value");

  expect(keyInput).toHaveValue(header);
  expect(valueInput).toHaveValue(value);
});

test("handleUr is called on change", () => {
  render(<Form value={{}} />);

  const button = screen.getByText("Add Variable");
  fireEvent.click(button);

  const keyInput = screen.getByPlaceholderText("Variable Key");
  const valueInput = screen.getByPlaceholderText("Variable Value");

  const newKey = "newKey";
  const newValue = "newValue";

  fireEvent.change(keyInput, { target: { value: newKey } });
  fireEvent.change(valueInput, { target: { value: newValue } });
  fireEvent.click(button);

  expect(mockChangeURL).toHaveBeenCalledWith({
    url: undefined,
    query: undefined,
    variables: [{ key: newKey, value: newValue }],
  });
});
