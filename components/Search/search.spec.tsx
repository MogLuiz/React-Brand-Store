// Packages
import { render, screen, fireEvent } from "@testing-library/react";

// Components
import Search from ".";

const doSearch = jest.fn();

describe("Search", () => {
  it("should render a form", () => {
    render(<Search doSearch={doSearch} />);

    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("should call props.doSearch() when form is submitted", async () => {
    render(<Search doSearch={doSearch} />);

    const form = screen.getByRole("form");

    await fireEvent.submit(form);

    expect(doSearch).toHaveBeenCalledTimes(1);
  });
});
