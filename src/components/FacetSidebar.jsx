import { facetGroups, priceBounds } from "../data/facets.js";
import { countForOption } from "../data/filter.js";
import { copy } from "../data/copy.js";
import { prix } from "../data/format.js";

export default function FacetSidebar({ products, filters, priceMax, query, onToggle, onPrice, open, onClose }) {
  return (
    <aside className={`facets ${open ? "open" : ""}`} aria-label={copy.explore.filtersTitle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <strong>{copy.explore.filtersTitle}</strong>
        <button className="icon-btn filter-toggle" onClick={onClose} aria-label={copy.explore.closeFilters}>
          ×
        </button>
      </div>

      {facetGroups.map((group) => (
        <fieldset className="facet-group" key={group.key}>
          <legend className="facet-legend">{group.label}</legend>

          {group.type === "swatch" ? (
            <div className="swatches">
              {group.options.map((opt) => {
                const active = filters[group.key].includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    className="swatch"
                    aria-pressed={active}
                    onClick={() => onToggle(group.key, opt.value)}
                  >
                    <span className="swatch-dot" style={{ background: opt.hex }} />
                    {opt.value}
                  </button>
                );
              })}
            </div>
          ) : (
            group.options.map((value) => {
              const active = filters[group.key].includes(value);
              const count = countForOption(products, filters, priceMax, query, group.key, value);
              const disabled = count === 0 && !active;
              return (
                <label className={`facet-opt ${disabled ? "disabled" : ""}`} key={value}>
                  <input
                    type="checkbox"
                    checked={active}
                    disabled={disabled}
                    onChange={() => onToggle(group.key, value)}
                  />
                  {value}
                  <span className="facet-count">{count}</span>
                </label>
              );
            })
          )}
        </fieldset>
      ))}

      <fieldset className="facet-group">
        <legend className="facet-legend">{copy.explore.priceLabel}</legend>
        <input
          className="range"
          type="range"
          min={priceBounds.min}
          max={priceBounds.max}
          step={priceBounds.step}
          value={priceMax}
          onChange={(e) => onPrice(Number(e.target.value))}
          aria-label={copy.explore.priceLabel}
        />
        <div className="range-row">
          <span>{prix(priceBounds.min)}</span>
          <span>
            <strong>{prix(priceMax)}</strong>
          </span>
        </div>
      </fieldset>
    </aside>
  );
}
