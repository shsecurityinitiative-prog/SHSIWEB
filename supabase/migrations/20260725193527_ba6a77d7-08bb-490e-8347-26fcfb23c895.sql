
-- Updated-at helper
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- news_categories
CREATE TABLE public.news_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.news_categories TO anon, authenticated;
GRANT ALL ON public.news_categories TO service_role;
ALTER TABLE public.news_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "news_categories public read" ON public.news_categories FOR SELECT USING (true);
CREATE TRIGGER trg_news_categories_updated BEFORE UPDATE ON public.news_categories
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- news
CREATE TABLE public.news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  body TEXT NOT NULL,
  cover_image TEXT,
  category_id UUID REFERENCES public.news_categories(id) ON DELETE SET NULL,
  author TEXT NOT NULL DEFAULT 'SHSI Team',
  featured BOOLEAN NOT NULL DEFAULT false,
  published BOOLEAN NOT NULL DEFAULT true,
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX news_published_idx ON public.news(published, published_at DESC);
CREATE INDEX news_category_idx ON public.news(category_id);
GRANT SELECT ON public.news TO anon, authenticated;
GRANT ALL ON public.news TO service_role;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
CREATE POLICY "news public read published" ON public.news FOR SELECT USING (published = true);
CREATE TRIGGER trg_news_updated BEFORE UPDATE ON public.news
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- portfolio
CREATE TABLE public.portfolio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  description TEXT NOT NULL,
  cover_image TEXT,
  gallery_images TEXT[] NOT NULL DEFAULT '{}',
  category TEXT NOT NULL DEFAULT 'Research',
  location TEXT,
  year INT,
  featured BOOLEAN NOT NULL DEFAULT false,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX portfolio_published_idx ON public.portfolio(published, created_at DESC);
GRANT SELECT ON public.portfolio TO anon, authenticated;
GRANT ALL ON public.portfolio TO service_role;
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;
CREATE POLICY "portfolio public read published" ON public.portfolio FOR SELECT USING (published = true);
CREATE TRIGGER trg_portfolio_updated BEFORE UPDATE ON public.portfolio
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- gallery
CREATE TABLE public.gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'General',
  caption TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX gallery_published_idx ON public.gallery(published, sort_order);
GRANT SELECT ON public.gallery TO anon, authenticated;
GRANT ALL ON public.gallery TO service_role;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
CREATE POLICY "gallery public read published" ON public.gallery FOR SELECT USING (published = true);
CREATE TRIGGER trg_gallery_updated BEFORE UPDATE ON public.gallery
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- newsletter_subscribers
CREATE TABLE public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  confirmed BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.newsletter_subscribers TO anon, authenticated;
GRANT ALL ON public.newsletter_subscribers TO service_role;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "newsletter public subscribe" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);

-- contact_messages (from contact form)
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "contact public submit" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- Seed categories
INSERT INTO public.news_categories (name, slug) VALUES
  ('Research', 'research'),
  ('Community Health', 'community-health'),
  ('Climate & Resilience', 'climate-resilience'),
  ('Partnerships', 'partnerships'),
  ('Policy', 'policy');

