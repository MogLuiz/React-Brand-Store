import { renderHook, act } from "@testing-library/react-hooks";
import useCartStore from "./Cart";

// Services
import { makeServer, TServer } from "../services/mirage/server";

describe("Cart Store", () => {
  let server: TServer;
  beforeEach(() => {
    server = makeServer({ environment: "test" });
  });

  afterEach(() => {
    server.shutdown();
  });

  it("should return open equals false on initial state", () => {
    const { result } = renderHook(() => useCartStore());

    expect(result.current.state.open).toBe(false);
  });

  it("should return an empty array for products on initial state", () => {
    const { result } = renderHook(() => useCartStore());

    expect(Array.isArray(result.current.state.products)).toBe(true);
    expect(result.current.state.products).toHaveLength(0);
  });

  it("", async () => {
    const products = server.createList("product", 2);

    const { result } = renderHook(() => useCartStore());
    const {
      actions: { addProduct },
    } = result.current;

    expect(result.current.state.products).toHaveLength(0);

    for (const product of products) {
      act(() => addProduct(product));
    }

    expect(result.current.state.products).toHaveLength(2);
  });

  it("should toggle open state", () => {
    const { result } = renderHook(() => useCartStore());
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
