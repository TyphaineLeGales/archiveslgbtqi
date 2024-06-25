"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { motion, AnimatePresence, useAnimation } from "framer-motion";

import { PagesContentQueryResult } from "@/sanity.types";

import { useScrollDirection } from "../../utils/useScrollDirection";

type Props = {
  onSectionClick?: (sectionId: string) => void;
  content: PagesContentQueryResult;
};

const navbarVariants = {
  hidden: {
    scale: 0,
    borderTopLeftRadius: "100%",
    borderTopRightRadius: "100%",
  },
  visible: {
    scale: 1,
    borderTopLeftRadius: "5%",
    borderTopRightRadius: "5%",
    transition: {
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
      staggerChildren: 0.2,
    },
  },
  exit: {
    scale: 0,
    borderTopLeftRadius: "100%",
    borderTopRightRadius: "100%",
  },
};

const navbarItemVariants = {
  hidden: {
    translateY: "100%",
  },
  visible: {
    translateY: 0,
  },
};

export default function MobileNavigationBar({ content }: Props) {
  const navbarRef = useRef<HTMLDivElement>(null);
  const [menu, setMenu] = useState(false);
  const visible = useScrollDirection();
  const controls = useAnimation();
  const { pages } = useParams();

  useEffect(() => {
    controls.start({ y: visible ? 0 : 100, opacity: visible ? 1 : 0 });
  }, [visible, controls]);

  const handleMenu = useCallback(() => {
    setMenu((prevMenu) => !prevMenu);
    navbarRef.current?.classList.toggle("hidden");
  }, []);

  return (
    <div className="block lg:hidden">
      <AnimatePresence>
        <motion.button
          initial={{
            y: 0,
            opacity: 1,
          }}
          animate={controls}
          onClick={handleMenu}
          className="absolute inset-x-0 bottom-[1rem] z-30 mx-auto aspect-square h-[2.5rem] w-[2.5rem] rounded-full border-[.5px] border-black bg-white text-[.7rem] uppercase leading-[.7rem] tracking-tighter shadow-sm"
        >
          {menu ? "Close" : "Menu"}
        </motion.button>
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
              className="absolute inset-0 z-10 origin-bottom bg-white/50 bg-opacity-50 backdrop-blur-md"
              onClick={handleMenu}
            />
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={navbarVariants}
              className="fixed inset-x-0 bottom-[1rem] z-20 mx-auto mb-[1.25rem] flex w-[50%] origin-bottom flex-col rounded-b-[5%] border-[.5px] border-black bg-white pb-[1rem] lg:hidden"
            >
              <nav
                ref={navbarRef}
                className="flex h-auto flex-col items-center justify-center gap-[1rem] py-[2rem]"
              >
                {content?.navigation?.map((navItem) => (
                  <Link
                    key={navItem._id}
                    href={navItem.slug?.current || ""}
                    className={`h-[1rem] overflow-hidden ${
                      pages === navItem.slug?.current ? "underline" : ""
                    }`}
                  >
                    <motion.div
                      variants={navbarItemVariants}
                      className="navBarMobileItem"
                    >
                      {navItem.title}
                    </motion.div>
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
