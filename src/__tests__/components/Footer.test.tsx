import { render, screen } from "@testing-library/react";
import Footer from "../../components/Footer/Footer";

describe("Footer", () => {
  it("renders all GitHub profile links", () => {
    render(<Footer />);

    const olgaLink = screen.getByText("Olga Borisevich (@lustrochka)");
    expect(olgaLink).toBeInTheDocument();
    expect(olgaLink).toHaveAttribute("href", "https://github.com/lustrochka");
    expect(olgaLink).toHaveAttribute("target", "_blank");

    const alexLink = screen.getByText("Aliaksandr Prakapovich (@Alex-prokop)");
    expect(alexLink).toBeInTheDocument();
    expect(alexLink).toHaveAttribute("href", "https://github.com/Alex-prokop");
    expect(alexLink).toHaveAttribute("target", "_blank");

    const aleksandraLink = screen.getByText(
      "Aleksandra Muraveva (@aleksandramuraveva)"
    );
    expect(aleksandraLink).toBeInTheDocument();
    expect(aleksandraLink).toHaveAttribute(
      "href",
      "https://github.com/aleksandramuraveva"
    );
    expect(aleksandraLink).toHaveAttribute("target", "_blank");

    const projectRepoLink = screen.getByText("Project Repository");
    expect(projectRepoLink).toBeInTheDocument();
    expect(projectRepoLink).toHaveAttribute(
      "href",
      "https://github.com/lustrochka/Graphiql-app"
    );
    expect(projectRepoLink).toHaveAttribute("target", "_blank");
  });

  it("renders the copyright text", () => {
    render(<Footer />);

    const copyrightText = screen.getByText("© 2024");
    expect(copyrightText).toBeInTheDocument();
  });

  it("renders the RSS logo with correct attributes", () => {
    render(<Footer />);

    const rssLogo = screen.getByAltText("rss-logo");
    expect(rssLogo).toBeInTheDocument();
    expect(rssLogo).toHaveAttribute("src", "/images/rss-logo-CM8B7fA7.svg");
    expect(rssLogo).toHaveAttribute("width", "16");
    expect(rssLogo).toHaveAttribute("height", "16");

    const rssLink = screen.getByRole("link", { name: /rss-logo/i });
    expect(rssLink).toHaveAttribute("href", "https://rs.school/react/");
  });
});
