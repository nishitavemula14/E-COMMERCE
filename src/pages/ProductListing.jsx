import { useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PageNavigation from "../components/PageNavigation.jsx";
import ProductDetailsModal from "../components/ProductDetailsModal.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import StatusView from "../components/StatusView.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useProducts } from "../context/ProductContext.jsx";
import { useEffect, useState } from "react";

export default function ProductListing() {
  const { categoryName } = useParams();
  const decodedCategory = decodeURIComponent(categoryName ?? "");
  const { productsByCategory, loading, error } = useProducts();
  const { setLastCategory } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const products = productsByCategory[decodedCategory] ?? [];

  useEffect(() => {
    setLastCategory(decodedCategory);
  }, [decodedCategory, setLastCategory]);

  return (
    <section className="content-page">
      <PageNavigation
        backIcon={<ArrowLeft size={17} />}
        backLabel="Back to Page 1"
        backTo="/"
        nextIcon={<ArrowRight size={17} />}
        nextLabel="Next"
        nextTo="/checkout"
      />

      <div className="section-heading listing-heading">
        <div>
          <h1>PRODUCTS</h1>
        </div>
      </div>

      <StatusView loading={loading} error={error} />

      {!loading && !error && products.length === 0 && (
        <p className="status">No products found for this category.</p>
      )}

      <ProductGrid products={products} onViewProduct={setSelectedProduct} />
      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
