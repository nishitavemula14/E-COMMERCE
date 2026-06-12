import ProductCard from "./ProductCard.jsx";

export default function ProductGrid({ products, onViewProduct }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          product={product}
          key={product.id}
          onView={onViewProduct}
        />
      ))}
    </div>
  );
}
