import { useId, useState } from "react";
import { Plus } from "lucide-react";

export const FAQS = [
  { q: "¿Qué tipo de negocios pueden consultar?", a: "La propuesta está orientada a cafeterías, restaurantes, hoteles, panaderías y otros comercios gastronómicos interesados en nuestros productos." },
  { q: "¿Cuál es la zona de cobertura?", a: "La cobertura comercial prevista incluye Esquel y localidades cercanas. Consultanos por tu ubicación para confirmar la disponibilidad." },
  { q: "¿Cómo puedo conocer el catálogo y los precios?", a: "Podés solicitar el catálogo y consultar precios mayoristas mediante WhatsApp o el formulario comercial." },
  { q: "¿Trabajan con entrega o retiro?", a: "Consultanos por las modalidades de abastecimiento disponibles para tu localidad. Las condiciones se confirman con el equipo comercial." },
  { q: "¿Hay un pedido mínimo?", a: "Las cantidades mínimas, si corresponden, se informan al consultar las condiciones comerciales." },
  { q: "¿Qué productos ofrecen?", a: "Contamos con una propuesta de medialunas y productos de panadería. Solicitá el catálogo actualizado para conocer las variedades disponibles." },
  { q: "¿Cómo empiezo a comprar?", a: "Completá el formulario o escribinos por WhatsApp. Podremos conocer tu negocio y orientarte sobre los próximos pasos." },
];

export function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-warm-white">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        const btnId = `${base}-b${i}`;
        const panelId = `${base}-p${i}`;
        return (
          <div key={f.q}>
            <h3 className="font-sans">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-petrol-deep hover:text-teal"
              >
                {f.q}
                <Plus className={`h-5 w-5 shrink-0 text-gold transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`} aria-hidden="true" />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} hidden={!isOpen} className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
              {f.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
