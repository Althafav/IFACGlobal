import SpinnerComponent from "@/components/UI/SpinnerComponent";
import { Homepageglobal2026 } from "@/models/homepageglobal2026";
import Globals from "@/modules/Globals";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import MenuComponent from "@/components/Layout/Menu/MenuComponent";
import UpcomingSection from "@/components/Home/UpcomingSection";
import GalleryComponent from "@/components/Home/GalleryComponent";

type PageProps = {
  pageData: Homepageglobal2026 | null;
};

export default function Page({ pageData }: PageProps) {
  if (!pageData) {
    return <SpinnerComponent />;
  }

  const items = pageData.showitemcards.value;

  return (
    <div>
  
      <div className="homepage">
        <div className="herosection-wrapper-home relative w-full sm:h-screen overflow-hidden">
          {/* Video with darker tint */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover  white-linear-to-bottom-mask"
          >
            <source src={pageData.bannervideolink.value} type="video/mp4" />
          </video>
          <div className="relative z-10 container mx-auto h-full flex flex-col justify-end py-20">
            <h1 className="text-black text-2xl sm:text-3xl lg:text-4xl font-extrabold max-w-4xl leading-tight mb-2">
              {pageData.bannerheading.value}
            </h1>
            <p>{pageData.bannersubheading.value}</p>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
              {items.map((item: any, idx: number) => (
                <Link
                  href={item.link.value}
                  key={idx}
                  className=" flex flex-col items-start text-center transition sm:hover:-translate-y-3"
                >
                  <img
                    src={item.image.value[0]?.url}
                    alt={item.name.value}
                    className="w-full object-contain mb-3"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="about-section-wrapper relative w-full h-[500px] md:h-[600px] py-20 bg-center bg-cover"
        style={{ backgroundImage: `url(${pageData.aboutimage.value[0]?.url})` }}
      >
        <div className="relative z-10 max-w-5xl px-5 mx-auto h-full flex items-center">
          <div className="max-w-2xl text-white space-y-6">
            <h2 className="text-3xl sm:text-4xl  font-bold leading-tighter">
              {pageData.aboutheading.value}
            </h2>

            <div
              className="text-white prose text-base sm:text-lg"
              dangerouslySetInnerHTML={{ __html: pageData.aboutcontent.value }}
            />

            <Link
              href="/about"
              className="inline-flex items-center text-white font-medium hover:underline"
            >
              Read more
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <UpcomingSection pageData={pageData} />
      <GalleryComponent pageData={pageData} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response: any = await Globals.KontentClient.item("home_page_2026")
      .withParameter("depth", "4")
      .toPromise();

    const pageData = JSON.parse(JSON.stringify(response.item));

    return {
      props: {
        pageData,
      },
    };
  } catch (error) {
    console.error("Error fetching homepage content:", error);
    return {
      props: {
        pageData: null,
      },
    };
  }
};
