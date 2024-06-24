import React from "react";
import { BlogQueryResult, EventQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { blogQuery, eventQuery } from "@/sanity/lib/queries";
import SingleEvent from "../../components/events/SingleEvent";
import Blog from "../../components/blogs/Blog";

type Blogs = {
  params: {
    blog: string;
  };
};

export default async function Page({ params }: Blogs) {
  const [blog] = await Promise.all([
    sanityFetch<BlogQueryResult>({
      query: blogQuery,
      params: { blog: params.blog },
    }),
  ]);
  return (
    <div className="min-h-[100dvh] py-[1rem]">
      <Blog
        params={{
          blog: params.blog,
        }}
        blog={blog}
      />
    </div>
  );
}
