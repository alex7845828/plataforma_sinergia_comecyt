// Fotografías reales de Pexels. Las claves son IDs del catálogo, no el número visible.
const foto = (carpeta, id, slug, alt, posicion) => ({
  src: `/images/${carpeta}/${id}.jpg`,
  fuente: `https://www.pexels.com/photo/${slug}-${id}/`,
  alt,
  posicion,
});

export const PORTADAS_MODULOS = {
  1: foto("modulos", 5827840, "close-up-of-typing-on-a-laptop", "Manos escribiendo en una computadora portátil junto a un cuaderno"),
  2: foto("modulos", 4132606, "a-person-holding-a-cellphone-with-logo-on-the-screen", "Persona sosteniendo un teléfono con Facebook en pantalla", "center 42%"),
  3: foto("modulos", 4132538, "a-person-holding-a-cellphone-with-logo-on-the-screen", "Teléfono con WhatsApp en pantalla", "center 40%"),
  4: foto("modulos", 15525898, "social-media-on-smartphone", "Publicación de Instagram en la pantalla de un teléfono"),
  5: foto("nuevos", 5186356, "people-working-on-a-desk", "Personas practicando con una computadora y un cuaderno"),
  6: foto("cobros", 3907306, "woman-paying-with-credit-card", "Cliente realizando un pago con tarjeta en un comercio"),
  7: foto("seguridad", 5483240, "laptop-with-cyber-security-text-on-the-screen", "Computadora con un mensaje de seguridad digital en pantalla", "center 80%"),
  8: foto("nuevos", 7651822, "people-working-together-on-the-laptop", "Equipo colaborando alrededor de una computadora portátil"),
  9: foto("nuevos", 9301295, "colleagues-using-a-laptop-in-the-office", "Profesionales trabajando y compartiendo ideas en una oficina", "center 35%"),
  10: foto("nuevos", 5835267, "interior-of-modern-taxi-car-while-passenger-paying-for-ride", "Pasajero pagando un viaje a su conductor"),
  11: foto("modulos", 16037282, "a-laptop-displaying-chatgpt-site", "Computadora portátil mostrando el sitio de ChatGPT", "center 58%"),
};
