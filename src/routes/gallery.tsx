import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { SITE } from "@/lib/site";
import { galleryListQuery, type GalleryRow } from "@/lib/queries";
import img1 from "@/assets/1.png";
import img2 from "@/assets/2.png";
import img4 from "@/assets/4.png";
import img6 from "@/assets/6.png";
import img9 from "@/assets/9.png";
import img10 from "@/assets/10.png";
import img11 from "@/assets/11.png";
import img12 from "@/assets/12.png";
import img13 from "@/assets/13.png";
import img14 from "@/assets/14.png";
import img15 from "@/assets/15.png";
import img16 from "@/assets/16.png";
import img18 from "@/assets/18.png";
import img19 from "@/assets/19.png";
import img20 from "@/assets/20.png";
import img23 from "@/assets/23.png";
import img24 from "@/assets/24.png";

const galleryAssets = [
  img1,
  img2,
  img4,
  img6,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
  img16,
  img18,
  img19,
  img20,
  img23,
  img24,
];

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — SHSI" },
      { name: "description", content: "Photographs from SHSI's research, community programs, and field work." },
      { property: "og:title", content: "Gallery — SHSI" },
      { property: "og:description", content: "Photographs from SHSI's research, community programs, and field work." },
      { property: "og:url", content: (SITE.url || "") + "/gallery" },
    ],
    links: [{ rel: "canonical", href: (SITE.url || "") + "/gallery" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(galleryListQuery()),
  component: GalleryPage,
});

function GalleryPage() {
  const { data } = useSuspenseQuery(galleryListQuery());
  const [active, setActive] = useState<string>("All");
  const [open, setOpen] = useState<GalleryRow | null>(null);
  const [openAsset, setOpenAsset] = useState<string | null>(null);
  const categories = useMemo(() => ["All", ...Array.from(new Set(data.map((g) => g.category)))], [data]);
  const filtered = active === "All" ? data : data.filter((g) => g.category === active);

  const getGalleryAsset = (index: number) => galleryAssets[index % galleryAssets.length];

  return (
    <div>
      <PageHero eyebrow="Gallery" title="Photographs from our work">
        A visual record of research, community partnerships, and moments from the field.
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Gallery categories">
          {categories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={active === c}
              onClick={() => setActive(c)}
              className={
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors " +
                (active === c
                  ? "border-brand bg-brand text-brand-foreground"
                  : "border-border bg-card text-foreground hover:border-brand hover:text-brand")
              }
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((g, index) => {
            const asset = getGalleryAsset(index);
            return (
              <button
                key={g.id}
                onClick={() => {
                  setOpen(g);
                  setOpenAsset(asset);
                }}
                className="group aspect-square overflow-hidden rounded-lg bg-surface-muted focus:outline-none focus:ring-2 focus:ring-brand"
                aria-label={`Open ${g.title}`}
              >
                <img
                  src={asset}
                  alt={g.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
              </button>
            );
          })}
        </div>
      </section>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/90 p-4"
          onClick={() => {
            setOpen(null);
            setOpenAsset(null);
          }}
        >
          <button
            type="button"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-xl leading-none text-white hover:bg-white/20"
            aria-label="Close"
            onClick={() => {
              setOpen(null);
              setOpenAsset(null);
            }}
          >
            ×
          </button>
          <div className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img src={openAsset ?? galleryAssets[0]} alt={open.title} className="max-h-[80vh] w-auto rounded-lg" />
            <div className="mt-3 text-center text-sm text-white/85">
              <p className="font-medium">{open.title}</p>
              {open.caption && <p className="mt-1 text-white/60">{open.caption}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
