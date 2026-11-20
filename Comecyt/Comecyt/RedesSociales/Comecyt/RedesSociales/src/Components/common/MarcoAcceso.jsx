import { BookOpen, FolderOpen, LockKeyhole, GraduationCap, Laptop, ChartNoAxesColumn, Award } from "lucide-react";
import "../../Css/Acceso.css";

export default function MarcoAcceso({ tituloId, children }) {
  return (
    <main className="acceso-agora">
      <section className="acceso-agora__marca" aria-label="ÁGORA COMECYT">
        <div className="acceso-agora__firma">
          <span className="acceso-agora__simbolo"><BookOpen size={24} aria-hidden="true" /></span>
          <span><strong>ÁGORA</strong><small>COMECYT</small></span>
        </div>
        <div className="acceso-agora__presentacion">
          <span className="acceso-agora__etiqueta"><GraduationCap size={22} aria-hidden="true" /> Plataforma de aprendizaje digital</span>
          <h1>Habilidades digitales para la <span>vida diaria</span></h1>
          <p>Aprende a colaborar, comunicarte y usar herramientas digitales con confianza.</p>
          <div className="acceso-agora__beneficios" aria-label="Características de la plataforma">
            <span><Laptop aria-hidden="true" />Cursos prácticos</span>
            <span><ChartNoAxesColumn aria-hidden="true" />Actividades</span>
            <span><Award aria-hidden="true" />Certificados</span>
          </div>
        </div>
        <div className="acceso-agora__temas" aria-label="Temas de aprendizaje">
          <span><FolderOpen aria-hidden="true" size={18} /> Colaboración</span>
          <span><LockKeyhole aria-hidden="true" size={18} /> Seguridad digital</span>
        </div>
      </section>
      <section className="acceso-agora__panel" aria-labelledby={tituloId}>
        <div className="acceso-agora__contenido">{children}</div>
      </section>
    </main>
  );
}
