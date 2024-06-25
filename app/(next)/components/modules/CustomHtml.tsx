import React from "react";

type Props = {
  title: string;
  html: string;
};

export default function CustomHtml({ title, html }: Props) {
  return (
    <div className="flex flex-col gap-[1rem] py-[1rem]">
      <h1>{title}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </div>
  );
}
