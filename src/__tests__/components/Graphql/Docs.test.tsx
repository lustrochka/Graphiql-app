import DocsBlock from "../../../components/GraphiQLClient/DocsBlock";
import { render, screen } from "@testing-library/react";

const docs = "testing documentation";

test("renders correct data", () => {
  render(<DocsBlock docs={docs} />);

  expect(screen.getByText(docs)).toBeInTheDocument();
});
