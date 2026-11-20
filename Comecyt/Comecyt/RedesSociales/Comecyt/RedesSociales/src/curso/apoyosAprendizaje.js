import { leccionesCobrosDigitales } from './cobrosDigitales';
import { leccionesSeguridadDigital } from './seguridadDigital';
import { leccionesNuevas } from './leccionesNuevas';
import { repasoEducaplay } from './repasoEducaplay';

export const materialPorModulo = { 5: repasoEducaplay, 6: leccionesCobrosDigitales, 7: leccionesSeguridadDigital, ...leccionesNuevas };

const smishing = {
  id: '7T32WBQRrBA', titulo: 'Identifica un mensaje engañoso de paquetería', autor: 'INCIBE',
  antes: 'Piensa cómo comprobarías un aviso sobre un paquete sin usar el enlace del mensaje.',
  durante: 'Identifica qué intenta conseguir el remitente y qué hace que el mensaje parezca urgente.',
  pregunta: 'Recibes un aviso de entrega con un enlace de pago inesperado. ¿Cómo lo verificas?',
  opciones: ['Pago para no perder el paquete', 'Abro la app oficial por mi cuenta y consulto el pedido', 'Envío mis códigos al remitente'], correcta: 1,
  explicacion: 'Consultar el pedido por un canal independiente evita depender del enlace del mensaje.',
};

export const videosRepaso = {
  5: smishing,
  6: { id: 'heErzZM7yXU', titulo: 'Compras seguras por Internet', autor: 'CONDUSEF', antes: 'Enumera dos datos que comprobarías antes de pagar en una tienda.', durante: 'Compara las recomendaciones con una compra que podrías hacer. No introduzcas datos reales durante la práctica.', pregunta: 'Una tienda te dirige a un chat para pedir tu contraseña bancaria. ¿Qué haces?', opciones: ['La comparto si tiene logotipo', 'La envío dividida en dos mensajes', 'Detengo la operación y verifico el comercio'], correcta: 2, explicacion: 'Una contraseña bancaria no es un dato que debas entregar a una tienda por chat.' },
  7: smishing,
  8: { id: '-WsFZndJ9JU', titulo: 'Compartir y colaborar en Google Drive', antes: 'Decide quién debe leer, comentar o editar un documento de práctica.', durante: 'Observa la diferencia entre enviar un enlace y asignar permisos al documento.', pregunta: 'Compartes un enlace restringido con una persona que no tiene permiso. ¿Qué necesitas revisar?', opciones: ['La lista de personas con acceso y su rol', 'El color del documento', 'El nombre del navegador'], correcta: 0, explicacion: 'El enlace y el permiso son cosas distintas. Asigna solo el acceso que esa persona necesita.' },
  9: { id: 'ySfMzA2NwJg', titulo: 'Buscar trabajo en LinkedIn', antes: 'Define un puesto y dos aptitudes que puedas demostrar.', durante: 'Relaciona la búsqueda con tu experiencia y anota qué información revisarías en una vacante.', pregunta: '¿Qué conviene hacer antes de postularte?', opciones: ['Enviar el mismo texto sin leer', 'Revisar requisitos y adaptar ejemplos reales de experiencia', 'Inventar un puesto anterior'], correcta: 1, explicacion: 'Una candidatura pertinente conecta requisitos con experiencia verificable.' },
  10: { ...smishing, titulo: 'Entregas: identifica avisos falsos', antes: 'Imagina que esperas una entrega y recibes un SMS que pide un pago extra.', durante: 'Relaciona el engaño del video con un pedido: comprueba cualquier incidencia dentro de la aplicación donde lo solicitaste.' },
  11: { id: '4UTn7oWvSJc', titulo: 'Haz tu primera pregunta a ChatGPT', autor: 'OpenAI Academy · audio en inglés', antes: 'Prepara una pregunta sencilla con datos ficticios. Puedes activar subtítulos y traducción si YouTube los ofrece.', durante: 'Observa cómo una pregunta de seguimiento permite ajustar una respuesta. Practica el mismo principio en ChatGPT o Gemini.', pregunta: 'La respuesta es demasiado complicada. ¿Qué instrucción de seguimiento ayuda?', opciones: ['Repítela exactamente', 'Inventa los datos que falten', 'Explícala en tres pasos y añade un ejemplo sencillo'], correcta: 2, explicacion: 'Puedes precisar extensión, nivel y formato. Revisa los hechos antes de usar la respuesta.' },
};

