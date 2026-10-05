import { createFileRoute } from "@tanstack/react-router";
import { OfferPoster } from "@/components/offer-poster";

export const Route = createFileRoute("/poster")({
  component: PosterExport,
  validateSearch: (search: Record<string, unknown>) => ({
    format: search.format === "feed" ? ("feed" as const) : ("story" as const),
  }),
  head: () => ({
    meta: [{ title: "بوست العرض" }],
  }),
});

function PosterExport() {
  const { format } = Route.useSearch();
  const size = format === "feed" ? { width: 1080, height: 1350 } : { width: 1080, height: 1920 };

  return (
    <main className="overflow-hidden bg-bg p-0" style={size}>
      <OfferPoster format={format} />
    </main>
  );
}
