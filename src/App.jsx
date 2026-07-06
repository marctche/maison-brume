import { useEffect, useMemo, useRef, useState } from "react";
import { copy } from "./data/copy.js";
import { findProduct } from "./data/products.js";
import Header from "./components/Header.jsx";
import PromoBanner from "./components/PromoBanner.jsx";
import Home from "./components/Home.jsx";
import ExploreView from "./components/ExploreView.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import CheckoutFlow from "./components/CheckoutFlow.jsx";
import SurveyView from "./components/SurveyView.jsx";
import HelpView from "./components/HelpView.jsx";
import Footer from "./components/Footer.jsx";
import Toast from "./components/Toast.jsx";

const FREE_SHIPPING = 800;
const SHIPPING_FEE = 60;

export default function App() {
  const [view, setView] = useState("home");
  const [selectedId, setSelectedId] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState("");
  const toastTimer = useRef(null);
  const mainRef = useRef(null);

  // Remonter en haut a chaque changement de vue.
  useEffect(() => {
    mainRef.current?.scrollTo?.(0, 0);
    window.scrollTo(0, 0);
  }, [view, selectedId]);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const showToast = (message) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2600);
  };

  const navigate = (next) => {
    setCartOpen(false);
    setView(next);
  };

  const openProduct = (id) => {
    setSelectedId(id);
    setView("product");
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((l) => l.id === product.id);
      if (found) return prev.map((l) => (l.id === product.id ? { ...l, qty: l.qty + 1 } : l));
      return [...prev, { id: product.id, qty: 1 }];
    });
    showToast(`${product.nom} — ${copy.product.added}`);
  };

  const setQty = (id, qty) => {
    if (qty <= 0) {
      removeItem(id);
      return;
    }
    setCart((prev) => prev.map((l) => (l.id === id ? { ...l, qty } : l)));
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((l) => l.id !== id));
    showToast(copy.cart.removed);
  };

  const items = useMemo(
    () => cart.map((l) => ({ product: findProduct(l.id), qty: l.qty })).filter((i) => i.product),
    [cart],
  );
  const cartCount = cart.reduce((n, l) => n + l.qty, 0);
  const subtotal = items.reduce((n, { product, qty }) => n + product.prixFinal * qty, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  const selected = selectedId ? findProduct(selectedId) : null;

  return (
    <div className="shell">
      <a className="skip-link" href="#contenu">Aller au contenu</a>

      {view === "home" && <PromoBanner onNavigate={navigate} />}

      <Header
        view={view}
        onNavigate={navigate}
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
      />

      <main id="contenu" ref={mainRef}>
        {view === "home" && (
          <Home onNavigate={navigate} onOpenProduct={openProduct} onAdd={addToCart} />
        )}
        {view === "explore" && <ExploreView onOpenProduct={openProduct} onAdd={addToCart} />}
        {view === "product" && (
          <ProductDetail
            product={selected}
            onBack={() => navigate("explore")}
            onAdd={addToCart}
            onNavigate={navigate}
          />
        )}
        {view === "checkout" && (
          <CheckoutFlow
            items={items}
            subtotal={subtotal}
            shipping={shipping}
            total={total}
            onPaid={() => setCart([])}
            onNavigate={navigate}
          />
        )}
        {view === "survey" && <SurveyView onNavigate={navigate} />}
        {view === "help" && <HelpView />}
      </main>

      <Footer onNavigate={navigate} />

      {cartOpen && (
        <CartDrawer
          items={items}
          subtotal={subtotal}
          shipping={shipping}
          total={total}
          onQty={setQty}
          onRemove={removeItem}
          onClose={() => setCartOpen(false)}
          onContinue={() => navigate("explore")}
          onCheckout={() => navigate("checkout")}
        />
      )}

      <Toast message={toast} />
    </div>
  );
}
