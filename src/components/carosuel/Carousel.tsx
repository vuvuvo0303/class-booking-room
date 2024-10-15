import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import { Navigation, Autoplay } from "swiper/modules";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { Badge } from "antd";
import { Card, CardContent } from "../ui/card";
const roomData = {
  id: 1,
  roomName: "105",
  capacity: 12,
  status: "Open",
  roomTypeId: 1,
  roomTypeName: "Study room",
  createdAt: "2024-10-11T13:04:00.783Z",
  updatedAt: "2024-10-11T13:04:00.783Z",
};
export default function Carousel() {
  return (
    <MaxWidthWrapper className="w-full flex justify-center my-8">
      <Swiper
        direction={"horizontal"}
        slidesPerView={4}
        spaceBetween={20}
        navigation={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Navigation, Autoplay]}
        className="mySwiper w-full max-w-full rounded-lg overflow-hidden h-[400px]"
      >
        {[1, 2, 3, 4, 5, 6, 7].map((value: number) => {
          return (
            <SwiperSlide className="h-full" key={value}>
              <Badge.Ribbon text="FPTU HCM " color="orange">
                <Card className="w-full shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out">
                  <CardContent className="p-0 ">
                    <div>
                      <img
                        className="object-cover w-full h-full"
                        src="https://hcmuni.fpt.edu.vn/Data/Sites/1/media/2020-kim-vi/seo/campus/1-truong-dai-hoc-fpt-tphcm/truong-dai-hoc-fpt-tp-hcm-(11).jpg"
                        alt={roomData.roomName}
                      />
                    </div>
                    <div className="p-5 flex flex-col gap-1.5">
                      <div className="flex gap-3">
                        <span className="font-bold">Room Name : </span>
                        <span>{roomData.roomName}</span>
                      </div>
                      <div className="flex gap-3">
                        <span className="font-bold">Room Type : </span>
                        <span>{roomData.roomTypeName}</span>
                      </div>
                      <div className="flex gap-3">
                        <span className="font-bold">capacity : </span>
                        <span>{roomData.capacity} seats</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Badge.Ribbon>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </MaxWidthWrapper>
  );
}
