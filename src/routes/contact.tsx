import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ContactForm } from "@/components/site/ContactForm";
import { GoogleMap } from "@/components/site/GoogleMap";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — SHSI" },
      { name: "description", content: "Get in touch with the Sustainable Health Security Initiative." },
      { property: "og:title", content: "Contact — SHSI" },
      { property: "og:description", content: "Get in touch with the Sustainable Health Security Initiative." },
      { property: "og:url", content: (SITE.url || "") + "/contact" },
    ],
    links: [{ rel: "canonical", href: (SITE.url || "") + "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div>
      <PageHero eyebrow="Contact" title="Let's talk.">
        We welcome enquiries from researchers, funders, ministries, journalists, and community
        partners. Send us a message and we'll be in touch.
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="font-display text-2xl font-semibold">Office & contact</h2>
            <ul className="mt-6 space-y-5 text-sm">
              <li>
                <div>
                  <p className="font-medium text-foreground">Address</p>
                  <p className="mt-1 text-muted-foreground">
                    {SITE.address.line1}, {SITE.address.line2}
                    <br />
                    {SITE.address.city}, {SITE.address.country}
                  </p>
                </div>
              </li>
              <li>
                <div>
                  <p className="font-medium text-foreground">Phone</p>
                  {SITE.phones.map((p) => (
                    <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="mt-1 block text-muted-foreground hover:text-brand">
                      {p}
                    </a>
                  ))}
                </div>
              </li>
              <li>
                <div>
                  <p className="font-medium text-foreground">Email</p>
                  {SITE.emails.map((email) => (
                    <a key={email} href={`mailto:${email}`} className="mt-1 block text-muted-foreground hover:text-brand">
                      {email}
                    </a>
                  ))}
                </div>
              </li>
            </ul>

            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Follow us</p>
              <ul className="mt-3 flex flex-wrap gap-4 text-sm">
                <li><a href={SITE.social.twitter} target="_blank" rel="noreferrer" className="text-foreground hover:text-brand">Twitter</a></li>
                <li><a href={SITE.social.linkedin} target="_blank" rel="noreferrer" className="text-foreground hover:text-brand">LinkedIn</a></li>
                <li><a href={SITE.social.facebook} target="_blank" rel="noreferrer" className="text-foreground hover:text-brand">Facebook</a></li>
              </ul>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold">Send us a message</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We aim to respond within two business days.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <GoogleMap height={480} />
      </section>
    </div>
  );
}
