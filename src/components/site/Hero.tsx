import { ArrowRight, Wheat, Handshake, MapPin, Factory } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { scrollToId, track } from "@/lib/site-config";

const ATTRS = [
  { icon: Wheat, label: "Elaboración artesanal" },
  { icon: Handshake, label: "Atención mayorista" },
  { icon: MapPin, label: "Cobertura regional" },
  { icon: Factory, label: "Producción en Esquel" },
];

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-cream">
      <img
        src={hero}
        alt="Medialunas doradas recién horneadas sobre una tabla de madera"
        width={1920}
        height={1024}
        fetchPriority="high"
        className="h-64 w-full object-cover object-right sm:h-80 md:absolute md:inset-0 md:h-full"
      />
      <div className="hero-overlay absolute inset-0 hidden md:block" aria-hidden="true" />
      <div className="container-site relative py-10 md:py-28 lg:py-36">
        <div className="max-w-xl">
          <p className="eyebrow">Proveedor mayorista</p>
          <h1 className="mt-4 text-4xl leading-[1.08] font-semibold text-petrol-deep sm:text-5xl lg:text-6xl">
            Tu proveedor de medialunas artesanales para tu negocio
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-graphite/80">
            Abastecemos cafeterías, restaurantes, hoteles y comercios de Esquel y localidades cercanas con productos de elaboración artesanal.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contacto"
              onClick={(e) => { e.preventDefault(); track("catalog_request_click", { origin: "hero" }); scrollToId("contacto"); }}
              className="btn btn-primary"
            >
              Solicitar catálogo y precios <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#como-trabajamos"
              onClick={(e) => { e.preventDefault(); scrollToId("como-trabajamos"); }}
              className="btn btn-outline"
            >
              Conocer cómo trabajamos
            </a>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-4 border-t border-petrol/15 pt-6 sm:grid-cols-4">
            {ATTRS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex flex-col items-start gap-2 text-sm font-medium text-petrol-deep">
                <Icon className="h-6 w-6 text-gold" strokeWidth={1.5} aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
