import { renderHook, act } from "@testing-library/react-hooks";
import useCartStore from "./Cart";

describe("Cart Store", () => {
  it("should return open equals false on initial state", () => {
    const { result } = renderHook(() => useCartStore());

    expect(result.current.state.open).toBe(false);
  });
  it("should return an empty array for products on initial state", () => {
    const { result } = renderHook(() => useCartStore());

    expect(typeof result.current.state.products).toBe('array')
    expect(result.current.state.products).toHaveLength(0)
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
