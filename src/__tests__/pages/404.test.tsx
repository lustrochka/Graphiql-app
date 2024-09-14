import React from "react";
import { render, screen } from "@testing-library/react";
import Custom404 from "../../pages/404";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Custom404 Component", () => {
  let pushMock: jest.Mock;

  beforeEach(() => {
    pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the 404 text", () => {
    render(<Custom404 />);

    const heading = screen.getByText(/404 - Page Not Found/i);
    const paragraph = screen.getByText(
      /You will be redirected to the homepage in a few seconds/i,
    );

    expect(heading).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
  });

  it("should redirect to homepage after 4 seconds", () => {
    jest.useFakeTimers();

    render(<Custom404 />);

    expect(pushMock).not.toHaveBeenCalled();

    jest.advanceTimersByTime(4000);

    expect(pushMock).toHaveBeenCalledWith("/");

    jest.useRealTimers();
  });

  it("should clear the timeout on unmount", () => {
    jest.useFakeTimers();

    const clearTimeoutSpy = jest.spyOn(global, "clearTimeout");

    const { unmount } = render(<Custom404 />);

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();

    jest.useRealTimers();
    clearTimeoutSpy.mockRestore();
  });
});
