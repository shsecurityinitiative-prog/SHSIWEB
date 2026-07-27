import { Link } from "@tanstack/react-router";
import { Facebook, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { NAV, SITE } from "@/lib/site";
import logoAsset from "@/assets/logo-shsi.png";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.05),_transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.04),_transparent_18%),linear-gradient(180deg,#06101d,#091523)] text-white shadow-inner">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logoAsset}
              alt={`${SITE.short} logo`}
              width={42}
              height={42}
              className="h-11 w-11 rounded-2xl bg-brand object-contain p-1"
            />
            <div>
              <p className="font-display text-base font-semibold text-foreground">{SITE.short}</p>
              <p className="text-xs text-muted-foreground">{SITE.description}</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-white/90">
            Explore
          </h3>
          <ul className="mt-5 space-y-2 text-sm text-white/80">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="transition-colors text-white/80 hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-white/90">
            Contact
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-white/80">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <span>
                {SITE.address.line1}, {SITE.address.line2}
                <br />
                {SITE.address.city}, {SITE.address.country}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-brand" />
              <a href={`tel:${SITE.phones[0].replace(/\s/g, "")}`} className="transition-colors text-white/80 hover:text-white">
                {SITE.phones[0]}
              </a>
            </li>
            {SITE.emails.map((email) => (
              <li key={email} className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-brand" />
                <a href={`mailto:${email}`} className="transition-colors text-white/80 hover:text-white">
                  {email}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-white/90">
            Follow
          </h3>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={SITE.social.twitter}
              aria-label="Twitter"
              className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5 text-foreground transition hover:border-brand hover:text-brand"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href={SITE.social.linkedin}
              aria-label="LinkedIn"
              className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5 text-foreground transition hover:border-brand hover:text-brand"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={SITE.social.facebook}
              aria-label="Facebook"
              className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5 text-foreground transition hover:border-brand hover:text-brand"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border/70">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>Developed by K-Dev Technologies: Kevin Atwijuka KevinatwijukatGmail.com +256760228289.</p>
        </div>
      </div>
    </footer>
  );
}
