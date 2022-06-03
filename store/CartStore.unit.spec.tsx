// Packages
import { renderHook, act, RenderResult } from "@testing-library/react-hooks";

// Components
import useCartStore, { IUseCartState, ProductType } from "./Cart";

// Services
import { makeServer, TServer } from "../services/mirage/server";

// Types
import { TProduct } from "./types";

describe("Cart Store", () => {
  let server: TServer;
  let result: RenderResult<IUseCartState>;
  let addProduct: <T extends TProduct>(product: T | TProduct | any) => void;
  let toggle: () => void;

  beforeEach(() => {
    server = makeServer({ environment: "test" });
    result = renderHook(() => useCartStore()).result;
    addProduct = result.current.actions.addProduct;
    toggle = result.current.actions.toggle;
  });

  afterEach(() => {
    server.shutdown();
    act(() => result.current.actions.reset());
  });

  it("should return open equals false on initial state", () => {
    expect(result.current.state.open).toBe(false);
  });

  it("should return an empty array for products on initial state", () => {
    expect(Array.isArray(result.current.state.products)).toBe(true);
    expect(result.current.state.products).toHaveLength(0);
  });

  it("should increase products when addProduct functions is called", async () => {
    const products = server.createList("product", 2);

    expect(result.current.state.products).toHaveLength(0);

    for (const product of products) {
      act(() => addProduct(product));
    }

    expect(result.current.state.products).toHaveLength(2);
  });

  it('should not add same product twice', () => {
    const product = server.create('product')

    act(() => addProduct(product))
    act(() => addProduct(product))

    expect(result.current.state.products).toHaveLength(1);
  });

  it("should toggle open state", () => {
    expect(result.current.state.open).toBe(false);
    expect(result.current.state.products).toHaveLength(0);
    
    act(() => toggle());
    expect(result.current.state.open).toBe(true);

    act(() => toggle());
    
    expect(result.current.state.open).toBe(false);
    expect(result.current.state.products).toHaveLength(0);
  });
});
