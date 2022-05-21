// Packages
import { screen, render, waitFor } from "@testing-library/react";

// Page
import ProductList from "../pages";

const setup = () => {
  render(<ProductList />);
};

describe("ProductList", () => {
  it("should render ProductList", () => {
    setup();

    expect(screen.getByTestId("product-list")).toBeInTheDocument();
  });

  fit("should render the ProductCard component 10 times", async () => {
    setup();

    await waitFor(() => {
      expect(screen.getAllByTestId("product-card")).toHaveLength(10);
    });
  });
});
