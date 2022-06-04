// Packages
import { render, screen } from "@testing-library/react";
import { renderHook, act, RenderResult } from "@testing-library/react-hooks";
import userEvent from "@testing-library/user-event";

// Components
import Cart from ".";

// Store
import useCartStore, { IUseCartState, ProductType } from "../../store/Cart";

// Services
import { makeServer, TServer } from "../../services/mirage/server";

describe("Cart", () => {
  let server: TServer;
  let result: RenderResult<IUseCartState>;
  let addProduct: <T extends ProductType>(product: T | ProductType) => void;
  let toggle: () => void;
  let spy;
  let reset: () => void;

  beforeEach(() => {
    server = makeServer({ environment: "test" });
    result = renderHook(() => useCartStore()).result;
    addProduct = result.current.actions.addProduct;
    reset = result.current.actions.reset;
    toggle = result.current.actions.toggle;
    spy = jest.spyOn(result.current.actions, "toggle");
  });

  afterEach(() => {
    server.shutdown();
    jest.clearAllMocks();
  });

  it("should render cart", () => {
    render(<Cart />);

    expect(screen.getByTestId("cart")).toBeInTheDocument();
  });
});
