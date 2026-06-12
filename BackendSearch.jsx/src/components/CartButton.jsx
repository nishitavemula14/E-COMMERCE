import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";

export default function CartButton() {
  const { openCart, totalItems } = useCart();

  return (
    <button className="cart-button" type="button" onClick={openCart}>
      <ShoppingCart size={18} />
      <span>{totalItems}</span>
    </button>
  );
}
