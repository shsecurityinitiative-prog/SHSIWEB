
DROP POLICY IF EXISTS "newsletter public subscribe" ON public.newsletter_subscribers;
CREATE POLICY "newsletter public subscribe" ON public.newsletter_subscribers
  FOR INSERT
  WITH CHECK (
    email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND length(email) <= 254
    AND confirmed = true
  );

DROP POLICY IF EXISTS "contact public submit" ON public.contact_messages;
CREATE POLICY "contact public submit" ON public.contact_messages
  FOR INSERT
  WITH CHECK (
    length(name) BETWEEN 1 AND 120
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND length(message) BETWEEN 5 AND 5000
    AND (subject IS NULL OR length(subject) <= 200)
  );
