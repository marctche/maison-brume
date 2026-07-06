import { useState } from "react";
import { copy } from "../data/copy.js";

// Objectif de communication : ETABLIR UNE CONNEXION.
// Ton chaleureux, phrases interrogatives, bascule au « je ».
export default function SurveyView({ onNavigate }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [ease, setEase] = useState("");
  const [comment, setComment] = useState("");
  const [sent, setSent] = useState(false);

  const s = copy.survey;
  const shown = hover || rating;

  if (sent) {
    return (
      <section className="wrap section">
        <div className="survey-card" style={{ textAlign: "center" }}>
          <span className="eyebrow muted">{s.eyebrow}</span>
          <h1 className="h2">{s.thanksTitle}</h1>
          <p className="lede" style={{ margin: "12px auto 24px" }}>{s.thanksText}</p>
          <button className="btn btn-primary" onClick={() => onNavigate("home")}>
            {s.thanksHome}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="wrap section">
      <div className="survey-card">
        <span className="eyebrow muted">{s.eyebrow}</span>
        <h1 className="h2">
          {s.title} <em>{s.accent}</em>
        </h1>
        <p className="lede" style={{ margin: "12px 0 24px" }}>{s.intro}</p>

        <fieldset style={{ border: "none", padding: 0, margin: "0 0 24px" }}>
          <legend className="field" style={{ fontWeight: 600 }}>{s.ratingLabel}</legend>
          <div className="rating" role="radiogroup" aria-label={s.ratingLabel}>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                role="radio"
                aria-checked={rating === n}
                aria-label={`${n} — ${s.ratingHints[n - 1]}`}
                className={`star ${n <= shown ? "on" : ""}`}
                onClick={() => setRating(n)}
                onMouseEnter={() => setHover(n)}
                onMouseLeave={() => setHover(0)}
              >
                ★
              </button>
            ))}
          </div>
          <p className="rating-hint" aria-live="polite">
            {shown ? s.ratingHints[shown - 1] : ""}
          </p>
        </fieldset>

        <fieldset style={{ border: "none", padding: 0, margin: "0 0 24px" }}>
          <legend className="field" style={{ fontWeight: 600 }}>{s.easeLabel}</legend>
          {s.easeOptions.map((opt) => (
            <label className={`choice ${ease === opt ? "sel" : ""}`} key={opt}>
              <input type="radio" name="ease" value={opt} checked={ease === opt} onChange={() => setEase(opt)} />
              {opt}
            </label>
          ))}
        </fieldset>

        <div className="field">
          <label htmlFor="comment">{s.commentLabel}</label>
          <textarea
            id="comment"
            rows="3"
            placeholder={s.commentPlaceholder}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <div className="form-actions">
          <button className="btn btn-quiet" onClick={() => onNavigate("home")}>
            {s.skip}
          </button>
          <button className="btn btn-primary" onClick={() => setSent(true)} disabled={rating === 0}>
            {s.submit}
          </button>
        </div>
      </div>
    </section>
  );
}
