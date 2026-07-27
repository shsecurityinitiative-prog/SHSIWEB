import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { subscribeNewsletter } from "@/lib/newsletter.functions";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { z } from "zod";

const schema = z.object({ email: z.string().trim().email() });

export function NewsletterForm({ variant = "light" }: { variant?: "light" | "dark" }) {
  const subscribe = useServerFn(subscribeNewsletter);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState<string>("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email });
    if (!parsed.success) {
      setState("error");
      setMsg("Please enter a valid email address.");
      return;
    }
    setState("loading");
    try {
      const result = await subscribe({ data: parsed.data });
      setState("success");
      setMsg(result.alreadySubscribed ? "You're already on our list — thank you." : "Thanks for subscribing.");
      setEmail("");
    } catch (err) {
      setState("error");
      setMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const dark = variant === "dark";

  return (
    <form onSubmit={onSubmit} className="w-full" noValidate>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={
            dark
              ? "flex-1 rounded-md border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none focus:border-brand focus:ring-2 focus:ring-brand/40"
              : "flex-1 rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
          }
          aria-describedby="newsletter-status"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-brand px-5 py-3 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand-deep disabled:opacity-60"
        >
          {state === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : state === "success" ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          Subscribe
        </button>
      </div>
      <p
        id="newsletter-status"
        role="status"
        className={
          "mt-2 min-h-[1.25rem] text-xs " +
          (state === "success"
            ? "text-brand"
            : state === "error"
              ? "text-coral"
              : dark
                ? "text-white/60"
                : "text-muted-foreground")
        }
      >
        {msg || "No spam. Unsubscribe any time."}
      </p>
    </form>
  );
}
