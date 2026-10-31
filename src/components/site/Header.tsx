import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV, WA_MESSAGES, scrollToId, track, waLink } from "@/lib/site-config";
import { Logo, WhatsAppIcon } from "./icons";

export function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <header className="sticky top-0 z-40 bg-petrol-deep text-cream shadow-soft">
      <div className="container-site flex h-18 items-center justify-between gap-4 py-3">
        <a href="#inicio" onClick={go("inicio")} className="flex flex-col leading-none" aria-label="Medialunería, ir al inicio">
          <Logo className="text-cream" />
          <span className="mt-0.5 pl-11 text-[0.68rem] tracking-wide text-cream/70">Fábrica de medialunas artesanales</span>
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-6 text-sm">
            {NAV.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} onClick={go(n.id)} className="text-cream/85 transition-colors hover:text-gold">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={waLink(WA_MESSAGES.header)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", { origin: "header" })}
            className="btn btn-cream hidden min-h-11 px-4 text-sm sm:inline-flex"
          >
            <WhatsAppIcon className="h-4 w-4" /> Solicitar cotización
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-cream hover:bg-cream/10 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Móvil" className="border-t border-cream/10 bg-petrol-deep lg:hidden">
          <ul className="container-site flex flex-col py-3">
            {NAV.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} onClick={go(n.id)} className="block py-3 text-base text-cream/90 hover:text-gold">
                  {n.label}
                </a>
              </li>
            ))}
            <li className="pt-2 pb-2">
              <a
                href={waLink(WA_MESSAGES.header)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_click", { origin: "header_mobile" })}
                className="btn btn-cream w-full"
              >
                <WhatsAppIcon className="h-4 w-4" /> Solicitar cotización
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
