import SpinnerComponent from "@/components/UI/SpinnerComponent";
import Globals from "@/modules/Globals";
import { GetServerSideProps } from "next";
import React from "react";
import { Articleitem } from "@/models/articleitem";

type Props = {
  articleData: Articleitem | null;
};

export default function ArticlePage({ articleData }: Props) {
  if (!articleData) {
    return <SpinnerComponent />;
  }

  const { image, heading, content, system } = articleData;
  const formattedDate = system.lastModified
    ? new Date(system.lastModified).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <div className="article-detail-wrapper">
      <div className="herosection-wrapper relative w-full sm:h-[300px] overflow-hidden">
        <img
          src={image.value[0]?.url}
          alt={heading.value}
          className="absolute inset-0 w-full h-full object-cover white-linear-to-bottom-mask"
        />
      </div>

      <div className="container mx-auto py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {heading.value}
          </h1>
          <p className="text-gray-500 mb-6">{formattedDate}</p>

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: content.value }}
          />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params!;

  try {
    const response = await Globals.KontentClient.items()
      .type("articleitem")
      .equalsFilter("elements.slug", slug)
      .withParameter("depth", "4")
      .toPromise();

    const articleItem = response.items[0] || null;
    console.log(articleItem, "a");

    return {
      props: {
        articleData: JSON.parse(JSON.stringify(articleItem)),
      },
    };
  } catch (error) {
    console.error("Error fetching article:", error);
    return {
      props: {
        articleData: null,
      },
    };
  }
};
