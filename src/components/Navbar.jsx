import BrandLogo from "./BrandLogo.jsx";
import CartButton from "./CartButton.jsx";
import UserProfile from "./UserProfile.jsx";

export default function Navbar() {
  return (
    <header className="site-header">
      <BrandLogo />

      <div className="header-tools">
        <CartButton />
        <UserProfile />
      </div>
    </header>
  );
}
