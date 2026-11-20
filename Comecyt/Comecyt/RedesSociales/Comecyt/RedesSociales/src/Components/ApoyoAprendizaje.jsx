import { useId, useRef, useState } from 'react';
import { materialPorModulo, videosRepaso, evaluacionesRepaso } from '../curso/apoyosAprendizaje';
import '../Css/ApoyoAprendizaje.css';

export function CuestionarioRepaso({ preguntas, titulo = 'Autoevaluación de repaso' }) {
  const id = useId();
  const [respuestas, setRespuestas] = useState({});
  const [revisado, setRevisado] = useState(false);
  const aciertos = preguntas.filter((p, i) => respuestas[i] === p.correcta).length;
  return <section className="apoyo-aprendizaje__tarjeta">
    <h2>{titulo}</h2>
    <p>Práctica con retroalimentación. Puedes repetirla; este resultado no sustituye el examen ni cambia tu avance.</p>
    <form onSubmit={e => { e.preventDefault(); setRevisado(true); }}>
      {preguntas.map((p, i) => <fieldset key={`${id}-${i}`} disabled={revisado}>
        <legend>{i + 1}. {p.pregunta}</legend>
        {p.opciones.map((opcion, j) => <label key={opcion}>
          <input type="radio" name={`${id}-${i}`} required checked={respuestas[i] === j} onChange={() => setRespuestas(prev => ({ ...prev, [i]: j }))} />{opcion}
        </label>)}
        {revisado && <p className={respuestas[i] === p.correcta ? 'apoyo-acierto' : 'apoyo-revisar'}>
          <strong>{respuestas[i] === p.correcta ? 'Correcto. ' : `Por repasar. Respuesta: ${p.opciones[p.correcta]}. `}</strong>{p.explicacion}
        </p>}
      </fieldset>)}
      <p aria-live="polite">{revisado ? `${aciertos} de ${preguntas.length} aciertos · ${Math.round(aciertos / preguntas.length * 100)} / 100 puntos. ${aciertos === preguntas.length ? '¡Buen trabajo!' : 'Revisa las explicaciones antes de intentarlo de nuevo.'}` : `${Object.keys(respuestas).length} de ${preguntas.length} respondidas`}</p>
      {revisado ? <button type="button" onClick={() => { setRespuestas({}); setRevisado(false); }}>Volver a practicar</button> : <button type="submit" disabled={Object.keys(respuestas).length !== preguntas.length}>Revisar respuestas</button>}
    </form>
  </section>;
}

export function VideoInteractivo({ video }) {
  const [iniciado, setIniciado] = useState(false);
  const [preguntaVisible, setPreguntaVisible] = useState(false);
  const frame = useRef(null);
  function pausar() {
    frame.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }), 'https://www.youtube-nocookie.com');
    setPreguntaVisible(true);
  }
  return <section className="apoyo-aprendizaje__tarjeta">
    <h2>Video interactivo · {video.titulo}</h2>
    {video.autor && <p>{video.autor}</p>}
    <p><strong>Antes de mirar:</strong> {video.antes}</p>
    {iniciado ? <iframe ref={frame} className="apoyo-aprendizaje__video" src={`https://www.youtube-nocookie.com/embed/${video.id}?enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}&cc_load_policy=1&hl=es`} title={video.titulo} allow="encrypted-media; picture-in-picture; fullscreen" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /> : <button type="button" onClick={() => setIniciado(true)}>Abrir video y comenzar</button>}
    <p><strong>Pausa de reflexión:</strong> {video.durante}</p>
    <button type="button" onClick={pausar}>Pausar y responder</button>
    <p><a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer">Abrir en YouTube si no se reproduce</a>. También puedes resolver la pregunta con el material de repaso.</p>
    {preguntaVisible && <><CuestionarioRepaso preguntas={[video]} titulo="Comprueba la idea del video" /><p>Para continuar viendo, pulsa reproducir en el video. Puedes repetir la actividad cuantas veces necesites.</p></>}
  </section>;
}

function descargarGuia(leccion, moduloId, numContenido) {
  const texto = [leccion.titulo, '', 'OBJETIVO', leccion.intro, '', 'REPASO', ...leccion.bloques.flatMap(([titulo, ...parrafos]) => [titulo, ...parrafos, '']), 'PRACTICA', leccion.caso.pregunta, ...leccion.caso.opciones.map((o, i) => `${i + 1}. ${o}`), '', 'SOLUCION EXPLICADA', leccion.caso.opciones[leccion.caso.correcta], leccion.caso.explicacion].join('\n');
  const url = URL.createObjectURL(new Blob(['\uFEFF', texto], { type: 'text/plain;charset=utf-8' }));
  const enlace = document.createElement('a');
  enlace.href = url;
  enlace.download = `repaso-modulo-${moduloId}-leccion-${numContenido}.txt`;
  enlace.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function ApoyoAprendizaje({ moduloId, numContenido, evaluacion = false, mostrarVideo = true }) {
  const lecciones = materialPorModulo[moduloId];
  if (!lecciones) return null;
  const leccion = lecciones[numContenido - 1];
  const mostrarEvaluacion = evaluacion || (moduloId === 5 && numContenido === 16);
  const preguntas = [...lecciones.map(l => l.caso), ...evaluacionesRepaso[moduloId]];
  return <aside className="apoyo-aprendizaje" aria-label="Material de repaso y práctica">
    {!evaluacion && leccion && <section className="apoyo-aprendizaje__tarjeta">
      <p className="apoyo-aprendizaje__etiqueta">REPASA · PRACTICA · COMPRUEBA</p>
      <h2>Tu guía de aprendizaje</h2>
      <p><strong>Objetivo:</strong> {leccion.intro}</p>
      <p>Al terminar, explica las ideas clave con tus palabras y resuelve una situación práctica.</p>
      <h3>Fichas de repaso</h3>
      <p>Recuerda qué sabes de cada tema antes de abrir su ficha.</p>
      {leccion.bloques.map(([titulo, ...parrafos]) => <details key={titulo}><summary>{titulo}</summary>{parrafos.map(p => <p key={p}>{p}</p>)}</details>)}
      <button type="button" onClick={() => descargarGuia(leccion, moduloId, numContenido)}>Descargar guía de repaso (.txt)</button>
    </section>}
    {mostrarVideo && numContenido === 1 && <VideoInteractivo video={videosRepaso[moduloId]} />}
    {moduloId === 5 && leccion && !mostrarEvaluacion && <CuestionarioRepaso preguntas={[leccion.caso]} titulo="Prepárate para el reto" />}
    {mostrarEvaluacion && <details className="apoyo-aprendizaje__tarjeta"><summary>Practica antes de terminar el módulo · {preguntas.length} preguntas</summary><CuestionarioRepaso preguntas={preguntas} /><nav aria-label="Volver a repasar"><h3>Temas para repasar</h3><ul>{lecciones.map((l, i) => <li key={l.titulo}><a href={`/modulo/${moduloId}/contenido/${i + 1}`}>{l.titulo}</a></li>)}</ul></nav></details>}
  </aside>;
}
