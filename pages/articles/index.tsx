import SpinnerComponent from "@/components/UI/SpinnerComponent";

import Globals from "@/modules/Globals";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";

import { Articlespage } from "@/models/articlespage";
import { Articleitem } from "@/models/articleitem";

type PageProps = {
  pageData: Articlespage | null;
};

export default function Page({ pageData }: PageProps) {
  if (!pageData) {
    return <SpinnerComponent />;
  }

  return (
    <div>
      <div className="article-page-wrapper">
        <div className="herosection-wrapper-home relative w-full sm:h-[300px] overflow-hidden">
          <img
            src={pageData.bannerimage.value[0]?.url}
            alt=""
            className="absolute inset-0 w-full h-full object-cover  white-linear-to-bottom-mask"
          />
        </div>
        <div className="bg-white container mx-auto py-10">
          <span
            dangerouslySetInnerHTML={{ __html: pageData.bannerheading.value }}
            className="text-black text-2xl sm:text-3xl lg:text-6xl  max-w-4xl leading-tight mb-2"
          ></span>

          <div className="py-3">
            <span
              className="text-lg text-black"
              dangerouslySetInnerHTML={{
                __html: pageData.bannerdescription.value,
              }}
            />
          </div>
        </div>

        <div className="articles-section-wrapper py-20">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {pageData.articleitems.value.map((m: any, index: number) => {
                const item: Articleitem = m;
                return (
                  <Link href={`/articles/${item.slug.value}`} className="article-item" key={index}>
                    <img
                      className="w-full aspect-video rounded-2xl mb-3"
                      src={item.image.value[0]?.url}
                      alt={item.heading.value}
                    />
                    <h4 className="text-lg font-normal tracking-tight leading-tight mb-2">
                      {item.heading.value}
                    </h4>
                    <p className="text-gray-500">
                      {item.system.lastModified
                        ? new Date(item.system.lastModified).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            }
                          )
                        : ""}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response: any = await Globals.KontentClient.item("article_page")
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
