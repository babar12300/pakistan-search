CREATE OR REPLACE FUNCTION public.acquire_crawl_lock(lease_seconds integer)
RETURNS text
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  s public.crawl_state;
BEGIN
  SELECT * INTO s FROM public.crawl_state WHERE id = 1 FOR UPDATE;
  IF s.locked_until IS NOT NULL AND s.locked_until > now() THEN
    RETURN 'locked';
  END IF;
  UPDATE public.crawl_state SET locked_until = now() + make_interval(secs => lease_seconds) WHERE id = 1;
  IF s.paused_reason IS NOT NULL THEN
    RETURN 'ok-paused';
  END IF;
  RETURN 'ok';
END;
$$;
REVOKE ALL ON FUNCTION public.acquire_crawl_lock(integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.acquire_crawl_lock(integer) TO service_role;