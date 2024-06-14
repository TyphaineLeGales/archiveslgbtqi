import { HomepageQueryResult } from "@/sanity.types";
import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { homepageQuery, pagesContentQuery } from "@/sanity/lib/queries";
import Hero from "./components/hero";
import Link from "next/link";

export default async function Page() {
  const [homePage] = await Promise.all([
    sanityFetch<HomepageQueryResult>({ query: homepageQuery }),
  ]);

  console.log("Home Page: ", homePage);
  return (
    <div className="min-h-screen">
      {homePage && (
        <>
          <Hero hero={homePage} />
        </>
      )}
    </div>
  );
}
