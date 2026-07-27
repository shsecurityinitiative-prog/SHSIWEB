import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SITE } from "@/lib/site";
import communityHealth from "@/assets/community-health-workers.jpg";
import fieldwork from "@/assets/field-research.jpg";
import workshop from "@/assets/community-workshop.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About SHSI — Vision, Mission & Values" },
      { name: "description", content: "Learn about SHSI's vision, mission, core values, motto, and strategic focus." },
      { property: "og:title", content: "About SHSI — Vision, Mission & Values" },
      { property: "og:description", content: "Vision, mission, core values, and strategic focus of the Sustainable Health Security Initiative." },
      { property: "og:url", content: (SITE.url || "") + "/about" },
    ],
    links: [{ rel: "canonical", href: (SITE.url || "") + "/about" }],
  }),
  component: About,
});

const VALUES = [
  { title: "Social Cohesion", body: "Building bridges across communities for collective wellbeing." },
  { title: "Inclusion", body: "Centering under-served voices in every program we run." },
  { title: "Innovation", body: "Creative, evidence-based solutions to complex health problems." },
  { title: "Equity", body: "Equitable, affordable, quality health services on communities' own terms." },
  { title: "Partnership", body: "Long-term collaborations with communities, ministries, and researchers." },
  { title: "Trust & Transparency", body: "Accountable to the people we serve — in evidence and action." },
];

function About() {
  return (
    <div>
      <PageHero eyebrow="About us" title="A nonprofit research organisation for sustainable health security.">
        SHSI works at the intersection of public health, climate resilience, and community leadership.
        We combine rigorous research with long-term partnerships to build health systems that endure.
      </PageHero>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-lg leading-relaxed text-foreground">
          The Sustainable Health Security Initiative (SHSI) is a nonprofit and research organisation
          based in {SITE.address.city}, {SITE.address.country}. We are a center of excellence advancing
          health equity for under-served communities through inclusive, community-driven approaches
          grounded in research and climate-health adaptation.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-lg bg-surface-muted">
          <img
            src={communityHealth}
            alt="SHSI community health workers with families in a Ugandan village"
            width={1600}
            height={1000}
            loading="lazy"
            className="h-auto w-full object-cover"
          />
        </div>
      </section>

      <section className="bg-surface-muted">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          {[
            {
              tag: "Vision",
              body:
                "A healthy, resilient population enjoying their right to health, bodily autonomy, well-being, and the economic independence it brings.",
            },
            {
              tag: "Mission",
              body:
                "A center of excellence advancing health equity for under-served communities. We use inclusive, community-driven approaches grounded in research and climate-health adaptation to drive sustainable, systemic change in health outcomes.",
            },
            {
              tag: "Motto",
              body:
                "Empowering Health, Ensuring Harmony.",
            },
          ].map((c) => (
            <article key={c.tag} className="rounded-lg border border-border bg-card p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">{c.tag}</p>
              <p className="mt-4 text-base leading-relaxed text-foreground">{c.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Core values</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Values that shape how we choose projects, hire, and build with partners.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map(({ title, body }) => (
            <div key={title} className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-display text-base font-semibold text-brand-deep">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface-muted">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">How we work</h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <div className="overflow-hidden rounded-lg">
              <img
                src={workshop}
                alt="Young women engaged in a community health workshop"
                width={1600}
                height={1000}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "Evidence-driven response",
                body:
                "We generate evidence that drives rapid response and strengthens our partners' capacity to prevent, detect, and respond to health threats.",
              },
              {
                title: "Strengthening systems through partnership",
                body:
                "Our proof-of-concept and partnership model strengthens health systems in pursuit of sustainable health for all.",
              },
              {
                title: "Equity and autonomy",
                body:
                "Every individual — especially in under-served and marginalized communities — can access equitable, affordable, quality, comprehensive health services on their own terms, and exercise autonomy over their own health.",
              },
              {
                title: "Who we center",
                body:
                "Our inclusive model centers adolescents, young mothers, and sex workers, while welcoming the voices of persons with disabilities.",
              },
            ].map((c) => (
              <article key={c.title} className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-display text-lg font-semibold">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </article>
            ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Strategic focus</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Our work is driven by a commitment to sustainable development, community empowerment, and
          systemic change.
        </p>
        <div className="mt-10 overflow-hidden rounded-lg bg-surface-muted">
          <img
            src={fieldwork}
            alt="SHSI researcher meeting community members outdoors"
            width={1600}
            height={1000}
            loading="lazy"
            className="h-auto w-full object-cover"
          />
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              t: "Resilient social systems",
              b: "Strengthening the infrastructure that supports health, from primary care to community networks.",
            },
            {
              t: "Collaborative partnerships",
              b: "Fostering durable relationships across government, academia, and community.",
            },
            {
              t: "Policy reform",
              b: "Advocating for reforms that address the root causes of inequality.",
            },
            {
              t: "Climate-health resilience",
              b: "Community-led adaptation, disaster preparedness, and sustainable health systems that can withstand environmental challenges.",
            },
            {
              t: "Evidence & surveillance",
              b: "Data and evidence to inform every decision — from field programs to national policy.",
            },
            {
              t: "Capacity building",
              b: "Training the next generation of researchers, community health workers, and policy leaders.",
            },
          ].map((f) => (
            <div key={f.t} className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-display text-lg font-semibold">{f.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.b}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
