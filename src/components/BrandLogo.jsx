import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

export default function BrandLogo() {
  return (
    <Link to="/" className="brand" aria-label="Commerce Desk home">
      <span className="brand-mark">
        <ShoppingBag size={22} />
      </span>
      <span>Commerce Desk</span>
    </Link>
  );
}
