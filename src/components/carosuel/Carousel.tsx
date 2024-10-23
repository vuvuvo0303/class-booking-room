import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import { Navigation, Autoplay } from "swiper/modules";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { Badge, Tag } from "antd";
import { Card, CardContent } from "../ui/card";
import { useEffect, useState } from "react";
import { Room } from "@/types/room";
import { getAllRoom } from "@/lib/api/room-api";

export default function Carousel() {
  const [data, setData] = useState<Room[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllRoom();
      if (result.error) {
        console.log(result.error);
      } else {
        const activeRooms = result.data.filter((room: Room) => room.status === "Active");
        setData(activeRooms);
      }
    };
    fetchData();
  }, []);

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
        {data.map((room: Room) => (
          <SwiperSlide className="h-full" key={room.id}>
            <Badge.Ribbon text="FPTU HCM " color="orange">
              <Card className="w-full shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out">
                <CardContent className="p-0 ">
                  <div className="h-[250px] w-full overflow-hidden">
                    <img
                      className="object-cover w-full h-[200px]" 
                      src={room.picture}
                      alt={room.roomName}
                    />
                  </div>
                  <div className="p-5 flex flex-col gap-1.5">
                    <div className="flex gap-3">
                      <span className="font-bold">Room Name : </span>
                      <span>{room.roomName}</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold">Room Type : </span>
                      <span>{room.roomType.name}</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold">Capacity : </span>
                      <span>{room.capacity} seats</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold">Status : </span>
                      <span><Tag color="success">{room.status}</Tag> </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Badge.Ribbon>
          </SwiperSlide>
        ))}
      </Swiper>
    </MaxWidthWrapper>
  );
}
