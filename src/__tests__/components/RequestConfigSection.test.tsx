import { render, screen, fireEvent } from "@testing-library/react";
import RequestConfigSection from "../../components/RestClient/RequestConfigSection";
import MethodSelector from "../../components/common/MethodSelector/MethodSelector";
import UrlInput from "../../components/common/UrlInput/UrlInput";

jest.mock("../../components/common/MethodSelector/MethodSelector", () => {
  return jest.fn(({ method, setMethod }) => (
    <div>
      Mocked MethodSelector
      <button onClick={() => setMethod("POST")}>Change Method</button>
    </div>
  ));
});

jest.mock("../../components/common/UrlInput/UrlInput", () => {
  return jest.fn(({ url, setUrl }) => (
    <div>
      Mocked UrlInput
      <input
        data-testid="url-input"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
    </div>
  ));
});

describe("RequestConfigSection", () => {
  const mockSetMethod = jest.fn();
  const mockSetUrl = jest.fn();
  const mockHandleUserInteraction = jest.fn();
  const mockUpdateBrowserUrl = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render MethodSelector and UrlInput components", () => {
    render(
      <RequestConfigSection
        method="GET"
        setMethod={mockSetMethod}
        url="http://example.com"
        setUrl={mockSetUrl}
        handleUserInteraction={mockHandleUserInteraction}
        updateBrowserUrl={mockUpdateBrowserUrl}
      />,
    );

    expect(screen.getByText("Mocked MethodSelector")).toBeInTheDocument();
    expect(screen.getByText("Mocked UrlInput")).toBeInTheDocument();
  });

  it("should call setMethod and handleUserInteraction when method is changed", () => {
    render(
      <RequestConfigSection
        method="GET"
        setMethod={mockSetMethod}
        url="http://example.com"
        setUrl={mockSetUrl}
        handleUserInteraction={mockHandleUserInteraction}
        updateBrowserUrl={mockUpdateBrowserUrl}
      />,
    );

    fireEvent.click(screen.getByText("Change Method"));

    expect(mockHandleUserInteraction).toHaveBeenCalled();
    expect(mockSetMethod).toHaveBeenCalledWith("POST");
  });

  it("should call setUrl and handleUserInteraction when URL is changed", () => {
    render(
      <RequestConfigSection
        method="GET"
        setMethod={mockSetMethod}
        url="http://example.com"
        setUrl={mockSetUrl}
        handleUserInteraction={mockHandleUserInteraction}
        updateBrowserUrl={mockUpdateBrowserUrl}
      />,
    );

    const urlInput = screen.getByTestId("url-input");
    fireEvent.change(urlInput, { target: { value: "http://new-url.com" } });

    expect(mockHandleUserInteraction).toHaveBeenCalled();
    expect(mockSetUrl).toHaveBeenCalledWith("http://new-url.com");
  });
});