-- Seed news
INSERT INTO public.news (slug, title, excerpt, body, cover_image, category_id, author, featured, published_at) VALUES
  ('shsi-launches-climate-health-program', 'SHSI Launches Climate-Health Resilience Program Across Ulaanbaatar',
   'A new community-led initiative brings sustainable health adaptation strategies to districts most affected by air quality and climate stress.',
   E'The Sustainable Health Security Initiative (SHSI) has launched a multi-year Climate-Health Resilience Program in partnership with local ger district councils and public health authorities.\n\nThe program combines air-quality monitoring, community health worker training, and evidence-based adaptation planning. Early activities focus on winter respiratory health, water security, and disaster preparedness.\n\n"Climate change and public health cannot be separated," said the SHSI program lead. "Our approach centers the communities who feel these pressures first."\n\nThe first phase runs through 2027 and is designed to be replicable across other Central Asian cities facing similar pressures.',
   'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1600&q=80',
   (SELECT id FROM public.news_categories WHERE slug='climate-resilience'), 'SHSI Communications', true, now() - interval '2 days'),
  ('partnership-with-national-university', 'SHSI Signs Research Partnership with National University',
   'A new memorandum expands joint research on infectious disease surveillance and health-system strengthening.',
   E'SHSI has signed a five-year research partnership with the National University of Mongolia. The agreement covers joint doctoral supervision, shared laboratory access, and coordinated field research on disease surveillance.\n\nInitial projects will focus on zoonotic disease early-warning systems and community-based surveillance, drawing on both institutions'' networks in rural provinces.\n\nThis is the third academic partnership signed by SHSI this year, reflecting a broader strategy of building durable relationships across the national research ecosystem.',
   'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&q=80',
   (SELECT id FROM public.news_categories WHERE slug='partnerships'), 'SHSI Communications', true, now() - interval '9 days'),
  ('evidence-brief-winter-air-quality', 'Evidence Brief: Winter Air Quality and Respiratory Admissions',
   'Our latest brief analyzes three winters of hospital admission data and community exposure surveys.',
   E'SHSI has released its first public evidence brief of the year, drawing on data from three winter seasons in Ulaanbaatar. The brief identifies clear correlations between prolonged PM2.5 exposure and pediatric respiratory admissions, and outlines cost-effective adaptation measures at the household and district level.\n\nThe brief is intended to support policy dialogue at municipal and national level and is available in Mongolian and English.',
   'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=1600&q=80',
   (SELECT id FROM public.news_categories WHERE slug='research'), 'Dr. B. Otgonbayar', false, now() - interval '18 days'),
  ('community-health-worker-cohort-2026', 'First Community Health Worker Cohort Graduates',
   'Twenty-four community health workers complete SHSI''s inaugural certification program.',
   E'Twenty-four community health workers from six districts have graduated from SHSI''s first certification program. The nine-month curriculum combined field placements with training on evidence-based practice, equity, and climate-health resilience.\n\nGraduates will now support surveillance, health promotion, and referral pathways in their home communities, with ongoing SHSI mentorship.',
   'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=80',
   (SELECT id FROM public.news_categories WHERE slug='community-health'), 'SHSI Communications', false, now() - interval '32 days'),
  ('policy-roundtable-health-security', 'Policy Roundtable on National Health Security',
   'SHSI convened a cross-sector roundtable on preparedness, financing, and equity.',
   E'SHSI hosted a policy roundtable bringing together representatives from the Ministry of Health, academia, civil society, and multilateral partners. Discussions focused on preparedness financing, equity in service delivery, and the role of community-led surveillance in an integrated health-security system.\n\nA summary report will be published in the coming weeks.',
   'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1600&q=80',
   (SELECT id FROM public.news_categories WHERE slug='policy'), 'SHSI Policy Team', false, now() - interval '45 days'),
  ('open-call-early-career-fellows', 'Open Call: Early-Career Research Fellows 2027',
   'Applications are now open for SHSI''s early-career fellowship in sustainable health security.',
   E'SHSI is inviting applications from early-career researchers for the 2027 fellowship cohort. Fellows receive stipend support, mentorship, and access to SHSI''s field sites and data.\n\nWe particularly encourage applications from researchers based in Mongolia and neighbouring regions, and from women, minority, and first-generation researchers.\n\nApplications close on 31 March.',
   'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80',
   (SELECT id FROM public.news_categories WHERE slug='research'), 'SHSI Fellowships', false, now() - interval '60 days');

