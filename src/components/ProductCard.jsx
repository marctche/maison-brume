import { copy } from "../data/copy.js";
import { prix } from "../data/format.js";
import ProductVisual from "./ProductVisual.jsx";

export default function ProductCard({ product, onOpen, onAdd }) {
  const hasPromo = product.prixFinal < product.prix;
  return (
    <article className="card">
      <button
        className="card-media"
        onClick={() => onOpen(product.id)}
        aria-label={`Voir ${product.nom}`}
      >
        <ProductVisual shape={product.shape} accent={product.hex} />
        <span className="card-flags">
          {hasPromo && <span className="tag tag-promo">-{product.promo} %</span>}
          {product.disponibilite === "Sur commande" && <span className="tag">Sur commande</span>}
        </span>
      </button>

      <div className="card-body">
        <span className="card-meta">
          {product.categorie} · {product.piece}
        </span>
        <button className="card-name" onClick={() => onOpen(product.id)}>
          {product.nom}
        </button>
        <div className="card-price">
          <span className="price-now">{prix(product.prixFinal)}</span>
          {hasPromo && <span className="price-was">{prix(product.prix)}</span>}
        </div>
        <div className="card-foot">
          <span className="card-meta">{product.materiau}</span>
          <button className="btn btn-ghost" onClick={() => onAdd(product)}>
            {copy.explore.quickAdd}
          </button>
        </div>
      </div>
    </article>
  );
}
