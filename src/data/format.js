// Format monetaire en dollars canadiens, sans decimales pour du mobilier.
export function prix(n) {
  return `${n.toLocaleString("fr-CA")} $`;
}
