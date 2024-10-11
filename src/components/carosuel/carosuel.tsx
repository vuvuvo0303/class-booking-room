import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import { Navigation, Autoplay } from "swiper/modules";
import { Card, CardContent } from "../ui/card";
import { Badge, Tag } from "antd";
import { Button } from "../ui/button";

export default function Carosuel() {
  return (
    <div className="w-full flex justify-center my-8">
      <Swiper
        direction={"horizontal"}
        slidesPerView={5}
        spaceBetween={20}
        navigation={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Navigation, Autoplay]}
        className="mySwiper w-full max-w-full h-[520px] rounded-lg overflow-hidden"
      >
        <SwiperSlide className="h-full">
          <Badge.Ribbon text="FPTU HCM " color="orange">
          <Card className="w-[100%] shadow-lg shadow-orange-400 transition-transform transform hover:scale-105 hover:shadow-orange-600 duration-300 ease-in-out">              <CardContent className="p-0 ">
                <div className=" ">
                  <img
                    className="object-cover w-full h-full"
                    src="https://hcmuni.fpt.edu.vn/Data/Sites/1/media/2020-kim-vi/seo/campus/1-truong-dai-hoc-fpt-tphcm/truong-dai-hoc-fpt-tp-hcm-(11).jpg"
                    alt="Room 1"
                  />
                </div>
                <div
                  className="p-5
                flex flex-col gap-1.5
              "
                >
                  <div className="flex gap-3">
                    <span className="font-bold">Room Name : </span>
                    <span>NVH601</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold">Room Type : </span>
                    <span>Meeting room</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold">capacity : </span>
                    <span>10 seats</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold">Status : </span>
                    <Tag color="success">Still empty</Tag>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <span className="font-bold">Empty slot : </span>
                    <Tag>1(7h-9h15)</Tag>
                    <Tag>2(9h15-11h45)</Tag>
                    <Tag>3(9h15-11h45)</Tag>
                    <Tag>4(9h15-11h45)</Tag>
                  </div>
                </div>
                <div className="flex justify-center pb-3">
                  <Button> Booking</Button>
                </div>
              </CardContent>
            </Card>
          </Badge.Ribbon>
        </SwiperSlide>
        <SwiperSlide className="h-full">
          <Badge.Ribbon text="FPTU HCM " color="orange">
            <Card className="w-[100%] shadow-lg shadow-orange-400">
              <CardContent className="p-0 ">
                <div className=" ">
                  <img
                    className="object-cover w-full h-full"
                    src="https://hcmuni.fpt.edu.vn/Data/Sites/1/media/2020-kim-vi/seo/campus/1-truong-dai-hoc-fpt-tphcm/truong-dai-hoc-fpt-tp-hcm-(11).jpg"
                    alt="Room 1"
                  />
                </div>
                <div
                  className="p-5
                flex flex-col gap-1.5
              "
                >
                  <div className="flex gap-3">
                    <span className="font-bold">Room Name : </span>
                    <span>NVH601</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold">Room Type : </span>
                    <span>Meeting room</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold">capacity : </span>
                    <span>10 seats</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold">Status : </span>
                    <Tag color="success">Still empty</Tag>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <span className="font-bold">Empty slot : </span>
                    <Tag color="red">1(7h-9h15)</Tag>
                    <Tag>2(9h15-11h45)</Tag>
                    <Tag>3(9h15-11h45)</Tag>
                    <Tag>4(9h15-11h45)</Tag>
                  </div>
                </div>
              
              </CardContent>
            </Card>
          </Badge.Ribbon>
        </SwiperSlide>
        <SwiperSlide className="h-full">
          <Badge.Ribbon text="FPTU HCM " color="orange">
            <Card className="w-[100%] shadow-lg shadow-orange-400">
              <CardContent className="p-0 ">
                <div className=" ">
                  <img
                    className="object-cover w-full h-full"
                    src="https://hcmuni.fpt.edu.vn/Data/Sites/1/media/2020-kim-vi/seo/campus/1-truong-dai-hoc-fpt-tphcm/truong-dai-hoc-fpt-tp-hcm-(11).jpg"
                    alt="Room 1"
                  />
                </div>
                <div
                  className="p-5
                flex flex-col gap-1.5
              "
                >
                  <div className="flex gap-3">
                    <span className="font-bold">Room Name : </span>
                    <span>NVH601</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold">Room Type : </span>
                    <span>Meeting room</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold">capacity : </span>
                    <span>10 seats</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold">Status : </span>
                    <Tag color="error">Full slot</Tag>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <span className="font-bold">Empty slot : </span>
                    <Tag color="red">1(7h-9h15)</Tag>
                    <Tag color="red">2(9h15-11h45)</Tag>
                    <Tag color="red">3(9h15-11h45)</Tag>
                    <Tag color="red">4(9h15-11h45)</Tag>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Badge.Ribbon>
        </SwiperSlide>
        <SwiperSlide className="h-full">
          <Badge.Ribbon text="FPTU HCM " color="orange">
            <Card className="w-[100%] shadow-lg shadow-orange-400">
              <CardContent className="p-0 ">
                <div className=" ">
                  <img
                    className="object-cover w-full h-full"
                    src="https://hcmuni.fpt.edu.vn/Data/Sites/1/media/2020-kim-vi/seo/campus/1-truong-dai-hoc-fpt-tphcm/truong-dai-hoc-fpt-tp-hcm-(11).jpg"
                    alt="Room 1"
                  />
                </div>
                <div
                  className="p-5
                flex flex-col gap-1.5
              "
                >
                  <div className="flex gap-3">
                    <span className="font-bold">Room Name : </span>
                    <span>NVH601</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold">Room Type : </span>
                    <span>Meeting room</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold">capacity : </span>
                    <span>10 seats</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold">Status : </span>
                    <Tag color="success">Still empty</Tag>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <span className="font-bold">Empty slot : </span>
                    <Tag>1(7h-9h15)</Tag>
                    <Tag>2(9h15-11h45)</Tag>
                    <Tag>3(9h15-11h45)</Tag>
                    <Tag>4(9h15-11h45)</Tag>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Badge.Ribbon>
        </SwiperSlide>
        <SwiperSlide className="h-full">
          <Badge.Ribbon text="FPTU HCM " color="orange">
            <Card className="w-[100%] shadow-lg shadow-orange-400">
              <CardContent className="p-0 ">
                <div className=" ">
                  <img
                    className="object-cover w-full h-full"
                    src="https://hcmuni.fpt.edu.vn/Data/Sites/1/media/2020-kim-vi/seo/campus/1-truong-dai-hoc-fpt-tphcm/truong-dai-hoc-fpt-tp-hcm-(11).jpg"
                    alt="Room 1"
                  />
                </div>
                <div
                  className="p-5
                flex flex-col gap-1.5
              "
                >
                  <div className="flex gap-3">
                    <span className="font-bold">Room Name : </span>
                    <span>NVH601</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold">Room Type : </span>
                    <span>Meeting room</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold">capacity : </span>
                    <span>10 seats</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold">Status : </span>
                    <Tag color="success">Still empty</Tag>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <span className="font-bold">Empty slot : </span>
                    <Tag color="red" className=" inline-block line-through">
                      1(7h-9h15)
                    </Tag>

                    <Tag className=" inline-block line-through">2(9h15-11h45)</Tag>
                    <Tag>3(9h15-11h45)</Tag>
                    <Tag>4(9h15-11h45)</Tag>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Badge.Ribbon>
        </SwiperSlide>
        <SwiperSlide className="h-full">
          <Badge.Ribbon text="FPTU HCM " color="orange">
            <Card className="w-[100%] shadow-lg shadow-orange-400">
              <CardContent className="p-0 ">
                <div className=" ">
                  <img
                    className="object-cover w-full h-full"
                    src="https://hcmuni.fpt.edu.vn/Data/Sites/1/media/2020-kim-vi/seo/campus/1-truong-dai-hoc-fpt-tphcm/truong-dai-hoc-fpt-tp-hcm-(11).jpg"
                    alt="Room 1"
                  />
                </div>
                <div
                  className="p-5
                flex flex-col gap-1.5
              "
                >
                  <div className="flex gap-3">
                    <span className="font-bold">Room Name : </span>
                    <span>NVH601</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold">Room Type : </span>
                    <span>Meeting room</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold">capacity : </span>
                    <span>10 seats</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold">Status : </span>
                    <Tag color="error">Full slot</Tag>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <span className="font-bold">Empty slot : </span>
                    <Tag color="red" className=" inline-block line-through">1(7h-9h15)</Tag>
                    <Tag color="red"className=" inline-block line-through">2(9h15-11h45)</Tag>
                    <Tag color="red"className=" inline-block line-through">3(9h15-11h45)</Tag>
                    <Tag color="red"className=" inline-block line-through">4(9h15-11h45)</Tag>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Badge.Ribbon>
        </SwiperSlide>
        <SwiperSlide className="h-full">
          <Badge.Ribbon text="FPTU HCM " color="orange">
            <Card className="w-[100%] shadow-lg shadow-orange-400">
              <CardContent className="p-0 ">
                <div className=" ">
                  <img
                    className="object-cover w-full h-full"
                    src="https://hcmuni.fpt.edu.vn/Data/Sites/1/media/2020-kim-vi/seo/campus/1-truong-dai-hoc-fpt-tphcm/truong-dai-hoc-fpt-tp-hcm-(11).jpg"
                    alt="Room 1"
                  />
                </div>
                <div
                  className="p-5
                flex flex-col gap-1.5
              "
                >
                  <div className="flex gap-3">
                    <span className="font-bold">Room Name : </span>
                    <span>NVH601</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold">Room Type : </span>
                    <span>Meeting room</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold">capacity : </span>
                    <span>10 seats</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold">Status : </span>
                    <Tag color="success">Still empty</Tag>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <span className="font-bold">Empty slot : </span>
                    <Tag>1(7h-9h15)</Tag>
                    <Tag>2(9h15-11h45)</Tag>
                    <Tag>3(9h15-11h45)</Tag>
                    <Tag>4(9h15-11h45)</Tag>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Badge.Ribbon>
        </SwiperSlide>
        <SwiperSlide className="h-full">
          <Badge.Ribbon text="FPTU HCM " color="orange">
            <Card className="w-[100%] shadow-lg shadow-orange-400">
              <CardContent className="p-0 ">
                <div className=" ">
                  <img
                    className="object-cover w-full h-full"
                    src="https://hcmuni.fpt.edu.vn/Data/Sites/1/media/2020-kim-vi/seo/campus/1-truong-dai-hoc-fpt-tphcm/truong-dai-hoc-fpt-tp-hcm-(11).jpg"
                    alt="Room 1"
                  />
                </div>
                <div
                  className="p-5
                flex flex-col gap-1.5
              "
                >
                  <div className="flex gap-3">
                    <span className="font-bold">Room Name : </span>
                    <span>NVH601</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold">Room Type : </span>
                    <span>Meeting room</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold">capacity : </span>
                    <span>10 seats</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold">Status : </span>
                    <Tag color="success">Still empty</Tag>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <span className="font-bold">Empty slot : </span>
                    <Tag color="red">1(7h-9h15)</Tag>
                    <Tag>2(9h15-11h45)</Tag>
                    <Tag>3(9h15-11h45)</Tag>
                    <Tag>4(9h15-11h45)</Tag>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Badge.Ribbon>
        </SwiperSlide>
        <SwiperSlide className="h-full">
          <Badge.Ribbon text="FPTU HCM " color="orange">
            <Card className="w-[100%] shadow-lg shadow-orange-400">
              <CardContent className="p-0 ">
                <div className=" ">
                  <img
                    className="object-cover w-full h-full"
                    src="https://hcmuni.fpt.edu.vn/Data/Sites/1/media/2020-kim-vi/seo/campus/1-truong-dai-hoc-fpt-tphcm/truong-dai-hoc-fpt-tp-hcm-(11).jpg"
                    alt="Room 1"
                  />
                </div>
                <div
                  className="p-5
                flex flex-col gap-1.5
              "
                >
                  <div className="flex gap-3">
                    <span className="font-bold">Room Name : </span>
                    <span>NVH601</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold">Room Type : </span>
                    <span>Meeting room</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold">capacity : </span>
                    <span>10 seats</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold">Status : </span>
                    <Tag color="error">Full slot</Tag>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <span className="font-bold">Empty slot : </span>
                    <Tag color="red">1(7h-9h15)</Tag>
                    <Tag color="red">2(9h15-11h45)</Tag>
                    <Tag color="red">3(9h15-11h45)</Tag>
                    <Tag color="red">4(9h15-11h45)</Tag>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Badge.Ribbon>
        </SwiperSlide>
        <SwiperSlide className="h-full">
          <Badge.Ribbon text="FPTU HCM " color="orange">
            <Card className="w-[100%] shadow-lg shadow-orange-400">
              <CardContent className="p-0 ">
                <div className=" ">
                  <img
                    className="object-cover w-full h-full"
                    src="https://hcmuni.fpt.edu.vn/Data/Sites/1/media/2020-kim-vi/seo/campus/1-truong-dai-hoc-fpt-tphcm/truong-dai-hoc-fpt-tp-hcm-(11).jpg"
                    alt="Room 1"
                  />
                </div>
                <div
                  className="p-5
                flex flex-col gap-1.5
              "
                >
                  <div className="flex gap-3">
                    <span className="font-bold">Room Name : </span>
                    <span>NVH601</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold">Room Type : </span>
                    <span>Meeting room</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold">capacity : </span>
                    <span>10 seats</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold">Status : </span>
                    <Tag color="success">Still empty</Tag>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <span className="font-bold">Empty slot : </span>
                    <Tag>1(7h-9h15)</Tag>
                    <Tag>2(9h15-11h45)</Tag>
                    <Tag>3(9h15-11h45)</Tag>
                    <Tag>4(9h15-11h45)</Tag>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Badge.Ribbon>
        </SwiperSlide>
        <SwiperSlide className="h-full">
          <Badge.Ribbon text="FPTU HCM " color="orange">
            <Card className="w-[100%] shadow-lg shadow-orange-400">
              <CardContent className="p-0 ">
                <div className=" ">
                  <img
                    className="object-cover w-full h-full"
                    src="https://hcmuni.fpt.edu.vn/Data/Sites/1/media/2020-kim-vi/seo/campus/1-truong-dai-hoc-fpt-tphcm/truong-dai-hoc-fpt-tp-hcm-(11).jpg"
                    alt="Room 1"
                  />
                </div>
                <div
                  className="p-5
                flex flex-col gap-1.5
              "
                >
                  <div className="flex gap-3">
                    <span className="font-bold">Room Name : </span>
                    <span>NVH601</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold">Room Type : </span>
                    <span>Meeting room</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold">capacity : </span>
                    <span>10 seats</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold">Status : </span>
                    <Tag color="success">Still empty</Tag>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <span className="font-bold">Empty slot : </span>
                    <Tag color="red">1(7h-9h15)</Tag>
                    <Tag>2(9h15-11h45)</Tag>
                    <Tag>3(9h15-11h45)</Tag>
                    <Tag>4(9h15-11h45)</Tag>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Badge.Ribbon>
        </SwiperSlide>
        <SwiperSlide className="h-full">
          <Badge.Ribbon text="FPTU HCM " color="orange">
            <Card className="w-[100%] shadow-lg shadow-orange-400">
              <CardContent className="p-0 ">
                <div className=" ">
                  <img
                    className="object-cover w-full h-full"
                    src="https://hcmuni.fpt.edu.vn/Data/Sites/1/media/2020-kim-vi/seo/campus/1-truong-dai-hoc-fpt-tphcm/truong-dai-hoc-fpt-tp-hcm-(11).jpg"
                    alt="Room 1"
                  />
                </div>
                <div
                  className="p-5
                flex flex-col gap-1.5
              "
                >
                  <div className="flex gap-3">
                    <span className="font-bold">Room Name : </span>
                    <span>NVH601</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold">Room Type : </span>
                    <span>Meeting room</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold">capacity : </span>
                    <span>10 seats</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold">Status : </span>
                    <Tag color="error">Full slot</Tag>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <span className="font-bold">Empty slot : </span>
                    <Tag color="red">1(7h-9h15)</Tag>
                    <Tag color="red">2(9h15-11h45)</Tag>
                    <Tag color="red">3(9h15-11h45)</Tag>
                    <Tag color="red">4(9h15-11h45)</Tag>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Badge.Ribbon>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

