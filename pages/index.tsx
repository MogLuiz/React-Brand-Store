// Packages
import type { NextPage } from "next";
import { useState, useEffect } from "react";

// Services
import axios from "axios";

// Components
import { ProductCard, Search } from "../components";

const Home: NextPage = () => {
  // -------------------------------------------------
  // States
  // -------------------------------------------------
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  // -------------------------------------------------
  // Hooks
  // -------------------------------------------------
  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => setProducts(res.data.products))
      .catch((err) => setError(true));
  }, []);

  // -------------------------------------------------
  // Render
  // -------------------------------------------------
  return (
    <main data-testid="product-list" className="my-8">
      <Search doSearch={(term) => console.log(term) as any} />
      <div className="container mx-auto px-6">
        <h3 className="text-gray-700 text-2xl font-medium">Wrist Watch</h3>
        <span className="mt-3 text-sm text-gray-500">200+ Products</span>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
          {products.map((product: any) => (
            <ProductCard
              product={product}
              key={product.id}
              addToCart={() => console.log("ola")}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
