"use client";
import React, { useRef } from "react";

import { HomepageQueryResult } from "@/sanity.types";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import {
  HeroCarousel,
  SecondSection,
  CTAmarquee,
  IntroTextAndNewsLetter,
  UpcomingEvents,
} from ".";

type HomePageProps = {
  homePage: HomepageQueryResult;
};

gsap.registerPlugin(ScrollTrigger);

export default function Homepage({ homePage }: HomePageProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const secondSectionRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (heroRef.current) {
      gsap.from(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "top top",
          scrub: 1,
          once: true,
          // markers: true,
          // onEnter: () => console.log("HeroCarousel entered view"),
          // onLeave: () => console.log("HeroCarousel left view"),
        },
        opacity: 0,
      });
    }
  });

  useGSAP(() => {
    if (secondSectionRef.current) {
      gsap.from(secondSectionRef.current, {
        scrollTrigger: {
          trigger: secondSectionRef.current,
          start: "top bottom",
          end: "top top",
          scrub: 1,
          once: true,
          // markers: true,
          // onEnter: () => console.log("SecondSection entered view"),
          // onLeave: () => console.log("SecondSection left view"),
        },
        opacity: 0,
      });
    }
  });

  useGSAP(() => {
    if (introRef.current) {
      gsap.from(introRef.current, {
        scrollTrigger: {
          trigger: introRef.current,
          start: "top bottom",
          end: "top top",
          scrub: 1,
          once: true,
          // markers: true,
          // onEnter: () => console.log("IntroTextAndNewsLetter entered view"),
          // onLeave: () => console.log("IntroTextAndNewsLetter left view"),
        },
        opacity: 0,
      });
    }
  });

  useGSAP(() => {
    if (eventsRef.current) {
      gsap.from(eventsRef.current, {
        scrollTrigger: {
          trigger: eventsRef.current,
          start: "top bottom",
          end: "top top",
          scrub: 1,
          once: true,
          // markers: true,
          // onEnter: () => console.log("UpcomingEvents entered view"),
          // onLeave: () => console.log("UpcomingEvents left view"),
        },
        opacity: 0,
      });
    }
  });

  return (
    <>
      <div ref={heroRef}>
        <HeroCarousel heroes={homePage} />
      </div>
      <div ref={secondSectionRef}>
        <SecondSection multiBlocks={homePage} />
      </div>
      <div ref={introRef}>
        <IntroTextAndNewsLetter intro={homePage} />
      </div>
      <div ref={eventsRef}>
        <UpcomingEvents events={homePage} />
      </div>
    </>
  );
}
