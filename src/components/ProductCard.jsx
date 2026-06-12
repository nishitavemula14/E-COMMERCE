import { Eye, ShoppingCart, Star } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import { formatCategoryName, getProductCategorySlug } from "../utils/categories.js";
import QuantityControls from "./QuantityControls.jsx";

export default function ProductCard({ product, onView }) {
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } = useCart();
  const cartItem = cartItems.find((item) => item.id === product.id);

  return (
    <article className="product-card">
      <div className="product-image-link">
        <img src={product.thumbnail} alt={product.title} />
      </div>
      <div className="product-card-body">
        <p className="category-label">
          {formatCategoryName(getProductCategorySlug(product))}
        </p>
        <h3>{product.title}</h3>
        <div className="product-meta">
          <span>${product.price}</span>
          <span className="rating">
            <Star size={15} fill="currentColor" />
            {product.rating}
          </span>
        </div>
        {cartItem ? (
          <QuantityControls
            quantity={cartItem.quantity}
            onDecrease={() => decreaseQuantity(product.id)}
            onIncrease={() => increaseQuantity(product.id)}
          />
        ) : (
          <button
            className="add-cart-button"
            type="button"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart size={17} />
            Add to Cart
          </button>
        )}
        <button className="view-button" type="button" onClick={() => onView(product)}>
          <Eye size={17} />
          View
        </button>
      </div>
    </article>
  );
}
