CREATE TABLE public.wholesale_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  business_name text NOT NULL,
  contact_name text NOT NULL,
  locality text NOT NULL,
  business_type text NOT NULL,
  phone text NOT NULL,
  email text,
  products text,
  message text,
  source text
);
GRANT ALL ON public.wholesale_leads TO service_role;
ALTER TABLE public.wholesale_leads ENABLE ROW LEVEL SECURITY;