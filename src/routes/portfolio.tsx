import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SITE } from "@/lib/site";
import communityHealth from "@/assets/community-health-workers.jpg";
import fieldResearch from "@/assets/field-research.jpg";
import workshop from "@/assets/community-workshop.jpg";

const projectCards = [
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

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — SHSI Projects" },
      { name: "description", content: "SHSI project highlights and partnerships." },
      { property: "og:title", content: "Portfolio — SHSI Projects" },
      { property: "og:description", content: "SHSI project highlights and partnerships." },
      { property: "og:url", content: (SITE.url || "") + "/portfolio" },
    ],
    links: [{ rel: "canonical", href: (SITE.url || "") + "/portfolio" }],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  return (
    <div>
      <PageHero eyebrow="Portfolio" title="Projects & programs">
        A curated overview of SHSI's partnership work, community engagement initiatives, and applied research.
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {projectCards.map((project) => (
            <div key={project.title} className="overflow-hidden rounded-lg border border-border bg-card">
              <img src={project.image} alt="" loading="lazy" className="h-48 w-full object-cover" />
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand">{project.eyebrow}</p>
                <h3 className="mt-2 font-display text-lg font-semibold">{project.title}</h3>
                <div className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
                  {project.body.map((paragraph) => (
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
