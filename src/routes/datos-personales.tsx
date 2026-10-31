import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/datos-personales")({
  head: () => ({ meta: [{ title: "Tratamiento de datos personales — Medialunería" }, { name: "description", content: "Tratamiento de datos personales de Medialunería (borrador para revisión)." }, { property: "og:title", content: "Tratamiento de datos personales — Medialunería" }, { property: "og:description", content: "Tratamiento de datos personales de Medialunería." }, { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary" }] }),
  component: () => (
    <main className="container-site max-w-3xl py-16">
      <Link to="/" className="text-sm text-petrol underline">← Volver al inicio</Link>
      <h1 className="mt-6 text-4xl font-semibold text-petrol-deep">Tratamiento de datos personales</h1>
      <p className="mt-4 rounded-lg bg-cream p-4 text-sm">Borrador para revisión legal antes de publicar. No constituye una declaración de cumplimiento normativo.</p>
      <div className="mt-6 space-y-4 leading-relaxed text-graphite/85">
        <p>Medialunería recopila los datos que ingresás en el formulario comercial (nombre del negocio, contacto, localidad, tipo de negocio, teléfono y, opcionalmente, correo, productos de interés y mensaje) con la única finalidad de responder tu consulta mayorista.</p>
        <p>No vendemos ni cedemos tus datos a terceros. Podés solicitar el acceso, rectificación o supresión de tus datos escribiéndonos por WhatsApp al 2945-548062, conforme a la Ley 25.326 de Protección de Datos Personales.</p>
        <p>Este sitio no utiliza herramientas de seguimiento de usuarios. Si en el futuro se incorporan, se actualizará este aviso.</p>
      </div>
    </main>
  ),
});
