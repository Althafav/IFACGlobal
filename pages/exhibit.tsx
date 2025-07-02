import SpinnerComponent from "@/components/UI/SpinnerComponent";
import { Homepageglobal2026 } from "@/models/homepageglobal2026";
import Globals from "@/modules/Globals";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";

import { Exhibitpage2026 } from "@/models/exhibitpage2026";

type PageProps = {
  pageData: Exhibitpage2026 | null;
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
          <div
            dangerouslySetInnerHTML={{ __html: pageData.bannerheading.value }}
            className="text-black text-2xl sm:text-3xl lg:text-6xl  max-w-4xl leading-tight mb-2"
          ></div>
          <div
            className="text-2xl mb-3"
            dangerouslySetInnerHTML={{
              __html: pageData.bannersubheading.value,
            }}
          />

          <div className=" grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
            {pageData.showitems.value.map((item: any, idx: number) => (
              <Link
                href={item.link.value}
                key={idx}
                className="p-10  transition sm:hover:-translate-y-3 sm:hover:shadow-2xl rounded-2xl"
              >
                <img
                  src={item.logo.value[0]?.url}
                  alt={item.name.value}
                  className="w-[200px] object-contain mb-3 "
                />
                <p className="font-medium text-xl">{item.date.value}</p>
                <p>{item.venue.value}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="content-section py-20 bg-white">
          <div className="container mx-auto">
            <div className="max-w-5xl">
              <span
                className="text-2xl prose"
                dangerouslySetInnerHTML={{
                  __html: pageData.whyexhibitcontent.value,
                }}
              />
            </div>
          </div>
        </div>

        <div className="why-exhibit-wrapper container mx-auto py-20">
          <div className="grid grid-col-1 sm:grid-cols-3 gap-10">
            <h2
              className="why-heading text-3xl sm:text-6xl  sm:py-20  max-w-[300px]"
              dangerouslySetInnerHTML={{
                __html: pageData.whyexhibitheading.value,
              }}
            />
            {pageData.whyexhibititems.value.map((item, idx) => {
              return (
                <div className={`why-card border-gray-300 `} key={idx}>
                  <div className="why-image overflow-hidden rounded-2xl">
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
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response: any = await Globals.KontentClient.item("exhibit_page_2026")
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
