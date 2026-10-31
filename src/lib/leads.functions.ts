import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const leadSchema = z.object({
  business_name: z.string().trim().min(2, "Ingresá el nombre del negocio").max(120),
  contact_name: z.string().trim().min(2, "Ingresá un nombre de contacto").max(100),
  locality: z.string().trim().min(2, "Ingresá tu localidad").max(100),
  business_type: z.string().trim().min(1, "Elegí el tipo de negocio").max(60),
  phone: z
    .string()
    .trim()
    .min(6, "Ingresá un teléfono válido")
    .max(30)
    .regex(/^[0-9+\-\s()]+$/, "Usá solo números, espacios o guiones"),
  email: z.union([z.literal(""), z.string().trim().email("Correo no válido").max(255)]).optional(),
  products: z.string().trim().max(300).optional(),
  message: z.string().trim().max(1500).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("wholesale_leads").insert({
      ...data,
      email: data.email || null,
      products: data.products || null,
      message: data.message || null,
      source: "web",
    });
    if (error) {
      console.error("lead insert failed", error.message);
      throw new Error("No pudimos registrar tu consulta. Probá de nuevo o escribinos por WhatsApp.");
    }
    return { ok: true };
  });
