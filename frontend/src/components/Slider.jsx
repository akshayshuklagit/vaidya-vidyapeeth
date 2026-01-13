import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import heroIllustration from "../assets/undraw_professor-avatar_y9ai.svg";
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
    <div className="py-16">
      <Swiper
        loop
        centeredSlides
        spaceBetween={20}
        autoplay={{ delay: 3000 }}
        modules={[Autoplay]}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 1.4,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="max-w-6xl mx-auto px-4"
      >
        {cards.map((card, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <div
                className={`transition-all duration-500 rounded-2xl overflow-hidden shadow-xl
                ${isActive ? "scale-105 md:scale-110" : "scale-95 opacity-70"}`}
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-[260px] md:h-[380px] object-cover"
                />
                {/* <div className="p-5 bg-white text-center">
                  <h3 className="text-lg md:text-xl font-bold mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    {card.desc}
                  </p>
                </div> */}
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
