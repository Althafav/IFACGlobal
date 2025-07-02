import { Globalcomponent } from "@/models/globalcomponent";
import { Menuitem } from "@/models/menuitem";
import Globals from "@/modules/Globals";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

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

  if (!pageData) return null;

  const menuItems = pageData.globalmenuitems
    .value as unknown as Menuitem[];

  return (
    <footer className="bg-gray-50 text-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* LOGO & “Brought by” */}
          <div className="space-y-6">
            <Link href="/" className="block">
              {pageData.ifacgloballogo.value[0] && (
                <img
                  src={pageData.ifacgloballogo.value[0].url}
                  alt="IFAC logo"
                  className="h-20 object-contain"
                />
              )}
            </Link>
            <div className="space-y-2">
              <p className="text-sm">{pageData.broughtbytext.value}</p>
              <Link href="/" className="inline-block">
                {pageData.broughtbylogo.value[0] && (
                  <img
                    src={pageData.broughtbylogo.value[0].url}
                    alt="Brought by logo"
                    className="h-10 object-contain"
                  />
                )}
              </Link>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const name = item.name.value;
                const href = item.link.value;
                const target = item.target.value as
                  | "_self"
                  | "_blank";
                return (
                  <li key={item.system.id}>
                    <Link
                      href={href}
                      target={target}
                      className="hover:underline hover:text-gray-600 transition-colors"
                    >
                      {name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* SOCIALS & ADDRESS */}
          <div className="space-y-6">
            <div className="flex space-x-4">
              <Link href={pageData.facebooklink.value} target="_blank">
                <FaFacebook size={24} className="hover:text-blue-600" />
              </Link>
              <Link href={pageData.linkedinlink.value} target="_blank">
                <FaLinkedin size={24} className="hover:text-blue-700" />
              </Link>
              <Link href={pageData.instagramlink.value} target="_blank">
                <FaInstagram size={24} className="hover:text-pink-500" />
              </Link>
              <Link href={pageData.tiktoklink.value} target="_blank">
                <FaTiktok size={24} className="hover:text-black" />
              </Link>
              <Link href={pageData.youtubelink.value} target="_blank">
                <FaYoutube size={24} className="hover:text-red-600" />
              </Link>
            </div>
            <div
              className="text-sm prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: pageData.address.value }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
