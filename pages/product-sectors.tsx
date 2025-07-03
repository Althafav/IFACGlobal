import SpinnerComponent from "@/components/UI/SpinnerComponent";

import Globals from "@/modules/Globals";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";

import MenuComponent from "@/components/Layout/Menu/MenuComponent";

type PageProps = {
  pageData: any | null;
};

export default function Page({ pageData }: PageProps) {
  if (!pageData) {
    return <SpinnerComponent />;
  }

  return (
    <div>
      <div className="product-sector-page-wrapper">
        <div className="herosection-wrapper-home relative w-full py-20 overflow-hidden">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src={pageData.bannerimage.value[0]?.url}
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-100"></div>

          <div className="relative z-10 container mx-auto h-full flex flex-col justify-end py-10 sm:py-20">
            <h1 className="text-white text-2xl sm:text-3xl lg:text-6xl  max-w-4xl leading-tight font-light">
              <div
                className="prose prose-invert text-4xl sm:text-5xl text-white mb-3"
                dangerouslySetInnerHTML={{
                  __html: pageData.bannerheading.value,
                }}
              />
            </h1>
            <span
              className=" text-white bannerdescription"
              dangerouslySetInnerHTML={{
                __html: pageData.bannersubheading.value,
              }}
            />
          </div>
        </div>

        <div className="product-items-wrapper bg-black py-20">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-10 sm:gap-20">
              {pageData.productsectoritems.value.map(
                (item: any, index: number) => {
                  return (
                    <div className="relative overflow-hidden" key={index}>
                      <img
                        src={item.image.value[0]?.url}
                        alt=""
                        className="h-[300px] max-w-[350px] object-cover rounded-2xl mb-3"
                      />
                      <div className="relative -top-10">
                        <div
                          className="prose prose-invert text-4xl  font-light sm:max-w-[250px] mb-5 relative z-10 "
                          dangerouslySetInnerHTML={{
                            __html: item.heading.value,
                          }}
                        />
                        <div
                          className="prose text-gray-300 prose-invert text-xl  font-light sm:max-w-[300px] mb-5 relative z-10 "
                          dangerouslySetInnerHTML={{
                            __html: item.content.value,
                          }}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black opacity-100"></div>
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
    const response: any = await Globals.KontentClient.item(
      "product_sector_page"
    )
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
