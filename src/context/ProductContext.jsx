import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "./Localstorage.jsx";
import { getProductCategorySlug } from "../utils/categories.js";

export const ProductContext = createContext(null);
const PRODUCTS_URL = "https://dummyjson.com/products";
const PHONES_URL = "https://dummyjson.com/products/search?q=phone";
const PRODUCTS_STORAGE_KEY = "debounce-products";

export function ProductProvider({ children }) {
  const [storedProducts, setStoredProducts] = useLocalStorage(
    PRODUCTS_STORAGE_KEY,
    []
  );
  const [products, setProducts] = useState(storedProducts);
  const [loading, setLoading] = useState(storedProducts.length === 0);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        setLoading(true);
        setError("");
        const [productsResponse, phonesResponse] = await Promise.all([
          axios.get(PRODUCTS_URL),
          fetch(PHONES_URL).then((res) => res.json())
        ]);

        const phoneProducts = (phonesResponse.products ?? []).map((product) => ({
          ...product,
          category: "phones"
        }));

        if (active) {
          const nextProducts = [
            ...(productsResponse.data.products ?? []),
            ...phoneProducts
          ];

          setProducts(nextProducts);
          setStoredProducts(nextProducts);
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
