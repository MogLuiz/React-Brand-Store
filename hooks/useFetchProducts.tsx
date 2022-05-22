import { useEffect, useState } from "react";
import axios from "axios";

const useFetchProducts = () => {
  // -------------------------------------------------
  // States
  // -------------------------------------------------
  const [products, setProducts] = useState([]);
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
        if (mounted) setError(true);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { products, error };
};

export default useFetchProducts;
