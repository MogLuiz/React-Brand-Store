// Packages
import { screen, render, waitFor } from "@testing-library/react";

// Page
import ProductList from "../pages";

// Services
import { makeServer, TServer } from "../services/mirage/server";

const setupRender = () => {
  render(<ProductList />);
};

describe("ProductList", () => {
  let server: TServer;
  beforeEach(() => {
    server = makeServer({ environment: "test" });
  });

  afterEach(() => {
    server.shutdown();
  });

  it("should render ProductList", () => {
    setupRender();

    expect(screen.getByTestId("product-list")).toBeInTheDocument();
  });

  it("should render the ProductCard component 10 times", async () => {
    server.createList("product", 10);
    setupRender();

    await waitFor(() => {
      expect(screen.getAllByTestId("product-card")).toHaveLength(10);
    });
  });

  it('should render the "no products message"', async () => {
    setupRender();

    await waitFor(() => {
      expect(screen.getByTestId("no-products")).toBeInTheDocument();
    });
  });
});
