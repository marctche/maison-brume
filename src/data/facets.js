// Configuration de la recherche a facettes.
// Chaque groupe correspond a une facon reelle de chercher un meuble.
// Logique : OU a l'interieur d'un groupe, ET entre les groupes.

export const facetGroups = [
  {
    key: "piece",
    label: "Piece",
    // On commence par la piece : on meuble une chambre, un salon...
    type: "checkbox",
    options: ["Salon", "Chambre", "Salle a manger", "Bureau", "Entree"],
  },
  {
    key: "categorie",
    label: "Categorie",
    type: "checkbox",
    options: ["Canapes", "Chaises", "Tables", "Rangement", "Lits", "Luminaires", "Bureaux"],
  },
  {
    key: "materiau",
    label: "Matiere",
    type: "checkbox",
    options: ["Chene", "Noyer", "Metal", "Lin", "Velours", "Rotin", "Verre"],
  },
  {
    key: "couleur",
    label: "Couleur",
    // Rendu en pastilles (swatch) : reconnaissance visuelle immediate.
    type: "swatch",
    options: [
      { value: "Naturel", hex: "#d8c4a5" },
      { value: "Blanc", hex: "#f4f2ec" },
      { value: "Gris", hex: "#9ca3a0" },
      { value: "Noir", hex: "#20211f" },
      { value: "Sauge", hex: "#8fa393" },
      { value: "Terracotta", hex: "#c06b4b" },
      { value: "Bleu nuit", hex: "#33455e" },
    ],
  },
  {
    key: "style",
    label: "Style",
    type: "checkbox",
    options: ["Scandinave", "Minimaliste", "Contemporain", "Rustique", "Industriel"],
  },
  {
    key: "disponibilite",
    label: "Disponibilite",
    type: "checkbox",
    options: ["En stock", "Sur commande"],
  },
];

export const priceBounds = { min: 0, max: 2400, step: 50 };

export const sortOptions = [
  { value: "pertinence", label: "Pertinence" },
  { value: "prix-asc", label: "Prix croissant" },
  { value: "prix-desc", label: "Prix decroissant" },
  { value: "nom", label: "Nom (A-Z)" },
];
