import { Globalcomponent } from "@/models/globalcomponent";
import { Menuitem } from "@/models/menuitem";
import { Partnerpage } from "@/models/partnerpage";
import Globals from "@/modules/Globals";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import SupportingPartnerComponent from "../Home/SupportingPartnerComponent";

export default function FooterComponent() {
  const [pageData, setPageData] = useState<Globalcomponent | null>(null);

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
    <div>
      <footer className="footer-component-wrapper py-10">
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
                     hover:text-gray-600 
                    transition-colors duration-200"
                    >
                      {name}
                    </Link>
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
