"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { motion, AnimatePresence } from "framer-motion";

import { PagesContentQueryResult } from "@/sanity.types";

type Props = {
  onSectionClick?: (sectionId: string) => void;
  content: PagesContentQueryResult;
};

export default function MobileNavigationBar({ content }: Props) {
  const navbarRef = useRef<HTMLDivElement>(null);
  const [menu, setMenu] = React.useState(false);
  const { pages } = useParams();

  const handleMenu = () => {
    setMenu(!menu);
    navbarRef.current?.classList.toggle("hidden");
  };
  return (
    <div className="block lg:hidden">
      <AnimatePresence>
        <button
          onClick={handleMenu}
          className="fixed inset-x-0 bottom-[1rem] z-40 mx-auto aspect-square h-[2.5rem] w-[2.5rem] rounded-full border-[.5px] border-black bg-white text-[.7rem] uppercase leading-[.7rem] tracking-tighter shadow-sm"
        >
          {menu ? "Close" : "Menu"}
        </button>
        {menu && (
          <>
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                ease: [0.6, 0.01, 0.05, 0.95],
                duration: 0.5,
              }}
              className="fixed inset-0 z-10 origin-bottom bg-white/50 bg-opacity-50 backdrop-blur-md"
              onClick={handleMenu}
            />
            <motion.div
              initial={{
                scale: 0,
                borderTopLeftRadius: "100%",
                borderTopRightRadius: "100%",
              }}
              animate={{
                scale: 1,
                borderTopLeftRadius: "5%",
                borderTopRightRadius: "5%",
              }}
              exit={{
                scale: 0,
                borderTopLeftRadius: "100%",
                borderTopRightRadius: "100%",
              }}
              transition={{
                scale: {
                  ease: [0.6, 0.01, 0.05, 0.95],
                  duration: 0.5,
                },

                borderTopLeftRadius: {
                  ease: [0.6, 0.01, 0.05, 0.95],
                  duration: 0.5,
                },
                borderTopRightRadius: {
                  ease: [0.6, 0.01, 0.05, 0.95],
                  duration: 0.5,
                },
              }}
              className="fixed inset-x-0 bottom-[1rem] z-20 mx-auto mb-[1.25rem] flex w-[50%] origin-bottom flex-col rounded-b-[5%] border-[.5px] border-black bg-white pb-[1rem] lg:hidden"
            >
              <nav ref={navbarRef} className="h-auto py-[2rem]">
                {content?.navigation?.map((navItem) => (
                  <Link
                    key={navItem._id}
                    href={navItem.slug?.current || ""}
                    className={`flex flex-col items-center justify-center gap-[1rem] py-[1rem] text-[1rem] ${
                      pages === navItem.slug?.current ? "underline" : ""
                    }`}
                  >
                    {navItem.title}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
