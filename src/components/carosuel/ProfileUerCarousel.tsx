import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules"; 
import trongdong from "../../assets/trongdong.png"; 

const ProfileCarousel = () => {
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={5} 
      loop={true} 
      autoplay={{
        delay: 0, 
        disableOnInteraction: false, 
      }}
      speed={10000} 
      modules={[Autoplay]} 
      className="mySwiper"
    >
      <SwiperSlide>
        <img src={trongdong} alt="Slide 1" width={70} />
      </SwiperSlide>
      <SwiperSlide>
        <img src={trongdong} alt="Slide 2" width={70} />
      </SwiperSlide>
      <SwiperSlide>
        <img src={trongdong} alt="Slide 3" width={70} />
      </SwiperSlide>
      <SwiperSlide>
        <img src={trongdong} alt="Slide 4" width={70} />
      </SwiperSlide>
      <SwiperSlide>
        <img src={trongdong} alt="Slide 5" width={70} />
      </SwiperSlide>
      <SwiperSlide>
        <img src={trongdong} alt="Slide 5" width={70} />
      </SwiperSlide>
      <SwiperSlide>
        <img src={trongdong} alt="Slide 5" width={70} />
      </SwiperSlide>
      <SwiperSlide>
        <img src={trongdong} alt="Slide 5" width={70} />
      </SwiperSlide>
    </Swiper>
  );
};

export default ProfileCarousel;
