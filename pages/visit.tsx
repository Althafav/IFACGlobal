import SpinnerComponent from "@/components/UI/SpinnerComponent";
import Globals from "@/modules/Globals";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";

import { Visitorpage2026 } from "@/models/visitorpage2026";

type PageProps = {
  pageData: Visitorpage2026 | null;
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
        <div className="bg-white container mx-auto py-10 ">
          <div className="max-w-4xl">
            <span
              dangerouslySetInnerHTML={{ __html: pageData.bannerheading.value }}
              className="text-black text-2xl sm:text-3xl lg:text-6xl   leading-tight mb-2"
            ></span>
          </div>
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

        <div className="feature-section-wrap visitor-benefits sm:h-screen py-10 relative flex justify-center items-center">
          <img
            src={pageData.visitorbenefitsbackground.value[0]?.url}
            alt=""
            className="absolute h-full w-full object-cover inset-0 -z-20"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/70 to-[#d09350]/70 -z-10" />

          <div className="container mx-auto relative z-10">
            <div className="flex justify-center  flex-col">
              <h2 className="text-3xl sm:text-6xl font-bold text-white mb-20">
                {pageData.visitorbenefitheading.value}
              </h2>
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-20">
                {pageData.visitorbenefititems?.value.map(
                  (item: any, index: number) => (
                    <div className="flex gap-5 items-center" key={index}>
                      <img
                        src={item.image.value[0]?.url}
                        alt=""
                        className="w-[80px] object-contain"
                      />
                      <div className="max-w-[400px]">
                        <p className="text-white font-light text-2xl">
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

        <div className="visitor-profile-section py-20">
          <div className="container mx-auto">
            <div className="mb-20">
              <h2 className="text-4xl sm:text-7xl text-gradient-1 font-medium tracking-tighter">
                {pageData.visitorprofileheading.value}
              </h2>
              <h2 className="text-3xl tracking-tighter mx-2">
                {pageData.visitorprofilesubheading.value}
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
              {pageData.visitorprofileitems.value.map(
                (item: any, index: number) => {
                  return (
                    <div>
                      <img
                        src={item.image.value[0]?.url}
                        alt=""
                        className="aspect-video object-contain gap-10"
                      />

                      <div className="max-w-[200px]">
                        <span
                          className="text-xl "
                          dangerouslySetInnerHTML={{
                            __html: item.content.value,
                          }}
                        />
                      </div>
                    </div>
                  );
                }
              )}
            </div>

            <div className="flex gap-10 py-20">
              <Link
                href="/book-your-stand"
                className="w-[400px] flex justify-center items-center gradient-1 px-10 py-4 text-white rounded-2xl sm:text-2xl"
              >
                <span>I AM EXHIBITOR</span>
              </Link>

              <Link
                href="/register-your-interest"
                className="w-[400px] flex justify-center items-center gradient-1 px-10 py-4 text-white rounded-2xl sm:text-2xl"
              >
                <span>I AM VISITOR</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response: any = await Globals.KontentClient.item("visitor_page_2026")
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
