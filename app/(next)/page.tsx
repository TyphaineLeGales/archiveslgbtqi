import { HomepageQueryResult } from "@/sanity.types";

import { sanityFetch } from "@/sanity/lib/fetch";
import { homepageQuery } from "@/sanity/lib/queries";
import Hero from "./components/hero";
import MultiBlock from "./components/MultiBlock";

export default async function Page() {
  const [homePage] = await Promise.all([
    sanityFetch<HomepageQueryResult>({ query: homepageQuery }),
  ]);

  console.log("Homepage: ", homePage?.multiBlock);

  return (
    <div className="relative min-h-screen pb-[100vh]">
      <Hero heroes={homePage} />
      <MultiBlock multiBlocks={homePage} />
    </div>
  );
}
