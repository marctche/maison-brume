// Retour de confirmation non intrusif (add au panier, retrait...).
export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="toast-wrap" aria-live="polite" role="status">
      <div className="toast">
        <span className="dot" aria-hidden="true" />
        {message}
      </div>
    </div>
  );
}
