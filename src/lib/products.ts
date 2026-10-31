// Categorías iniciales: editar libremente. Reemplazar fotos por imágenes reales de la fábrica.
import hero from "@/assets/hero.jpg";
import facturas from "@/assets/facturas.jpg";
import panaderia from "@/assets/panaderia.jpg";
import variedades from "@/assets/variedades.jpg";

export type Product = { id: string; name: string; description: string; image: string };

export const PRODUCTS: Product[] = [
  { id: "medialunas", name: "Medialunas", description: "Nuestro producto insignia, de elaboración artesanal.", image: hero },
  { id: "facturas", name: "Facturas", description: "Variedad de facturas para tu mostrador o carta.", image: facturas },
  { id: "panaderia", name: "Panadería", description: "Productos de panadería para acompañar tu propuesta.", image: panaderia },
  { id: "otras", name: "Otras variedades", description: "Consultanos por el resto de nuestro catálogo.", image: variedades },
];
