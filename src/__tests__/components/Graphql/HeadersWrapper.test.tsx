import HeadersWrapper from "../../../components/GraphiQLClient/HeadersWrapper";
import { render, screen, fireEvent } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { useChangeURL } from "../../../hooks/useChangeURL";
import { HeadersWrapperProps } from "../../../components/GraphiQLClient/HeadersWrapper";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const mockReplace = jest.fn();

(useRouter as jest.Mock).mockReturnValue({
  asPath: "/path",
  replace: mockReplace,
});

const Form: React.FC<HeadersWrapperProps> = ({ searchQuery }) => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <HeadersWrapper searchQuery={searchQuery} />
    </FormProvider>
  );
};

test("renders correct data", () => {
  const key = "testing-header";
  const value = "testing-value";
  const header = { [key]: value };

  render(<Form searchQuery={header} />);

  const keyInput = screen.getByPlaceholderText("Header Key");
  const valueInput = screen.getByPlaceholderText("Header Value");

  expect(keyInput).toHaveValue(key);
  expect(valueInput).toHaveValue(value);
});

test("handleUr is called on change", () => {
  render(<Form searchQuery={{}} />);

  const button = screen.getByText("Add Header");
  fireEvent.click(button);

  const keyInput = screen.getByPlaceholderText("Header Key");
  const valueInput = screen.getByPlaceholderText("Header Value");

  const newKey = "newKey";
  const newValue = "newValue";

  fireEvent.change(keyInput, { target: { value: newKey } });
  fireEvent.change(valueInput, { target: { value: newValue } });
  fireEvent.click(button);

  expect(mockReplace).toHaveBeenCalledWith({}, "/path?newKey=newValue", {
    shallow: true,
  });
});
