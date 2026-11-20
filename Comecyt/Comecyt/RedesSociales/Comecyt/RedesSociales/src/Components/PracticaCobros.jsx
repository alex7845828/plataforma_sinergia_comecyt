import { useState } from 'react';
import { disponiblePresupuesto, netoCobro, repartoCobro } from '../curso/calculosCobros';
import '../Css/CobrosDigitales.css';

const pesos = valor => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(valor);

function Campo({ texto, valor, cambiar, max = 100000, step = '0.01', min = 0 }) {
  return <label className="cobros-campo">{texto}<input type="number" min={min} max={max} step={step} required value={valor} onChange={e => cambiar(e.target.value)} /></label>;
}

function Transferencia() {
  const [monto, setMonto] = useState('520');
  const [destino, setDestino] = useState('4321');
  const [resultado, setResultado] = useState('');
  return <form onSubmit={e => { e.preventDefault(); setResultado(Number(monto) === 250 && destino === '1234' ? 'Correcto: $250 y terminación 1234 coinciden con lo acordado. En una operación real revisarías también el resto de los datos y conservarías la referencia.' : 'Aún hay una diferencia. Compara el importe y la terminación con el pedido antes de confirmar.'); }} onChange={() => setResultado('')}>
    <p><strong>Pedido ficticio:</strong> libro de $250 para Librería Sol, cuenta terminada en 1234. Corrige la pantalla de confirmación.</p>
    <div className="cobros-campos"><Campo texto="Importe en MXN" valor={monto} cambiar={setMonto} /><label className="cobros-campo">Cuenta de ejemplo<select value={destino} onChange={e => setDestino(e.target.value)}><option value="4321">Terminación 4321</option><option value="1234">Terminación 1234</option><option value="3412">Terminación 3412</option></select></label></div>
    <button type="submit">Verificar transferencia de práctica</button><p role="status">{resultado}</p>
  </form>;
}

function Comparador() {
  const [importe, setImporte] = useState('300');
  const [a, setA] = useState('12');
  const [b, setB] = useState('9');
  const [resultado, setResultado] = useState(null);
  return <form onChange={() => setResultado(null)} onSubmit={e => { e.preventDefault(); setResultado({ a: netoCobro(importe, a), b: netoCobro(importe, b) }); }}>
    <p>Compara dos servicios ficticios. Las comisiones introducidas incluyen todos los cargos del ejemplo. A abona mañana y B en tres días.</p>
    <div className="cobros-campos"><Campo texto="Importe del cobro (MXN)" valor={importe} cambiar={setImporte} min={0.01} /><Campo texto="Comisión total A (MXN)" valor={a} cambiar={setA} max={Number(importe)} /><Campo texto="Comisión total B (MXN)" valor={b} cambiar={setB} max={Number(importe)} /></div>
    <button type="submit">Comparar netos</button>
    {resultado && <div role="status" className="cobros-resultado"><p>A: recibes <strong>{pesos(resultado.a)}</strong> mañana. B: recibes <strong>{pesos(resultado.b)}</strong> en tres días.</p><p>Diferencia: {pesos(Math.abs(resultado.a - resultado.b))}. {resultado.a === resultado.b ? 'El neto es igual.' : `La opción ${resultado.a > resultado.b ? 'A' : 'B'} deja más dinero.`} Considera también cuándo necesitas disponer del cobro y dónde aclarar un problema.</p></div>}
  </form>;
}

function Repartidor() {
  const [total, setTotal] = useState('630');
  const [personas, setPersonas] = useState('3');
  const [reparto, setReparto] = useState(null);
  const [recibidos, setRecibidos] = useState({});
  const recibido = reparto?.reduce((suma, monto, i) => suma + (recibidos[i] ? Math.round(monto * 100) : 0), 0) / 100 || 0;
  return <>
    <form onChange={() => { setReparto(null); setRecibidos({}); }} onSubmit={e => { e.preventDefault(); setReparto(repartoCobro(total, personas)); setRecibidos({}); }}>
      <p>Genera aportaciones y marca únicamente los abonos que habrías comprobado en tus movimientos. Si sobran centavos, se distribuyen entre las primeras personas.</p>
      <div className="cobros-campos"><Campo texto="Cuenta total (MXN)" valor={total} cambiar={setTotal} min={0.01} /><Campo texto="Personas" valor={personas} cambiar={setPersonas} step="1" min={1} max={50} /></div><button type="submit">Repartir cobro de práctica</button>
    </form>
    {reparto && <div className="cobros-resultado"><ul className="cobros-aportaciones">{reparto.map((monto, i) => <li key={i}><label><input type="checkbox" checked={!!recibidos[i]} onChange={e => setRecibidos(prev => ({ ...prev, [i]: e.target.checked }))} />Persona {i + 1} · {pesos(monto)} · {recibidos[i] ? 'Abono verificado' : 'Pendiente'}</label></li>)}</ul><p role="status">Recibido: {pesos(recibido)} · Pendiente: {pesos(netoCobro(total, recibido))}</p></div>}
  </>;
}

