import { Navigate, Route, Routes } from "react-router-dom";
import CartSidebar from "./components/CartSidebar.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import ProductListing from "./pages/ProductListing.jsx";
import Checkout from "./pages/Checkout.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryName" element={<ProductListing />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <CartSidebar />
    </div>
  );
}