-- Seed portfolio
INSERT INTO public.portfolio (slug, title, summary, description, cover_image, gallery_images, category, location, year, featured) VALUES
  ('urban-air-quality-monitoring', 'Urban Air Quality & Respiratory Health Study',
   'A three-winter cohort study linking PM2.5 exposure to pediatric respiratory admissions across six districts of Ulaanbaatar.',
   E'This flagship SHSI project combined low-cost sensor networks, hospital admission records, and household exposure surveys to build one of the most complete pictures yet of winter air-quality impacts on child health in Ulaanbaatar.\n\nOutputs include peer-reviewed publications, a public evidence brief, and a set of household-level adaptation guidelines co-developed with community health workers.',
   'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=1600&q=80',
   ARRAY['https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1600&q=80','https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=1600&q=80','https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1600&q=80'],
   'Research', 'Ulaanbaatar, Mongolia', 2025, true),
  ('community-health-worker-program', 'Community Health Worker Certification Program',
   'A nine-month certification program training community health workers in evidence-based practice, equity, and climate-health resilience.',
   E'The Community Health Worker Certification Program equips workers embedded in ger district communities with the tools to lead surveillance, promotion, and referral pathways. The curriculum was co-designed with district health authorities and blends field placements with structured learning.\n\nGraduates are supported through an ongoing mentorship network.',
   'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=80',
   ARRAY['https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1600&q=80','https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1600&q=80'],
   'Community Health', 'Multiple districts', 2025, true),
  ('zoonotic-surveillance-network', 'Zoonotic Disease Surveillance Network',
   'A joint early-warning surveillance network for zoonotic diseases in rural provinces, in partnership with the National University.',
   E'This partnership project builds a shared surveillance backbone for zoonotic disease detection, connecting local veterinary and public-health workers with a central data platform. The system is designed to give early warning of outbreaks with pandemic potential.',
   'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1600&q=80',
   ARRAY['https://images.unsplash.com/photo-1516214104703-d870798883c5?w=1600&q=80'],
   'Research', 'Rural provinces, Mongolia', 2024, true),
  ('winter-preparedness-toolkit', 'Household Winter Preparedness Toolkit',
   'An open-access toolkit co-developed with community health workers to support household adaptation during severe winters.',
   E'The Winter Preparedness Toolkit is a free, open-access resource that translates SHSI research into practical, household-level guidance. It covers heating, ventilation, respiratory health, nutrition, and emergency planning.\n\nThe toolkit is available in Mongolian and English and is distributed through community health workers, district councils, and partner NGOs.',
   'https://images.unsplash.com/photo-1548013146-72479768bada?w=1600&q=80',
   ARRAY[]::text[],
   'Community Health', 'Nationwide', 2024, false),
  ('climate-health-policy-brief', 'Climate-Health Policy Brief Series',
   'A quarterly policy brief series translating SHSI evidence for policymakers and civil society.',
   E'The Climate-Health Policy Brief Series distills SHSI research into concise, actionable briefs for policymakers, journalists, and civil-society leaders. Each brief pairs a headline finding with concrete policy options.',
   'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1600&q=80',
   ARRAY[]::text[],
   'Policy', 'Ulaanbaatar, Mongolia', 2025, false),
  ('early-career-fellowship', 'Early-Career Research Fellowship',
   'A funded fellowship program supporting early-career researchers in sustainable health security.',
   E'The SHSI Early-Career Research Fellowship supports promising researchers in the first years of their independent careers. Fellows receive stipend support, structured mentorship, and access to SHSI field sites and data.\n\nThe program prioritizes researchers based in Mongolia and neighbouring regions.',
   'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80',
   ARRAY[]::text[],
   'Partnerships', 'Ulaanbaatar, Mongolia', 2025, false);

-- Seed gallery
INSERT INTO public.gallery (title, image_url, category, caption, sort_order) VALUES
  ('Community health worker in the field', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=80', 'Community', 'A community health worker on a home visit in Bayanzurkh district.', 1),
  ('Air-quality monitoring station', 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=1600&q=80', 'Research', 'Low-cost PM2.5 sensor installed as part of the urban air-quality study.', 2),
  ('Research team briefing', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&q=80', 'Research', 'SHSI researchers reviewing surveillance data.', 3),
  ('Policy roundtable', 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1600&q=80', 'Events', 'Cross-sector roundtable on national health security.', 4),
  ('Community meeting', 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1600&q=80', 'Community', 'District-level meeting with community health workers and residents.', 5),
  ('Rural field site', 'https://images.unsplash.com/photo-1516214104703-d870798883c5?w=1600&q=80', 'Field', 'Field visit to a rural surveillance site.', 6),
  ('Winter in Ulaanbaatar', 'https://images.unsplash.com/photo-1548013146-72479768bada?w=1600&q=80', 'Field', 'Winter in the ger districts, where much of SHSI''s work is focused.', 7),
  ('Fellowship cohort', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80', 'Events', 'The 2026 early-career fellowship cohort.', 8),
  ('Data analysis session', 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=1600&q=80', 'Research', 'Joint data-analysis session with academic partners.', 9),
  ('Training workshop', 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1600&q=80', 'Community', 'Community health worker training workshop.', 10),
  ('Field surveillance', 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1600&q=80', 'Field', 'Environmental sampling as part of the surveillance network.', 11),
  ('Partnership signing', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&q=80', 'Events', 'Signing of the research partnership with the National University.', 12);
