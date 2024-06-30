import React from "react";

import TransitionLink from "../ui/TransitionLink";

type Props = {
  item: {
    internal: { slug: string };
    external: string;
    linkLabel: string;
  };
};

export default function LinksModule({ item }: Props) {
  const link = item;
  return (
    <div className="py-[1rem]">
      <TransitionLink
        href={`${link.internal?.slug || link.external}`}
        className="underline"
      >
        {link.linkLabel}
      </TransitionLink>
    </div>
  );
}
