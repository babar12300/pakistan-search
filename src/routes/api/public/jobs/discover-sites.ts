import { createFileRoute } from "@tanstack/react-router";
import { authenticateCronRequest } from "@/integrations/supabase/cron-auth";

type WaitUntilStore = { getStore(): ((p: Promise<unknown>) => void) | undefined };

/** Daily job: finds new Pakistani websites, reviews them and adds them to search. */
export const Route = createFileRoute("/api/public/jobs/discover-sites")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const authFailure = await authenticateCronRequest(request);
        if (authFailure) return authFailure;

        const { runDiscovery } = await import("@/lib/crawler/run.server");
        const job = runDiscovery().catch((err: unknown) => {
          console.error("Site discovery failed", err);
          return { status: "error", error: err instanceof Error ? err.message : String(err) };
        });

        // The scheduler hangs up after a few seconds, so keep the run alive in the background.
        const store = (globalThis as { __pkWaitUntil?: WaitUntilStore }).__pkWaitUntil;
        const waitUntil = store?.getStore();
        const wantsResult = new URL(request.url).searchParams.get("wait") === "1";
        if (waitUntil && !wantsResult) {
          waitUntil(job);
          return Response.json({ started: true }, { status: 202 });
        }
        return Response.json(await job);
      },
    },
  },
});
