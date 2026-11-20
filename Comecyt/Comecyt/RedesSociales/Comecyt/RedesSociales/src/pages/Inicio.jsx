import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, ChartNoAxesColumn, CheckCircle2, GraduationCap, Search, LayoutGrid, List, Play } from "lucide-react";
import DescargarConstancia from "../Components/common/DescargarConstancia";
import { useAuth } from "../context/AuthContext";
import { MODULOS, TOTAL_CONTENIDOS } from "../curso/catalogo";
import "../Css/PanelAlumno.css";
import "../Css/InicioModulos.css";
import { PORTADAS_MODULOS } from "../curso/portadasModulos";

const normalizar = texto => texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export default function Inicio() {
  const { api, user } = useAuth();
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(false);
  const [intento, setIntento] = useState(0);
  const [busqueda, setBusqueda] = useState("");
  const [vista, setVista] = useState("cuadricula");
  const vistaPreviaDisponible = import.meta.env.DEV && ["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname);
  const vistaPrevia = Boolean(datos?.modulos_vista_previa?.length);

  function cambiarVistaPrevia() {
    if (vistaPrevia) sessionStorage.removeItem("agora-vista-previa");
    else sessionStorage.setItem("agora-vista-previa", "1");
    setDatos(null);
    setError(false);
    setIntento(valor => valor + 1);
  }

  useEffect(() => {
    const controller = new AbortController();
    api.get("/api/alumno/progreso", { signal: controller.signal })
      .then(({ data }) => setDatos(data))
      .catch(() => { if (!controller.signal.aborted) setError(true); });
    return () => controller.abort();
  }, [api, intento]);

  const porId = new Map(datos?.modulos?.map(modulo => [Number(modulo.modulo_id), modulo]));
  const modulos = MODULOS.map(modulo => {
    const avance = porId.get(modulo.id);
    const cantidad = Math.max(0, Math.min(modulo.fin, Number(avance?.progreso_actual) || 0));
    return { ...modulo, cantidad, constanciaDisponible: avance?.constancia_disponible, siguiente: avance?.siguiente_numero ?? 1 };
  });
  const completados = modulos.filter(m => m.cantidad === m.fin).length;
  const vistos = modulos.reduce((total, m) => total + m.cantidad, 0);
  const porcentaje = Math.round(vistos * 100 / TOTAL_CONTENIDOS);
  const recomendado = modulos.find(m => m.cantidad < m.fin);
  const ruta = modulo => `/modulo/${modulo.id}/contenido/${modulo.siguiente}`;
  const visibles = modulos.filter(modulo => normalizar(`${modulo.nombre} ${modulo.descripcion} Módulo ${modulo.numero}`).includes(normalizar(busqueda.trim())));

  return (
    <div className="panel-alumno inicio-modulos">
      <header className="panel-alumno__portada">
        <div><p className="panel-alumno__marca">Mi aprendizaje</p><h1>Hola, {user?.nombre || "estudiante"}</h1><p>Explora tus módulos y retoma tus lecciones.</p></div>
        {datos && recomendado && <Link className="panel-alumno__boton panel-alumno__boton--claro" to={ruta(recomendado)}>Continuar aprendiendo <ArrowRight size={18} aria-hidden="true" /></Link>}
      </header>
      {!datos && (error
        ? <div className="panel-alumno__tarjeta" role="alert">No pudimos cargar tu avance. <button className="panel-alumno__boton" onClick={() => { setError(false); setIntento(i => i + 1); }}>Reintentar</button></div>
        : <p role="status">Cargando tu progreso…</p>)}
      {datos && <>
        {vistaPreviaDisponible && <div className="panel-alumno__tarjeta">
          <p>{vistaPrevia ? "Vista previa activa. El avance y las evaluaciones no se guardan." : "Modo de acreditación. El avance y las evaluaciones se guardan."}</p>
          <button type="button" className="panel-alumno__boton" onClick={cambiarVistaPrevia}>
            {vistaPrevia ? "Volver al modo de acreditación" : "Explorar en vista previa"}
          </button>
        </div>}
        <section className="panel-alumno__resumen" aria-label="Resumen de avance">
          <article className="panel-alumno__tarjeta"><ChartNoAxesColumn aria-hidden="true" /><h2>Avance general</h2><strong>{porcentaje}%</strong><progress max={100} value={porcentaje} aria-label="Avance general" /></article>
          <article className="panel-alumno__tarjeta"><GraduationCap aria-hidden="true" /><h2>Módulos completados</h2><strong>{completados} / {modulos.length}</strong></article>
          <article className="panel-alumno__tarjeta"><BookOpen aria-hidden="true" /><h2>Contenidos completados</h2><strong>{vistos} / {TOTAL_CONTENIDOS}</strong></article>
        </section>
        <section aria-labelledby="titulo-modulos">
          <div className="modulos-cabecera">
            <div className="modulos-cabecera__titulo"><span className="modulos-cabecera__icono"><GraduationCap size={30} aria-hidden="true" /></span><div><h2 id="titulo-modulos">Mis módulos</h2><p>Continúa tu aprendizaje y completa los cursos de Ágora.</p></div></div>
            <div className="modulos-controles">
              <label className="modulos-busqueda"><Search size={19} aria-hidden="true" /><input type="search" aria-label="Buscar un módulo" placeholder="Buscar un módulo…" value={busqueda} onChange={event => setBusqueda(event.target.value)} /></label>
              <div className="modulos-vistas" role="group" aria-label="Presentación de módulos">
                <button type="button" aria-label="Vista de cuadrícula" aria-pressed={vista === "cuadricula"} onClick={() => setVista("cuadricula")}><LayoutGrid size={21} /></button>
                <button type="button" aria-label="Vista de lista" aria-pressed={vista === "lista"} onClick={() => setVista("lista")}><List size={21} /></button>
              </div>
            </div>
          </div>
          <div className="modulos-temario"><span role="status">{visibles.length} módulos disponibles{busqueda.trim() ? " para tu búsqueda" : ""}</span><Link to="/contenidos">Ver temario <ArrowRight size={16} aria-hidden="true" /></Link></div>
          <div className={`modulos-catalogo modulos-catalogo--${vista}`}>
            {visibles.map(modulo => {
              const portada = PORTADAS_MODULOS[modulo.id];
              const completo = modulo.cantidad === modulo.fin;
              const progreso = Math.round(modulo.cantidad * 100 / modulo.fin);
              return (
                <article className="modulo-curso" key={modulo.id}>
                  <div className="modulo-curso__portada">
                    <img src={portada.src} alt={portada.alt} loading="lazy" width="900" height="600" style={{ objectPosition: portada.posicion || "center" }} />
                    <span className="modulo-curso__numero">Módulo {modulo.numero}</span>
                    {completo && <span className="modulo-curso__completo"><CheckCircle2 size={14} aria-hidden="true" /> Completado</span>}
                    <div className="modulo-curso__texto"><h3>{modulo.nombre}</h3><p>{modulo.descripcion}</p></div>
                  </div>
                  <div className="modulo-curso__detalle">
                    <div className="modulo-curso__progreso"><progress max={modulo.fin} value={modulo.cantidad} aria-label={`Avance en ${modulo.nombre}`} /><strong>{progreso}%</strong></div>
                    <div className="modulo-curso__acciones"><span><BookOpen size={16} aria-hidden="true" /> {modulo.cantidad} de {modulo.fin} contenidos</span>
                    <Link className="panel-alumno__boton" to={ruta(modulo)} aria-label={`${completo ? "Repasar" : modulo.cantidad ? "Continuar" : "Empezar"}: ${modulo.nombre}`}>{completo ? <CheckCircle2 size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}{completo ? "Repasar" : modulo.cantidad ? "Continuar" : "Empezar"}</Link></div>
                  {modulo.constanciaDisponible && <DescargarConstancia moduloId={modulo.id} />}
                  </div>
                </article>
              );
            })}
          </div>
          {!visibles.length && <div className="modulos-vacio"><Search size={28} aria-hidden="true" /><h3>No encontramos ese módulo</h3><p>Prueba con otro tema o vuelve a ver todos los cursos.</p><button type="button" className="panel-alumno__boton" onClick={() => setBusqueda("")}>Ver todos los módulos</button></div>}
          <details className="modulos-creditos"><summary>Créditos de las fotografías</summary><p>Fotografías de Pexels, utilizadas bajo su <a href="https://www.pexels.com/license/" target="_blank" rel="noreferrer">licencia de uso</a>.</p><ul>{modulos.map(modulo => <li key={modulo.id}>{modulo.nombre}: <a href={PORTADAS_MODULOS[modulo.id].fuente} target="_blank" rel="noreferrer">Ver fotografía original</a></li>)}</ul></details>
        </section>
      </>}
    </div>
  );
}
