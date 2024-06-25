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
    <div>
      <h2>{item.richTextTitle}</h2>
      <MyCustomPortableText value={item.richtextTitleText!} />
    </div>
  );
}
