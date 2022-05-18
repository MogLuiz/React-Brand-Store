// Packages
import { screen, render, fireEvent } from "@testing-library/react";

// Components
import CartItemComponent from ".";

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
  const productImage = screen.getByAltText(new RegExp(product.title, "i"));
  const totalProducts = screen.getByLabelText(/total products/i);
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
    const { cartItem, asFragment } = setup();

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
    expect(productImage).toHaveProperty("src", product.image);
    expect(productImage).toHaveProperty("alt", product.title);
    expect(productPrice).toBeInTheDocument();
    expect(productTitle).toBeInTheDocument();
    expect(increaseButton).toBeInTheDocument();
    expect(decreaseButton).toBeInTheDocument();
  });

  it("should display 1 as initial quantity", () => {
    const { totalProducts } = setup();

    expect(totalProducts.textContent).toBe("1");
  });

  it("should increase quantity by 1 when ( + ) button is clicked", async () => {
    const { increaseButton, totalProducts } = setup();

    await fireEvent.click(increaseButton);

    expect(totalProducts.textContent).toBe("2");
  });

  fit("should decrease quantity by 1 when ( - ) button is clicked", async () => {
    const { increaseButton, decreaseButton, totalProducts } = setup();

    await fireEvent.click(increaseButton);
    expect(totalProducts.textContent).toBe("2");

    await fireEvent.click(decreaseButton);
    expect(totalProducts.textContent).toBe("1");
  });

  fit("should not go bellow zero in the quantity", async () => {
    const { increaseButton, decreaseButton, totalProducts } = setup();

    await fireEvent.click(increaseButton);
    expect(totalProducts.textContent).toBe("2");

    await fireEvent.click(decreaseButton);
    await fireEvent.click(decreaseButton);
    await fireEvent.click(decreaseButton);
    await fireEvent.click(decreaseButton);
    expect(totalProducts.textContent).toBe("0");
  });
});
