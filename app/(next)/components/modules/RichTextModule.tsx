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
      className="richText min-w-full pb-[2rem]"
    />
  );
}
