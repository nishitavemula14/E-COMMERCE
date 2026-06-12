import { Boxes } from "lucide-react";
import CategoryGrid from "../components/CategoryGrid.jsx";
import StatusView from "../components/StatusView.jsx";
import { useProducts } from "../context/ProductContext.jsx";

export default function Home() {
  const { categories, productsByCategory, loading, error } = useProducts();

  return (
    <section className="home-page">
      <div className="home-content">
        <StatusView loading={loading} error={error} />

        {!loading && !error && (
          <section>
            <div className="section-heading">
              <div>
                <h2>CATEGORIES</h2>
              </div>
              <Boxes size={24} />
            </div>

            <CategoryGrid
              categories={categories}
              productsByCategory={productsByCategory}
            />
          </section>
        )}
      </div>
    </section>
  );
}
