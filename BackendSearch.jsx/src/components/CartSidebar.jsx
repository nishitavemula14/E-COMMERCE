import { Link } from "react-router-dom";
import { useState } from "react";
import { ShoppingCart, Trash2, X } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import ProductDetailsModal from "./ProductDetailsModal.jsx";
import QuantityControls from "./QuantityControls.jsx";

export default function CartSidebar() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const {
    cartItems,
    subtotal,
    isCartOpen,
    closeCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
  } = useCart();

  function handleCartAction(event, action) {
    event.stopPropagation();
    action();
  }

  return (
    <>
      <div
        className={`cart-overlay ${isCartOpen ? "show" : ""}`}
        onClick={closeCart}
      />
      <aside className={`cart-sidebar ${isCartOpen ? "open" : ""}`}>
        <div className="cart-sidebar-header">
          <div>
            <p className="eyebrow">Cart</p>
            <h2>Selected Products</h2>
          </div>
          <button className="icon-button light" type="button" onClick={closeCart}>
            <X size={18} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <ShoppingCart size={30} />
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <article
                  className="cart-item clickable-cart-item"
                  key={item.id}
                  onClick={() => setSelectedProduct(item)}
                  role="button"
                  tabIndex="0"
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedProduct(item);
                    }
                  }}
                >
                  <img src={item.thumbnail} alt={item.title} />
                  <div>
                    <h3>{item.title}</h3>
                    <p>${item.price}</p>
                    <QuantityControls
                      quantity={item.quantity}
                      onDecrease={(event) =>
                        handleCartAction(event, () => decreaseQuantity(item.id))
                      }
                      onIncrease={(event) =>
                        handleCartAction(event, () => increaseQuantity(item.id))
                      }
                    />
                  </div>
                  <button
                    className="delete-button"
                    type="button"
                    onClick={(event) =>
                      handleCartAction(event, () => removeFromCart(item.id))
                    }
                    aria-label={`Remove ${item.title}`}
                  >
                    <Trash2 size={17} />
                  </button>
                </article>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Subtotal</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>
              <Link to="/checkout" className="primary-button" onClick={closeCart}>
                Checkout
              </Link>
            </div>
          </>
        )}
      </aside>
      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}
