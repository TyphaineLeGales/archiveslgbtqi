import React from "react";

type ExternalLinkProps = {
  link: {
    _key: string;
    externalLinkDetails: {
      title: string | null;
      url: string | null;
    } | null;
  };
};

export default function ExternalLink({ link }: ExternalLinkProps) {
  return (
    <a
      key={link._key}
      href={link.externalLinkDetails?.url || ""}
      target="_blank"
      rel="noreferrer"
      className="headerItem group relative flex h-headerMobile w-fit flex-col overflow-hidden lg:h-headerDesktop"
    >
      <span className="transition-transform duration-500 ease-tamisitée group-hover:translate-y-[-100%]">
        {link.externalLinkDetails?.title}
      </span>
      <span className="transition-transform duration-500 ease-tamisitée group-hover:translate-y-[-100%]">
        {link.externalLinkDetails?.title}
      </span>
    </a>
  );
}
