import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getProductCategorySlug } from "../utils/categories.js";

const ProductContext = createContext(null);
const PRODUCTS_URL = "https://dummyjson.com/products";

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get(PRODUCTS_URL);

        if (active) {
          setProducts(response.data.products ?? []);
        }
      } catch (err) {
        if (active) {
          setError("Products could not be loaded. Please try again.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  const categories = useMemo(() => {
    return [...new Set(products.map((product) => getProductCategorySlug(product)))].sort();
  }, [products]);

  const productsByCategory = useMemo(() => {
    return products.reduce((groups, product) => {
      const category = getProductCategorySlug(product);

      groups[category] = groups[category] ?? [];
      groups[category].push(product);
      return groups;
    }, {});
  }, [products]);

  const value = {
    products,
    categories,
    productsByCategory,
    loading,
    error
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProducts must be used inside ProductProvider");
  }

  return context;
}
