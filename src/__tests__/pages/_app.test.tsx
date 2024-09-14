import React from "react";
import { render } from "@testing-library/react";
import MyApp from "../../pages/_app";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { ToastContainer } from "react-toastify";

jest.mock("../../components/Header/Header", () => {
  const MockedHeader = () => <div>Mocked Header</div>;
  MockedHeader.displayName = "MockedHeader";
  return MockedHeader;
});

jest.mock("../../components/Footer/Footer", () => {
  const MockedFooter = () => <div>Mocked Footer</div>;
  MockedFooter.displayName = "MockedFooter";
  return MockedFooter;
});

jest.mock("react-toastify", () => {
  const MockedToastContainer = () => <div>Mocked ToastContainer</div>;
  MockedToastContainer.displayName = "MockedToastContainer";
  return { ToastContainer: MockedToastContainer };
});

describe("MyApp Component", () => {
  const ComponentMock = () => <div>Mocked Component</div>;
  ComponentMock.displayName = "ComponentMock";

  it("should render the Header, Footer, and Component with props", () => {
    const { getByText } = render(
      <MyApp Component={ComponentMock} pageProps={{ prop1: "value1" }} />,
    );

    expect(getByText("Mocked Header")).toBeInTheDocument();
    expect(getByText("Mocked Footer")).toBeInTheDocument();
    expect(getByText("Mocked Component")).toBeInTheDocument();
    expect(getByText("Mocked ToastContainer")).toBeInTheDocument();
  });
});
