// Logique pure de la recherche a facettes.
// OU a l'interieur d'un groupe, ET entre les groupes.

import { facetGroups } from "./facets.js";

const GROUP_KEYS = facetGroups.map((g) => g.key);

function normalize(s) {
  return (s || "")
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function matchesQuery(product, query) {
  if (!query) return true;
  const q = normalize(query);
  return [product.nom, product.categorie, product.materiau, product.style, product.piece]
    .map(normalize)
    .some((v) => v.includes(q));
}

// Le produit satisfait-il les filtres, en ignorant eventuellement un groupe ?
function matches(product, filters, priceMax, query, ignoreKey) {
  if (product.prixFinal > priceMax) return false;
  if (!matchesQuery(product, query)) return false;
  for (const key of GROUP_KEYS) {
    if (key === ignoreKey) continue;
    const selected = filters[key];
    if (selected && selected.length > 0 && !selected.includes(product[key])) {
      return false;
    }
  }
  return true;
}

export function filterProducts(products, filters, priceMax, query) {
  return products.filter((p) => matches(p, filters, priceMax, query));
}

// Nombre de resultats si on ajoutait cette option (facettes conjonctives).
export function countForOption(products, filters, priceMax, query, groupKey, optionValue) {
  return products.filter(
    (p) => matches(p, filters, priceMax, query, groupKey) && p[groupKey] === optionValue,
  ).length;
}

export function sortProducts(list, sort) {
  const copy = [...list];
  if (sort === "prix-asc") return copy.sort((a, b) => a.prixFinal - b.prixFinal);
  if (sort === "prix-desc") return copy.sort((a, b) => b.prixFinal - a.prixFinal);
  if (sort === "nom") return copy.sort((a, b) => a.nom.localeCompare(b.nom, "fr"));
  return copy; // pertinence = ordre du catalogue
}

export function emptyFilters() {
  return Object.fromEntries(GROUP_KEYS.map((k) => [k, []]));
}

export function countActive(filters) {
  return GROUP_KEYS.reduce((n, k) => n + (filters[k] ? filters[k].length : 0), 0);
}
