import { normalizarAvance } from './avance.js';

export function convertirAvanceSeguridad(registros, guardado = 0) {
  const anteriores = normalizarAvance(registros, guardado, 7);
  const nuevos = [...anteriores].filter(n => n <= 4);
  // La nueva quinta lección reúne las antiguas 5 y 6. La 6 nueva es el examen.
  if (anteriores.has(5) && anteriores.has(6)) nuevos.push(5);
  if (anteriores.has(7)) nuevos.push(6);
  return nuevos.sort((a, b) => a - b);
}
