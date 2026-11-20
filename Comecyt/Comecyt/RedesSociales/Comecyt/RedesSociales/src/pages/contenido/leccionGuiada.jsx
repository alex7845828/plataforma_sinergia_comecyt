import { nuevosRecursos } from "../../curso/nuevosRecursos";
import { CuestionarioRepaso } from "../../Components/ApoyoAprendizaje";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { imagenLeccion } from "../../curso/imagenesLecciones";
import { leccionesCobrosDigitales } from "../../curso/cobrosDigitales";
import { leccionesNuevas } from "../../curso/leccionesNuevas";
import { practicasGuiadas } from "../../curso/practicasGuiadas";
import { leccionesSeguridadDigital } from "../../curso/seguridadDigital";
import { seguridadRecursos } from "../../curso/seguridadRecursos";
import PracticaSeguridad from "../../Components/PracticaSeguridad";
import { cobrosRecursos } from "../../curso/cobrosRecursos";
import ApoyoAprendizaje, { VideoInteractivo } from "../../Components/ApoyoAprendizaje";
import PracticaCobros from "../../Components/PracticaCobros";
import "../../Css/LeccionesGuiadas.css";

const leccionesPorModulo = { 6: leccionesCobrosDigitales, 7: leccionesSeguridadDigital, ...leccionesNuevas };

export default function LeccionGuiada({ moduloId, numContenido, numeroModulo, tituloModulo, onComplete }) {
  const lecciones = leccionesPorModulo[moduloId];
  const { titulo, intro, bloques, ejemplo, video, recursos, caso } = lecciones[numContenido - 1];
  const practica = practicasGuiadas[moduloId][numContenido - 1];
  const imagen = imagenLeccion(moduloId, numContenido);
  const apoyo = moduloId === 6 ? cobrosRecursos[numContenido - 1] : moduloId === 7 ? seguridadRecursos[numContenido - 1] : nuevosRecursos[moduloId]?.[numContenido - 1];
  const [respuesta, setRespuesta] = useState(null);
  const [revisada, setRevisada] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [guardada, setGuardada] = useState(false);
  const acierto = revisada && respuesta === caso.correcta;

  async function guardar() {
    setGuardando(true);
    try {
      setGuardada(await onComplete());
    } finally {
      setGuardando(false);
    }
  }

  return (
    <article className="leccion-guiada">
      <header className="leccion-guiada__cabecera">
        <p>Módulo {numeroModulo} · {tituloModulo} · Lección {numContenido} de {lecciones.length}</p>
        <h1>{apoyo ? tituloModulo : titulo}</h1>
        {apoyo && <h2 className="cobros-subtitulo">{titulo}</h2>}
        <p className="leccion-guiada__intro">{intro}</p>
      </header>

      <div className="leccion-guiada__contenido">
        {apoyo && <section className="leccion-guiada__tarjeta"><h2>Objetivos de esta lección</h2><div className="leccion-guiada__cuerpo"><ul>{apoyo.objetivos.map(objetivo => <li key={objetivo}>{objetivo}</li>)}</ul></div></section>}
        {bloques.map(([nombre, ...parrafos], indice) => {
          const tieneApoyo = indice === 0 && (apoyo || imagen || ejemplo);
          return (
            <section className="leccion-guiada__tarjeta" key={nombre}>
              <h2>
                <span className="leccion-guiada__numero">{numContenido}.{indice + 1}</span>
                {nombre}
              </h2>
              <div className={`leccion-guiada__cuerpo${tieneApoyo ? " leccion-guiada__columnas" : ""}`}>
                <div>{parrafos.map(parrafo => <p key={parrafo}>{parrafo}</p>)}</div>
                {tieneApoyo && (apoyo ? <FotoLeccion imagen={apoyo.imagen} carpeta={moduloId === 7 ? "seguridad" : "cobros"} /> : imagen ? <FiguraLeccion imagen={imagen} /> : <EjemploLeccion ejemplo={ejemplo} />)}
              </div>
            </section>
          );
        })}

        {apoyo && <section className="leccion-guiada__tarjeta"><h2>Ejemplo resuelto · {apoyo.ejemplo[0]}</h2><div className="leccion-guiada__cuerpo"><ol className="leccion-guiada__pasos">{apoyo.ejemplo.slice(1).map(paso => <li key={paso}>{paso}</li>)}</ol>{ejemplo && <EjemploLeccion ejemplo={ejemplo} />}</div></section>}

        {apoyo && <VideoInteractivo video={{ ...apoyo.video, ...caso }} />}
        {moduloId === 6 && <PracticaCobros numero={numContenido} />}
        {moduloId === 7 && <PracticaSeguridad numero={numContenido} />}
        {moduloId >= 8 && <CuestionarioRepaso preguntas={[caso]} titulo="Laboratorio interactivo · Decide y comprueba" />}

        <section className="leccion-guiada__tarjeta">
          <h2><span className="leccion-guiada__numero">{numContenido}.{bloques.length + 1}</span>{practica.titulo}</h2>
          <div className="leccion-guiada__cuerpo">
            <ol className="leccion-guiada__pasos">{practica.pasos.map(paso => <li key={paso}>{paso}</li>)}</ol>
          </div>
        </section>

        {video && !apoyo && <VideoLeccion video={video} />}

        {(recursos?.length > 0 || apoyo) && (
          <section className="leccion-guiada__tarjeta">
            <h2>Recursos de consulta</h2>
            <div className="leccion-guiada__cuerpo">
              <ul>{[...(recursos || []), ...(apoyo ? [apoyo.fuente] : [])].map(([nombre, url]) => <li key={url}><a href={url} target="_blank" rel="noreferrer">{nombre}</a></li>)}</ul>
            </div>
          </section>
        )}

        <section className="leccion-guiada__tarjeta leccion-guiada__actividad">
          <h2><span className="leccion-guiada__numero">{numContenido}.{bloques.length + 2}</span>Actividad práctica</h2>
          <div className="leccion-guiada__cuerpo"><p>{practica.actividad}</p></div>
        </section>

        {apoyo && <ApoyoAprendizaje moduloId={moduloId} numContenido={numContenido} mostrarVideo={false} />}

        <section className="leccion-guiada__tarjeta">
          <h2><span className="leccion-guiada__numero">{numContenido}.{bloques.length + 3}</span>Comprueba lo aprendido</h2>
          <div className="leccion-guiada__cuerpo">
            <fieldset className="leccion-guiada__pregunta">
              <legend>{caso.pregunta}</legend>
              {caso.opciones.map((opcion, index) => (
                <label key={opcion} className="leccion-guiada__opcion">
                  <input type="radio" name="caso" checked={respuesta === index} onChange={() => { setRespuesta(index); setRevisada(false); }} disabled={acierto} />
                  {opcion}
                </label>
              ))}
            </fieldset>
            {revisada && (
              <p role="status" className={`leccion-guiada__feedback${acierto ? "" : " leccion-guiada__feedback--revisar"}`}>
                {acierto ? caso.explicacion : "Revisa las recomendaciones de la lección y prueba otra opción."}
              </p>
            )}
            {!acierto && <button className="leccion-guiada__boton" disabled={respuesta === null || revisada} onClick={() => setRevisada(true)}>Comprobar respuesta</button>}
            {acierto && (
              <button className="leccion-guiada__boton" disabled={guardando || guardada} onClick={guardar}>
                {guardada ? <><CheckCircle2 size={18} aria-hidden="true" /> Lección completada</> : guardando ? "Guardando…" : "Marcar lección como completada"}
              </button>
            )}
          </div>
        </section>
      </div>
    </article>
  );
}

