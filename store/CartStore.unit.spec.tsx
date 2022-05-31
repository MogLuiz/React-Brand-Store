import { renderHook, act, RenderResult } from "@testing-library/react-hooks";
import useCartStore, { IUseCartState } from "./Cart";

// Services
import { makeServer, TServer } from "../services/mirage/server";

describe("Cart Store", () => {
  let server: TServer;
  let result: RenderResult<IUseCartState>;

  beforeEach(() => {
    server = makeServer({ environment: "test" });
    result = renderHook(() => useCartStore()).result;
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

    const {
      actions: { addProduct },
    } = result.current;

    expect(result.current.state.products).toHaveLength(0);

    for (const product of products) {
      act(() => addProduct(product as any));
    }

    expect(result.current.state.products).toHaveLength(2);
  });

  it("should toggle open state", () => {
    const {
      actions: { toggle },
    } = result.current;

    expect(result.current.state.open).toBe(false);
    act(() => toggle());

    expect(result.current.state.open).toBe(true);
    act(() => toggle());

    expect(result.current.state.open).toBe(false);
  });
});
