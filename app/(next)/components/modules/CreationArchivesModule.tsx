import React from "react";

import { PortableTextBlock } from "next-sanity";

import { MyCustomPortableText } from "../ui";

type CreationArchivesModuleProps = {
  intro: PortableTextBlock[];
  archive: {
    title: string;
    description: PortableTextBlock[];
    status: string;
  }[];
};

export default function CreationArchivesModule({
  intro,
  archive,
}: CreationArchivesModuleProps) {
  return (
    <div className="flex flex-col gap-[1rem] py-[1rem]">
      {/* TODO: Collapsible */}
      <MyCustomPortableText value={intro} />
      <ul className="divide-y-[1px] divide-black/10 border-t-[1px] border-black">
        {archive?.map((archiveItem, index) => (
          <li
            key={`archive-item-${index}`}
            className="flex flex-col gap-[1rem] py-[2rem]"
          >
            <h3>{archiveItem.title}</h3>
            <MyCustomPortableText value={archiveItem.description} />
            <p>{archiveItem.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
