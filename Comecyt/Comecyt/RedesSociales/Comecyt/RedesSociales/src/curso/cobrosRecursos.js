// Videos verificados por YouTube oEmbed y fotografías descargadas de Pexels.
export const cobrosRecursos = [
  {
    objetivos: ['Distinguir una transferencia de un pago con tarjeta.', 'Revisar destinatario e importe antes de autorizar.', 'Conservar los datos para dar seguimiento al pago.'],
    imagen: { archivo: '7534796', autor: 'Mikhail Nilov', fuente: 'https://www.pexels.com/photo/man-holding-a-smartphone-and-a-credit-card-7534796/', alt: 'Persona consultando un teléfono con una tarjeta en la mano', pie: 'Los pagos desde el teléfono requieren revisar los datos antes de confirmar.' },
    video: { id: 'QKQlFu6ZITw', titulo: 'El Banco de México y el sistema financiero', autor: 'Banco de México', antes: 'Identifica qué instituciones participan cuando mueves dinero entre cuentas.', durante: 'Relaciona el papel de los bancos con el recorrido del dinero. Después aplica esa idea a la transferencia de práctica.' },
    ejemplo: ['Pago de un libro', 'Lucía acuerda pagar $250 a Librería Sol, cuenta de ejemplo terminada en 1234.', 'La pantalla muestra $520. Lucía regresa, corrige a $250 y compara nuevamente el destinatario.', 'Tras autorizar, conserva fecha, importe y clave de rastreo. Si existe una duda, consulta el estado antes de repetir el pago.'],
    fuente: ['Información de SPEI · Banco de México', 'https://www.banxico.org.mx/servicios/spei_-informacion-banco-mex.html'],
  },
  {
    objetivos: ['Comparar costo, comprobante y plazo de abono.', 'Distinguir importe cobrado y dinero neto recibido.', 'Reconocer la función de una tarjeta digital y su CVV dinámico.'],
    imagen: { archivo: '3907306', autor: 'Andrea Piacquadio', fuente: 'https://www.pexels.com/photo/woman-paying-with-credit-card-3907306/', alt: 'Cobro con terminal en una cafetería', pie: 'Cada medio de cobro puede tener condiciones y tiempos distintos.' },
    video: { id: '2KRXEwLY_9o', titulo: 'Pon tus compras en modo digital', autor: 'BBVA México · ejemplo de un proveedor', antes: 'Distingue la tarjeta digital del plástico físico. El ejemplo no requiere contratar un producto.', durante: 'Identifica para qué sirve el código dinámico. Las pantallas y condiciones pueden variar entre instituciones.' },
    ejemplo: ['Dos opciones para cobrar $300', 'Opción A: comisión total de $12 y abono mañana. Neto: $300 − $12 = $288.', 'Opción B: comisión total de $9 y abono en tres días. Neto: $300 − $9 = $291.', 'B deja $3 más, pero A permite disponer antes. La decisión depende de cuándo necesitas el dinero; las cifras son ficticias.'],
    fuente: ['Educación financiera · CONDUSEF', 'https://www.condusef.gob.mx/?idc=1923&idcat=3&p=contenido'],
  },
  {
    objetivos: ['Revisar monto, destinatario y concepto de un cobro.', 'Dividir un gasto sin perder centavos.', 'Registrar pagos parciales y saldos pendientes.'],
    imagen: { archivo: '3933649', autor: 'Andrea Piacquadio', fuente: 'https://www.pexels.com/photo/woman-paying-with-credit-card-3933649/', alt: 'Clienta y vendedora realizando una compra en una florería', pie: 'En cualquier venta, relaciona el pedido con el pago recibido. La foto ilustra una compra con tarjeta, no un QR.' },
    video: { id: 'EF4owSm_neU', titulo: 'Información sobre CoDi® Cobro Digital II', autor: 'Banco de México', antes: 'Piensa qué diferencia hay entre solicitar un pago y recibir el dinero.', durante: 'Observa el intercambio de la solicitud y su autorización. Revisa los movimientos de tu cuenta para confirmar un abono.' },
    ejemplo: ['Una cuenta compartida de $630', 'Tres personas acuerdan aportar $210 cada una y usar la referencia CENA-01.', 'Si una persona abona $100, todavía debe $110. El registro conserva ambos importes.', 'Una captura no cierra el cobro: comprueba el movimiento en tu cuenta y después marca la aportación como recibida.'],
    fuente: ['Cobrar con CoDi · Banco de México', 'https://www.banxico.org.mx/sistemas-de-pago/d/%7B81FB2D16-65D3-E5E0-A677-645B5432A7E0%7D.pdf'],
  },
  {
    objetivos: ['Identificar señales de engaño en una compra.', 'Calcular el costo con envío.', 'Conservar evidencia sin compartir códigos de acceso.'],
    imagen: { archivo: '6969933', autor: 'Mikhail Nilov', fuente: 'https://www.pexels.com/photo/a-person-using-his-cellphone-and-credit-card-for-online-transaction-6969933/', alt: 'Persona revisando información en un teléfono mientras sostiene una tarjeta', pie: 'Lee y verifica el sitio antes de introducir datos de pago.' },
    video: { id: 'heErzZM7yXU', titulo: 'Compras seguras por Internet', autor: 'CONDUSEF', antes: 'Anota qué revisarías en una tienda que todavía no conoces.', durante: 'Identifica señales de confianza y de riesgo. El candado de HTTPS por sí solo no demuestra que una tienda sea legítima.' },
    ejemplo: ['Una oferta que merece revisión', 'Una mochila cuesta $480 más $65 de envío: total $545.', 'Revisas dominio, contacto, entrega y devoluciones antes de pagar. Conservas el resumen del pedido.', 'Un supuesto repartidor pide tu código bancario. No lo compartes y consultas el pedido desde la app oficial.'],
    fuente: ['Comercio electrónico · CONDUSEF', 'https://www.condusef.gob.mx/'],
  },
  {
    objetivos: ['Separar ingreso recibido y cobro pendiente.', 'Calcular disponibilidad después de reservas y gastos.', 'Revisar suscripciones y conservar confirmaciones.'],
    imagen: { archivo: '5466785', autor: 'olia danilevich', fuente: 'https://www.pexels.com/photo/black-calculator-beside-coins-and-notebook-5466785/', alt: 'Calculadora, libreta, monedas y billetes para organizar un presupuesto', pie: 'Fotografía ilustrativa con moneda extranjera. Los ejercicios del curso están expresados en pesos mexicanos.' },
    video: { id: 'Kw5cX91_ugg', titulo: 'Presupuesto', autor: 'CONDUSEF', antes: 'Distingue ingresos, gastos y dinero reservado para un objetivo.', durante: 'Piensa qué pagos debes incluir para no contar el mismo dinero dos veces.' },
    ejemplo: ['Planea la semana con $1,200', 'Reservas $650 para gastos fijos y $200 para ahorro: quedan $350.', 'Después de gastar $95, quedan $255. Una compra de $280 excedería la disponibilidad por $25.', 'Los $300 que esperas recibir el viernes siguen siendo un cobro pendiente hasta que se reflejen.'],
    fuente: ['Planificador de presupuesto · CONDUSEF', 'https://www.condusef.gob.mx/?idc=1328&p=contenido'],
  },
];
