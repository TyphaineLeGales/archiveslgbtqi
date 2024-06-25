import React from "react";
import CustomPortableText from "../ui/CustomPortableText";

type Props = {
  item: {
    _type: string;
    richtext: any;
  };
};

export default function RichTextModule({ item }: Props) {
  return (
    <div className="py-[1rem]">
      <CustomPortableText value={item?.richtext!} />
    </div>
  );
}
