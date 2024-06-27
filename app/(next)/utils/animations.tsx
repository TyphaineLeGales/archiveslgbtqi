import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

gsap.defaults({
  duration: 1,
  ease: "power4.inOut",
});

export const animatePageIn = () => {
  const transitionLayer = document.getElementById("transitionLayer");

  const tl = gsap.timeline();

  tl.set(transitionLayer, { yPercent: 0 }).to(transitionLayer, {
    yPercent: 100,
  });
};

export const animatePageOut = (href: string, router: AppRouterInstance) => {
  const transitionLayer = document.getElementById("transitionLayer");

  const tl = gsap.timeline();

  tl.set(transitionLayer, { yPercent: -100 }).to(transitionLayer, {
    yPercent: 0,
    onComplete: () => {
      router.push(href);
    },
  });
};
