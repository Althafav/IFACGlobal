import React, { useState } from "react";
import Link from "next/link";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function MobileAccordionMenu({ items }: { items: any[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="lg:hidden h-full">
      <ul className="flex flex-col">
        {items.map((item, index) => {
          const hasChildren = item.subitems?.value?.length > 0;
          const isOpen = openIndex === index;

          return (
            <li key={index} className="border-b border-gray-700">
              <div
                className="flex items-center justify-between text-white py-3 px-4 cursor-pointer"
                onClick={() => toggle(index)}
              >
                {item.link?.value ? (
                  <Link href={item.link.value} className="w-full">
                    {item.name.value}
                  </Link>
                ) : (
                  <span>{item.name.value}</span>
                )}
                {hasChildren && (
                  <MdKeyboardArrowDown
                    className={`transform transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    size={20}
                  />
                )}
              </div>

              {hasChildren && isOpen && (
                <div className="pl-4 pb-2">
                  <MobileAccordionMenu items={item.subitems.value} />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
