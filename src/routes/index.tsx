import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import communityHealth from "@/assets/community-health-workers.jpg";
import { useEffect, useState } from "react";
import workshop from "@/assets/community-workshop.jpg";
import { SITE } from "@/lib/site";
import { galleryListQuery, newsListQuery, portfolioListQuery } from "@/lib/queries";
import { NewsletterForm } from "@/components/site/NewsletterForm";
import { GoogleMap } from "@/components/site/GoogleMap";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";


const heroImages = [hero1, hero2, hero3, hero4];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SHSI — Sustainable Health Security Initiative" },
      {
        name: "description",
        content:
          "SHSI advances sustainable health security through evidence-driven research, community partnership, and climate-health resilience.",
      },
      { property: "og:title", content: "SHSI — Sustainable Health Security Initiative" },
      { property: "og:description", content: SITE.description },
      { property: "og:url", content: (SITE.url || "") + "/" },
    ],
    links: [{ rel: "canonical", href: (SITE.url || "") + "/" }],
  }),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(newsListQuery()),
      context.queryClient.ensureQueryData(portfolioListQuery()),
      context.queryClient.ensureQueryData(galleryListQuery()),
    ]);
  },
  component: Home,
});

const VALUES = [
  { title: "Social Cohesion", body: "Building bridges across communities for collective wellbeing." },
  { title: "Inclusion", body: "Centering under-served voices in every program we run." },
  { title: "Innovation", body: "Creative, evidence-based solutions to complex health problems." },
  { title: "Equity", body: "Equitable, affordable, quality health services on communities' own terms." },
  { title: "Partnership", body: "Long-term collaborations with communities, ministries, and researchers." },
  { title: "Trust & Transparency", body: "Accountable to the people we serve — in evidence and action." },
];

