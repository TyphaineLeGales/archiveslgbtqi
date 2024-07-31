import { PagesContentQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await sanityFetch<PagesContentQueryResult[]>({
    query: `*[_type == "pages"] {
      "slug": slug.current,
    }`,
  });

  const routes = pages.map((page) => ({
    route: `/pages/${page?.slug}`,
  }));
  return [];
}
