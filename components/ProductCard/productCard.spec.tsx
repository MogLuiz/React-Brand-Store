// Packages
import { screen, render } from "@testing-library/react";

// Components
import ProductCard from ".";

describe("ProductCard", () => {
  it("should render ProductCard", () => {
    render(<ProductCard />);

    expect(screen.getByTestId("product-card"));
  });
});
