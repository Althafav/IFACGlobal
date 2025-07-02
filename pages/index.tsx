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
import SupportingPartnerComponent from "@/components/Home/SupportingPartnerComponent";
import ProductSectorCarousel from "@/components/Home/ProductSectorCarousel";

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
        className="about-section-wrapper relative w-full pt-10 pb-40 bg-center bg-cover"
        style={{ backgroundImage: `url(${pageData.aboutimage.value[0]?.url})` }}
      >
        <div className="container mx-auto">
          <div className=" bg-opacity-60 pb-20">
            <div className="container mx-auto">
              <div className="flex items-center justify-start gap-10">
                {pageData.statsitems.value.map((item: any, idx: number) => (
                  <React.Fragment key={idx}>
                    <div className="flex flex-col items-left gap">
                      <h4 className="text-5xl md:text-7xl font-medium text-white">
                        {item.count.value.toLocaleString()}
                      </h4>
                      <p className="mt-2 text-sm md:text-base text-white uppercase max-w-[200px]">
                        {item.name.value}
                      </p>
                    </div>
                    {idx < pageData.statsitems.value.length - 1 && (
                      <div
                        className="h-20 w-3 mx-4
                         bg-gradient-to-b
                         from-[#8B4513] to-black"
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-10 container mx-auto h-full flex items-center">
          <div className="max-w-3xl text-white space-y-6">
            <h2 className="text-3xl sm:text-4xl  font-bold leading-tighter">
              {pageData.aboutheading.value}
            </h2>

            <h4 className="text-3xl leading-tighter">
              {pageData.aboutsubheading.value}
            </h4>

            <div
              className="text-white prose text-base sm:text-lg mb-10"
              dangerouslySetInnerHTML={{ __html: pageData.aboutcontent.value }}
            />

            <Link href="/about" className="p-4 gradient-2 rounded-2xl">
              <span>{pageData.aboutctaname.value}</span>
            </Link>
          </div>
        </div>
      </div>

      <div
        className="why-attend-section-wrapper py-20 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${pageData.whyvisitbackgroundimage.value[0]?.url})`,
        }}
      >
        <UpcomingSection pageData={pageData} />
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Left Column: Heading */}
            <div>
              <h2
                className="text-4xl sm:text-7xl prose text-black leading-tight"
                dangerouslySetInnerHTML={{
                  __html: pageData.whyvisitheading.value,
                }}
              />
            </div>

            {/* Right Column: Description + Features */}
            <div>
              <div
                className="text-lg mb-6"
                dangerouslySetInnerHTML={{
                  __html: pageData.whyvisitdescription.value,
                }}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pageData.whyvisititems.value.map(
                  (item: any, index: number) => (
                    <div
                      key={index}
                      className="border border-yellow-500 rounded-md p-4 text-lg font-semibold leading-snug"
                    >
                      {item.name.value}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <GalleryComponent pageData={pageData} />

      <ProductSectorCarousel pageData={pageData} />

      <SupportingPartnerComponent />
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
