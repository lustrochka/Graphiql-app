import GraphiQLClient from "../../../components/GraphiQLClient/GraphiQLClient";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useRouter } from "next/router";

jest.mock("../../../api/getGraphqlDocs");
jest.mock("../../../api/getGraphql");
jest.mock("../../../hooks/useLocalStorage");
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

(useRouter as jest.Mock).mockReturnValue({
  query: {},
  replace: jest.fn(),
  asPath: "",
});

const mockSaveToStorage = jest.fn();

(useLocalStorage as jest.Mock).mockReturnValue({
  saveToStorage: mockSaveToStorage,
});

test("shows error when empty url", async () => {
  const errorMsg = "Please enter url";
  render(<GraphiQLClient />);

  const button = screen.getByText("Send Request");
  fireEvent.click(button);

  await waitFor(() => expect(screen.getByText(errorMsg)).toBeInTheDocument());
});

test("shows error when invalid url", async () => {
  const invalidUrl = "invalid-url";
  const query = "query";
  const errorMsg = "Invalid URL";
  render(<GraphiQLClient />);

  const urlInput = screen.getByPlaceholderText("Enter API Endpoint");
  fireEvent.change(urlInput, { target: { value: invalidUrl } });

  const queryInput = screen.getByPlaceholderText(/Enter request body/);
  fireEvent.change(queryInput, { target: { value: query } });

  const button = screen.getByText("Send Request");
  fireEvent.click(button);

  await waitFor(() => expect(screen.getByText(errorMsg)).toBeInTheDocument());
});
