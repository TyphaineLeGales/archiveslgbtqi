import { HomepageQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { homepageQuery } from "@/sanity/lib/queries";

import { Hero, MultiBlock, OutroBlock, VideoBlock } from "./components/ui";

export default async function Page() {
  const [homePage] = await Promise.all([
    sanityFetch<HomepageQueryResult>({ query: homepageQuery }),
  ]);

  // console.log("Homepage: ", homePage);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Hero heroes={homePage} />
      <MultiBlock multiBlocks={homePage} />
      <VideoBlock video={homePage} />
      <OutroBlock outro={homePage} />
    </div>
  );
}
