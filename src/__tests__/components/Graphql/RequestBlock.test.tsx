import RequestBlock from "../../../components/GraphiQLClient/RequestBlock";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";

jest.mock("../../../api/getGraphqlDocs");
jest.mock("../../../api/getGraphql");
jest.mock("../../../hooks/useLocalStorage");
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const encodedSlug = [
  "dGVzdC11cmw=",
  "eyJxdWVyeSI6InRlc3QtcXVlcnkiLCJ2YXJpYWJsZXMiOnsidmFyaWFibGUiOiJhYWEifX0=",
];

(useRouter as jest.Mock).mockReturnValue({
  query: {
    slug: encodedSlug,
    param1: "value1",
    param2: "value2",
  },
  replace: jest.fn(),
  asPath: "",
});

const Form: React.FC = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <RequestBlock urlError="" queryError="" />
    </FormProvider>
  );
};

test("renders data from url", async () => {
  render(<Form />);

  const urlInput = await screen.findByDisplayValue("test-url");
  const queryInput = await screen.findByDisplayValue("test-query");

  expect(urlInput).toBeInTheDocument();
  expect(queryInput).toBeInTheDocument();
});
