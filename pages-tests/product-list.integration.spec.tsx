// Packages
import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Page
import ProductList from "../pages";

// Services
import { makeServer, TServer } from "../services/mirage/server";
import { Response } from "miragejs";

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

  it("should display error message when promise rejects", async () => {
    server.get("products", () => new Response(500, {}, ""));

    const { emptyProductsMessage } = setupRender();

    await waitFor(() => {
      expect(emptyProductsMessage).not.toBeInTheDocument();
      expect(screen.getByText(/Server is down/i)).toBeInTheDocument();
      expect(screen.queryAllByTestId("product-card")).toHaveLength(0);
    });
  });

  it("should filter the product list when a search is performed", async () => {
    const searchTerm = "Relógio bonito";

    server.createList("product", 2);

    server.create("product", {
      title: "Relógio bonito",
    } as object);

    setupRender();

    await waitFor(() => {
      expect(screen.getAllByTestId("product-card")).toHaveLength(3);
    });

    const form = screen.getByRole("form");
    const input = screen.getByRole("searchbox");

    await userEvent.type(input, searchTerm);
    await fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getAllByTestId("product-card")).toHaveLength(1);
    });
  });

  it("should display the total quantity of products", async () => {
    server.createList("product", 10);

    setupRender();

    await waitFor(() => {
      expect(screen.getByText(/10 Products/i)).toBeInTheDocument();
    });
  });

  it("should display product (singular) when there is only 1 product", async () => {
    server.create("product");

    setupRender();

    await waitFor(() => {
      expect(screen.getByText(/1 Product$/i)).toBeInTheDocument();
    });
  });

  it("should display proper quantity when list is filtered", async () => {
    const searchTerm = "Relógio bonito";

    server.createList("product", 2);

    server.create("product", {
      title: "Relógio bonito",
    } as object);

    setupRender();

    await waitFor(() => {
      expect(screen.getByText(/3 Products/i)).toBeInTheDocument()
    });

    const form = screen.getByRole("form");
    const input = screen.getByRole("searchbox");

    await userEvent.type(input, searchTerm);
    await fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText(/1 Product$/i)).toBeInTheDocument()
    });
  });
});
