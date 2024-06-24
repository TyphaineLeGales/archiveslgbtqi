import React from "react";
import CustomPortableText from "../../portable-text";
import { PortableTextBlock } from "next-sanity";

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
      <CustomPortableText value={intro} />
      <ul>
        {archive?.map((archiveItem, index) => (
          <li
            key={`archive-item-${index}`}
            className="flex flex-col gap-[1rem] py-[2rem]"
          >
            <h3>{archiveItem.title}</h3>
            <CustomPortableText value={archiveItem.description} />
            <p>{archiveItem.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
