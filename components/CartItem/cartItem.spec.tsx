// Packages
import { screen, render, fireEvent } from "@testing-library/react";

// Components
import CartItemComponent from ".";

const addToCart = jest.fn();

const product = {
  title: "Relógio bonito",
  price: "22.00",
  image:
    "https://images.unsplash.com/photo-1495856458515-0637185db551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
};

const setup = () => {
  const utils = render(<CartItemComponent />);

  const cartItem = screen.getByTestId("cart-item");
  const productTitle = screen.getByText(new RegExp(product.title, "i"));
  const productPrice = screen.getByText(new RegExp(product.price, "i"));
  const productImage = screen.getByAltText(/product image/i);
  const increaseButton = screen.getByLabelText(/increase cart button/i);
  const decreaseButton = screen.getByLabelText(/decrease cart button/i);

  return {
    cartItem,
    productTitle,
    productPrice,
    productImage,
    increaseButton,
    decreaseButton,
    ...utils,
  };
};

describe("CartItem", () => {
  it("should render CartItem", () => {
    const { cartItem } = setup();

    expect(cartItem).toBeInTheDocument();
  });
});
