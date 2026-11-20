import { useId, useState } from 'react';
import { retosSeguridad } from '../curso/seguridadRecursos';
import '../Css/CobrosDigitales.css';

export default function PracticaSeguridad({ numero }) {
  const reto = retosSeguridad[numero - 1];
  const id = useId();
  const [respuestas, setRespuestas] = useState({});
  const [revisado, setRevisado] = useState(false);
  const aciertos = reto.items.filter(([, correcta], i) => respuestas[i] === correcta).length;
  return <section className="leccion-guiada__tarjeta cobros-practica">
    <h2>Laboratorio interactivo · {reto.titulo}</h2>
    <form className="leccion-guiada__cuerpo" onSubmit={e => { e.preventDefault(); setRevisado(true); }}>
      <p>{reto.instruccion}</p>
      <div className="cobros-campos">{reto.items.map(([situacion, correcta, explicacion], i) => <div key={situacion}>
        <label className="cobros-campo" htmlFor={`${id}-${i}`}>{situacion}<select id={`${id}-${i}`} required value={respuestas[i] ?? ''} disabled={revisado} onChange={e => setRespuestas(prev => ({ ...prev, [i]: e.target.value === '' ? undefined : Number(e.target.value) }))}>
          <option value="">Selecciona una respuesta</option>{reto.opciones.map((opcion, j) => <option key={opcion} value={j}>{opcion}</option>)}
        </select></label>
        {revisado && <p className={respuestas[i] === correcta ? 'apoyo-acierto' : 'apoyo-revisar'}><strong>{respuestas[i] === correcta ? 'Correcto. ' : `Por repasar: ${reto.opciones[correcta]}. `}</strong>{explicacion}</p>}
      </div>)}</div>
      <p role="status">{revisado ? `${aciertos} de ${reto.items.length} aciertos. Revisa las explicaciones y vuelve a practicar.` : `${Object.values(respuestas).filter(Number.isInteger).length} de ${reto.items.length} respondidas.`}</p>
      {revisado ? <button type="button" onClick={() => { setRevisado(false); setRespuestas({}); }}>Volver a practicar</button> : <button type="submit" disabled={Object.values(respuestas).filter(Number.isInteger).length !== reto.items.length}>Comprobar decisiones</button>}
      <p className="cobros-nota">Práctica educativa. No cambia tu avance ni la calificación de la evaluación final.</p>
    </form>
  </section>;
}
