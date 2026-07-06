import { useMemo, useState } from "react";
import { products } from "../data/products.js";
import { facetGroups, priceBounds, sortOptions } from "../data/facets.js";
import { copy } from "../data/copy.js";
import {
  filterProducts,
  sortProducts,
  emptyFilters,
  countActive,
} from "../data/filter.js";
import ProductCard from "./ProductCard.jsx";
import FacetSidebar from "./FacetSidebar.jsx";

const GROUP_LABEL = Object.fromEntries(facetGroups.map((g) => [g.key, g.label]));

export default function ExploreView({ onOpenProduct, onAdd }) {
  const [filters, setFilters] = useState(emptyFilters);
  const [priceMax, setPriceMax] = useState(priceBounds.max);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("pertinence");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggle = (key, value) => {
    setFilters((prev) => {
      const set = prev[key];
      const next = set.includes(value) ? set.filter((v) => v !== value) : [...set, value];
      return { ...prev, [key]: next };
    });
  };

  const clearAll = () => {
    setFilters(emptyFilters());
    setPriceMax(priceBounds.max);
    setQuery("");
  };

  const results = useMemo(() => {
    return sortProducts(filterProducts(products, filters, priceMax, query), sort);
  }, [filters, priceMax, query, sort]);

  const active = countActive(filters);
  const priceActive = priceMax < priceBounds.max;

  // Puces retirables : rend visibles les choix passes (reconnaissance, pas rappel).
  const chips = [];
  for (const g of facetGroups) {
    for (const v of filters[g.key]) {
      chips.push({ key: g.key, value: v, label: `${GROUP_LABEL[g.key]} : ${v}` });
    }
  }

  return (
    <section className="wrap" style={{ paddingBottom: "48px" }}>
      <div style={{ paddingTop: "32px" }}>
        <span className="eyebrow muted">{copy.explore.eyebrow}</span>
        <h1 className="h2">
          {copy.explore.title} <em>{copy.explore.accent}</em>
        </h1>
        <p className="lede" style={{ marginTop: "12px" }}>
          {copy.explore.intro}
        </p>
      </div>

      <div className="explore">
        <FacetSidebar
          products={products}
          filters={filters}
          priceMax={priceMax}
          query={query}
          onToggle={toggle}
          onPrice={setPriceMax}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />

        <div>
          <div className="toolbar">
            <div className="search">
              <label className="sr-only" htmlFor="search">
                {copy.explore.searchLabel}
              </label>
              <input
                id="search"
                type="search"
                placeholder={copy.explore.searchPlaceholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="toolbar-right">
              <button
                className="btn btn-ghost filter-toggle"
                onClick={() => setDrawerOpen(true)}
              >
                {copy.explore.openFilters}
                {active > 0 && ` (${active})`}
              </button>
              <label className="sr-only" htmlFor="sort">
                {copy.explore.sortLabel}
              </label>
              <select
                id="sort"
                className="select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {copy.explore.sortLabel} : {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Compteur de resultats en direct (visibilite de l'etat du systeme). */}
          <p className="result-count" aria-live="polite" style={{ marginBottom: "12px" }}>
            <strong>{results.length}</strong>{" "}
            {results.length === 1 ? copy.explore.resultsOne : copy.explore.resultsMany}
          </p>

          {(chips.length > 0 || priceActive) && (
            <div className="chips" aria-label={copy.explore.activeFiltersLabel}>
              {chips.map((c) => (
                <span className="chip" key={`${c.key}-${c.value}`}>
                  {c.label}
                  <button
                    onClick={() => toggle(c.key, c.value)}
                    aria-label={`Retirer le filtre ${c.label}`}
                  >
                    ×
                  </button>
                </span>
              ))}
              {priceActive && (
                <span className="chip">
                  Prix max
                  <button onClick={() => setPriceMax(priceBounds.max)} aria-label="Retirer le filtre de prix">
                    ×
                  </button>
                </span>
              )}
              <button className="btn btn-quiet" onClick={clearAll}>
                {copy.explore.clearAll}
              </button>
            </div>
          )}

          {results.length === 0 ? (
            <div className="empty">
              <h3>{copy.explore.resultsZeroTitle}</h3>
              <p>{copy.explore.resultsZeroText}</p>
              <button className="btn btn-ghost" onClick={clearAll} style={{ marginTop: "16px" }}>
                {copy.explore.clearAll}
              </button>
            </div>
          ) : (
            <div className="grid">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} onOpen={onOpenProduct} onAdd={onAdd} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
