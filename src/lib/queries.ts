import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type NewsCategory = { id: string; name: string; slug: string };
export type NewsRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover_image: string | null;
  author: string;
  featured: boolean;
  published_at: string;
  category: NewsCategory | null;
};
export type PortfolioRow = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  cover_image: string | null;
  gallery_images: string[];
  category: string;
  location: string | null;
  year: number | null;
  featured: boolean;
};
export type GalleryRow = {
  id: string;
  title: string;
  image_url: string;
  category: string;
  caption: string | null;
  sort_order: number;
};

const NEWS_SELECT =
  "id, slug, title, excerpt, body, cover_image, author, featured, published_at, category:news_categories(id,name,slug)";

export const newsListQuery = (opts?: { category?: string; search?: string }) =>
  queryOptions({
    queryKey: ["news", "list", opts?.category ?? null, opts?.search ?? null],
    queryFn: async (): Promise<NewsRow[]> => {
      let q = supabase
        .from("news")
        .select(NEWS_SELECT)
        .eq("published", true)
        .order("published_at", { ascending: false });
      if (opts?.search) q = q.ilike("title", `%${opts.search}%`);
      const { data, error } = await q;
      if (error) throw error;
      let rows = (data ?? []) as unknown as NewsRow[];
      if (opts?.category) rows = rows.filter((r) => r.category?.slug === opts.category);
      return rows;
    },
  });

export const newsBySlugQuery = (slug: string) =>
  queryOptions({
    queryKey: ["news", "slug", slug],
    queryFn: async (): Promise<NewsRow | null> => {
      const { data, error } = await supabase
        .from("news")
        .select(NEWS_SELECT)
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      return (data as unknown as NewsRow) ?? null;
    },
  });

export const newsCategoriesQuery = () =>
  queryOptions({
    queryKey: ["news_categories"],
    queryFn: async (): Promise<NewsCategory[]> => {
      const { data, error } = await supabase
        .from("news_categories")
        .select("id,name,slug")
        .order("name");
      if (error) throw error;
      return data ?? [];
    },
  });

export const portfolioListQuery = (opts?: { category?: string; search?: string }) =>
  queryOptions({
    queryKey: ["portfolio", "list", opts?.category ?? null, opts?.search ?? null],
    queryFn: async (): Promise<PortfolioRow[]> => {
      let q = supabase
        .from("portfolio")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (opts?.category) q = q.eq("category", opts.category);
      if (opts?.search) q = q.ilike("title", `%${opts.search}%`);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as PortfolioRow[];
    },
  });

export const portfolioBySlugQuery = (slug: string) =>
  queryOptions({
    queryKey: ["portfolio", "slug", slug],
    queryFn: async (): Promise<PortfolioRow | null> => {
      const { data, error } = await supabase
        .from("portfolio")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      return (data as PortfolioRow) ?? null;
    },
  });

export const galleryListQuery = () =>
  queryOptions({
    queryKey: ["gallery", "list"],
    queryFn: async (): Promise<GalleryRow[]> => {
      const { data, error } = await supabase
        .from("gallery")
        .select("id,title,image_url,category,caption,sort_order")
        .eq("published", true)
        .order("sort_order");
      if (error) throw error;
      return (data ?? []) as GalleryRow[];
    },
  });
