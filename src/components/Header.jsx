import { copy } from "../data/copy.js";
import { CartIcon } from "./Icons.jsx";

export default function Header({ view, onNavigate, cartCount, onOpenCart }) {
  const isExplore = view === "explore" || view === "product";
  return (
    <header className="header">
      <div className="wrap header-row">
        <button className="brand" onClick={() => onNavigate("home")} aria-label="Maison Brume, accueil">
          Maison Brume <em>atelier</em>
        </button>

        <nav className="nav" aria-label="Navigation principale">
          <button
            className={`nav-link ${view === "home" ? "active" : ""}`}
            onClick={() => onNavigate("home")}
          >
            {copy.nav.home}
          </button>
          <button
            className={`nav-link ${isExplore ? "active" : ""}`}
            onClick={() => onNavigate("explore")}
          >
            {copy.nav.explore}
          </button>
          <button
            className={`nav-link ${view === "help" ? "active" : ""}`}
            onClick={() => onNavigate("help")}
          >
            {copy.nav.help}
          </button>

          <button className="cart-btn" onClick={onOpenCart} aria-label={`${copy.nav.openCart}, ${cartCount} article(s)`}>
            <CartIcon />
            {copy.nav.cart}
            {cartCount > 0 && (
              <span className="cart-count" aria-hidden="true">
                {cartCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
