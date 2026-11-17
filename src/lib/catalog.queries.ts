import { queryOptions } from "@tanstack/react-query";
import { mergeCatalog } from "@/lib/catalog";
import { getDiscoveredCatalog } from "@/lib/discovered.functions";

export const catalogQuery = queryOptions({
  queryKey: ["catalog"],
  queryFn: async () => {
    const found = await getDiscoveredCatalog();
    return mergeCatalog(found.sites, found.categories);
  },
  staleTime: 5 * 60 * 1000,
});
