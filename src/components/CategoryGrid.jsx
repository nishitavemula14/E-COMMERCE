import CategoryLink from "./CategoryLink.jsx";

export default function CategoryGrid({ categories, productsByCategory }) {
  return (
    <div className="category-grid">
      {categories.map((category) => (
        <CategoryLink
          category={category}
          itemCount={productsByCategory[category]?.length ?? 0}
          key={category}
        />
      ))}
    </div>
  );
}
