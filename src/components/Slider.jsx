import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Slider({ articles, onClick }) {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1.2}
      autoplay={{ delay: 2500 }}
    >
      {articles.map(item => (
        <SwiperSlide key={item.id}>
          <div
            onClick={() => onClick(item)}
            style={{
              position: "relative",
              borderRadius: 12,
              overflow: "hidden"
            }}
          >
            <img
              src={item.image}
              style={{ width: "100%", height: 200, objectFit: "cover" }}
            />

            <div
              style={{
                position: "absolute",
                bottom: 0,
                color: "white",
                padding: 10,
                background: "rgba(0,0,0,0.5)",
                width: "100%"
              }}
            >
              {item.title}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}