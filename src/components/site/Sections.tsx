
import {
  ArrowRight,
  Wheat,
  Handshake,
  MapPin,
  MessagesSquare,
  Coffee,
  UtensilsCrossed,
  BedDouble,
  Store,
  PhoneCall,
  FileText,
  CalendarCheck,
  Rocket,
  Sparkles,
  LayoutGrid,
  Building2,
} from "lucide-react";

import cafe from "@/assets/cafe.jpg";
import restaurante from "@/assets/restaurante.jpg";
import hotel from "@/assets/hotel.jpg";
import panaderia from "@/assets/panaderia.jpg";
import factory from "@/assets/factory.jpg";
import { scrollToId, track } from "@/lib/site-config";

function goContact(origin: string, businessType?: string) {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    track("catalog_request_click", { origin });

    if (businessType) {
      window.dispatchEvent(
        new CustomEvent("lead:prefill", {
          detail: { business_type: businessType },
        }),
      );
    }

    scrollToId("contacto");
  };
}

export function BenefitStrip() {
  const items = [
    {
      icon: Wheat,
      t: "Elaboración artesanal",
      d: "Calidad y sabor en cada pieza",
    },
    {
      icon: Handshake,
      t: "Atención mayorista",
      d: "Asesoramiento personalizado",
    },
    {
      icon: MapPin,
      t: "Cobertura regional",
      d: "Esquel y localidades cercanas",
    },
    {
      icon: MessagesSquare,
      t: "Atención comercial",
      d: "Consultas para tu negocio",
    },
  ];

  return (
    <section
      aria-label="Beneficios"
      className="border-y border-border bg-warm-white"
    >
      <ul className="container-site grid grid-cols-2 gap-6 py-8 lg:grid-cols-4 lg:divide-x lg:divide-border">
        {items.map(({ icon: Icon, t, d }) => (
          <li
            key={t}
            className="flex flex-col items-start gap-3 sm:flex-row sm:items-center lg:px-6 lg:first:pl-0"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cream text-petrol">
              <Icon
                className="h-6 w-6"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </span>
            <span>
              <span className="block font-semibold text-petrol-deep">
                {t}
              </span>
              <span className="block text-sm text-muted-foreground">
                {d}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function BusinessTypeCards() {
  const cards = [
    {
      icon: Coffee,
      t: "Cafeterías",
      type: "Cafetería",
      d: "Productos ideales para acompañar cafés, desayunos y meriendas.",
      img: cafe,
      alt: "Café con medialunas en el mostrador de una cafetería",
    },
    {
      icon: UtensilsCrossed,
      t: "Restaurantes",
      type: "Restaurante",
      d: "Sumá productos de panadería a tu carta y propuesta gastronómica.",
      img: restaurante,
      alt: "Panera con medialunas en la mesa de un restaurante",
    },
    {
      icon: BedDouble,
      t: "Hoteles",
      type: "Hotel",
      d: "Consultá opciones para desayunos y servicio a huéspedes.",
      img: hotel,
      alt: "Desayuno de hotel con canastas de medialunas",
    },
    {
      icon: Store,
      t: "Panaderías y comercios",
      type: "Panadería",
      d: "Ampliá tu oferta con productos de panadería artesanal.",
      img: panaderia,
      alt: "Estantes de panadería con panes artesanales",
    },
  ];

  return (
    <section id="negocios" className="bg-cream py-20 md:py-24">
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Para tu negocio</p>
          <h2 className="mt-3 text-3xl font-semibold text-petrol-deep md:text-4xl">
            Pensado para tu tipo de negocio
          </h2>
          <p className="mt-3 text-muted-foreground">
            Nuestros productos se adaptan a distintas propuestas gastronómicas.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ icon: Icon, t, type, d, img, alt }) => (
            <article
              key={t}
              className="group flex flex-col overflow-hidden rounded-2xl bg-warm-white shadow-soft transition-shadow hover:shadow-card"
            >
              {/* Imagen: solo ella recorta el efecto de zoom */}
              <div className="relative aspect-[4/3]">
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={img}
                    alt={alt}
                    loading="lazy"
                    width={816}
                    height={816}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Icono superpuesto, fuera del contenedor que recorta la imagen */}
                <span className="absolute bottom-0 left-5 z-10 flex h-12 w-12 translate-y-1/2 items-center justify-center rounded-full bg-petrol text-cream shadow-soft">
                  <Icon
                    className="h-5 w-5"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5 pt-9">
                <h3 className="text-xl font-semibold text-petrol-deep">
                  {t}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">
                  {d}
                </p>
                <a
                  href="#contacto"
                  onClick={goContact(`business_${type}`, type)}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-petrol hover:text-teal"
                >
                  Consultar para {t.toLowerCase()}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessSteps() {
  const steps = [
    {
      icon: PhoneCall,
      t: "Nos contactás",
      d: "Nos contás sobre tu negocio, localidad y los productos que te interesan.",
    },
    {
      icon: FileText,
      t: "Recibís una propuesta",
      d: "Te enviamos información sobre el catálogo, precios mayoristas y condiciones comerciales.",
    },
    {
      icon: CalendarCheck,
      t: "Coordinamos la modalidad",
      d: "Definimos juntos las condiciones de pedido y abastecimiento disponibles.",
    },
    {
      icon: Rocket,
      t: "Comenzás a trabajar con nosotros",
      d: "Una vez acordadas las condiciones, coordinamos los próximos pasos.",
    },
  ];

  return (
    <section id="como-trabajamos" className="bg-cream py-20 md:py-24">
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Así de simple</p>
          <h2 className="mt-3 text-3xl font-semibold text-petrol-deep md:text-4xl">
            ¿Cómo empezás a trabajar con nosotros?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Un proceso claro y directo para que puedas sumar nuestros productos.
          </p>
        </div>

        <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
          <span
            className="absolute top-8 right-[12%] left-[12%] hidden h-px border-t border-dashed border-gold md:block"
            aria-hidden="true"
          />

          {steps.map(({ icon: Icon, t, d }, i) => (
            <li
              key={t}
              className="relative flex gap-5 md:flex-col md:items-center md:text-center"
            >
              <span className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-warm-white text-petrol shadow-soft">
                <Icon
                  className="h-7 w-7"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </span>
              <div>
                <span className="font-serif text-2xl font-semibold text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 text-lg font-semibold text-petrol-deep">
                  {t}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 text-center">
          <a
            href="#contacto"
            onClick={goContact("process")}
            className="btn btn-primary"
          >
            Solicitar catálogo y precios
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function FactorySection() {
  const attrs = [
    { icon: Wheat, t: "Elaboración artesanal" },
    { icon: Handshake, t: "Atención comercial cercana" },
    { icon: LayoutGrid, t: "Variedad de productos" },
    { icon: MapPin, t: "Producción local en Esquel" },
  ];

  return (
    <section id="fabrica" className="bg-warm-white py-20 md:py-24">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2">
        <figure className="overflow-hidden rounded-2xl shadow-card">
          <img
            src={factory}
            alt="Manos amasando y armando medialunas sobre una mesa enharinada (imagen ilustrativa)"
            loading="lazy"
            width={1024}
            height={1280}
            className="aspect-[4/5] w-full object-cover lg:aspect-[5/6]"
          />
        </figure>

        <div>
          <p className="eyebrow">Sobre la fábrica</p>
          <h2 className="mt-3 text-3xl font-semibold text-petrol-deep md:text-4xl">
            Fabricación artesanal, calidad y compromiso
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-graphite/80">
            En Medialunería elaboramos productos de panadería con una identidad
            artesanal. Queremos acompañar a los comercios gastronómicos de
            Esquel y localidades cercanas con una propuesta de productos para
            sus clientes.
          </p>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {attrs.map(({ icon: Icon, t }) => (
              <li
                key={t}
                className="flex items-center gap-3 rounded-xl border border-border bg-cream/50 p-4 font-medium text-petrol-deep"
              >
                <Icon
                  className="h-6 w-6 shrink-0 text-gold"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                {t}
              </li>
            ))}
          </ul>

          <a
            href="#contacto"
            onClick={goContact("factory")}
            className="btn btn-primary mt-8"
          >
            Solicitar catálogo y precios
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function BenefitsSection() {
  const items = [
    {
      icon: Sparkles,
      t: "Calidad artesanal",
      d: "Productos elaborados con dedicación.",
    },
    {
      icon: LayoutGrid,
      t: "Variedad de productos",
      d: "Alternativas para ampliar tu propuesta gastronómica.",
    },
    {
      icon: Building2,
      t: "Proveedor local",
      d: "Una fábrica ubicada en Esquel, Chubut.",
    },
    {
      icon: MessagesSquare,
      t: "Atención comercial",
      d: "Un canal directo para consultar catálogo y condiciones.",
    },
  ];

  return (
    <section
      aria-labelledby="why-title"
      className="bg-petrol py-16 text-cream md:py-20"
    >
      <div className="container-site grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-center">
        <h2 id="why-title" className="text-3xl font-semibold md:text-4xl">
          ¿Por qué elegir Medialunería como tu proveedor?
        </h2>

        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, t, d }) => (
            <li key={t}>
              <Icon
                className="h-8 w-8 text-gold"
                strokeWidth={1.4}
                aria-hidden="true"
              />
              <h3 className="mt-3 font-sans text-base font-semibold">{t}</h3>
              <p className="mt-1 text-sm text-cream/75">{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}