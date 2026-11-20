import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { catalogo } from '../Comecyt/Backend/services/catalogo.js';
import { evaluacionGuiada, calificar } from '../Comecyt/Backend/services/evaluacionesGuiadas.js';
import { convertirAvanceSeguridad } from '../Comecyt/Backend/services/reorganizarSeguridad.js';
import { leccionesSeguridadDigital } from '../Comecyt/RedesSociales/Comecyt/RedesSociales/src/curso/seguridadDigital.js';
import { seguridadRecursos, retosSeguridad } from '../Comecyt/RedesSociales/Comecyt/RedesSociales/src/curso/seguridadRecursos.js';
import { practicasGuiadas } from '../Comecyt/RedesSociales/Comecyt/RedesSociales/src/curso/practicasGuiadas.js';

test('Cinco lecciones completas y evaluación en la sexta posición', () => {
  const modulo = catalogo.find(m => m.id === 7);
  assert.equal(modulo.lecciones.length, 6);
  assert.equal(modulo.lecciones[5].evaluacion, true);
  assert.equal(leccionesSeguridadDigital.length, 5);
  assert.equal(practicasGuiadas[7].length, 5);
  assert.equal(seguridadRecursos.length, 5);
  assert.equal(retosSeguridad.length, 5);
  assert.ok(leccionesSeguridadDigital[4].bloques.some(b => b[0] === 'Qué hacer primero'));
  assert.ok(leccionesSeguridadDigital[4].bloques.some(b => b[0] === 'Wi-Fi público y doméstico'));
});
test('Videos, fotos atribuidas y actividades disponibles en las cinco lecciones', () => {
  assert.equal(new Set(seguridadRecursos.map(r => r.video.id)).size, 5);
  for (const r of seguridadRecursos) {
    assert.match(r.video.id, /^[\w-]{11}$/);
    assert.ok(r.imagen.fuente.startsWith('https://www.pexels.com/'));
    assert.ok(existsSync(new URL(`../Comecyt/RedesSociales/Comecyt/RedesSociales/public/images/${r.imagen.carpeta || 'seguridad'}/${r.imagen.archivo}.jpg`, import.meta.url)));
    assert.equal(r.objetivos.length, 3);
    assert.ok(r.ejemplo.length > 3);
  }
  for (const reto of retosSeguridad) for (const [, correcta, explicacion] of reto.items) {
    assert.ok(reto.opciones[correcta]);
    assert.ok(explicacion.length > 20);
  }
});
test('15 preguntas, claves privadas y umbral de 12 aciertos', () => {
  const examen = evaluacionGuiada(7);
  assert.equal(examen.numero, 6);
  assert.equal(examen.preguntas.length, 15);
  examen.publicas.forEach(p => assert.deepEqual(Object.keys(p).sort(), ['enunciado', 'opciones']));
  const respuestas = examen.preguntas.map(p => p[2]);
  const intento = n => respuestas.map((r, i) => i < n ? r : (r + 1) % 3);
  assert.equal(calificar(examen, respuestas), 100);
  assert.equal(calificar(examen, intento(12)), 80);
  assert.equal(calificar(examen, intento(11)), 73);
  assert.equal(calificar(examen, respuestas.slice(1)), null);
});
test('La migración no confunde la sexta lección antigua con el examen nuevo', () => {
  assert.deepEqual(convertirAvanceSeguridad([1, 2, 3, 4, 5, 6, 7]), [1, 2, 3, 4, 5, 6]);
  assert.deepEqual(convertirAvanceSeguridad([1, 2, 3, 4, 5]), [1, 2, 3, 4]);
  assert.deepEqual(convertirAvanceSeguridad([1, 2, 3, 4, 5, 6]), [1, 2, 3, 4, 5]);
  assert.deepEqual(convertirAvanceSeguridad([], 7), [1, 2, 3, 4, 5, 6]);
  assert.deepEqual(convertirAvanceSeguridad([], 0), []);
});
