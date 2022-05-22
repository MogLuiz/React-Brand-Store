// Packages
import { screen, render, waitFor } from "@testing-library/react";

// Page
import ProductList from "../pages";

// Services
import { makeServer, TServer } from "../services/mirage/server";

const setup = () => {
  render(<ProductList />);
};

describe("ProductList", () => {
  let server: TServer
    beforeEach(() => {
      server = makeServer({ environment: "test" })
    })

    afterEach(() => {
      server.shutdown()
    })

  it("should render ProductList", () => {
    setup();

    expect(screen.getByTestId("product-list")).toBeInTheDocument();
  });

  it("should render the ProductCard component 10 times", async () => {
    server.createList('product', 10)
    setup();

    await waitFor(() => {
      expect(screen.getAllByTestId("product-card")).toHaveLength(10);
    });
  });
});
