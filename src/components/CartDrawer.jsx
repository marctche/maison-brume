import { useEffect, useRef } from "react";
import { copy } from "../data/copy.js";
import { prix } from "../data/format.js";
import ProductVisual from "./ProductVisual.jsx";

export default function CartDrawer({ items, subtotal, shipping, total, onQty, onRemove, onClose, onCheckout, onContinue }) {
  const closeRef = useRef(null);

  // Focus initial + fermeture au clavier (Echap).
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      <div className="overlay" onClick={onClose} />
      <div className="drawer" role="dialog" aria-modal="true" aria-label={copy.cart.title}>
        <div className="drawer-head">
          <h2 style={{ fontSize: "1.2rem" }}>{copy.cart.title}</h2>
          <button className="icon-btn" onClick={onClose} ref={closeRef} aria-label="Fermer le panier">
            ×
          </button>
        </div>

        <div className="drawer-body">
          {items.length === 0 ? (
            <div style={{ padding: "32px 0", textAlign: "center", color: "var(--sage-dust)" }}>
              <p>{copy.cart.empty}</p>
              <button className="btn btn-ghost" onClick={onContinue} style={{ marginTop: "16px" }}>
                {copy.cart.emptyCta}
              </button>
            </div>
          ) : (
            items.map(({ product, qty }) => (
              <div className="line-item" key={product.id}>
                <div className="line-thumb">
                  <ProductVisual shape={product.shape} accent={product.hex} />
                </div>
                <div>
                  <div className="line-name">{product.nom}</div>
                  <div className="card-meta">{prix(product.prixFinal)}</div>
                  <div className="qty">
                    <button onClick={() => onQty(product.id, qty - 1)} aria-label={`Diminuer la quantite de ${product.nom}`}>
                      −
                    </button>
                    <span aria-label={copy.cart.quantity}>{qty}</span>
                    <button onClick={() => onQty(product.id, qty + 1)} aria-label={`Augmenter la quantite de ${product.nom}`}>
                      +
                    </button>
                  </div>
                  <button className="line-remove" onClick={() => onRemove(product.id)}>
                    {copy.cart.remove}
                  </button>
                </div>
                <strong>{prix(product.prixFinal * qty)}</strong>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="drawer-foot">
            <div className="sum-row">
              <span>{copy.cart.subtotal}</span>
              <span>{prix(subtotal)}</span>
            </div>
            <div className="sum-row">
              <span>{copy.cart.shipping}</span>
              <span>{shipping === 0 ? copy.cart.shippingFree : prix(shipping)}</span>
            </div>
            <div className="sum-row total">
              <span>{copy.cart.total}</span>
              <span>{prix(total)}</span>
            </div>
            <button className="btn btn-primary btn-block" onClick={onCheckout}>
              {copy.cart.checkout}
            </button>
            <button className="btn btn-quiet" onClick={onClose}>
              {copy.cart.continue}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
