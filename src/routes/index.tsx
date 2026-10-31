import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { BenefitStrip, BusinessTypeCards, ProcessSteps, FactorySection, BenefitsSection } from "@/components/site/Sections";
import { ProductCatalog } from "@/components/site/ProductCatalog";
import { LeadForm } from "@/components/site/LeadForm";
import { FinalCTA, Footer, FloatingWhatsAppButton } from "@/components/site/Footer";
import { ADDRESS } from "@/lib/site-config";

const TITLE = "Medialunería | Proveedor mayorista de medialunas en Esquel";
const DESC = "Conocé la propuesta mayorista de Medialunería. Catálogo de medialunas y productos de panadería para cafeterías, restaurantes y comercios de Esquel y localidades cercanas.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Bakery", name: "Medialunería", telephone: "+54 9 2945 548062", address: { "@type": "PostalAddress", streetAddress: "Av. Alvear 947", addressLocality: "Esquel", addressRegion: "Chubut", addressCountry: "AR" }, description: ADDRESS }) }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BenefitStrip />
        <BusinessTypeCards />
        <ProductCatalog />
        <ProcessSteps />
        <FactorySection />
        <BenefitsSection />
        <LeadForm />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsAppButton />
    </>
  );
}
