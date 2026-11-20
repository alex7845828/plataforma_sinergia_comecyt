export const centavos = valor => Math.round(Number(valor) * 100);
export function repartoCobro(total, personas) {
  const monto = centavos(total);
  const n = Number(personas);
  if (!Number.isFinite(monto) || monto <= 0 || !Number.isInteger(n) || n < 1 || n > 50) return null;
  const base = Math.floor(monto / n);
  const extra = monto % n;
  return Array.from({ length: n }, (_, i) => (base + (i < extra ? 1 : 0)) / 100);
}
export function netoCobro(importe, comision) {
  return (centavos(importe) - centavos(comision)) / 100;
}
export function disponiblePresupuesto(ingreso, fijos, ahorro, variables) {
  return (centavos(ingreso) - centavos(fijos) - centavos(ahorro) - centavos(variables)) / 100;
}
