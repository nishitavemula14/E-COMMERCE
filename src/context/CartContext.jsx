import { createContext, useContext, useMemo, useState } from "react";
import { useLocalStorage } from "./Localstorage.jsx";

const CartContext = createContext(null);
const CART_STORAGE_KEY = "debounce-cart";
const LAST_CATEGORY_STORAGE_KEY = "debounce-last-category";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useLocalStorage(CART_STORAGE_KEY, []);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastCategory, setLastCategory] = useLocalStorage(
    LAST_CATEGORY_STORAGE_KEY,
    ""
  );

  function addToCart(product) {
    setCartItems((items) => {
      const existingItem = items.find((item) => item.id === product.id);

      if (existingItem) {
        return items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...items, { ...product, quantity: 1 }];
    });
  }

  function increaseQuantity(productId) {
    setCartItems((items) =>
      items.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function decreaseQuantity(productId) {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(productId) {
    setCartItems((items) => items.filter((item) => item.id !== productId));
  }

  const totalItems = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  const value = {
    cartItems,
    totalItems,
    subtotal,
    isCartOpen,
    lastCategory,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    openCart: () => setIsCartOpen(true),
    closeCart: () => setIsCartOpen(false),
    setLastCategory
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
