import { useState } from "react";
import { Search } from "lucide-react";
import { useProducts } from "../context/ProductContext.jsx";
import ProductDetailsModal from "./ProductDetailsModal.jsx";

export default function NavbarSearch() {
  const { products, loading } = useProducts();
  const [productId, setProductId] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState("");

  function handleSearch(event) {
    event.preventDefault();

    const foundProduct = products.find(
      (product) => product.id === Number(productId.trim())
    );

    if (!foundProduct) {
      setSelectedProduct(null);
      setError("ID not found");
      return;
    }

    setError("");
    setProductId("");
    setSelectedProduct(foundProduct);
  }

  return (
    <div className="navbar-search-wrap">
      <form className="navbar-search" onSubmit={handleSearch}>
        <input
          min="1"
          type="number"
          value={productId}
          onChange={(event) => setProductId(event.target.value)}
          placeholder="Search ID"
          aria-label="Search product by ID"
        />
        <button type="submit" disabled={loading} aria-label="Search product">
          <Search size={17} />
        </button>
      </form>
      {error && <span className="navbar-search-error">{error}</span>}

      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
