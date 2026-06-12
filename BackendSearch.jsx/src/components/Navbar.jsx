import { Link } from "react-router-dom";
import BrandLogo from "./BrandLogo.jsx";
import CartButton from "./CartButton.jsx";
import NavbarSearch from "./NavbarSearch.jsx";
import UserProfile from "./UserProfile.jsx";

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="navbar-left">
        <BrandLogo />
        <Link to="/" className="home-nav-button">
          Home
        </Link>
      </div>

      <div className="header-tools">
        <NavbarSearch />
        <CartButton />
        <UserProfile />
      </div>
    </header>
  );
}
