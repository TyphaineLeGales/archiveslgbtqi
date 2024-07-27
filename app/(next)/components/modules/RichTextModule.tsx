import React from "react";

import { MyCustomPortableText } from "../ui";

type Props = {
  item: {
    _type: string;
    richtext: any;
  };
};

export default function RichTextModule({ item }: Props) {
  return (
    <MyCustomPortableText
      value={item?.richtext!}
      className="min-w-full font-jetbrains text-[.9rem] leading-[1.5rem] tracking-wider"
    />
  );
}
