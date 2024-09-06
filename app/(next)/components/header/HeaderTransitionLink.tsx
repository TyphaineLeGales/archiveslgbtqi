"use client";

import React, { useState } from "react";

import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface HeaderTransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  ref?: React.Ref<HTMLAnchorElement>;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function HeaderTransitionLink({
  children,
  href,
  ...props
}: HeaderTransitionLinkProps) {
  const router = useRouter();

  const handleTransition = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const headerRef = document.getElementById("nav-desktop");
    const footerRef = document.getElementById("footer");
    const mainContentRef = document.getElementById("main-content");

    // Intro animation
    gsap.to(headerRef, {
      y: "-100%",
      delay: 0.25,
      duration: 0.75,
      ease: "power2.inOut",
    });
    gsap.to(footerRef, {
      y: "100%",
      delay: 0.25,
      duration: 0.75,
      ease: "power2.inOut",
    });
    gsap.to(mainContentRef, {
      opacity: 0,
      duration: 0.75,
      ease: "power2.inOut",
    });
    await sleep(750);
    router.push(href);

    // Outro animation
    await sleep(750);
    gsap.to(headerRef, { y: 0, duration: 0.75, ease: "power2.inOut" });
    gsap.to(footerRef, { y: 0, duration: 0.75, ease: "power2.inOut" });
    gsap.to(mainContentRef, {
      opacity: 1,
      duration: 0.75,
      ease: "power2.inOut",
    });
  };

  return (
    <>
      <Link onClick={handleTransition} href={href} {...props}>
        {children}
      </Link>
    </>
  );
}
