// Toutes les chaines visibles par l'utilisateur sont centralisees ici.
// Le modele redacteur/lecteur : la marque parle en « nous » (un petit atelier)
// a « vous » (la personne qui amenage son premier vrai appartement), avec
// quelques bascules locales en « je » (mot du fondateur, sondage) pour creer
// un effet de conversation.
//
// Trois objectifs de communication, reconnaissables aux mots ET aux types de
// phrases :
//   • INCITER   -> promotionnel, imperatif / exclamatif   (banniere, boutons)
//   • INFORMER  -> neutre, declaratif                      (fiches produit)
//   • CONNECTER -> chaleureux, interrogatif + « je »       (sondage)

export const copy = {
  brand: {
    name: "Maison Brume",
    // Accent serif signature, pose a cote du titre geometrique.
    accent: "posez vos bases",
    baseline: "Mobilier calme pour un premier vrai chez-soi.",
  },

  // — INCITER A L'ACTION — imperatif / exclamatif —
  promo: {
    eyebrow: "Offre de la saison",
    headline: "Meublez votre salon,",
    accent: "sans vous presser",
    text: "Jusqu'a -20 % sur une selection de canapes et de tables. Profitez-en avant la fin du mois !",
    cta: "Voir les offres",
  },

  hero: {
    eyebrow: "Maison Brume",
    headline: "Des pieces qui",
    accent: "vous ressemblent",
    text: "Nous dessinons peu de meubles, mais nous les choisissons bien. Prenez le temps d'explorer, piece par piece.",
    ctaPrimary: "Explorer le mobilier",
    ctaSecondary: "Comment nous travaillons",
  },

  // — ETABLIR UNE CONNEXION (bascule en « je ») —
  founder: {
    eyebrow: "Mot de l'atelier",
    // Effet de conversation : passage au « je ».
    text: "Je m'appelle Elise, et j'ai fonde Maison Brume apres avoir meuble trois appartements a la hate. Je voulais un endroit calme, ou l'on choisit sans se sentir presse. J'espere que vous vous y sentirez bien.",
  },

  nav: {
    home: "Accueil",
    explore: "Explorer",
    help: "Aide",
    cart: "Panier",
    openCart: "Ouvrir le panier",
    survey: "Votre avis",
  },

  // — INFORMER — declaratif, neutre —
  explore: {
    eyebrow: "Le catalogue",
    title: "Explorez par piece,",
    accent: "matiere et style",
    intro:
      "Affinez la selection avec les filtres. Le nombre de resultats se met a jour a chaque choix.",
    searchLabel: "Rechercher un meuble",
    searchPlaceholder: "Canape, table, chene...",
    sortLabel: "Trier",
    resultsOne: "meuble correspond",
    resultsMany: "meubles correspondent",
    resultsZeroTitle: "Aucun meuble ne correspond",
    resultsZeroText:
      "Vos filtres sont peut-etre trop precis. Retirez-en un pour elargir la selection.",
    clearAll: "Tout effacer",
    filtersTitle: "Filtres",
    activeFiltersLabel: "Filtres actifs",
    openFilters: "Filtrer",
    closeFilters: "Fermer les filtres",
    priceLabel: "Prix maximum",
    quickAdd: "Ajouter",
  },

  product: {
    back: "Retour a l'exploration",
    addToCart: "Ajouter au panier",
    added: "Ajoute au panier",
    dimensions: "Dimensions",
    material: "Matiere",
    care: "Entretien",
    room: "Piece",
    style: "Style",
    inStock: "En stock — expedie sous 5 jours",
    madeToOrder: "Sur commande — compte 4 a 6 semaines",
    detailsTitle: "Le detail qui compte",
  },

  cart: {
    title: "Votre panier",
    empty: "Votre panier est vide.",
    emptyCta: "Parcourir le mobilier",
    remove: "Retirer",
    removed: "Article retire du panier",
    quantity: "Quantite",
    subtotal: "Sous-total",
    shipping: "Livraison",
    shippingFree: "Offerte",
    total: "Total",
    checkout: "Passer a la caisse",
    continue: "Continuer mes achats",
  },

  checkout: {
    title: "Commande",
    steps: ["Panier", "Coordonnees", "Paiement", "Confirmation"],
    // Etiquettes d'etat pour le fil de progression.
    stateDone: "Fait",
    stateCurrent: "En cours",
    stateTodo: "A venir",
    reviewTitle: "Verifiez votre panier",
    reviewText: "Vous pourrez revenir a cette etape a tout moment.",
    contactTitle: "Vos coordonnees",
    contactText: "Nous en avons besoin pour vous livrer. Rien de plus.",
    paymentTitle: "Paiement",
    paymentText:
      "Ceci est une demonstration : aucune carte n'est reellement debitee.",
    summaryTitle: "Recapitulatif",
    next: "Continuer",
    back: "Revenir",
    pay: "Confirmer et payer",
    confirmTitle: "Merci !",
    confirmText:
      "Votre commande est confirmee. Un courriel de suivi arrive dans quelques minutes.",
    confirmSurvey: "Donner votre avis en 30 secondes",
    confirmHome: "Revenir a l'accueil",
    fields: {
      name: "Nom complet",
      email: "Courriel",
      address: "Adresse",
      city: "Ville",
      postal: "Code postal",
      card: "Numero de carte",
      expiry: "Expiration (MM/AA)",
      cvc: "CVC",
    },
    errors: {
      required: "Ce champ est requis.",
      email: "Entrez un courriel valide, par exemple nom@exemple.ca.",
      postal: "Le code postal doit ressembler a H2X 1Y4.",
      card: "Le numero de carte doit contenir 16 chiffres.",
      expiry: "Utilisez le format MM/AA.",
      cvc: "Le CVC doit contenir 3 chiffres.",
    },
  },

  // — ETABLIR UNE CONNEXION — interrogatif + « je » —
  survey: {
    eyebrow: "Votre avis compte",
    title: "Comment s'est passee",
    accent: "votre visite ?",
    intro:
      "J'aimerais vraiment savoir. Deux questions, trente secondes — et vous m'aidez a ameliorer Maison Brume.",
    ratingLabel: "Dans l'ensemble, diriez-vous que l'experience etait...",
    ratingHints: ["Difficile", "Moyenne", "Correcte", "Agreable", "Excellente"],
    easeLabel: "Avez-vous trouve facilement ce que vous cherchiez ?",
    easeOptions: ["Oui, tout de suite", "Oui, avec un peu de recherche", "Pas vraiment"],
    commentLabel: "Un mot a ajouter ? (facultatif)",
    commentPlaceholder: "Ce que vous avez aime, ou ce que je pourrais ameliorer...",
    submit: "Envoyer mon avis",
    skip: "Passer",
    thanksTitle: "Merci du fond du coeur.",
    thanksText: "Votre retour vient d'atterrir sur mon bureau. J'en tiens compte.",
    thanksHome: "Revenir a l'accueil",
  },

  // — INFORMER — aide et documentation —
  help: {
    eyebrow: "Aide",
    title: "Les reponses aux",
    accent: "questions frequentes",
    intro: "Vous ne trouvez pas ? Ecrivez-nous, nous repondons sous 24 heures.",
    faq: [
      {
        q: "Quels sont les delais de livraison ?",
        a: "Les articles en stock partent sous 5 jours ouvrables. Les pieces sur commande demandent 4 a 6 semaines, car elles sont fabriquees pour vous.",
      },
      {
        q: "La livraison est-elle payante ?",
        a: "La livraison est offerte des 800 $ d'achat. En dessous, elle est de 60 $, montee et emballage recycle inclus.",
      },
      {
        q: "Puis-je retourner un meuble ?",
        a: "Oui. Vous avez 30 jours pour changer d'avis sur un article en stock. Le retour est gratuit et nous reprenons l'emballage.",
      },
      {
        q: "Comment connaitre les dimensions exactes ?",
        a: "Chaque fiche produit indique la largeur, la profondeur et la hauteur. Mesurez votre espace avant de commander : c'est le meilleur moyen d'eviter une surprise.",
      },
      {
        q: "Vos matieres sont-elles durables ?",
        a: "Nous privilegions le bois massif certifie, le lin et les tissus recycles. Chaque fiche precise la matiere et son entretien.",
      },
    ],
  },

  footer: {
    tagline: "Peu de meubles, bien choisis.",
    exploreTitle: "Explorer",
    helpTitle: "Aide",
    contactTitle: "Nous joindre",
    email: "bonjour@maisonbrume.ca",
    surveyPrompt: "Vous avez visite le site ?",
    surveyCta: "Partagez votre avis",
    rights: "Maison Brume — prototype de demonstration.",
  },
};
