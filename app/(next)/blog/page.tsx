import React from "react";

import { sanityFetch } from "@/sanity/lib/fetch";

import Event from "../components/events/Events";
import { blogsQuery } from "@/sanity/lib/queries";
import { BlogsQueryResult } from "@/sanity.types";
import Blogs from "../components/blogs/Blogs";

export default async function Page() {
  const [blogs] = await Promise.all([
    sanityFetch<BlogsQueryResult>({
      query: blogsQuery,
    }),
  ]);

  return (
    <div className="min-h-[100dvh] py-[1rem]">
      <Blogs blogs={blogs} />
    </div>
  );
}
