import { createFileRoute } from "@tanstack/react-router";
import communityHealth from "@/assets/community-health-workers.jpg";
import fieldResearch from "@/assets/field-research.jpg";
import workshop from "@/assets/community-workshop.jpg";

const content = [
  {
    title: "Proposal document attached for review",
    eyebrow: "Latest update",
    image: communityHealth,
    body: [
      "Meeting organised by: KIT Royal Tropical Institute, Amsterdam, Netherlands.",
      "Topic: Public Health Thematic Challenge Partnership Introduction.",
      "Funded by the Africa-Europe Innovation Program (AEIP), supported by the European Union.",
      "The proposal document is attached for your review.",
    ],
  },
  {
    title: "Target districts for the proof of concept",
    eyebrow: "Field focus",
    image: fieldResearch,
    body: [
      "The planned proof of concept covers three districts:",
      "• Namayingo",
      "• Kalangala",
      "• Bundibugyo",
    ],
  },
  {
    title: "Partnership and research highlights",
    eyebrow: "Programme news",
    image: workshop,
    body: [
      "1. Explorers Club Pathfinder Grant 2025 — Rediscovering Forgotten Nutritious Forest Fruits: Integrating Indigenous Knowledge of the Batwa and Benet Peoples of Uganda.",
      "2. 2026 Community engagement on a sickle cell disease awareness project with Global Health Uganda and Duke University across the Kalangala Islands.",
      "3. SHSI collaborated with KIT Royal Tropical Institute (Netherlands) as a matched partner under the EU-AEIP Africa-Europe Innovation Programme, co-developing a community malaria surveillance tool across three high-burden districts in Uganda.",
    ],
  },
];

export const Route = createFileRoute("/news/$slug")({
  head: () => ({
    meta: [
      { title: "News update — SHSI" },
      { name: "description", content: "SHSI programme updates and partnership news." },
      { property: "og:title", content: "News update — SHSI" },
      { property: "og:description", content: "SHSI programme updates and partnership news." },
    ],
  }),
  component: NewsDetail,
});

function NewsDetail() {
  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">News</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Programme updates and partnership news
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
