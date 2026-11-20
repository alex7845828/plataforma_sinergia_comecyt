import { pool } from '../config/database.js';
import { catalogo, coincideTitulo } from '../services/catalogo.js';
import { convertirAvanceSeguridad } from '../services/reorganizarSeguridad.js';

const aplicar = process.argv.includes('--aplicar');
const clave = 'seguridad-cinco-lecciones-v1';
let db;
try {
  db = await pool.getConnection();
  // El respaldo se conserva en MySQL, nunca se imprime información de alumnos.
  if (aplicar) await db.query(`CREATE TABLE IF NOT EXISTS respaldo_cambios_curso (
    clave VARCHAR(100) PRIMARY KEY, datos LONGTEXT NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB`);
  await db.beginTransaction();
  const modulo = catalogo.find(m => m.id === 7);
  const [[actual]] = await db.query('SELECT * FROM MODULO WHERE modulo_id = 7 FOR UPDATE');
  if (!actual) throw new Error('El módulo aún no existe en MySQL. Ejecuta catalogo:aplicar -- --modulo=7 para instalar el catálogo nuevo.');
  if (!coincideTitulo(modulo, actual.titulo)) throw new Error('El ID 7 pertenece a otro módulo. No se realizaron cambios.');
  const [contenidos] = await db.query('SELECT * FROM CONTENIDO WHERE modulo_id = 7 ORDER BY numero FOR UPDATE');
  if (actual.total_contenidos === 6 && contenidos.length === 6 && contenidos[5].tipo === 'evaluacion') {
    console.log('Seguridad Digital ya tiene cinco lecciones y evaluación. Sin cambios.');
    await db.rollback();
  } else {
    if (actual.total_contenidos !== 7 || contenidos.length !== 7 || contenidos.some((c, i) => c.numero !== i + 1) || contenidos[6].tipo !== 'evaluacion' || contenidos.slice(0, 6).some(c => c.tipo !== 'contenido')) {
      throw new Error('La estructura de MySQL no corresponde a las seis lecciones anteriores. Requiere revisión.');
    }
    const [avances] = await db.query('SELECT * FROM progreso_modulos WHERE modulo_id = 7 FOR UPDATE');
    const [completados] = await db.query('SELECT * FROM contenidos_completados WHERE modulo_id = 7 FOR UPDATE');
    const correos = new Set([...avances, ...completados].map(r => r.correo));
    console.log(`Revisión: 6 lecciones → 5 lecciones; examen 7 → 6. ${correos.size} avances por adaptar. Se conservan resultados y constancias.`);
    if (aplicar) {
      const [[respaldo]] = await db.query('SELECT clave FROM respaldo_cambios_curso WHERE clave = ?', [clave]);
      if (respaldo) throw new Error('Existe un respaldo de esta migración pero la estructura es antigua. Revisa antes de repetirla.');
      await db.query('INSERT INTO respaldo_cambios_curso (clave, datos) VALUES (?, ?)', [clave, JSON.stringify({ modulo: actual, contenidos, avances, completados })]);
      // Elimina solo la fila de contenido absorbida; la definición previa queda respaldada.
      await db.query('DELETE FROM CONTENIDO WHERE modulo_id = 7 AND numero = 6');
      await db.query('UPDATE CONTENIDO SET numero = 6 WHERE modulo_id = 7 AND numero = 7');
      for (const [i, leccion] of modulo.lecciones.entries()) {
        await db.query('UPDATE CONTENIDO SET titulo = ?, tipo = ? WHERE modulo_id = 7 AND numero = ?', [leccion.nombre, leccion.evaluacion ? 'evaluacion' : 'contenido', i + 1]);
      }
      await db.query('DELETE FROM contenidos_completados WHERE modulo_id = 7');
      for (const correo of correos) {
        const registros = completados.filter(r => r.correo === correo);
        const nuevos = convertirAvanceSeguridad(registros.map(r => r.contenido_id), avances.find(r => r.correo === correo)?.progreso_actual ?? 0);
        for (const numero of nuevos) {
          const previo = registros.find(r => r.contenido_id === (numero === 6 ? 7 : numero === 5 ? 6 : numero));
          await db.query('INSERT INTO contenidos_completados (correo, modulo_id, contenido_id, fecha_completado) VALUES (?, 7, ?, COALESCE(?, CURRENT_TIMESTAMP))', [correo, numero, previo?.fecha_completado ?? null]);
        }
        await db.query('INSERT INTO progreso_modulos (correo, modulo_id, progreso_actual) VALUES (?, 7, ?) ON DUPLICATE KEY UPDATE progreso_actual = VALUES(progreso_actual)', [correo, nuevos.length]);
      }
      await db.query('UPDATE MODULO SET total_contenidos = 6 WHERE modulo_id = 7');
      await db.commit();
      console.log(`Reorganización aplicada. Respaldo: respaldo_cambios_curso / ${clave}.`);
    } else {
      await db.rollback();
      console.log('Revisión terminada sin modificar datos.');
    }
  }
} catch (error) {
  if (db) await db.rollback();
  console.error(error.message);
  process.exitCode = 1;
} finally {
  db?.release();
  await pool.end();
}
