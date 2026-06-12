import { Minus, Plus } from "lucide-react";

export default function QuantityControls({ quantity, onDecrease, onIncrease }) {
  return (
    <div className="quantity-controls" aria-label="Product quantity controls">
      <button type="button" onClick={onDecrease} aria-label="Decrease quantity">
        <Minus size={16} />
      </button>
      <span>{quantity}</span>
      <button type="button" onClick={onIncrease} aria-label="Increase quantity">
        <Plus size={16} />
      </button>
    </div>
  );
}
