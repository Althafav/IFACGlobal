// PromotionBannerSwiper.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

interface PromotionBannerSwiperProps {
  images: { url: string }[];
}

const PromotionBannerSwiper: React.FC<PromotionBannerSwiperProps> = ({
  images,
}) => {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      speed={1000}
      modules={[Autoplay]}
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <Image
          width={450}
          height={60}
            src={img.url}
            alt={`Slide ${index + 1}`}
            className="rounded object-contain w-full h-[60px] overflow-hidden"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PromotionBannerSwiper;
