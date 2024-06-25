import { HomepageQueryResult } from "@/sanity.types";
import React from "react";

type Props = {
  video: HomepageQueryResult;
};

export default function VideoBlock({ video }: Props) {
  return (
    <div className="min-h-full">
      {video?.video?.videoLink && (
        <div className="relative h-[56.25vw] max-h-[100vh]">
          <iframe
            className="absolute inset-0"
            width="100%"
            height="100%"
            src="https://www.youtube-nocookie.com/embed/lkTSyWodSmw?si=lnv4DZPB1qgBAupa&amp;controls=0"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
      )}
    </div>
  );
}
