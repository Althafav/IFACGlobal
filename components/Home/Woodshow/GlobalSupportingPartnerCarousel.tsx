// components/SupportingPartner.tsx
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Globals from "@/modules/Globals";

interface PageDataProps {
  apiCode?: string;
}

const GlobalSupportingPartnerCarousel: React.FC<PageDataProps> = ({
  apiCode,
}) => {
  const [pageData, setpageData] = useState<any | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    Globals.WSG_KontentClient.item(apiCode)
      .toPromise()
      .then((res: any) => setpageData(res.item));
  }, []);

  if (!pageData) return null;

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="sm:px-20">
          <h2 className="text-start text-3xl font-semibold mb-5">
            <span className="font-bold">Supporting</span> Partners
          </h2>
        </div>
        <div className="flex mb-8 space-x-2 overflow-hidden">
          {pageData.items.value.slice(0, 5).map((_: any, i: any) => (
            <div
              key={i}
              className={`h-1 w-40 ${
                i === activeIdx ? "bg-red-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Carousel */}
        <Swiper
          modules={[Autoplay]}
          onSlideChange={(swiper) => setActiveIdx(swiper.realIndex)}
          spaceBetween={24}
          slidesPerView={2}
          loop
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 4 },
          }}
        >
          {pageData.items.value.map((p: any) =>
            p.logo.value?.length ? (
              <SwiperSlide key={p.system.id}>
                <Link
                  href={p.websiteLink?.value || ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-white rounded-lg shadow hover:shadow-lg transition"
                >
                  <div className="flex flex-col items-center">
                    <img
                      src={p.logo.value[0].url}
                      alt={p.name.value}
                      className="h-24 object-contain mb-3"
                    />
                    <p className="text-sm font-medium text-gray-700 text-center">
                      {p.name.value}
                    </p>
                  </div>
                </Link>
              </SwiperSlide>
            ) : null
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default GlobalSupportingPartnerCarousel;
