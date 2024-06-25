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
    <div className="py-[1rem]">
      <MyCustomPortableText value={item?.richtext!} />
    </div>
  );
}
