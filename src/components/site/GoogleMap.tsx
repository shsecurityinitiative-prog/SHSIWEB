import { SITE } from "@/lib/site";

export function GoogleMap({ height = 420 }: { height?: number }) {
  return (
    <div
      className="overflow-hidden rounded-lg border border-border bg-surface-muted"
      style={{ height }}
    >
      <iframe
        title="SHSI location on Google Maps"
        src={SITE.mapEmbed}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
