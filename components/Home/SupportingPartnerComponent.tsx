"use client";

import React, { useEffect, useState } from "react";
import Globals from "@/modules/Globals";
import { Partnerpage } from "@/models/partnerpage";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function SupportingPartnerComponent() {
  const [pageData, setPageData] = useState<Partnerpage | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    Globals.KontentClient.item("partner_page")
      .withParameter("depth", "4")
      .toObservable()
      .subscribe((res: any) => setPageData(res.item));
  }, []);

  if (!pageData) return null;

  return (
    <section className="supporting-partner-section py-12">
      <div className="container mx-auto">
        <div className="sm:px-20">
          <h2 className="text-start text-3xl font-semibold mb-5">
            <span className="font-bold">Supporting</span> Partners
          </h2>

          {/* Custom pagination bars */}
        </div>
        <div className="flex mb-8 space-x-2 overflow-hidden">
          {pageData.supportingpartneritems.value.slice(0, 5).map((_, i) => (
            <div
              key={i}
              className={`h-1 w-40 ${
                i === activeIdx ? "bg-red-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Swiper carousel */}
        <div className="">
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
            className=""
          >
            {pageData.supportingpartneritems.value.map(
              (item: any, idx: number) => (
                <SwiperSlide key={idx}>
                  <div className="partner-item bg-white p-6 rounded-2xl flex items-center justify-center shadow-md">
                    <img
                      src={item.image.value[0]?.url}
                      alt={
                        item.image.value[0]?.description || `Partner ${idx + 1}`
                      }
                      className="h-24 object-contain"
                    />
                  </div>
                </SwiperSlide>
              )
            )}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