function Home() {
  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const news = useSuspenseQuery(newsListQuery()).data.slice(0, 3);
  const portfolio = useSuspenseQuery(portfolioListQuery()).data.filter((p) => p.featured).slice(0, 3);
  const gallery = useSuspenseQuery(galleryListQuery()).data.slice(0, 8);

  return (
    <div>



      {/* Hero */}
<section className="relative min-h-[85vh] overflow-hidden">
  {/* Background Images */}
  {heroImages.map((image, index) => (
    <img
      key={index}
      src={image}
      alt=""
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
        index === currentHero ? "opacity-100" : "opacity-0"
      }`}
    />
  ))}

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/40" />

  {/* Content */}
  <div className="relative mx-auto flex min-h-[85vh] max-w-7xl items-center px-6 py-20 sm:px-8 lg:px-10">
    <div className="max-w-2xl text-white">
      <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] backdrop-blur-sm">
        Sustainable Health Security Initiative
      </span>

      <h1 className="mt-8 font-display text-5xl font-extrabold leading-[0.95] tracking-[-0.04em] sm:text-6xl md:text-7xl">
        Empowering health for resilient communities.
      </h1>

      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/90">
        Advancing health equity in Uganda through inclusive community
        partnership, evidence-based research, and climate-health adaptation.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          to="/about"
          className="inline-flex items-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition hover:bg-brand-deep"
        >
          Our approach
        </Link>

        <Link
          to="/contact"
          className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
        >
          Partner with us
        </Link>
      </div>
    </div>
  </div>

  {/* Slide Indicators */}
  <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3">
    {heroImages.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentHero(index)}
        className={`h-2 rounded-full transition-all ${
          currentHero === index
            ? "w-10 bg-white"
            : "w-2 bg-white/50 hover:bg-white"
        }`}
      />
    ))}
  </div>
</section>







      {/* Vision / Mission / Motto — editorial index */}
      <section className="border-y border-border bg-surface-muted">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div className="mb-12 max-w-3xl border-l-2 border-coral pl-6">
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
              Motto
            </p>
            <p className="mt-3 font-display text-2xl font-bold italic leading-snug text-brand-deep sm:text-3xl">
              &ldquo;{SITE.tagline}&rdquo;
            </p>
          </div>
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                Vision
              </p>
              <p className="mt-3 font-display text-lg font-semibold leading-snug text-foreground">
                A healthy, resilient population enjoying their right to health, bodily autonomy,
                well-being, and the economic independence it brings.
              </p>
            </div>
            <div>
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                Mission
              </p>
              <p className="mt-3 font-display text-lg font-semibold leading-snug text-foreground">
                A center of excellence advancing health equity through inclusive, community-driven
                approaches grounded in research and climate-health adaptation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core values — typographic index */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-display text-[10px] font-semibold uppercase tracking-[0.24em] text-brand">
                Core Values
              </p>
              <h2 className="mt-3 font-display text-4xl font-extrabold tracking-[-0.03em] text-foreground sm:text-5xl">
                What we stand for
              </h2>
            </div>
            <Link
              to="/about"
              className="rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:border-brand hover:text-brand"
            >
              Read our full story →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map(({ title, body }, i) => {
              const bar = [
                "bg-coral",
                "bg-brand",
                "bg-brand-deep",
                "bg-coral",
                "bg-brand",
                "bg-brand-deep",
              ][i % 6];
              return (
                <div key={title} className="rounded-[1.75rem] border border-border bg-white/90 p-8 shadow-card backdrop-blur-sm">
                  <div className={`mb-5 h-1 w-12 rounded-full ${bar}`} />
                  <h3 className="font-display text-xl font-semibold text-foreground">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-start">
          <div>
            <div className="mb-6 overflow-hidden rounded-lg bg-surface-muted">
              <img
                src={communityHealth}
                alt="SHSI community health workers in a Ugandan village"
                width={1600}
                height={1000}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">How we work</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Evidence, equity, and enduring partnerships.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our approach is built on three commitments that guide how we design projects and choose the
              communities we serve.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Evidence-driven response",
                body:
                  "We ground programs in rigorous evidence — surveillance data, community insights, and real-world outcomes.",
              },
              {
                title: "Strengthening systems through partnership",
                body:
                  "We build long-term relationships with universities, ministries, and community organisations.",
              },
              {
                title: "Equity and autonomy",
                body:
                  "We foster environments where communities have the resources and agency to shape their own future.",
              },
              {
                title: "Climate-health resilience",
                body:
                  "We address the intersection of climate change and public health through community-led adaptation.",
              },
            ].map((c) => (
              <article key={c.title} className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-display text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic focus */}
      <section className="bg-charcoal text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Strategic focus</p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Sustainable development. Community empowerment. Systemic change.
              </h2>
              <p className="mt-4 text-white/80">
                We focus on building resilient social systems, fostering collaborative partnerships, and
                advocating for policy reforms that address the root causes of inequality.
              </p>
            </div>
            <div className="overflow-hidden rounded-lg">
              <img
                src={workshop}
                alt="Young women in a community health workshop"
                width={1600}
                height={1000}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { n: "01", t: "Resilient infrastructure", b: "Strengthening the social systems that support health." },
              { n: "02", t: "Collaborative partnerships", b: "Working with government, academia and community." },
              { n: "03", t: "Policy reform", b: "Advocating for systemic change and equitable access." },
            ].map((f) => (
              <div key={f.n} className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
                <p className="font-display text-3xl font-semibold text-brand">{f.n}</p>
                <h3 className="mt-3 font-display text-lg font-semibold">{f.t}</h3>
                <p className="mt-2 text-sm text-white/70">{f.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest news */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Latest news</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              From the field & our research
            </h2>
          </div>
          <Link to="/news" className="text-sm font-medium text-brand hover:text-brand-deep">
            All articles →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {news.map((n) => (
            <Link
              key={n.id}
              to="/news/$slug"
              params={{ slug: n.slug }}
              className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-brand"
            >
              {n.cover_image && (
                <div className="aspect-[16/10] overflow-hidden bg-surface-muted">
                  <img
                    src={n.cover_image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                {n.category && (
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand">{n.category.name}</p>
                )}
                <h3 className="mt-2 font-display text-lg font-semibold group-hover:text-brand">{n.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{n.excerpt}</p>
                <p className="mt-4 text-xs text-muted-foreground">
                  {new Date(n.published_at).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured portfolio */}
      <section className="bg-surface-muted">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Featured projects</p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                A portfolio built with communities
              </h2>
            </div>
            <Link to="/portfolio" className="text-sm font-medium text-brand hover:text-brand-deep">
              View all projects →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {portfolio.map((p) => (
              <Link
                key={p.id}
                to="/portfolio/$slug"
                params={{ slug: p.slug }}
                className="group overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-brand"
              >
                {p.cover_image && (
                  <div className="aspect-[4/3] overflow-hidden bg-background">
                    <img
                      src={p.cover_image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                )}
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand">{p.category}</p>
                  <h3 className="mt-2 font-display text-lg font-semibold group-hover:text-brand">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Gallery</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Moments from the field
            </h2>
          </div>
          <Link to="/gallery" className="text-sm font-medium text-brand hover:text-brand-deep">
            Full gallery →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {gallery.map((g) => (
            <div key={g.id} className="aspect-square overflow-hidden rounded-lg bg-surface-muted">
              <img
                src={g.image_url}
                alt={g.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.05]"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter + Partner CTA */}
      <section className="bg-charcoal text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Newsletter</p>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
              Stay informed. Support the work.
            </h2>
            <p className="mt-4 max-w-md text-white/80">
              Quarterly updates on our research, community programs, and open opportunities. No spam.
            </p>
            <div className="mt-6 max-w-lg">
              <NewsletterForm variant="dark" />
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Partner with SHSI</p>
            <h3 className="mt-2 font-display text-2xl font-semibold">Let's build something durable together.</h3>
            <p className="mt-3 text-sm text-white/80">
              We work with universities, ministries, funders, and community organisations on research,
              training, and policy. Reach out to explore a partnership.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center rounded-md bg-coral px-6 py-3 text-sm font-medium text-coral-foreground transition-colors hover:opacity-90"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      {/* Map + address */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Find us</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Visit our office</h2>
          <p className="mt-2 text-muted-foreground">
            {SITE.address.line1}, {SITE.address.line2}, {SITE.address.city}, {SITE.address.country}
          </p>
        </div>
        <GoogleMap />
      </section>
    </div>
  );
}
