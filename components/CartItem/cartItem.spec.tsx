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
  totalProducts: 1,
};

const setup = () => {
  const utils = render(<CartItemComponent product={product} />);

  const cartItem = screen.getByTestId("cart-item");
  const productTitle = screen.getByText(new RegExp(product.title, "i"));
  const productPrice = screen.getByText(new RegExp(product.price, "i"));
  const productImage = screen.getByAltText(/product image/i);
  const totalProducts = screen.getAllByLabelText(/total products/i);
  const increaseButton = screen.getByLabelText(/increase cart button/i);
  const decreaseButton = screen.getByLabelText(/decrease cart button/i);

  return {
    cartItem,
    productTitle,
    productPrice,
    productImage,
    totalProducts,
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

  it("should diplay proper content", () => {
    const {
      productImage,
      productPrice,
      productTitle,
      increaseButton,
      decreaseButton,
    } = setup();

    expect(productImage).toHaveStyle({
      backgroundImage: product.image,
    });
    expect(productPrice).toBeInTheDocument();
    expect(productTitle).toBeInTheDocument();
    expect(increaseButton).toBeInTheDocument();
    expect(decreaseButton).toBeInTheDocument();
  });
});
