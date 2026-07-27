import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitContact } from "@/lib/contact.functions";
import { Loader2, Send } from "lucide-react";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(120),
  email: z.string().trim().email("Please enter a valid email").max(254),
  subject: z.string().trim().max(200).optional(),
  message: z.string().trim().min(5, "Message is too short").max(5000),
});

export function ContactForm() {
  const send = useServerFn(submitContact);
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof values, string>>>({});

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const fe: typeof errors = {};
      parsed.error.issues.forEach((i) => {
        const k = i.path[0] as keyof typeof values;
        fe[k] = i.message;
      });
      setErrors(fe);
      return;
    }
    setErrors({});
    setState("loading");
    try {
      await send({ data: parsed.data });
      setState("success");
      setMsg("Thanks — your message has been sent. We'll be in touch.");
      setValues({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setState("error");
      setMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const field =
    "w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/30";

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            className={field}
          />
          {errors.name && <p className="mt-1 text-xs text-coral">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            className={field}
          />
          {errors.email && <p className="mt-1 text-xs text-coral">{errors.email}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="mb-1 block text-sm font-medium">
          Subject <span className="text-muted-foreground">(optional)</span>
        </label>
        <input
          id="subject"
          type="text"
          value={values.subject}
          onChange={(e) => setValues((v) => ({ ...v, subject: e.target.value }))}
          className={field}
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          className={field}
        />
        {errors.message && <p className="mt-1 text-xs text-coral">{errors.message}</p>}
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={state === "loading"}
          className="inline-flex items-center gap-2 rounded-md bg-brand px-6 py-3 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand-deep disabled:opacity-60"
        >
          {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          Send message
        </button>
        <p
          role="status"
          className={
            "text-sm " + (state === "success" ? "text-brand" : state === "error" ? "text-coral" : "text-muted-foreground")
          }
        >
          {msg}
        </p>
      </div>
    </form>
  );
}
