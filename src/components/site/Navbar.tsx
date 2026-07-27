import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Mail, Menu, Phone, X } from "lucide-react";
import { NAV, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import logoAsset from "@/assets/logo-shsi.png";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border/70 shadow-sm"
          : "bg-background/80 backdrop-blur-sm",
      )}
    >
      <div className="hidden bg-brand-deep text-white md:block">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 text-[11px] sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {SITE.emails.map((email) => (
                <a
                  key={email}
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-2 text-white/80 transition-colors hover:text-white"
                >
                  <Mail className="h-3.5 w-3.5" aria-hidden />
                  <span>{email}</span>
                </a>
              ))}
            </div>
            <span className="inline-flex items-center gap-2 text-white/80">
              <Phone className="h-3.5 w-3.5" aria-hidden />
              <span className="flex gap-3">
                {SITE.phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-white">
                    {p}
                  </a>
                ))}
              </span>
            </span>
          </div>
          <p className="text-white/60">{SITE.address.city}, {SITE.address.country}</p>
        </div>
      </div>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 rounded-2xl bg-white/80 px-3 py-2 shadow-card transition hover:bg-white" onClick={() => setOpen(false)}>
          <img
            src={logoAsset}
            alt={`${SITE.short} logo`}
            width={40}
            height={40}
            className="h-10 w-10 rounded-2xl object-cover"
          />
          <div className="flex flex-col leading-tight">
            <span className="font-display text-sm font-semibold text-foreground">{SITE.short}</span>
            <span className="hidden text-[11px] text-muted-foreground sm:block">
              Sustainable Health Security
            </span>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-all duration-200 hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="ml-3 inline-flex items-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-card transition hover:bg-brand-deep"
          >
            Partner with us
          </Link>
        </nav>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6" aria-label="Mobile">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-foreground/85 hover:bg-secondary"
                activeProps={{ className: "text-brand" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
