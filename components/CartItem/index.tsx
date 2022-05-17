/* eslint-disable @next/next/no-img-element */
// Packages
import React from "react";

type TProductItem = {
  title: string;
  price: string;
  image: string;
  totalProducts: number;
};

type TCartItemProps = {
  product: TProductItem;
};

const CartItem: React.FC<TCartItemProps> = ({ product }) => {
  // -------------------------------------------------
  // Render
  // -------------------------------------------------
  return (
    <div data-testid="cart-item" className="flex justify-between mt-6">
      <div className="flex">
        <img
          className="h-20 w-20 object-cover rounded"
          src={product?.image}
          alt={product?.title}
        />
        <div className="mx-3">
          <h3 className="text-sm text-gray-600">{product?.title}</h3>
          <div className="flex items-center mt-2">
            <button
              aria-label="increase cart button"
              className="text-gray-500 focus:outline-none focus:text-gray-600"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </button>
            <span aria-label="total products" className="text-gray-700 mx-2">
              {product?.totalProducts}
            </span>
            <button
              aria-label="decrease cart button"
              className="text-gray-500 focus:outline-none focus:text-gray-600"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <span className="text-gray-600">{product?.price}</span>
    </div>
  );
};

export default CartItem;
