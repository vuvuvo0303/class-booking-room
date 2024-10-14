import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const CarouselAwards: React.FC = () => {
  return (
    <div className="w-screen">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={3}
        autoplay={{ delay: 1, disableOnInteraction: false }}
        speed={3000}
        loop={true}
      >
        <div className="">
          <SwiperSlide>
            <div className="flex items-center">
              <img
                src="data:image/png;base64,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"
                width={200}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex items-center">
              <img
                src="https://i.newscdn.net/publisher-c1a3f893382d2b2f8a9aa22a654d9c97/2020/08/f237f2aab0e324508aeabf379470788f.jpg=s600"
                width={200}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex items-center">
              <img src="https://www.thebrandlaureate.com/wp-content/uploads/2019/11/asocio.jpg" width={150} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex items-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/5/59/Asia_Pacific_Baptist_Federation_logo.png"
                width={110}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex items-center">
              <img src="https://caohoc.fpt.edu.vn/wp-content/uploads/2023/08/logo-qs-star-2012.png" width={150} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex items-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/5/59/Asia_Pacific_Baptist_Federation_logo.png"
                width={110}
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex items-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp10wF5sT1ZNc0Egc-mCJQ_Pdc9L0D5hGIMA&s"
                width={150}
              />
            </div>
          </SwiperSlide>
        </div>
      </Swiper>
    </div>
  );
};

export default CarouselAwards;