// Reactivos nuevos de transferencia: complementan los casos de cada lección.
const reactivos = {
  5: [
    ['Después de un memorama recuerdas una palabra pero no su uso. ¿Cómo repasas?', ['Repito solo su nombre', 'La explico con un ejemplo propio', 'Evito volver al tema'], 1, 'Relacionar el concepto con una situación cotidiana comprueba comprensión, además de memoria.'],
    ['¿Qué práctica sirve para todos los retos de seguridad?', ['Usar datos ficticios', 'Probar con contraseñas reales', 'Publicar información personal'], 0, 'Los ejemplos ficticios permiten practicar sin exponer datos personales.'],
    ['Te equivocas al identificar una amenaza. ¿Cuál es el siguiente paso?', ['Memorizar la letra correcta', 'Cambiar todas las opciones al azar', 'Releer la explicación y aplicarla a un caso distinto'], 2, 'Comprender la razón permite reconocer el riesgo en otras situaciones.'],
  ],
  6: [
    ['Una cuenta de $840 se divide entre cuatro personas. ¿Cuánto corresponde a cada una?', ['$210', '$240', '$280'], 0, '840 ÷ 4 = 210. Comprueba el importe antes de preparar el cobro.'],
    ['Tienes $900 y gastos de $320, $180 y $99. ¿Cuánto queda?', ['$401', '$301', '$201'], 1, 'Los gastos suman $599; 900 − 599 = 301.'],
    ['Un pago aparece pendiente. ¿Qué haces antes de repetirlo?', ['Lo envío dos veces', 'Borro la referencia', 'Reviso su estado y consulto a la institución'], 2, 'Repetirlo sin comprobar el estado podría duplicar el pago. Conserva la referencia.'],
  ],
  7: [
    ['Un archivo público contiene teléfonos de participantes. ¿Qué corriges?', ['El tamaño del título', 'Retiro los datos innecesarios y reviso el acceso', 'Añado más datos'], 1, 'Comparte solo información necesaria con las personas autorizadas.'],
    ['¿Qué comprueba que un respaldo es útil?', ['Poder recuperar un archivo de prueba', 'Tener una carpeta llamada respaldo', 'Guardar el acceso solo en el equipo perdido'], 0, 'La recuperación de prueba confirma que puedes acceder a los datos respaldados.'],
    ['Tras detectar un acceso desconocido, ¿qué evidencia es útil?', ['Tu contraseña publicada', 'Rumores de otros usuarios', 'Fecha, hora y avisos de acceso'], 2, 'Documentar hechos ayuda a reportar el incidente sin exponer secretos.'],
  ],
  8: [
    ['Un colaborador terminó su participación. ¿Qué revisas?', ['Su acceso al archivo', 'La fuente del título', 'El fondo de Meet'], 0, 'Los permisos deben corresponder a las tareas actuales.'],
    ['¿Qué acuerdo de reunión es más útil?', ['Alguien lo hará pronto', 'Ana revisará el inventario el viernes y registrará el resultado', 'Después vemos'], 1, 'Responsable, fecha y resultado permiten dar seguimiento.'],
    ['Una edición borró una sección importante. ¿Qué revisas primero?', ['El color de la carpeta', 'El número de pestañas', 'El historial de versiones'], 2, 'El historial permite revisar cambios y recuperar contenido, según tus permisos.'],
  ],
  9: [
    ['No tienes empleo previo. ¿Qué puedes describir de forma honesta?', ['Un cargo inventado', 'Proyectos escolares y tareas comprobables', 'Experiencia de otra persona'], 1, 'Los proyectos muestran habilidades cuando explicas tu responsabilidad y resultado.'],
    ['¿Qué mensaje inicia mejor un contacto profesional?', ['Hola, coincidimos en el taller; me interesa conocer tu experiencia en inventarios', 'Consígueme empleo ya', 'Te envío mis documentos bancarios'], 0, 'Un contexto concreto y una petición respetuosa facilitan la conversación.'],
    ['¿Qué dato debes omitir en un perfil público?', ['Tu área profesional', 'Una habilidad demostrable', 'Tu domicilio completo'], 2, 'No necesitas publicar tu domicilio para presentar tus capacidades.'],
  ],
  10: [
    ['El vehículo no coincide con la placa de tu aplicación. ¿Qué haces?', ['Subo si conoce mi nombre', 'No abordo y reviso o reporto desde la app', 'Le entrego mi teléfono'], 1, 'Comprueba los datos del vehículo y del conductor antes de abordar.'],
    ['Un pedido cuesta $180, envío $25 y servicio $12. ¿Cuál es el total sin propina?', ['$217', '$205', '$192'], 0, 'Suma todos los cargos visibles: 180 + 25 + 12 = 217.'],
    ['Falta un artículo en la entrega. ¿Dónde empiezas la aclaración?', ['En un enlace de un desconocido', 'Publicando tu tarjeta', 'En la ayuda del pedido dentro de la app'], 2, 'La ayuda del pedido permite asociar el reporte con la compra y su comprobante.'],
  ],
  11: [
    ['¿Qué datos usas al practicar un aviso con IA?', ['Contraseñas del equipo', 'Nombres y horarios ficticios', 'Expedientes privados completos'], 1, 'Un ejemplo ficticio permite practicar la redacción sin exponer información.'],
    ['Dos asistentes dan cifras distintas. ¿Cómo decides?', ['Compruebo la fuente original y su fecha', 'Elijo la respuesta más larga', 'Promedio las cifras sin investigar'], 0, 'La verificación depende de evidencia, no de la apariencia de la respuesta.'],
    ['Pides una agenda de 30 minutos y los tiempos suman 45. ¿Qué haces?', ['La uso sin revisar', 'Elimino los tiempos', 'Corrijo la distribución y verifico que sume 30'], 2, 'Revisar el resultado incluye comprobar cálculos y restricciones de la instrucción.'],
  ],
};
export const evaluacionesRepaso = Object.fromEntries(Object.entries(reactivos).map(([id, preguntas]) => [id, preguntas.map(([pregunta, opciones, correcta, explicacion]) => ({ pregunta, opciones, correcta, explicacion }))]));
