import { Link } from "react-router-dom";
import { formatCategoryName } from "../utils/categories.js";

export default function CategoryLink({ category, itemCount }) {
  return (
    <Link
      className="category-card"
      to={`/category/${encodeURIComponent(category)}`}
    >
      <span>{formatCategoryName(category)}</span>
      <small>{itemCount} items</small>
    </Link>
  );
}