const senales = [
  ['El dominio tiene una letra cambiada respecto al comercio conocido.', true, 'Una dirección parecida puede suplantar a un comercio. Comprueba el dominio completo.'],
  ['Un mensaje pide el código bancario para liberar la entrega.', true, 'No compartas códigos de acceso o autorización; consulta el pedido por un canal oficial.'],
  ['El total muestra producto, envío y cargos antes de autorizar.', false, 'El desglose ayuda a revisar el costo; por sí solo no garantiza legitimidad.'],
  ['La oferta exige pagar en cinco minutos mediante un enlace inesperado.', true, 'La presión por actuar y el enlace inesperado requieren detenerse y verificar.'],
];
function DetectarFraude() {
  const [seleccion, setSeleccion] = useState({});
  const [revisado, setRevisado] = useState(false);
  return <div><p>Selecciona todas las señales de alerta de esta tienda ficticia. Hay tres. Después compara tu selección.</p>
    <fieldset disabled={revisado}><legend>¿Qué situaciones requieren detenerte y verificar?</legend>{senales.map(([texto], i) => <label className="cobros-opcion" key={texto}><input type="checkbox" checked={!!seleccion[i]} onChange={e => setSeleccion(prev => ({ ...prev, [i]: e.target.checked }))} />{texto}</label>)}</fieldset>
    {revisado && <div className="cobros-resultado" role="status"><p>{senales.filter(([, alerta], i) => !!seleccion[i] === alerta).length} de 4 situaciones clasificadas correctamente.</p><ul>{senales.map(([texto, alerta, explicacion]) => <li key={texto}><strong>{alerta ? 'Alerta' : 'Dato útil'}:</strong> {explicacion}</li>)}</ul></div>}
    <button type="button" onClick={() => { if (revisado) setSeleccion({}); setRevisado(!revisado); }}>{revisado ? 'Volver a practicar' : 'Revisar selección'}</button>
  </div>;
}

function Presupuesto() {
  const [valores, setValores] = useState(['1200', '650', '200', '95']);
  const [resultado, setResultado] = useState(null);
  return <form onChange={() => setResultado(null)} onSubmit={e => { e.preventDefault(); setResultado(disponiblePresupuesto(...valores)); }}>
    <p>Modifica los importes y observa si alcanzan para una compra adicional de $280. Usa únicamente dinero recibido; el ahorro reservado no está disponible para este gasto.</p>
    <div className="cobros-campos">{['Ingreso recibido (MXN)', 'Gastos fijos (MXN)', 'Reserva de ahorro (MXN)', 'Gastos variables (MXN)'].map((texto, i) => <Campo key={texto} texto={texto} valor={valores[i]} cambiar={valor => setValores(prev => prev.map((v, j) => i === j ? valor : v))} />)}</div><button type="submit">Calcular disponibilidad</button>
    {resultado !== null && <div className="cobros-resultado" role="status"><p>Disponible: <strong>{pesos(resultado)}</strong>.</p><p>{resultado < 0 ? `Los compromisos exceden tu ingreso por ${pesos(-resultado)}. Ajusta el plan antes de agregar compras.` : resultado < 280 ? `Faltan ${pesos(280 - resultado)} para la compra de $280. Revisa gastos o pospón la compra.` : `La compra cabe en el ejemplo; después quedarían ${pesos(resultado - 280)}.`}</p></div>}
  </form>;
}

const actividades = [Transferencia, Comparador, Repartidor, DetectarFraude, Presupuesto];
const titulos = ['Revisa antes de transferir', 'Compara métodos de cobro', 'Organiza un cobro compartido', 'Detecta las señales de fraude', 'Construye tu presupuesto'];
export default function PracticaCobros({ numero }) {
  const Actividad = actividades[numero - 1];
  return <section className="leccion-guiada__tarjeta cobros-practica"><h2>Laboratorio interactivo · {titulos[numero - 1]}</h2><div className="leccion-guiada__cuerpo"><p className="cobros-nota">Simulación educativa · Todos los importes son ficticios. No se realizan pagos ni se guardan datos bancarios.</p><Actividad key={numero} /></div></section>;
}