function FotoLeccion({ imagen, carpeta = "cobros" }) {
  return <figure className="cobros-foto"><img src={`/images/${imagen.carpeta || carpeta}/${imagen.archivo}.jpg`} alt={imagen.alt} style={{ objectPosition: imagen.archivo === '5483240' ? 'center 85%' : 'center' }} loading="lazy" decoding="async" width="1000" height="667" /><figcaption>{imagen.pie}<br />Foto: <a href={imagen.fuente} target="_blank" rel="noreferrer">{imagen.autor} / Pexels</a></figcaption></figure>;
}

function EjemploLeccion({ ejemplo }) {
  return (
    <div className="leccion-guiada__ejemplo">
      <h3>{ejemplo.titulo}</h3>
      <dl>
        {ejemplo.datos.map(([etiqueta, valor]) => (
          <div key={etiqueta}>
            <dt>{etiqueta}</dt>
            <dd>{valor}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function FiguraLeccion({ imagen }) {
  const { url, descripcion, columnas, columna, fila } = imagen;
  return (
    <figure className="leccion-guiada__figura">
      <div className="leccion-guiada__imagen" style={{ "--proporcion": columnas === 3 ? "1 / 1" : "4 / 3" }}>
        <img src={url} alt={descripcion} decoding="async" style={{ width: `${columnas * 100}%`, left: `${-columna * 100}%`, top: `${-fila * 100}%` }} />
      </div>
      <figcaption>Imagen ilustrativa · {descripcion}</figcaption>
    </figure>
  );
}

function VideoLeccion({ video }) {
  const [reproducir, setReproducir] = useState(false);
  return (
    <section className="leccion-guiada__tarjeta">
      <h2>Video · {video.titulo}</h2>
      <div className="leccion-guiada__cuerpo">
        {video.autor && <p>Video de {video.autor}</p>}
        {reproducir ? (
          <iframe
            className="leccion-guiada__video"
            title={video.titulo}
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&cc_load_policy=1`}
            referrerPolicy="strict-origin-when-cross-origin"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : <button className="leccion-guiada__boton" onClick={() => setReproducir(true)}>Reproducir video</button>}
        <p className="leccion-guiada__video-enlace"><a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer">Ver en YouTube</a></p>
      </div>
    </section>
  );
}
