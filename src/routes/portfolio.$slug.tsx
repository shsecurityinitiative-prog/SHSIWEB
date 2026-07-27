import { createFileRoute } from "@tanstack/react-router";
import communityHealth from "@/assets/community-health-workers.jpg";
import fieldResearch from "@/assets/field-research.jpg";
import workshop from "@/assets/community-workshop.jpg";

const content = [
  {
    title: "Public Health Thematic Challenge Partnership Introduction",
    eyebrow: "Partnership meeting",
    image: communityHealth,
    body: [
      "Meeting organised by: KIT Royal Tropical Institute, Amsterdam, Netherlands.",
      "Topic: Public Health Thematic Challenge Partnership Introduction.",
      "Funded by the Africa-Europe Innovation Program (AEIP), supported by the European Union.",
      "Proposal document attached for your review.",
    ],
  },
  {
    title: "Target districts for proof of concept",
    eyebrow: "Implementation focus",
    image: fieldResearch,
    body: [
      "The pilot is planned across three high-burden districts in Uganda:",
      "1. Namayingo",
      "2. Kalangala",
      "3. Bundibugyo",
    ],
  },
  {
    title: "Community-led research and innovation highlights",
    eyebrow: "Current initiatives",
    image: workshop,
    body: [
      "1. Explorers Club Pathfinder Grant 2025 — Rediscovering Forgotten Nutritious Forest Fruits: Integrating Indigenous Knowledge of the Batwa and Benet Peoples of Uganda.",
      "2. 2026 Community engagement on a sickle cell disease awareness project with Global Health Uganda and Duke University across the Kalangala Islands.",
      "3. SHSI collaborated with KIT Royal Tropical Institute (Netherlands) as a matched partner under the EU-AEIP Africa-Europe Innovation Programme, co-developing a community malaria surveillance tool across three high-burden districts in Uganda.",
    ],
  },
];

export const Route = createFileRoute("/portfolio/$slug")({
  head: () => ({
    meta: [
      { title: "Project details — SHSI" },
      { name: "description", content: "SHSI project highlights and partnerships." },
      { property: "og:title", content: "Project details — SHSI" },
      { property: "og:description", content: "SHSI project highlights and partnerships." },
    ],
  }),
  component: PortfolioDetail,
});

function PortfolioDetail() {
  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Portfolio</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Project highlights and partnership updates
        </h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {content.map((item) => (
          <div key={item.title} className="overflow-hidden rounded-lg border border-border bg-card">
            <img src={item.image} alt="" loading="lazy" className="h-48 w-full object-cover" />
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand">{item.eyebrow}</p>
              <h2 className="mt-2 font-display text-lg font-semibold">{item.title}</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
                {item.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
