import React from "react";
import { MyCustomPortableText } from "../ui";

type Props = {
  item: {
    richTextTitle: string;
    richtextTitleText: any;
  };
};

export default function RichTextAndTitleModule({ item }: Props) {
  return (
    <div className="pb-[1rem]">
      <h2 className="font-tanker text-[1.2rem] uppercase tracking-wider">
        {item.richTextTitle}
      </h2>
      <MyCustomPortableText
        value={item.richtextTitleText}
        className="richText min-w-full"
      />
    </div>
  );
}
