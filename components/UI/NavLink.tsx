import Link from "next/link";
import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function NavLink(props: any) {
  return (
    <Link
      href={props.item.link.value}
      className="inline-flex items-center font-sm font-medium text-white"
    >
      {props.item.name.value}
      {/* only show arrow if there are sub-items */}
      {props.item.subitems?.value?.length > 0 && (
        <MdKeyboardArrowDown
          className="
              ml-1 
              transform 
              transition-transform 
              duration-300 
              group-hover:rotate-180
            "
        />
      )}
    </Link>
  );
}
