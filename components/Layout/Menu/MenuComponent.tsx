import { Globalcomponent } from "@/models/globalcomponent";
import { Menuitem } from "@/models/menuitem";
import Globals from "@/modules/Globals";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function MenuComponent() {
  const [pageData, setPageData] = useState<Globalcomponent | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    Globals.KontentClient.item("global_component")
      .withParameter("depth", "4")
      .toObservable()
      .subscribe((response: any) => {
        setPageData(response.item);
      });
  }, []);
  if (!pageData) {
    return null;
  }

  const menuItems = pageData.globalmenuitems.value as unknown as Menuitem[];
  return (
    <header className="sm:fixed top-0 w-full  z-50">
      <div className="container mx-auto bg-white  sm:rounded-2xl">
        <div className="flex items-center justify-between sm:px-10">
          <div className="flex-shrink-0">
            <Link href="/">
              {pageData.ifacgloballogo.value[0] && (
                <img
                  src={pageData.ifacgloballogo.value[0].url}
                  alt="Logo"
                  className="h-20 object-contain"
                />
              )}
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex space-x-2">
            {menuItems.map((item) => {
              const name = item.name.value;
              const link = item.link.value;
              const target = item.target.value as "_self" | "_blank";
              const children = item.items.value as Menuitem[];

              return (
                <div key={item.system.id} className="relative group">
                  <Link
                    href={link}
                    target={target}
                    className="px-3 py-2 
                    rounded-t-lg 
                    text-gray-800 
                    hover:bg-gray-800 hover:text-white 
                    transition-colors duration-200"
                  >
                    {name}
                  </Link>

                  {children && children.length > 0 && (
                    <ul
                      className="absolute top-full left-0 w-48 
                      bg-gray-800 text-white 
                      rounded-b-lg 
                      opacity-0 invisible 
                      group-hover:opacity-100 group-hover:visible 
                      transition-all duration-200
                      shadow-lg"
                    >
                      {children.map((sub) => (
                        <li key={sub.system.id}>
                          <Link
                            href={sub.link.value}
                            target={sub.target.value as "_self" | "_blank"}
                            className="block px-3 py-2 
                            hover:bg-gray-600 
                            transition-colors"
                          >
                            {sub.name.value}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 focus:outline-none"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <ul className="flex flex-col p-4 space-y-2">
            {menuItems.map((item) => {
              const name = item.name.value;
              const link = item.link.value;
              const target = item.target.value as "_self" | "_blank";
              const children = item.items.value as Menuitem[];

              return (
                <li key={item.system.id}>
                  <Link
                    href={link}
                    target={target}
                    className="block text-gray-700 py-2"
                  >
                    {name}
                  </Link>
                  {children && children.length > 0 && (
                    <ul className="pl-4 mt-1 space-y-1">
                      {children.map((sub) => (
                        <li key={sub.system.id}>
                          <Link
                            href={sub.link.value}
                            target={sub.target.value as "_self" | "_blank"}
                            className="block text-gray-600 py-1"
                          >
                            {sub.name.value}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
