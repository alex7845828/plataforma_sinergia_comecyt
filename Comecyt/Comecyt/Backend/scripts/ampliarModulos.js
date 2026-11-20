import {pool} from '../config/database.js';
import {catalogo} from '../services/catalogo.js';
const db=await pool.getConnection();
try {
 await db.query('CREATE TABLE IF NOT EXISTS respaldo_cambios_curso (clave VARCHAR(100) PRIMARY KEY, datos LONGTEXT NOT NULL, creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB');
 await db.beginTransaction();
 for(const id of [8,9,10,11]) {
 const [[modulo]]=await db.query('SELECT * FROM MODULO WHERE modulo_id=? FOR UPDATE',[id]);
 if(!modulo) throw Error('Módulo faltante: '+id);
 if(modulo.total_contenidos===6) continue;
 if(modulo.total_contenidos!==4) throw Error('Estructura inesperada: '+id);
 const [contenidos]=await db.query('SELECT * FROM CONTENIDO WHERE modulo_id=? ORDER BY numero',[id]);
 const [avance]=await db.query('SELECT * FROM contenidos_completados WHERE modulo_id=?',[id]);
 const [progreso]=await db.query('SELECT * FROM progreso_modulos WHERE modulo_id=?',[id]);
 if(contenidos.length!==4 || contenidos[3].tipo!=='evaluacion') throw Error('Contenido inesperado');
 await db.query('INSERT INTO respaldo_cambios_curso (clave,datos) VALUES (?,?)',['ampliacion-cinco-'+id,JSON.stringify({modulo,contenidos,avance,progreso})]);
 await db.query('UPDATE CONTENIDO SET numero=6 WHERE modulo_id=? AND numero=4',[id]);
 await db.query('UPDATE contenidos_completados SET contenido_id=6 WHERE modulo_id=? AND contenido_id=4',[id]);
 for(const n of [4,5]) {const l=catalogo.find(m=>m.id===id).lecciones[n-1];await db.query('INSERT INTO CONTENIDO (modulo_id,numero,titulo,tipo) VALUES (?,?,?,?)',[id,n,l.nombre,'contenido']);}
 await db.query('UPDATE MODULO SET total_contenidos=6 WHERE modulo_id=?',[id]);
 console.log('Actualizado módulo '+id+' con respaldo.');
 }
 await db.commit();
} catch(e){await db.rollback();console.error(e.message);process.exitCode=1;} finally{db.release();await pool.end();}
