import SpinnerComponent from "@/components/UI/SpinnerComponent";
import Globals from "@/modules/Globals";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";

import MenuComponent from "@/components/Layout/Menu/MenuComponent";

import { Homepagedubai } from "@/models/homepagedubai";

type PageProps = {
  pageData: Homepagedubai | null;
};

export default function Page({ pageData }: PageProps) {
  if (!pageData) {
    return <SpinnerComponent />;
  }

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
            className="absolute inset-0 w-full h-full object-cover white-linear-to-bottom-mask"
          >
            <source src={pageData.bannervideolink.value} type="video/mp4" />
          </video>
          <div className="relative z-10 container mx-auto h-full flex flex-col justify-end py-20">
            <img
              className="w-48 object-contain"
              src={pageData.eventlogo.value[0]?.url}
              alt={pageData.bannerheading.value}
            />
            <h1 className="text-black text-2xl sm:text-3xl lg:text-4xl font-extrabold max-w-4xl leading-tight">
              {pageData.bannerheading.value}
            </h1>

            <div>
              <p className="text-primary-dubai text-2xl font-bold">
                {pageData.date.value}
              </p>
              <p className="text-xl text-gray-600 mb-5">
                {pageData.venue.value}
              </p>
              <div>
                {pageData.ctabutton.value.map((item: any, index: number) => {
                  return (
                    <Link
                      href={item.link.value}
                      className="px-4 py-2 dubai-cta-gradient-bg text-white text-xl"
                    >
                      <span>{item.name.value}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="stats-wrapper bg-white py-10 sm:py-20">
        <div
          className="container mx-auto 
                  flex items-center justify-center
                  "
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 divide-x-2 divide-red-600">
            {pageData.statsitems.value.map((item, index) => (
              <div
                key={index}
                className="flex-1 flex flex-col items-center px-8"
              >
                <p className="text-6xl font-extrabold text-black mb-2 text-stroke-black ">
                  {item.count.value}
                </p>
                <p className="text-sm uppercase tracking-wide text-gray-700">
                  {item.name.value}
                </p>
              </div>
            ))}
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
              {pageData.aboutheading.value}{" "}
              <span className="text-primary-dubai">
                {pageData.aboutheading2.value}
              </span>
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

      <div className="why-exhibit-wrapper container mx-auto py-20">
        <div className="grid grid-col-1 sm:grid-cols-3 gap-10">
          <h2 className="why-heading text-3xl sm:text-5xl font-bold sm:py-20">
            {pageData.whyexhibitheading1.value}{" "}
            <span className="text-primary-dubai">
              {pageData.whyexhibitheading2.value}
            </span>
          </h2>
          {pageData.whyexhibititems.value.map((item, idx) => {
            return (
              <div className={`why-card border-gray-300 `} key={idx}>
                <div className="why-image">
                  <img src={item.image.value[0]?.url} alt={item.name.value} />
                </div>
                <div className="why-contents-wrap relative -top-16">
                  <h4 className="why-title font-bold text-2xl mb-5 max-w-[200px]">
                    {item.name.value}
                  </h4>
                  <span
                    className="why-text text-sm"
                    dangerouslySetInnerHTML={{ __html: item.content.value }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="floorplan-section-wrapper container mx-auto py-20">
        <h2 className="text-3xl sm:text-5xl font-bold mb-3">
          {pageData.floorplanheading1.value}{" "}
          <span className="text-primary-dubai">
            {pageData.floorplanheading2.value}
          </span>
        </h2>

        <p className="max-w-4xl">{pageData.floorplandescription.value}</p>

        <div>
          <img
            src={pageData.floorplanimage.value[0]?.url}
            alt=""
            className="w-full object-contain mb-5"
          />
        </div>

        <div className="flex justify-center">
          <Link
            href={pageData.floorplanctalink.value}
            className="px-4 py-2 dubai-cta-gradient-bg text-white text-2xl "
          >
            <span>{pageData.floorplanctaname.value}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response: any = await Globals.KontentClient.item("home_page_dubai")
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
