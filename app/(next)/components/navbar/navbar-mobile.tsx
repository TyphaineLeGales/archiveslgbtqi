// "use client";

// import React, { useRef, useState, useEffect } from "react";
// import Link from "next/link";
// import { useParams } from "next/navigation";

// // import { PagesContentQueryResult } from "@/sanity.types";
// import { useScrollDirection } from "../../utils/useScrollDirection";

// type Props = {
//   onSectionClick?: (sectionId: string) => void;
//   content: PagesContentQueryResult;
// };

// export default function MobileNavigationBar({ content }: Props) {
//   const navbarRef = useRef<HTMLDivElement>(null);
//   const [menu, setMenu] = useState(false);

//   const { pages } = useParams();

//   return (
//     <div className="block lg:hidden">
//       <button
//         onClick={() => {
//           setMenu((prevMenu) => !prevMenu);
//           document.body.style.overflow = menu ? "auto" : "hidden";
//         }}
//         className="border-black-primary bg-white-primary fixed inset-x-0 bottom-[1rem] z-30 mx-auto aspect-square h-[2.5rem] w-[2.5rem] rounded-full border-[.5px] text-[.7rem] uppercase leading-[.7rem] tracking-tighter shadow-sm"
//       >
//         {menu ? "Close" : "Menu"}
//       </button>
//       {menu && (
//         <>
//           <div
//             className="absolute inset-0 z-10 origin-bottom bg-white/50 bg-opacity-50 backdrop-blur-md"
//             onClick={() => {
//               setMenu(false);
//             }}
//           />
//           <div className="border-black-primary bg-white-primary fixed inset-x-0 bottom-[1rem] z-20 mx-auto mb-[1.25rem] flex w-[50%] origin-bottom flex-col rounded-b-[5%] border-[.5px] pb-[1rem] lg:hidden">
//             <nav
//               ref={navbarRef}
//               className="flex h-auto flex-col items-center justify-center gap-[1rem] py-[2rem]"
//             >
//               {content?.navigation?.map((navItem) => (
//                 <Link
//                   key={navItem._id}
//                   href={navItem.slug?.current || ""}
//                   onClick={() => {
//                     setMenu((prevMenu) => !prevMenu);
//                     document.body.style.overflow = "auto";
//                   }}
//                   className={`h-[1rem] overflow-hidden ${
//                     pages === navItem.slug?.current ? "underline" : ""
//                   }`}
//                 >
//                   <div className="navBarMobileItem">{navItem.title}</div>
//                 </Link>
//               ))}
//             </nav>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
