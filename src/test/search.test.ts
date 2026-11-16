import { describe, expect, it } from "vitest";
import { search } from "@/lib/search";

describe("Pakistan.com search", () => {
  it("finds NADRA first for an English query", () => {
    expect(search("nadra")[0]?.entry.id).toBe("nadra");
  });

  it("finds the same site for an Urdu query", () => {
    expect(search("نادرا")[0]?.entry.id).toBe("nadra");
  });

  it("matches Lahore places when searching in Urdu", () => {
    const ids = search("لاہور").map((r) => r.entry.id);
    expect(ids).toContain("badshahi");
    expect(ids).toContain("lums");
  });

  it("limits results to the chosen category", () => {
    const results = search("cricket", "news");
    expect(results.every((r) => r.entry.category === "news")).toBe(true);
  });

  it("puts the Cricket Board first for 'pakistan cricket'", () => {
    expect(search("pakistan cricket")[0]?.entry.id).toBe("pcb");
  });
});
