// components/GalleryComponent.tsx
import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/free-mode";
import { Homepageglobal2026 } from "@/models/homepageglobal2026";
import Image from "next/image";

interface PageDataProps {
  pageData: Homepageglobal2026 | null;
}

const GalleryComponent: React.FC<PageDataProps> = ({ pageData }) => {
  if (!pageData) return null;

  // your Kontent assets array
  const items = pageData.galleryitems.value as { url: string }[];

  return (
    <section className="gallery-wrapper py-12">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-light">
          Show <span className="font-bold">Gallery</span>
        </h2>

        {/* Swiper Grid (2 rows) */}
        <div className="relative mt-6">
          {/* left fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
          {/* right fade */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />

          <Swiper
            modules={[Grid, FreeMode]}
            freeMode={{ enabled: true }}
            grid={{ rows: 2, fill: "row" }}
            spaceBetween={16}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="py-2"
          >
            {items.map((asset, idx) => (
              <SwiperSlide key={idx}>
                <div className="w-full h-32 sm:h-40 md:h-48 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    fill
                    src={asset.url}
                    alt={`gallery-${idx}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default GalleryComponent;
