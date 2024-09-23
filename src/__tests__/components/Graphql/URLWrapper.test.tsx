import UrlWrapper from "../../../components/GraphiQLClient/UrlWrapper";
import { render, screen, fireEvent } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { useChangeURL } from "../../../hooks/useChangeURL";

jest.mock("../../../hooks/useChangeURL");

const mockChangeURL = jest.fn();

(useChangeURL as jest.Mock).mockReturnValue({
  changeURL: mockChangeURL,
});

const value = "testing url";

const Form: React.FC = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <UrlWrapper value={value} />
    </FormProvider>
  );
};

test("renders correct data", () => {
  render(<Form />);

  expect(screen.getByDisplayValue(value)).toBeInTheDocument();
});

test("handleUr is called on change", () => {
  render(<Form />);

  const input = screen.getByDisplayValue(value);
  const newValue = "new-url";

  fireEvent.change(input, { target: { value: newValue } });
  expect(mockChangeURL).toHaveBeenCalledWith({
    url: newValue,
    query: undefined,
    variables: undefined,
  });
});
