CREATE TABLE public.site_categories (
  id text PRIMARY KEY,
  label_en text NOT NULL,
  label_ur text NOT NULL,
  icon text NOT NULL DEFAULT 'globe',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_categories TO anon, authenticated;
GRANT ALL ON public.site_categories TO service_role;
ALTER TABLE public.site_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view site categories" ON public.site_categories FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.discovered_sites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  host text NOT NULL UNIQUE,
  url text NOT NULL,
  category_id text NOT NULL,
  title_en text NOT NULL,
  title_ur text NOT NULL,
  description_en text NOT NULL,
  description_ur text NOT NULL,
  city_en text NOT NULL DEFAULT 'Nationwide',
  city_ur text NOT NULL DEFAULT 'ملک بھر',
  tags text[] NOT NULL DEFAULT '{}',
  source text NOT NULL,
  found_via text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX discovered_sites_created_at_idx ON public.discovered_sites (created_at DESC);
GRANT SELECT ON public.discovered_sites TO anon, authenticated;
GRANT ALL ON public.discovered_sites TO service_role;
ALTER TABLE public.discovered_sites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view discovered sites" ON public.discovered_sites FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.crawl_frontier (
  host text PRIMARY KEY,
  url text NOT NULL,
  source text NOT NULL,
  found_via text,
  snippet_title text,
  snippet_description text,
  status text NOT NULL DEFAULT 'pending',
  attempts integer NOT NULL DEFAULT 0,
  reason text,
  links_crawled_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  processed_at timestamptz
);
CREATE INDEX crawl_frontier_status_idx ON public.crawl_frontier (status, created_at);
GRANT ALL ON public.crawl_frontier TO service_role;
ALTER TABLE public.crawl_frontier ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.crawl_state (
  id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  locked_until timestamptz,
  paused_reason text,
  search_cursor integer NOT NULL DEFAULT 0,
  last_run_at timestamptz,
  last_summary jsonb
);
GRANT ALL ON public.crawl_state TO service_role;
ALTER TABLE public.crawl_state ENABLE ROW LEVEL SECURITY;
INSERT INTO public.crawl_state (id) VALUES (1);

CREATE OR REPLACE FUNCTION public.acquire_crawl_lock(lease_seconds integer)
RETURNS text
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  s public.crawl_state;
BEGIN
  SELECT * INTO s FROM public.crawl_state WHERE id = 1 FOR UPDATE;
  IF s.paused_reason IS NOT NULL THEN
    RETURN 'paused';
  END IF;
  IF s.locked_until IS NOT NULL AND s.locked_until > now() THEN
    RETURN 'locked';
  END IF;
  UPDATE public.crawl_state SET locked_until = now() + make_interval(secs => lease_seconds) WHERE id = 1;
  RETURN 'ok';
END;
$$;
REVOKE ALL ON FUNCTION public.acquire_crawl_lock(integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.acquire_crawl_lock(integer) TO service_role;