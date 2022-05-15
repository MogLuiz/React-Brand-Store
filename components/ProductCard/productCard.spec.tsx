// Packages
import { screen, render } from "@testing-library/react";

// Components
import ProductCard from ".";

const addToCart = jest.fn();

const product = {
  title: "Relógio bonito",
  price: "22.00",
  image:
    "https://images.unsplash.com/photo-1495856458515-0637185db551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
};

const setup = () => {
  const utils = render(<ProductCard product={product} addToCart={addToCart} />);

  const productCard = screen.getByTestId("product-card");
  const productTitle = screen.getByText(new RegExp(product.title, "i"));
  const productPrice = screen.getByText(new RegExp(product.price, "i"));
  const productImage = screen.getByTestId("image");

  return { productCard, productTitle, productPrice, productImage, ...utils };
};

describe("ProductCard", () => {
  it("should render ProductCard", () => {
    const { productCard } = setup();

    expect(productCard).toBeInTheDocument();
  });

  it("should display proper content", () => {
    const { productTitle, productPrice, productImage } = setup();

    expect(productTitle).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
    expect(productImage).toHaveStyle({
      backgroundImage: product.image,
    });
  });
});
