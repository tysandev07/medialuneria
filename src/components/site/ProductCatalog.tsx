import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { PRODUCTS, type Product } from "@/lib/products";
import { WA_MESSAGES, scrollToId, track, waLink } from "@/lib/site-config";
import { WhatsAppIcon } from "./icons";

export function ProductCard({ product, onOpen }: { product: Product; onOpen: (p: Product) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(product)}
      className="group flex flex-col overflow-hidden rounded-2xl bg-warm-white text-left text-graphite shadow-card transition-transform duration-200 hover:-translate-y-1"
      aria-label={`Ver ${product.name}`}
    >
      <div className="aspect-square overflow-hidden">
        <img src={product.image} alt={product.name} loading="lazy" width={816} height={816} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 items-end justify-between gap-3 p-4">
        <div>
          <h3 className="text-lg font-semibold text-petrol-deep">{product.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-petrol text-cream transition-colors group-hover:bg-gold group-hover:text-graphite" aria-hidden="true">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>
    </button>
  );
}

export function ProductCatalog() {
  const [selected, setSelected] = useState<Product | null>(null);

  const open = (p: Product) => {
    track("product_view", { category: p.id });
    setSelected(p);
  };

  const consult = (p: Product) => {
    track("catalog_request_click", { origin: "product_modal", category: p.id });
    window.dispatchEvent(new CustomEvent("lead:prefill", { detail: { products: p.name } }));
    setSelected(null);
    setTimeout(() => scrollToId("contacto"), 150);
  };

  return (
    <section id="productos" className="bg-petrol py-20 text-cream md:py-24">
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_2.6fr] lg:items-center">
        <div>
          <p className="eyebrow">Nuestros productos</p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Un catálogo amplio para tu negocio</h2>
          <p className="mt-4 leading-relaxed text-cream/80">
            Conocé nuestra variedad de productos de panadería y consultanos por presentaciones, cantidades y precios mayoristas.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <a
              href="#contacto"
              onClick={(e) => { e.preventDefault(); track("catalog_request_click", { origin: "catalog" }); scrollToId("contacto"); }}
              className="btn btn-gold"
            >
              Solicitar catálogo completo <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={waLink(WA_MESSAGES.productos)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_click", { origin: "catalog" })}
              className="btn btn-outline-light"
            >
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p) => <ProductCard key={p.id} product={p} onOpen={open} />)}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-lg overflow-hidden bg-warm-white p-0">
          {selected && (
            <>
              <img src={selected.image} alt={selected.name} className="aspect-[16/10] w-full object-cover" />
              <div className="p-6">
                <DialogTitle className="font-serif text-2xl text-petrol-deep">{selected.name}</DialogTitle>
                <DialogDescription className="mt-2 text-muted-foreground">{selected.description}</DialogDescription>
                <p className="mt-4 rounded-lg bg-cream px-4 py-3 text-sm font-semibold text-petrol-deep">Consultar precio mayorista</p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <button type="button" onClick={() => consult(selected)} className="btn btn-primary flex-1">
                    Solicitar catálogo y precios
                  </button>
                  <a
                    href={waLink(`Hola, quisiera consultar por ${selected.name} y los precios mayoristas de Medialunería.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("whatsapp_click", { origin: "product_modal", category: selected.id })}
                    className="btn btn-outline flex-1"
                  >
                    <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                  </a>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
