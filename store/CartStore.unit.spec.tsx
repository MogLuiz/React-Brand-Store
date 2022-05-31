import { renderHook } from "@testing-library/react-hooks";
import useCartStore from "./Cart";

describe("Cart Store", () => {
  it("should return open equals false on initial state", async () => {
    const { result } = renderHook(() => useCartStore());

    expect(result.current.state.open).toBe(false);
  });
});
