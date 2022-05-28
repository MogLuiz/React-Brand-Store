import { useEffect, useState } from "react";
import axios from "axios";

type TProducts = {
  id: string;
  image: string;
  price: string;
  title: string;
}[];

const useFetchProducts = () => {
  // -------------------------------------------------
  // States
  // -------------------------------------------------
  const [products, setProducts] = useState<TProducts>([]);
  const [error, setError] = useState(false);

  // -------------------------------------------------
  // Hooks
  // -------------------------------------------------
  useEffect(() => {
    let mounted = true;
    axios
      .get("/api/products")
      .then((res) => {
        if (mounted) setProducts(res.data.products);
      })
      .catch((err) => {
        /* istanbul ignore next */
        if (mounted) setError(true);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { products, error };
};

export default useFetchProducts;
export type ProductsType = TProducts;
