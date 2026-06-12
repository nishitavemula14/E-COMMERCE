import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import QuantityControls from "../components/QuantityControls.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function Checkout() {
  const {
    cartItems,
    subtotal,
    lastCategory,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
  } = useCart();
  const backPath = lastCategory
    ? `/category/${encodeURIComponent(lastCategory)}`
    : "/";

  return (
    <section className="content-page checkout-page">
      <Link to={backPath} className="back-link">
        <ArrowLeft size={17} />
        Back to Page 2
      </Link>

      <div className="section-heading checkout-heading">
        <div>
          <h1>CHECKOUT</h1>
        </div>
        <CheckCircle2 size={28} />
      </div>

      {cartItems.length === 0 ? (
        <p className="status">Your cart is empty. Add products before checkout.</p>
      ) : (
        <div className="checkout-layout">
          <div className="checkout-items">
            {cartItems.map((item) => (
              <article className="checkout-item" key={item.id}>
                <img src={item.thumbnail} alt={item.title} />
                <div>
                  <h2>{item.title}</h2>
                  <p>${item.price} each</p>
                  <QuantityControls
                    quantity={item.quantity}
                    onDecrease={() => decreaseQuantity(item.id)}
                    onIncrease={() => increaseQuantity(item.id)}
                  />
                </div>
                <div className="line-total">
                  <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                  <button type="button" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>

          <aside className="checkout-summary">
            <h2>Order Summary</h2>
            <div>
              <span>Items</span>
              <strong>
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </strong>
            </div>
            <div>
              <span>Subtotal</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>
            <div>
              <span>Shipping</span>
              <strong>Free</strong>
            </div>
            <div className="grand-total">
              <span>Total</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>
            <button className="primary-button" type="button">
              Place order
            </button>
          </aside>
        </div>
      )}
    </section>
  );
}
