import React, { useState } from "react";
import { motion } from "framer-motion";
import { itemVariants, submenuVariants } from "@/utils/menuAnimationVarients";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function AnimatedSubMenuItem({ item }: any) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.div
      variants={submenuVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="absolute top-full mt-2 left-0 z-20 bg-white rounded-xl shadow-lg  min-w-[220px]"
    >
      <ul className="flex flex-col">
        {item.subitems.value.map((child: any, j: number) => {
          const hasNestedSub = child.subitems?.value?.length > 0;
          const isHovered = hoveredIndex === j;

          return (
            <div
              key={j}
              className="relative group"
              onMouseEnter={() => setHoveredIndex(j)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.li
                variants={itemVariants}
                className="px-4 py-2 whitespace-nowrap  transition-colors duration-150 cursor-pointer flex justify-between items-center"
              >
                <Link target="_black" href={child.link.value} className="text-black font-medium hover:text-primary transition">
                  {child.name.value}
                </Link>
                {hasNestedSub && (
                  <MdKeyboardArrowRight className="text-gray-600 ml-2" />
                )}
              </motion.li>

              {hasNestedSub && isHovered && (
                <motion.div
                  variants={submenuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="absolute top-0 left-50 ml-2 bg-white rounded-xl shadow-lg min-w-[220px] z-30"
                >
                  <ul className="flex flex-col">
                    {child.subitems.value.map((subChild: any, k: number) => (
                      <motion.li
                        key={k}
                        variants={itemVariants}
                        className="px-4 py-2 whitespace-nowrap  transition-colors duration-150"
                      >
                        <Link target="_blank" href={subChild.link.value} className="text-black font-medium hover:text-primary transition">
                          {subChild.name.value}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          );
        })}
      </ul>
    </motion.div>
  );
}
