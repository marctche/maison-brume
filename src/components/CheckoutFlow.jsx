import { useState } from "react";
import { copy } from "../data/copy.js";
import { prix } from "../data/format.js";
import { BackIcon } from "./Icons.jsx";

const c = copy.checkout;

// — Validation par champ, messages en clair (recuperation d'erreur) —
const validators = {
  name: (v) => (v.trim() ? "" : c.errors.required),
  email: (v) => (!v.trim() ? c.errors.required : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : c.errors.email),
  address: (v) => (v.trim() ? "" : c.errors.required),
  city: (v) => (v.trim() ? "" : c.errors.required),
  postal: (v) => (!v.trim() ? c.errors.required : /^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/.test(v) ? "" : c.errors.postal),
  card: (v) => (!v.trim() ? c.errors.required : /^\d{16}$/.test(v.replace(/\s/g, "")) ? "" : c.errors.card),
  expiry: (v) => (!v.trim() ? c.errors.required : /^\d{2}\/\d{2}$/.test(v) ? "" : c.errors.expiry),
  cvc: (v) => (!v.trim() ? c.errors.required : /^\d{3}$/.test(v) ? "" : c.errors.cvc),
};

const STEP_FIELDS = [[], ["name", "email", "address", "city", "postal"], ["card", "expiry", "cvc"], []];

function Field({ id, label, value, error, hint, onChange, onBlur, ...rest }) {
  return (
    <div className={`field ${error ? "invalid" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        onBlur={() => onBlur(id)}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-err` : undefined}
        {...rest}
      />
      {hint && !error && <p className="field-hint">{hint}</p>}
      {error && (
        <p className="field-error" id={`${id}-err`}>
          <span aria-hidden="true">!</span> {error}
        </p>
      )}
    </div>
  );
}

export default function CheckoutFlow({ items, subtotal, shipping, total, onPaid, onNavigate }) {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({ name: "", email: "", address: "", city: "", postal: "", card: "", expiry: "", cvc: "" });
  const [errors, setErrors] = useState({});

  const setValue = (id, v) => {
    setValues((prev) => ({ ...prev, [id]: v }));
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: validators[id](v) }));
  };
  const blur = (id) => setErrors((prev) => ({ ...prev, [id]: validators[id](values[id]) }));

  const validateStep = () => {
    const fields = STEP_FIELDS[step];
    const next = {};
    let ok = true;
    for (const f of fields) {
      const msg = validators[f](values[f]);
      next[f] = msg;
      if (msg) ok = false;
    }
    setErrors((prev) => ({ ...prev, ...next }));
    return ok;
  };

  const goNext = () => {
    if (!validateStep()) return;
    if (step === 2) {
      onPaid();
      setStep(3);
      return;
    }
    setStep((s) => Math.min(s + 1, 3));
  };
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const stepState = (i) => (i < step ? "done" : i === step ? "current" : "todo");
  const stateLabel = { done: c.stateDone, current: c.stateCurrent, todo: c.stateTodo };

  return (
    <section className="wrap section">
      <span className="eyebrow muted">{c.title}</span>

      {/* Fil de progression : ce qui est fait, en cours, a venir. */}
      <ol className="stepper" aria-label="Progression de la commande">
        {c.steps.map((name, i) => {
          const st = stepState(i);
          return (
            <li className={`step ${st}`} key={name} aria-current={st === "current" ? "step" : undefined}>
              <span className="step-state">{stateLabel[st]}</span>
              <div className="step-name">{name}</div>
            </li>
          );
        })}
      </ol>

      {step === 3 ? (
        <div className="panel" style={{ maxWidth: "620px", textAlign: "center" }}>
          <h2 className="h2">{c.confirmTitle}</h2>
          <p className="lede" style={{ margin: "12px auto 24px" }}>{c.confirmText}</p>
          <button className="btn btn-primary" onClick={() => onNavigate("survey")}>
            {c.confirmSurvey}
          </button>
          <div>
            <button className="btn btn-quiet" onClick={() => onNavigate("home")} style={{ marginTop: "12px" }}>
              {c.confirmHome}
            </button>
          </div>
        </div>
      ) : (
        <div className="checkout">
          <div className="panel">
            {step === 0 && (
              <>
                <h2 style={{ fontSize: "1.4rem", marginBottom: "6px" }}>{c.reviewTitle}</h2>
                <p className="field-hint" style={{ marginBottom: "16px" }}>{c.reviewText}</p>
                {items.map(({ product, qty }) => (
                  <div className="summary-line" key={product.id}>
                    <span>{qty} × {product.nom}</span>
                    <span>{prix(product.prixFinal * qty)}</span>
                  </div>
                ))}
              </>
            )}

            {step === 1 && (
              <>
                <h2 style={{ fontSize: "1.4rem", marginBottom: "6px" }}>{c.contactTitle}</h2>
                <p className="field-hint" style={{ marginBottom: "16px" }}>{c.contactText}</p>
                <Field id="name" label={c.fields.name} value={values.name} error={errors.name} onChange={setValue} onBlur={blur} autoComplete="name" />
                <Field id="email" label={c.fields.email} value={values.email} error={errors.email} onChange={setValue} onBlur={blur} type="email" autoComplete="email" />
                <Field id="address" label={c.fields.address} value={values.address} error={errors.address} onChange={setValue} onBlur={blur} autoComplete="street-address" />
                <div className="row-2">
                  <Field id="city" label={c.fields.city} value={values.city} error={errors.city} onChange={setValue} onBlur={blur} autoComplete="address-level2" />
                  <Field id="postal" label={c.fields.postal} value={values.postal} error={errors.postal} hint="Ex. H2X 1Y4" onChange={setValue} onBlur={blur} autoComplete="postal-code" />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 style={{ fontSize: "1.4rem", marginBottom: "6px" }}>{c.paymentTitle}</h2>
                <p className="field-hint" style={{ marginBottom: "16px" }}>{c.paymentText}</p>
                <Field id="card" label={c.fields.card} value={values.card} error={errors.card} hint="16 chiffres" onChange={setValue} onBlur={blur} inputMode="numeric" autoComplete="cc-number" />
                <div className="row-2">
                  <Field id="expiry" label={c.fields.expiry} value={values.expiry} error={errors.expiry} hint="MM/AA" onChange={setValue} onBlur={blur} autoComplete="cc-exp" />
                  <Field id="cvc" label={c.fields.cvc} value={values.cvc} error={errors.cvc} hint="3 chiffres" onChange={setValue} onBlur={blur} inputMode="numeric" autoComplete="cc-csc" />
                </div>
              </>
            )}

            <div className="form-actions">
              {step > 0 ? (
                <button className="btn btn-ghost" onClick={goBack}>
                  <BackIcon /> {c.back}
                </button>
              ) : (
                <button className="btn btn-ghost" onClick={() => onNavigate("explore")}>
                  <BackIcon /> {copy.cart.continue}
                </button>
              )}
              <button className="btn btn-primary" onClick={goNext}>
                {step === 2 ? c.pay : c.next}
              </button>
            </div>
          </div>

          <aside className="summary" aria-label={c.summaryTitle}>
            <h3 style={{ fontSize: "1rem", marginBottom: "12px" }}>{c.summaryTitle}</h3>
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
          </aside>
        </div>
      )}
    </section>
  );
}
