// Packages
import { screen, render, waitFor } from "@testing-library/react";

// Page
import ProductList from "../pages";

// Services
import { makeServer, TServer } from "../services/mirage/server";

const setupRender = () => {
  const utils = render(<ProductList />);

  const productList = screen.getByTestId("product-list");
  const emptyProductsMessage = screen.getByLabelText("Empty products message");

  return { ...utils, productList, emptyProductsMessage };
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
    const { productList } = setupRender();

    expect(productList).toBeInTheDocument();
  });

  it("should render the ProductCard component 10 times", async () => {
    server.createList("product", 10);
    setupRender();
    await waitFor(() => {
      expect(screen.getAllByTestId("product-card")).toHaveLength(10);
    });
  });
  it('should render the "no products message"', async () => {
    const { emptyProductsMessage } = setupRender();

    await waitFor(() => {
      expect(emptyProductsMessage).toBeInTheDocument();
    });
  });
});
