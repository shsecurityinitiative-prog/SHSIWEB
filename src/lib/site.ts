export const SITE = {
  name: "Sustainable Health Security Initiative",
  short: "SHSI",
  tagline: "Empowering Health, Ensuring Harmony.",
  description:
    "SHSI is a nonprofit and research organisation advancing health equity for under-served communities through inclusive, community-driven approaches, research, and climate-health adaptation.",
  url: import.meta.env.VITE_SITE_URL || "",
  email: "shsii@protonmail.com",
  emails: ["shsii@protonmail.com", "shsiiinitiative@gmail.com"],
  phones: ["+256 200909030", "+256 774485882", "+256 764917663"],
  address: {
    line1: "P.O Box 178282",
    line2: "Ring Road, Kyanja, Nakawa Division",
    city: "Kampala",
    country: "Uganda",
  },
  social: {
    twitter: "https://x.com/shsi_ug",
    linkedin: "https://www.linkedin.com/in/sustainable-health-security-initiative/",
    facebook: "https://www.facebook.com/share/1Ao3tJ6keT/",
  },
  // Google Maps embed URL for 9HQW+FC, Kampala, Uganda
  mapEmbed:
    "https://www.google.com/maps?q=9HQW%2BFC+Kampala,+Uganda&output=embed",
} as const;

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/gallery", label: "Gallery" },
  { to: "/news", label: "News" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Contact" },
] as const;
