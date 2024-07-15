import React from "react";

type Props = {
  title: string;
  html: string;
  item: {
    isAddFiles: boolean;
    fileGroup: {
      title: string;
      files: {
        asset: {
          url: string;
        };
      }[];
    }[];
  };
};

export default function CustomHtml({ title, html, item }: Props) {
  return (
    <div className="flex flex-col gap-[1rem] py-[1rem]">
      <h1>{title}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
      <div className="flex flex-col gap-[1rem] py-[1rem]">
        {item.isAddFiles &&
          item.fileGroup?.map((fileGroup, index) => (
            <div key={`file-group-${index}`}>
              <div className="flex flex-col gap-[1rem]">
                {fileGroup.files?.map((file, index) => (
                  <div
                    key={`file-${index}`}
                    className="w-fit cursor-pointer rounded-full border-[1px] border-black-primary bg-white-primary px-[1rem] py-[0.1rem] transition-colors duration-300 ease-in-out hover:bg-black-primary hover:text-white-primary"
                  >
                    <a
                      href={file.asset?.url!}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {fileGroup.title}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
