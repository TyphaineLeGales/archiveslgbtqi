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
    <div className="flex flex-col gap-[1rem]">
      <div
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
      <div className="flex gap-[1rem]">
        {item.isAddFiles &&
          item.fileGroup?.map((fileGroup, index) => (
            <div key={`file-group-${index}`}>
              <div className="flex gap-[1rem]">
                {fileGroup.files?.map((file, index) => (
                  <div key={`file-${index}`} className="linkButton">
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
