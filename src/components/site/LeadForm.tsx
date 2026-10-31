import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { BUSINESS_TYPES, track, waLink } from "@/lib/site-config";
import { leadSchema, submitLead, type LeadInput } from "@/lib/leads.functions";
import { WhatsAppIcon } from "./icons";
import { FAQAccordion } from "./FAQAccordion";

const EMPTY: LeadInput = { business_name: "", contact_name: "", locality: "", business_type: "", phone: "", email: "", products: "", message: "" };
type Errors = Partial<Record<keyof LeadInput, string>>;

function buildWaMessage(v: LeadInput) {
  const loc = v.locality.trim() || "[LOCALIDAD]";
  let msg = `Hola, soy de ${v.business_name.trim() ? `"${v.business_name.trim()}"` : "un negocio"}, de ${loc}, y quisiera conocer el catálogo y los precios mayoristas de Medialunería.`;
  if (v.business_type) msg += ` Tipo de negocio: ${v.business_type}.`;
  if (v.products?.trim()) msg += ` Me interesan: ${v.products.trim()}.`;
  return msg;
}

export function LeadForm() {
  const [values, setValues] = useState<LeadInput>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const started = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const onPrefill = (e: Event) => {
      const d = (e as CustomEvent<Partial<LeadInput>>).detail;
      setValues((v) => ({
        ...v,
        ...(d.business_type ? { business_type: d.business_type } : {}),
        ...(d.products ? { products: v.products?.includes(d.products) ? v.products : [v.products, d.products].filter(Boolean).join(", ") } : {}),
      }));
      setStatus((s) => (s === "done" ? "idle" : s));
    };
    window.addEventListener("lead:prefill", onPrefill);
    return () => window.removeEventListener("lead:prefill", onPrefill);
  }, []);

  const set = (k: keyof LeadInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!started.current) { started.current = true; track("form_start"); }
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    const parsed = leadSchema.safeParse(values);
    if (!parsed.success) {
      const errs: Errors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof LeadInput;
        if (!errs[k]) errs[k] = issue.message;
      }
      setErrors(errs);
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    setServerError("");
    try {
      await submitLead({ data: parsed.data });
      track("form_submit", { business_type: parsed.data.business_type });
      setStatus("done");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Ocurrió un error. Probá nuevamente.");
      setStatus("error");
    }
  };

  const field = (k: keyof LeadInput, label: string, opts: { required?: boolean; type?: string; autoComplete?: string; placeholder?: string } = {}) => (
    <div>
      <label htmlFor={`f-${k}`} className="mb-1.5 block text-sm font-medium text-cream">
        {label} {opts.required ? <span aria-hidden="true" className="text-gold">*</span> : <span className="text-cream/60">(opcional)</span>}
      </label>
      <input
        id={`f-${k}`}
        name={k}
        type={opts.type ?? "text"}
        autoComplete={opts.autoComplete}
        placeholder={opts.placeholder}
        required={opts.required}
        value={values[k] ?? ""}
        onChange={set(k)}
        aria-invalid={!!errors[k]}
        aria-describedby={errors[k] ? `e-${k}` : undefined}
        className="field"
      />
      {errors[k] && <p id={`e-${k}`} className="mt-1 text-sm font-medium text-gold">{errors[k]}</p>}
    </div>
  );

  return (
    <section id="faq" className="bg-cream py-20 md:py-24">
      <div className="container-site grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-semibold text-petrol-deep md:text-4xl">Preguntas frecuentes</h2>
          <p className="mt-3 mb-8 text-muted-foreground">Resolvé tus dudas y conocé más sobre nuestro servicio mayorista.</p>
          <FAQAccordion />
        </div>

        <div id="contacto" className="scroll-mt-24 rounded-2xl bg-petrol p-6 text-cream shadow-card md:p-10">
          <h2 className="text-2xl font-semibold md:text-3xl">Solicitá tu catálogo y empezá a trabajar con nosotros</h2>
          <p className="mt-3 text-cream/80">Dejanos los datos de tu negocio y contactanos para conocer nuestra propuesta mayorista.</p>

          {status === "done" ? (
            <div role="status" className="mt-8 rounded-xl bg-cream p-6 text-graphite">
              <CheckCircle2 className="h-10 w-10 text-petrol" aria-hidden="true" />
              <h3 className="mt-3 text-xl font-semibold text-petrol-deep">¡Recibimos tu consulta!</h3>
              <p className="mt-2 text-sm text-muted-foreground">El equipo comercial se va a comunicar con vos. Si querés agilizar, podés escribirnos también por WhatsApp.</p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a href={waLink(buildWaMessage(values))} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { origin: "form_success" })} className="btn btn-primary">
                  <WhatsAppIcon className="h-4 w-4" /> Continuar por WhatsApp
                </a>
                <button type="button" className="btn btn-outline" onClick={() => { setValues(EMPTY); setStatus("idle"); started.current = false; }}>
                  Enviar otra consulta
                </button>
              </div>
            </div>
          ) : (
            <form ref={formRef} onSubmit={onSubmit} noValidate className="mt-8 grid gap-4 sm:grid-cols-2">
              {field("business_name", "Nombre del negocio", { required: true, autoComplete: "organization" })}
              {field("contact_name", "Nombre de contacto", { required: true, autoComplete: "name" })}
              {field("locality", "Localidad", { required: true, autoComplete: "address-level2", placeholder: "Ej.: Esquel" })}
              <div>
                <label htmlFor="f-business_type" className="mb-1.5 block text-sm font-medium text-cream">
                  Tipo de negocio <span aria-hidden="true" className="text-gold">*</span>
                </label>
                <select id="f-business_type" name="business_type" required value={values.business_type} onChange={set("business_type")} aria-invalid={!!errors.business_type} aria-describedby={errors.business_type ? "e-business_type" : undefined} className="field">
                  <option value="">Seleccioná una opción</option>
                  {BUSINESS_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                {errors.business_type && <p id="e-business_type" className="mt-1 text-sm font-medium text-gold">{errors.business_type}</p>}
              </div>
              {field("phone", "Teléfono o WhatsApp", { required: true, type: "tel", autoComplete: "tel" })}
              {field("email", "Correo electrónico", { type: "email", autoComplete: "email" })}
              <div className="sm:col-span-2">{field("products", "Productos de interés", { placeholder: "Ej.: medialunas, facturas" })}</div>
              <div className="sm:col-span-2">
                <label htmlFor="f-message" className="mb-1.5 block text-sm font-medium text-cream">
                  Mensaje adicional <span className="text-cream/60">(opcional)</span>
                </label>
                <textarea id="f-message" name="message" rows={4} value={values.message} onChange={set("message")} className="field" />
              </div>

              {status === "error" && (
                <p role="alert" className="rounded-lg bg-cream px-4 py-3 text-sm font-medium text-destructive sm:col-span-2">{serverError}</p>
              )}

              <div className="flex flex-col gap-3 pt-2 sm:col-span-2">
                <button type="submit" disabled={status === "sending"} className="btn btn-gold w-full">
                  {status === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" /> Enviando…</> : "Solicitar información mayorista"}
                </button>
                <a href={waLink(buildWaMessage(values))} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { origin: "form" })} className="btn btn-outline-light w-full">
                  <WhatsAppIcon className="h-4 w-4" /> Prefiero consultar por WhatsApp
                </a>
                <p className="text-xs text-cream/65">
                  Usamos tus datos solo para responder tu consulta comercial. Ver{" "}
                  <a href="/privacidad" className="underline hover:text-gold">Política de privacidad</a>.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
