// Packages
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Components
import Search from ".";

const doSearch = jest.fn();

const setup = () => {
  const utils = render(<Search doSearch={doSearch} />);

  const form = screen.getByRole("form");
  const input = screen.getByRole("searchbox");

  return { form, input, ...utils };
};

describe("Search", () => {
  it("should render a form", () => {
    const { form } = setup();

    expect(form).toBeInTheDocument();
  });

  it("should render a input type equals search", () => {
    const { input } = setup();

    expect(input).toHaveProperty("type", "search");
  });

  it("should call props.doSearch() when form is submitted", async () => {
    const { form } = setup();

    await fireEvent.submit(form);

    expect(doSearch).toHaveBeenCalledTimes(1);
  });

  it("should call props.doSearch() with the user input", async () => {
    const { form, input } = setup();

    const textSubmitted = "some text here";

    await userEvent.type(input, textSubmitted);
    await fireEvent.submit(form);

    expect(doSearch).toHaveBeenCalledWith(textSubmitted);
  });
});
