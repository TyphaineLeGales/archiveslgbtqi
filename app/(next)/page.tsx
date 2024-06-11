import { HomepageQueryResult, PagesContentQueryResult } from "@/sanity.types";
import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { homepageQuery, pagesContentQuery } from "@/sanity/lib/queries";
import Hero from "./components/hero";
import Link from "next/link";

export default async function Page() {
  const [homePage, pages] = await Promise.all([
    sanityFetch<HomepageQueryResult>({ query: homepageQuery }),
    sanityFetch<PagesContentQueryResult>({
      query: pagesContentQuery,
      params: { slug: "home" },
    }),
  ]);

  console.log("Home Page: ", homePage);
  return (
    <div className="min-h-screen">
      {homePage && (
        <>
          <Hero hero={homePage} />
          <div>
            {homePage.modules?.map((module) => (
              <div key={module._id}>
                {/* <Link href={`${pages?.slug?.current}/${module.slug?.current}`}>
                  {module.title}
                </Link> */}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
