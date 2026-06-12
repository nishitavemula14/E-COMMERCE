import { X } from "lucide-react";
import { formatCategoryName, getProductCategorySlug } from "../utils/categories.js";

export default function ProductDetailsModal({ product, onClose }) {
  if (!product) {
    return null;
  }

  return (
    <>
      <div className="details-overlay" onClick={onClose} />
      <section className="details-modal" aria-modal="true" role="dialog">
        <div className="details-modal-header">
          <div>
            <p className="eyebrow">
              {formatCategoryName(getProductCategorySlug(product))}
            </p>
            <h2>{product.title}</h2>
          </div>
          <button className="icon-button light" type="button" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="details-modal-body">
          <div className="details-modal-media">
            <img src={product.images?.[0] ?? product.thumbnail} alt={product.title} />
          </div>

          <div className="details-list">
            <p className="detail-description">{product.description}</p>
            <dl>
              <div>
                <dt>Price</dt>
                <dd>${product.price}</dd>
              </div>
              <div>
                <dt>Rating</dt>
                <dd>{product.rating}</dd>
              </div>
              <div>
                <dt>Stock</dt>
                <dd>{product.stock}</dd>
              </div>
              <div>
                <dt>Brand</dt>
                <dd>{product.brand ?? "Not listed"}</dd>
              </div>
              <div>
                <dt>SKU</dt>
                <dd>{product.sku ?? "Not listed"}</dd>
              </div>
              <div>
                <dt>Warranty</dt>
                <dd>{product.warrantyInformation ?? "Not listed"}</dd>
              </div>
              <div>
                <dt>Shipping</dt>
                <dd>{product.shippingInformation ?? "Not listed"}</dd>
              </div>
              <div>
                <dt>Return Policy</dt>
                <dd>{product.returnPolicy ?? "Not listed"}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
