import SpinnerComponent from "@/components/UI/SpinnerComponent";
import { Homepageglobal2026 } from "@/models/homepageglobal2026";
import Globals from "@/modules/Globals";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";

import UpcomingSection from "@/components/Home/UpcomingSection";
import GalleryComponent from "@/components/Home/GalleryComponent";
import { Aboutpage2026 } from "@/models/aboutpage2026";
import { url } from "inspector";

type PageProps = {
  pageData: Aboutpage2026 | null;
};

export default function Page({ pageData }: PageProps) {
  if (!pageData) {
    return <SpinnerComponent />;
  }

  return (
    <div>
      <div className="about-page-wrapper">
        <div className="herosection-wrapper-home relative w-full sm:h-[300px] overflow-hidden">
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
        </div>
        <div className="bg-white container mx-auto py-10">
          <span
            dangerouslySetInnerHTML={{ __html: pageData.bannerheading.value }}
            className="text-black text-2xl sm:text-3xl lg:text-6xl  max-w-4xl leading-tight mb-2"
          ></span>
          <span
            className="text-2xl mb-4"
            dangerouslySetInnerHTML={{
              __html: pageData.bannersubheading.value,
            }}
          />
          <div className="py-3">
            <span
              className="text-lg text-black"
              dangerouslySetInnerHTML={{
                __html: pageData.bannerdescription.value,
              }}
            />
          </div>
        </div>

        <div className="feature-section-wrap sm:h-screen py-10 relative flex justify-center items-center">
          <img
            src={pageData.featuresbackgroundimage.value[0]?.url}
            alt=""
            className="absolute h-full w-full object-cover inset-0 -z-20"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/70 to-[#d09350]/70 -z-10" />

          <div className="container mx-auto relative z-10">
            <div className="flex justify-center items-center">
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-20">
                {pageData.featuresitems.value.map(
                  (item: any, index: number) => (
                    <div className="flex gap-5" key={index}>
                      <img
                        src={item.image.value[0]?.url}
                        alt=""
                        className="w-[120px] object-contain"
                      />
                      <div className="max-w-[200px]">
                        <p className="text-white text-2xl font-medium">
                          {item.name.value}
                        </p>
                        <span
                          className="text-gray-50"
                          dangerouslySetInnerHTML={{
                            __html: item.content.value,
                          }}
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response: any = await Globals.KontentClient.item("about_page_2026")
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
