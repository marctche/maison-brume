import { copy } from "../data/copy.js";
import { prix } from "../data/format.js";
import ProductVisual from "./ProductVisual.jsx";
import { BackIcon } from "./Icons.jsx";

export default function ProductDetail({ product, onBack, onAdd, onNavigate }) {
  if (!product) return null;
  const hasPromo = product.prixFinal < product.prix;
  const enStock = product.disponibilite === "En stock";
  const d = product.dimensions;

  return (
    <section className="wrap" style={{ paddingBottom: "64px" }}>
      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <button onClick={() => onNavigate("home")}>{copy.nav.home}</button>
        <span aria-hidden="true">/</span>
        <button onClick={onBack}>{copy.nav.explore}</button>
        <span aria-hidden="true">/</span>
        <span>{product.nom}</span>
      </nav>

      <div className="pdp">
        <div className="pdp-media">
          <ProductVisual shape={product.shape} accent={product.hex} />
        </div>

        <div>
          <span className="card-meta">
            {product.categorie} · {product.style}
          </span>
          <h1 className="pdp-title">{product.nom}</h1>

          <div className="pdp-price">
            <span>{prix(product.prixFinal)}</span>
            {hasPromo && <span className="price-was">{prix(product.prix)}</span>}
            {hasPromo && <span className="tag tag-promo">-{product.promo} %</span>}
          </div>

          <p className={`avail ${enStock ? "" : "order"}`}>
            <span className="dot" />
            {enStock ? copy.product.inStock : copy.product.madeToOrder}
          </p>

          {/* Ton INFORMATIF, declaratif. */}
          <p style={{ maxWidth: "48ch", color: "var(--pine-shadow)" }}>{product.description}</p>

          <button
            className="btn btn-primary btn-block"
            style={{ marginTop: "24px" }}
            onClick={() => onAdd(product)}
          >
            {copy.product.addToCart} — {prix(product.prixFinal)}
          </button>

          <button className="btn btn-quiet" onClick={onBack} style={{ marginTop: "12px" }}>
            <BackIcon /> {copy.product.back}
          </button>

          <dl className="spec" style={{ marginTop: "24px" }}>
            <dt>{copy.product.room}</dt>
            <dd>{product.piece}</dd>
          </dl>
          <dl className="spec">
            <dt>{copy.product.material}</dt>
            <dd>
              {product.materiau} · {product.couleur}
            </dd>
          </dl>
          <dl className="spec">
            <dt>{copy.product.dimensions}</dt>
            <dd>
              {d.largeur} × {d.profondeur} × {d.hauteur} cm (l × p × h)
            </dd>
          </dl>
          <dl className="spec">
            <dt>{copy.product.care}</dt>
            <dd>{product.entretien}</dd>
          </dl>
        </div>
      </div>
    </section>
  );
}
