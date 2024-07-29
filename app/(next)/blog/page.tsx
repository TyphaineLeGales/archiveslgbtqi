import React from "react";

import { sanityFetch } from "@/sanity/lib/fetch";

import { blogsQuery } from "@/sanity/lib/queries";
import { BlogsQueryResult } from "@/sanity.types";

export default async function Page() {
  const [blogs] = await Promise.all([
    sanityFetch<BlogsQueryResult>({
      query: blogsQuery,
    }),
  ]);

  console.log("Blogs:", blogs);

  return <div className="relative min-h-screen">Blog</div>;
}
