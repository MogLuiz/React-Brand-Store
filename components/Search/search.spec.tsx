// Packages
import { render, screen } from "@testing-library/react";

// Components
import Search from ".";

describe("Search", () => {
  it("should render Search component", () => {
    render(<Search />);

    expect(screen.getByTestId("search")).toBeInTheDocument();
  });
});
