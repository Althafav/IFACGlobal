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
      <MenuComponent />
      <div className="product-sector-page-wrapper">
        <div className="herosection-wrapper-home relative w-full sm:h-[400px] overflow-hidden">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src={pageData.bannerimage.value[0]?.url}
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-100"></div>

          <div className="relative z-10 container mx-auto h-full flex flex-col justify-end py-10 sm:py-20">
            <h1 className="text-white text-2xl sm:text-3xl lg:text-6xl  max-w-4xl leading-tight font-light">
              <span className="font-medium">Product</span> Sectors
            </h1>
          </div>
        </div>

        <div className="product-items-wrapper bg-black">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-10 sm:gap-20">
              {pageData.productsectoritems.value.map(
                (item: any, index: number) => {
                  return (
                    <div className="relative">
                      <div className="sm:max-w-[200px] mb-5">
                        <span
                          className="prose text-white prose-invert text-xl sm:text-3xl font-light "
                          dangerouslySetInnerHTML={{
                            __html: item.content.value,
                          }}
                        />
                      </div>
                      <img
                        src={item.image.value[0]?.url}
                        alt=""
                        className="h-[400px] object-cover rounded-2xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-100"></div>
                    </div>
                  );
                }
              )}
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
