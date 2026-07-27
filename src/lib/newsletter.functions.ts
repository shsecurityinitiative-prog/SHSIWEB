import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const schema = z.object({ email: z.string().trim().toLowerCase().email().max(254) });

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => schema.parse(input))
  .handler(async ({ data }) => {
    const url = process.env.SUPABASE_URL!;
    const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
    const client = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });
    const { error } = await client
      .from("newsletter_subscribers")
      .insert({ email: data.email, confirmed: true });
    if (error) {
      // Unique violation → treat as already subscribed (success from user POV)
      if (error.code === "23505") return { ok: true, alreadySubscribed: true };
      throw new Error("Could not subscribe. Please try again shortly.");
    }
    return { ok: true, alreadySubscribed: false };
  });
