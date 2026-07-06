import { useState } from "react";
import { copy } from "../data/copy.js";

// Aide et documentation : reponses courtes, orientees tache.
export default function HelpView() {
  const [open, setOpen] = useState(0);
  const h = copy.help;

  return (
    <section className="wrap section">
      <span className="eyebrow muted">{h.eyebrow}</span>
      <h1 className="h2">
        {h.title} <em>{h.accent}</em>
      </h1>
      <p className="lede" style={{ margin: "12px 0 32px" }}>{h.intro}</p>

      <div className="faq">
        {h.faq.map((item, i) => {
          const isOpen = open === i;
          return (
            <div className="faq-item" key={item.q}>
              <button
                className="faq-q"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                {item.q}
                <span className="mark" aria-hidden="true">{isOpen ? "–" : "+"}</span>
              </button>
              {isOpen && <p className="faq-a">{item.a}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
