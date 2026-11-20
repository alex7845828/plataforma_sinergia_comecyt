export const seguridadRecursos = [
  {
    objetivos: ['Distinguir confidencialidad, integridad y disponibilidad.', 'Clasificar datos según quién necesita verlos.', 'Compartir únicamente la información necesaria.'],
    imagen: { archivo: '5483240', autor: 'cottonbro studio', fuente: 'https://www.pexels.com/photo/laptop-with-cyber-security-text-on-the-screen-5483240/', alt: 'Computadora con el texto Cyber Security en pantalla', pie: 'La seguridad digital protege información, cuentas y dispositivos.' },
    video: { id: 'EHjmxujXIaQ', titulo: 'Ciberseguridad para la empresa (1/4)', autor: 'INCIBE', antes: 'Piensa qué información de tu trabajo o escuela necesita protección.', durante: 'Relaciona la protección de la información con un archivo que uses a diario.' },
    ejemplo: ['El taller de Ana', 'Ana prepara un cartel con la fecha del taller y una lista con los teléfonos de participantes.', 'Publica el cartel, comparte la lista solo con quien coordina y conserva sus códigos de acceso de forma privada.', 'Si alguien cambia la fecha sin permiso afecta la integridad; si pierde la única copia, afecta la disponibilidad.'],
    fuente: ['Guía de privacidad y seguridad · INCIBE', 'https://www.incibe.es/sites/default/files/docs/guiaprivacidadseguridadinternet.pdf'],
  },
  {
    objetivos: ['Distinguir phishing, smishing y vishing.', 'Reconocer presión, urgencia y solicitudes de códigos.', 'Comprobar avisos desde un canal independiente.'],
    imagen: { archivo: '4921398', autor: 'RDNE Stock project', fuente: 'https://www.pexels.com/photo/close-up-shot-of-a-person-sending-text-message-4921398/', alt: 'Persona escribiendo un mensaje en un teléfono', pie: 'Un mensaje puede ser legítimo o engañoso: revisa la solicitud y verifica su origen. La fotografía es ilustrativa.' },
    video: { id: '7T32WBQRrBA', titulo: 'Phishing · Caso real', autor: 'INCIBE', antes: 'Recuerda que el nombre visible de un remitente no demuestra su identidad.', durante: 'Identifica la petición del mensaje y cómo verificarla sin seguir su enlace. Los canales de ayuda citados por INCIBE corresponden a España.' },
    ejemplo: ['Un paquete inesperado', 'Llega un SMS: «Paga ahora o devolveremos tu paquete». Incluye un enlace que no reconoces.', 'No abres el enlace ni respondes con datos. Consultas el pedido desde la aplicación que ya utilizabas.', 'Si el aviso no coincide con el pedido, reportas el mensaje. Si ya compartiste datos, proteges la cuenta por canales oficiales.'],
    fuente: ['Guía de ciberataques · INCIBE', 'https://www.incibe.es/sites/default/files/docs/guia-ciberataques/osi-guia-ciberataques.pdf'],
  },
  {
    objetivos: ['Verificar solicitudes de dinero sin dejarse presionar.', 'Diferenciar una captura de un abono confirmado.', 'Revisar comercio, dominio y condiciones antes de comprar.'],
    imagen: { archivo: '6969933', carpeta: 'cobros', autor: 'Mikhail Nilov', fuente: 'https://www.pexels.com/photo/a-person-using-his-cellphone-and-credit-card-for-online-transaction-6969933/', alt: 'Persona revisando el teléfono mientras sostiene una tarjeta', pie: 'Antes de pagar o compartir información, verifica el comercio y la solicitud.' },
    video: { id: 'heErzZM7yXU', titulo: 'Compras seguras por Internet', autor: 'CONDUSEF', antes: 'Enumera dos datos que comprobarías de una tienda desconocida.', durante: 'Identifica cómo revisar una compra y qué evidencia conservar para una aclaración.' },
    ejemplo: ['El proveedor cambia de cuenta', 'Un correo pide que el siguiente pago se haga a una cuenta distinta y exige rapidez.', 'Luis pausa el pago y llama al contacto del proveedor que tenía guardado desde antes.', 'Documenta la respuesta y solo continúa cuando verifica los datos. Un logotipo y un candado HTTPS no sustituyen esta comprobación.'],
    fuente: ['Orientación financiera · CONDUSEF', 'https://www.condusef.gob.mx/'],
  },
  {
    objetivos: ['Usar contraseñas largas y únicas.', 'Explicar qué aporta un segundo factor.', 'Preparar la recuperación sin compartir secretos.'],
    imagen: { archivo: '12376016', autor: "I'm Zion", fuente: 'https://www.pexels.com/photo/a-person-holding-a-mobile-phone-12376016/', alt: 'Teléfono con pantalla de bloqueo y lector de huella', pie: 'El bloqueo del dispositivo y los controles de acceso ayudan a proteger tus cuentas.' },
    video: { id: 'Ls5AvCIbZB0', titulo: '¡Activa ya la verificación en dos pasos!', autor: 'INCIBE', antes: 'Distingue la contraseña del segundo paso que comprueba tu identidad.', durante: 'Piensa cómo recuperarías el acceso si perdieras el teléfono. No apruebes solicitudes de acceso que no iniciaste.' },
    ejemplo: ['Preparar un cambio de teléfono', 'Elena usa claves distintas para su correo y sus otras cuentas, y activa un segundo factor disponible.', 'Antes de cambiar el teléfono comprueba su método de recuperación y guarda los códigos de respaldo en un lugar protegido y separado.', 'Si aparece una solicitud de acceso que no inició, la rechaza y revisa la actividad desde la aplicación oficial.'],
    fuente: ['Verificación en dos pasos · Google', 'https://support.google.com/accounts/answer/185839?hl=es'],
  },
  {
    objetivos: ['Revisar actualizaciones, bloqueo y conexiones.', 'Comprobar que un respaldo permite recuperar archivos.', 'Responder a un incidente y conservar evidencia.'],
    imagen: { archivo: '40097750', autor: 'Jakub Zerdzicki', fuente: 'https://www.pexels.com/photo/modern-workspace-with-external-hard-drives-and-laptop-40097750/', alt: 'Computadora y discos externos sobre una mesa de trabajo', pie: 'Los respaldos deben mantenerse protegidos y probarse antes de necesitarlos.' },
    video: { id: 'rPfZ5EPnle4', titulo: 'Ciberseguridad para la empresa (4/4)', autor: 'INCIBE', antes: 'Piensa cómo continuarías si tu computadora dejara de funcionar.', durante: 'Relaciona las medidas del video con tu plan de respaldo y recuperación. Aplica los principios a tus dispositivos, aunque cambien las pantallas.' },
    ejemplo: ['Una cuenta comprometida', 'Mario compartió un código por teléfono y ve una transferencia desconocida.', 'Interrumpe el contacto y llama al banco por un canal oficial para solicitar protección. Conserva mensajes, fecha, importe y folio.', 'Desde un equipo confiable protege las credenciales y revisa sesiones. Da seguimiento al reporte y comprueba sus respaldos.'],
    fuente: ['Cómo crear copias de seguridad · INCIBE', 'https://www.incibe.es/sites/default/files/docs/guia_como_crear_una_copia_de_seguridad.pdf'],
  },
];

