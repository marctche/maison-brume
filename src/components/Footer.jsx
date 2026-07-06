import { copy } from "../data/copy.js";

export default function Footer({ onNavigate }) {
  const f = copy.footer;
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <p className="footer-brand" style={{ fontWeight: 700, fontSize: "1.1rem" }}>
            Maison Brume <em>atelier</em>
          </p>
          <p className="lede" style={{ marginTop: "8px" }}>{f.tagline}</p>
        </div>

        <div>
          <h4>{f.exploreTitle}</h4>
          <button className="footer-link" onClick={() => onNavigate("explore")}>{copy.nav.explore}</button>
          <button className="footer-link" onClick={() => onNavigate("home")}>{copy.nav.home}</button>
        </div>

        <div>
          <h4>{f.helpTitle}</h4>
          <button className="footer-link" onClick={() => onNavigate("help")}>{copy.nav.help}</button>
          {/* Le sondage est aussi accessible ici, hors parcours d'achat. */}
          <button className="footer-link" onClick={() => onNavigate("survey")}>{f.surveyCta}</button>
        </div>

        <div>
          <h4>{f.contactTitle}</h4>
          <p className="lede">{f.email}</p>
          <p className="lede" style={{ marginTop: "12px" }}>{f.surveyPrompt}</p>
          <button className="btn btn-ghost" onClick={() => onNavigate("survey")} style={{ marginTop: "8px" }}>
            {f.surveyCta}
          </button>
        </div>
      </div>

      <div className="wrap footer-bottom">
        <span>{f.rights}</span>
        <span>© {new Date().getFullYear()} Maison Brume</span>
      </div>
    </footer>
  );
}
