import React from "react";

type NorthEastArrowProps = {
  className?: string;
};

export default function NorthEastArrow({ className }: NorthEastArrowProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="256"
      height="256"
      viewBox="0 0 256 256"
      fill="none"
      className={className}
    >
      <path d="M246 10L48 208M79 10H246V177" stroke="black" stroke-width="18" />
    </svg>
  );
}
