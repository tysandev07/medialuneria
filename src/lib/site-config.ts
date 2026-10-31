// Datos editables del sitio. Verificar antes de publicar.
// WhatsApp en formato internacional Argentina: 54 + 9 + código de área sin 0 + número sin 15.
export const WHATSAPP_NUMBER = "5492945548062"; // 2945-548062 — confirmar que sea el WhatsApp comercial vigente
export const PHONE_DISPLAY = "2945-548062";
export const EMAIL: string | null = null; // Completar con un correo real confirmado
export const ADDRESS = "Av. Alvear 947, Esquel, Chubut, Argentina";
export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;
export const SOCIAL: { instagram: string | null; facebook: string | null } = {
  instagram: null, // p. ej. "https://instagram.com/..."
  facebook: null,
};
// Horarios de referencia — verificar con el negocio (no necesariamente atención mayorista)
export const HOURS = [
  { days: "Lunes a viernes", time: "7:30–11:30 y 15:30–19:30" },
  { days: "Sábados y domingos", time: "8:30–11:30 y 15:30–19:30" },
];

export const NAV = [
  { id: "inicio", label: "Inicio" },
  { id: "productos", label: "Productos" },
  { id: "negocios", label: "Para tu negocio" },
  { id: "como-trabajamos", label: "Cómo trabajamos" },
  { id: "fabrica", label: "Sobre la fábrica" },
  { id: "faq", label: "Preguntas frecuentes" },
];

export const BUSINESS_TYPES = [
  "Cafetería",
  "Restaurante",
  "Hotel",
  "Panadería",
  "Comercio gastronómico",
  "Otro",
];

const DEFAULT_MSG =
  "Hola, soy de un negocio de [LOCALIDAD] y quisiera conocer el catálogo y los precios mayoristas de Medialunería.";

export const WA_MESSAGES = {
  header: "Hola, quisiera solicitar una cotización mayorista de Medialunería para mi negocio.",
  hero: DEFAULT_MSG,
  productos: "Hola, quisiera recibir el catálogo completo y los precios mayoristas de Medialunería.",
  floating: DEFAULT_MSG,
  cta: "Hola, quisiera solicitar una cotización por WhatsApp para sumar productos de Medialunería a mi negocio.",
  footer: "Hola, tengo una consulta comercial para Medialunería.",
};

export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Analítica preparada: no envía datos a terceros hasta configurar una herramienta y su aviso de privacidad.
// Nunca incluir datos personales en los eventos.
export function track(event: string, props: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer?.push({ event, ...props });
}
