import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const cards = [
  {
    img: "https://res.cloudinary.com/dqmataouk/image/upload/v1768241863/WhatsApp_Image_2026-01-12_at_11.45.38_PM_adbhty.jpg",
  },
  {
    img: "https://res.cloudinary.com/dqmataouk/image/upload/v1768241859/WhatsApp_Image_2026-01-12_at_11.45.42_PM_yplcfx.jpg",
  },
  {
    img: "https://res.cloudinary.com/dqmataouk/image/upload/v1768241861/WhatsApp_Image_2026-01-12_at_11.45.41_PM_ivsolt.jpg",
  },
  {
    img: "https://res.cloudinary.com/dqmataouk/image/upload/v1768241859/WhatsApp_Image_2026-01-12_at_11.45.42_PM_yplcfx.jpg",
  },
  {
    img: "https://res.cloudinary.com/dqmataouk/image/upload/v1768241861/WhatsApp_Image_2026-01-12_at_11.45.41_PM_ivsolt.jpg",
  },
];

export default function Slider() {
  return (
    <div className="py-8 sm:py-16">
      <Swiper
        loop
        autoplay={{ delay: 3000 }}
        modules={[Autoplay]}
        spaceBetween={12}
        breakpoints={{
          0: { slidesPerView: 1, centeredSlides: false },
          640: { slidesPerView: 1.2, centeredSlides: true },
          768: { slidesPerView: 2, centeredSlides: true },
          1024: { slidesPerView: 3, centeredSlides: true },
        }}
        className="w-full sm:max-w-6xl sm:mx-auto px-0 sm:px-4"
      >
        {cards.map((card, i) => (
          <SwiperSlide key={`${card.img}-${i}`}>
            <div className="rounded-xl overflow-hidden shadow-md">
              <img
                src={card.img}
                alt=""
                className="w-full h-[365px] sm:h-[230px] md:h-[360px] object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
