"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { animatePageOut } from "../../utils/animations";
import Link from "next/link";

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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pathname != href) {
      animatePageOut(href, router);
    }
  };
  return (
    <Link key={key} href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
