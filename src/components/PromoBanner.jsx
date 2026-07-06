import { copy } from "../data/copy.js";
import { ArrowIcon } from "./Icons.jsx";

// Objectif de communication : INCITER A L'ACTION.
// Ton promotionnel, phrase exclamative, verbe a l'imperatif.
export default function PromoBanner({ onNavigate }) {
  return (
    <div className="promo">
      <div className="wrap promo-row">
        <span className="eyebrow">{copy.promo.eyebrow}</span>
        <p className="promo-text">
          <strong>Jusqu'a -20 %</strong> sur une selection de canapes et de tables. Profitez-en avant la fin du mois !
        </p>
        <button className="btn btn-primary" onClick={() => onNavigate("explore")}>
          {copy.promo.cta} <ArrowIcon />
        </button>
      </div>
    </div>
  );
}