export const retosSeguridad = [
  {
    titulo: 'Clasifica la información del taller',
    instruccion: 'Asigna el alcance adecuado a cada elemento de este ejemplo. No escribas datos personales reales.',
    opciones: ['Público', 'Solo el equipo autorizado', 'Secreto de acceso'],
    items: [
      ['Cartel aprobado con fecha y lugar del taller', 0, 'El cartel se preparó para difundirse.'],
      ['Lista de teléfonos para coordinación', 1, 'Solo necesita verla quien organiza.'],
      ['Código temporal para entrar a tu cuenta', 2, 'Un código puede autorizar un acceso y no debe compartirse.'],
      ['Contraseña del correo', 2, 'Es un secreto de acceso, incluso dentro de un equipo.'],
    ],
  },
  {
    titulo: 'Reconoce el tipo de amenaza',
    instruccion: 'Relaciona cada situación con el concepto adecuado; fíjate en el canal y en lo que se solicita.',
    opciones: ['Phishing', 'Smishing', 'Vishing', 'Ransomware'],
    items: [
      ['Un SMS falso pide pagar por un paquete', 1, 'Smishing es un engaño por SMS.'],
      ['Una llamada solicita tu código bancario', 2, 'Vishing utiliza la voz para engañar.'],
      ['Un correo falso te lleva a un inicio de sesión imitado', 0, 'El phishing suplanta a un servicio para obtener datos.'],
      ['Un programa bloquea tus archivos y exige un rescate', 3, 'El ransomware cifra o bloquea información para exigir dinero.'],
    ],
  },
  {
    titulo: 'Decide cómo verificar una solicitud',
    instruccion: 'Escoge la acción de verificación que corresponde a cada caso.',
    opciones: ['Consultar mis movimientos', 'Llamar al contacto previamente registrado', 'Revisar dominio, contacto y condiciones', 'Detener el proceso y verificar la oferta'],
    items: [
      ['Un comprador enseña una captura y pide el producto', 0, 'Comprueba el abono en tu propia cuenta antes de entregar.'],
      ['Un supuesto proveedor comunica una nueva cuenta de cobro', 1, 'Usa el contacto que ya conocías, no el enviado en la solicitud.'],
      ['Una tienda desconocida anuncia una gran rebaja', 2, 'Revisa la identidad del comercio y el costo final.'],
      ['Una vacante exige un depósito para reservar la entrevista', 3, 'Pagar un anticipo por una vacante es una señal de alerta.'],
    ],
  },
  {
    titulo: 'Audita una cuenta ficticia',
    instruccion: 'Decide qué prácticas conservar y cuáles corregir. No introduzcas contraseñas ni códigos reales.',
    opciones: ['Conservar', 'Corregir'],
    items: [
      ['La misma contraseña se usa en correo y redes', 1, 'Usa claves distintas para limitar el impacto de una filtración.'],
      ['Se activa un segundo factor disponible', 0, 'Añade una comprobación al acceso.'],
      ['Los códigos de recuperación están solo en el teléfono', 1, 'Necesitas poder recuperarlos si pierdes ese teléfono.'],
      ['Se revisan los dispositivos con sesiones abiertas', 0, 'Esto ayuda a detectar accesos que no reconoces.'],
    ],
  },
  {
    titulo: 'Prepara tu respuesta ante un incidente',
    instruccion: 'Elige la acción adecuada. En un incidente real algunas acciones pueden realizarse en paralelo; aquí identificarás su propósito.',
    opciones: ['Proteger la cuenta con el banco', 'Recuperar acceso desde un equipo confiable', 'Conservar evidencia para seguimiento', 'Comprobar y mantener los respaldos'],
    items: [
      ['Aparece una transferencia que no reconoces', 0, 'Contacta de inmediato al banco por un canal oficial y solicita protección.'],
      ['La contraseña quedó expuesta y hay sesiones desconocidas', 1, 'Desde un equipo confiable cambia credenciales y cierra sesiones ajenas.'],
      ['Recibes un folio tras reportar el incidente', 2, 'Conserva folio, fechas y mensajes sin publicar datos sensibles.'],
      ['Quieres saber si podrías recuperar un archivo perdido', 3, 'Restaura y abre un archivo de prueba para comprobar el respaldo.'],
    ],
  },
];
