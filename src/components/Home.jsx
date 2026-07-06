import { copy } from "../data/copy.js";
import { products } from "../data/products.js";
import ProductCard from "./ProductCard.jsx";
import ProductVisual from "./ProductVisual.jsx";
import { ArrowIcon } from "./Icons.jsx";

export default function Home({ onNavigate, onOpenProduct, onAdd }) {
  const featured = products.filter((p) => p.prixFinal < p.prix).slice(0, 3);

  return (
    <>
      <section className="wrap hero">
        <div>
          <span className="eyebrow">{copy.hero.eyebrow}</span>
          <h1 className="display">
            {copy.hero.headline} <em>{copy.hero.accent}</em>
          </h1>
          <p className="lede" style={{ marginTop: "16px" }}>
            {copy.hero.text}
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => onNavigate("explore")}>
              {copy.hero.ctaPrimary} <ArrowIcon />
            </button>
            <button className="btn btn-ghost" onClick={() => onNavigate("help")}>
              {copy.hero.ctaSecondary}
            </button>
          </div>
        </div>
        <div className="hero-art">
          <ProductVisual shape="sofa" accent="#8fa393" />
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <div>
            <span className="eyebrow muted">{copy.promo.eyebrow}</span>
            <h2 className="h2">
              En ce moment, <em>en promotion</em>
            </h2>
          </div>
          <button className="btn btn-quiet" onClick={() => onNavigate("explore")}>
            Tout explorer <ArrowIcon />
          </button>
        </div>
        <div className="grid">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={onOpenProduct} onAdd={onAdd} />
          ))}
        </div>
      </section>

      {/* Effet de conversation : bascule au « je » (etablir une connexion). */}
      <section className="wrap section" style={{ maxWidth: "760px" }}>
        <span className="eyebrow muted">{copy.founder.eyebrow}</span>
        <p className="h2" style={{ fontWeight: 400, lineHeight: 1.25 }}>
          <em>“{copy.founder.text}”</em>
        </p>
      </section>
    </>
  );
}
