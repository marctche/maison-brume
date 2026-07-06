// Illustrations de meubles en SVG, dans l'esprit Hey Low : trait ink sur papier,
// une seule couleur d'accent (celle du produit). Aucune image externe.

const INK = "#003329";

function Sofa({ accent }) {
  return (
    <>
      <rect x="24" y="70" width="152" height="40" rx="8" fill={accent} />
      <rect x="30" y="52" width="140" height="34" rx="8" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <rect x="18" y="66" width="24" height="44" rx="8" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <rect x="158" y="66" width="24" height="44" rx="8" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <line x1="100" y1="58" x2="100" y2="86" stroke={INK} strokeWidth="2" />
      <line x1="40" y1="110" x2="40" y2="126" stroke={INK} strokeWidth="2.5" />
      <line x1="160" y1="110" x2="160" y2="126" stroke={INK} strokeWidth="2.5" />
    </>
  );
}

function Chair({ accent }) {
  return (
    <>
      <path d="M64 58 q0 -22 36 -22 q36 0 36 22 l0 34 l-72 0 z" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <rect x="66" y="78" width="68" height="20" rx="6" fill={accent} />
      <line x1="70" y1="98" x2="66" y2="126" stroke={INK} strokeWidth="2.5" />
      <line x1="130" y1="98" x2="134" y2="126" stroke={INK} strokeWidth="2.5" />
      <line x1="100" y1="98" x2="100" y2="120" stroke={INK} strokeWidth="2.5" />
    </>
  );
}

function Table({ accent }) {
  return (
    <>
      <ellipse cx="100" cy="60" rx="72" ry="16" fill={accent} stroke={INK} strokeWidth="2.5" />
      <line x1="40" y1="66" x2="36" y2="118" stroke={INK} strokeWidth="2.5" />
      <line x1="160" y1="66" x2="164" y2="118" stroke={INK} strokeWidth="2.5" />
      <line x1="80" y1="70" x2="80" y2="118" stroke={INK} strokeWidth="2.5" />
      <line x1="120" y1="70" x2="120" y2="118" stroke={INK} strokeWidth="2.5" />
    </>
  );
}

function Storage({ accent }) {
  return (
    <>
      <rect x="58" y="34" width="84" height="92" rx="6" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <line x1="58" y1="64" x2="142" y2="64" stroke={INK} strokeWidth="2" />
      <line x1="58" y1="96" x2="142" y2="96" stroke={INK} strokeWidth="2" />
      <rect x="66" y="42" width="68" height="16" rx="3" fill={accent} />
      <circle cx="100" cy="80" r="3" fill={INK} />
      <circle cx="100" cy="112" r="3" fill={INK} />
    </>
  );
}

function Bed({ accent }) {
  return (
    <>
      <rect x="26" y="86" width="148" height="26" rx="6" fill={accent} />
      <path d="M26 86 l0 -34 q0 -10 12 -10 l36 0 q12 0 12 10 l0 34 z" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <rect x="86" y="70" width="88" height="18" rx="6" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <line x1="30" y1="112" x2="30" y2="124" stroke={INK} strokeWidth="2.5" />
      <line x1="170" y1="112" x2="170" y2="124" stroke={INK} strokeWidth="2.5" />
    </>
  );
}

function Lamp({ accent }) {
  return (
    <>
      <path d="M76 60 l48 0 l-10 -26 l-28 0 z" fill={accent} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="100" y1="60" x2="100" y2="120" stroke={INK} strokeWidth="2.5" />
      <path d="M80 120 q20 8 40 0" fill="none" stroke={INK} strokeWidth="2.5" />
    </>
  );
}

function Desk({ accent }) {
  return (
    <>
      <rect x="34" y="64" width="132" height="12" rx="4" fill={accent} stroke={INK} strokeWidth="2.5" />
      <rect x="120" y="76" width="46" height="26" rx="3" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <circle cx="158" cy="89" r="2.5" fill={INK} />
      <line x1="44" y1="76" x2="44" y2="122" stroke={INK} strokeWidth="2.5" />
      <line x1="130" y1="102" x2="130" y2="122" stroke={INK} strokeWidth="2.5" />
      <line x1="158" y1="102" x2="158" y2="122" stroke={INK} strokeWidth="2.5" />
    </>
  );
}

const SHAPES = { sofa: Sofa, chair: Chair, table: Table, storage: Storage, bed: Bed, lamp: Lamp, desk: Desk };

export default function ProductVisual({ shape, accent = "#d8c4a5" }) {
  const Shape = SHAPES[shape] || Sofa;
  return (
    <div className="visual" aria-hidden="true">
      <svg viewBox="0 0 200 150" preserveAspectRatio="xMidYMid meet" role="presentation">
        <Shape accent={accent} />
      </svg>
    </div>
  );
}
