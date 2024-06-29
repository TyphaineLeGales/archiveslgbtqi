"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { animatePageOut } from "../../utils/animations";

type Props = {
  key?: string;
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function TransitionLink({
  key,
  href,
  children,
  className,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (pathname != href) {
      animatePageOut(href, router);
    }
  };
  return (
    <button key={key} onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
