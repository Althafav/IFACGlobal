// components/ProductSectorMasonry.tsx
import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { Homepageglobal2026 } from "@/models/homepageglobal2026";
import Image from "next/image";

interface Props {
  pageData: Homepageglobal2026 | null;
}

export default function ProductSectorMasonry({ pageData }: Props) {
  const originals = pageData?.productsectoritems.value ?? [];
  const slides = useMemo(() => [...originals, ...originals], [originals]);

  if (!pageData) return null;

  return (
    <section className="products-wrapper py-12">
      <div className="2xl:max-w-7xl mx-auto">
        <Swiper
          grabCursor={true}
          centeredSlides={true}
          spaceBetween={10}
          slidesPerView={4.5}
          loop={true}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            reverseDirection: true,
          }}
          speed={1000}
          modules={[Autoplay]}
          className="h-32"
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
          }}
        >
          {slides.map((item: any, idx: number) => (
            <SwiperSlide key={`top-${idx}`}>
              <Card label={item.name.value} src={item.image.value[0]?.url} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="">
          <Swiper
            grabCursor={true}
            centeredSlides={true}
            spaceBetween={10}
            slidesPerView={4.5}
            loop={true}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={1000}
            modules={[Autoplay]}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
            }}
            className=""
          >
            {slides.map((item: any, idx: number) => (
              <SwiperSlide key={`bot-${idx}`}>
                <Card label={item.name.value} src={item.image.value[0]?.url} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

/* --- tiny presentational helper ----------------------------------- */
function Card({ label, src }: { label: string; src: string }) {
  return (
    <div className="relative w-full h-24 rounded-2xl overflow-hidden">
      <Image fill src={src} alt={label} className="object-cover" />
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 flex items-center justify-center">
        <h4 className="text-white text-sm font-semibold text-center px-2">
          {label}
        </h4>
      </div>
    </div>
  );
}
