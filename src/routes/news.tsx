import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import communityHealth from "@/assets/community-health-workers.jpg";
import fieldResearch from "@/assets/field-research.jpg";
import workshop from "@/assets/community-workshop.jpg";

const newsCards = [
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

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Insights — SHSI" },
      { name: "description", content: "SHSI programme updates and partnership news." },
      { property: "og:title", content: "News & Insights — SHSI" },
      { property: "og:description", content: "SHSI programme updates and partnership news." },
      { property: "og:url", content: (SITE.url || "") + "/news" },
    ],
    links: [{ rel: "canonical", href: (SITE.url || "") + "/news" }],
  }),
  component: NewsPage,
});

function NewsPage() {
  return (
    <div>
      <PageHero eyebrow="News & insights" title="Research updates, field stories, and briefs.">
        A focused summary of SHSI's current partnerships, community engagement work, and programme updates.
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {newsCards.map((item) => (
            <div key={item.title} className="overflow-hidden rounded-lg border border-border bg-card">
              <img src={item.image} alt="" loading="lazy" className="h-48 w-full object-cover" />
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand">{item.eyebrow}</p>
                <h3 className="mt-2 font-display text-lg font-semibold">{item.title}</h3>
                <div className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
                  {item.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
