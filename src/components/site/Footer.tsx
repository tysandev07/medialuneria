import { Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone, Mountain } from "lucide-react";
import finalImg from "@/assets/variedades.jpg";
import { ADDRESS, EMAIL, HOURS, MAPS_URL, NAV, PHONE_DISPLAY, SOCIAL, WA_MESSAGES, track, waLink } from "@/lib/site-config";
import { FacebookIcon, InstagramIcon, Logo, WhatsAppIcon } from "./icons";

function Socials() {
  const items = [
    { href: SOCIAL.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: SOCIAL.facebook, label: "Facebook", Icon: FacebookIcon },
  ].filter((s) => s.href);
  if (!items.length) return <p className="text-sm text-cream/60">Perfiles sociales próximamente.</p>;
  return (
    <div className="flex gap-3">
      {items.map(({ href, label, Icon }) => (
        <a key={label} href={href!} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 hover:border-gold hover:text-gold">
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}

export function FinalCTA() {
  return (
    <section aria-labelledby="final-cta" className="relative overflow-hidden">
      <img src={finalImg} alt="" loading="lazy" width={816} height={816} className="absolute inset-0 h-full w-full object-cover" />
      <div className="cta-overlay absolute inset-0" aria-hidden="true" />
      <div className="container-site relative flex flex-col items-start gap-6 py-16 text-cream md:flex-row md:items-center md:justify-between md:py-20">
        <div className="max-w-xl">
          <h2 id="final-cta" className="text-3xl font-semibold md:text-4xl">Sumá los productos de Medialunería a tu negocio</h2>
          <p className="mt-3 text-cream/85">Solicitá el catálogo y conocé nuestras condiciones mayoristas.</p>
        </div>
        <a href={waLink(WA_MESSAGES.cta)} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { origin: "final_cta" })} className="btn btn-gold">
          <WhatsAppIcon className="h-5 w-5" /> Solicitar cotización por WhatsApp
        </a>
      </div>
    </section>
  );
}

export function Footer() {
  const anchors = [...NAV, { id: "contacto", label: "Contacto" }];
  return (
    <footer className="bg-petrol-deep text-cream">
      <div className="container-site grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1.3fr_1fr_0.9fr_1fr]">
        <div>
          <a href="/#inicio" aria-label="Medialunería, ir al inicio"><Logo /></a>
          <p className="mt-4 text-sm leading-relaxed text-cream/75">Proveedor mayorista de medialunas y productos de panadería artesanal en Esquel y localidades cercanas.</p>
          <div className="mt-5"><Socials /></div>
        </div>

        <div>
          <h2 className="font-sans text-sm font-semibold tracking-widest text-gold uppercase">Contacto comercial</h2>
          <ul className="mt-4 space-y-3 text-sm text-cream/85">
            <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" /> <a href={`tel:+${"5492945548062"}`} className="hover:text-gold">{PHONE_DISPLAY}</a></li>
            {EMAIL && <li className="flex gap-2"><Mail className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" /> <a href={`mailto:${EMAIL}`} className="hover:text-gold">{EMAIL}</a></li>}
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" /> {ADDRESS}</li>
          </ul>
          <div className="mt-5 flex flex-col gap-2">
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light min-h-11 text-sm">Ver ubicación en Google Maps</a>
            <a href={waLink(WA_MESSAGES.footer)} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { origin: "footer" })} className="btn btn-cream min-h-11 text-sm">
              <WhatsAppIcon className="h-4 w-4" /> Consultar por WhatsApp
            </a>
          </div>
        </div>

        <div>
          <h2 className="font-sans text-sm font-semibold tracking-widest text-gold uppercase">Horarios</h2>
          <ul className="mt-4 space-y-3 text-sm text-cream/85">
            {HOURS.map((h) => (
              <li key={h.days} className="flex gap-2"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" /><span><span className="block font-medium text-cream">{h.days}</span>{h.time}</span></li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-cream/55">Horarios de referencia. Consultá la atención mayorista.</p>
        </div>

        <nav aria-label="Enlaces útiles">
          <h2 className="font-sans text-sm font-semibold tracking-widest text-gold uppercase">Enlaces útiles</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {anchors.map((a) => <li key={a.id}><a href={`/#${a.id}`} className="text-cream/85 hover:text-gold">{a.label}</a></li>)}
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-sm font-semibold tracking-widest text-gold uppercase">Redes y ubicación</h2>
          <div className="mt-4"><Socials /></div>
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="mt-5 block rounded-xl border border-cream/15 p-4 hover:border-gold">
            <Mountain className="h-8 w-8 text-gold" strokeWidth={1.3} aria-hidden="true" />
            <span className="mt-2 block text-sm font-medium">Esquel, Chubut — Patagonia Argentina</span>
            <span className="mt-1 block text-xs text-cream/60">Abrir en Google Maps</span>
          </a>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="container-site flex flex-col gap-3 py-6 pb-24 text-xs text-cream/60 md:flex-row md:items-center md:justify-between md:pb-6">
          <p>© 2026 Medialunería. Todos los derechos reservados.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link to="/privacidad" className="hover:text-gold">Política de privacidad</Link>
            <Link to="/datos-personales" className="hover:text-gold">Tratamiento de datos personales</Link>
            <span>Sitio web orientado a clientes mayoristas</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function FloatingWhatsAppButton() {
  return (
    <a
      href={waLink(WA_MESSAGES.floating)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { origin: "floating" })}
      aria-label="Consultar por WhatsApp"
      className="fixed right-4 bottom-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-warm-white shadow-card transition-transform hover:scale-105 md:right-6 md:bottom-6"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
