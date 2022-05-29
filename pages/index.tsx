// Packages
import type { NextPage } from "next";
import { useState, useEffect, EffectCallback } from "react";

// Services
import axios from "axios";

// Components
import { ProductCard, Search } from "../components";
import useFetchProducts, { ProductsType } from "../hooks/useFetchProducts";

const Home: NextPage = () => {
  // -------------------------------------------------
  // States
  // -------------------------------------------------
  const { products, error } = useFetchProducts();
  
  const [term, setTerm] = useState("");
  const [localProducts, setLocalProducts] = useState<ProductsType>([]);

  // -------------------------------------------------
  // Hooks
  // -------------------------------------------------
  useEffect(() => {
    if (term === "") {
      setLocalProducts(products);
    } else {
      setLocalProducts(
        products.filter(({ title }) => {
          return title.toLowerCase().includes(term.toLowerCase());
        })
      );
    }
  }, [products, term]);

  // -------------------------------------------------
  // Functions
  // -------------------------------------------------
  const renderProducts = () => {
    if (localProducts.length === 0 && !error)
      return <h4 aria-label="Empty products message">No products</h4>;

    return localProducts.map((product: any) => (
      <ProductCard
        product={product}
        key={product.id}
        addToCart={() => console.log("ola")}
      />
    ));
  };

  const renderErrorMessage = () => {
    if (!error) return;

    return <h4>Server is down</h4>;
  };

  const renderProductsQuantity = () => {
    return localProducts.length === 1
      ? `1 Product`
      : `${localProducts.length} Products`;
  };

  // -------------------------------------------------
  // Render
  // -------------------------------------------------
  return (
    <main data-testid="product-list" className="my-8">
      <Search doSearch={(term) => setTerm(term)} />
      <div className="container mx-auto px-6">
        <h3 className="text-gray-700 text-2xl font-medium">Wrist Watch</h3>
        <span className="mt-3 text-sm text-gray-500">
          {renderProductsQuantity()}
        </span>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
          {renderErrorMessage()}
          {renderProducts()}
        </div>
      </div>
    </main>
  );
};

export default Home;
