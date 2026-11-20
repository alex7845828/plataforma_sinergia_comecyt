import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluacionGuiada, calificar, MINIMO_APROBACION } from '../Comecyt/Backend/services/evaluacionesGuiadas.js';
import { repartoCobro, netoCobro, disponiblePresupuesto } from '../Comecyt/RedesSociales/Comecyt/RedesSociales/src/curso/calculosCobros.js';
import { cobrosRecursos } from '../Comecyt/RedesSociales/Comecyt/RedesSociales/src/curso/cobrosRecursos.js';
import { existsSync } from 'node:fs';

test('Cobros Digitales sirve 15 preguntas sin exponer respuestas correctas', () => {
  const examen = evaluacionGuiada(6);
  assert.equal(examen.preguntas.length, 15);
  assert.equal(examen.publicas.length, 15);
  assert.equal(new Set(examen.preguntas.map(p => p[0])).size, 15);
  examen.publicas.forEach(p => assert.deepEqual(Object.keys(p).sort(), ['enunciado', 'opciones']));
});

test('El examen aprueba con 12 de 15, rechaza 11 y valida los intentos', () => {
  const examen = evaluacionGuiada(6);
  const respuestas = examen.preguntas.map(p => p[2]);
  assert.equal(calificar(examen, respuestas), 100);
  const intento = aciertos => respuestas.map((r, i) => i < aciertos ? r : (r + 1) % 3);
  assert.equal(calificar(examen, intento(12)), MINIMO_APROBACION);
  assert.ok(calificar(examen, intento(11)) < MINIMO_APROBACION);
  assert.equal(calificar(examen, intento(0)), 0);
  assert.equal(calificar(examen, respuestas.slice(1)), null);
  assert.equal(calificar(examen, [...respuestas.slice(1), 99]), null);
  assert.equal(calificar(examen, respuestas.map(String)), null);
});

test('El reparto conserva todos los centavos y rechaza participantes inválidos', () => {
  assert.deepEqual(repartoCobro(630, 3), [210, 210, 210]);
  assert.deepEqual(repartoCobro(100, 3), [33.34, 33.33, 33.33]);
  assert.equal(repartoCobro(100, 0), null);
  assert.equal(repartoCobro(100, 2.5), null);
  assert.equal(repartoCobro(100, 51), null);
  assert.equal(repartoCobro('', 3), null);
});

test('Los ejemplos calculan comisiones y presupuestos sin perder centavos', () => {
  assert.equal(netoCobro(300, 12), 288);
  assert.equal(netoCobro(0.3, 0.1), 0.2);
  assert.equal(disponiblePresupuesto(1200, 650, 200, 95), 255);
  assert.equal(disponiblePresupuesto(100, 80, 30, 20), -30);
});

test('Las cinco lecciones tienen video único, objetivos, ejemplo e imagen local atribuida', () => {
  assert.equal(cobrosRecursos.length, 5);
  assert.equal(new Set(cobrosRecursos.map(r => r.video.id)).size, 5);
  for (const recurso of cobrosRecursos) {
    assert.equal(recurso.objetivos.length, 3);
    assert.ok(recurso.ejemplo.length >= 4);
    assert.match(recurso.video.id, /^[A-Za-z0-9_-]{11}$/);
    assert.match(recurso.imagen.fuente, /^https:\/\/www.pexels.com\//);
    assert.ok(existsSync(new URL(`../Comecyt/RedesSociales/Comecyt/RedesSociales/public/images/cobros/${recurso.imagen.archivo}.jpg`, import.meta.url)));
  }
});
