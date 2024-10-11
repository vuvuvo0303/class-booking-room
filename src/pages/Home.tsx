import { Button } from "@/components/ui/button";
import Decore from "../assets/Decore.png";

import { Card, CardContent } from "@/components/ui/card";
import Carousel from "@/components/carosuel/Carousel";
const Home = () => {
  return (
    <>
      <div>
        <img
          className="w-full h-[780px] relative object-cover"
          src="https://daihoc.fpt.edu.vn/wp-content/uploads/2022/08/dai-hoc-fpt-tp-hcm-1.jpeg"
          alt=""
        />
        <div className="absolute top-[22%] left-0 z-10 flex flex-col gap-6 pl-10 ">
          <span className="text-orange-500 text-xl font-bold  p-2">
            Leading FaceID booking system
          </span>
          <span className="text-6xl font-bold w-[600px]">
            Quick room registration, easy identification!
          </span>
          <span className="w-96 text-black ">
            It is a facial recognition system to reserve classrooms made by
            students of FPT University and has only been applied at FPT
            University Ho Chi Minh campus.
          </span>
          <div className="pl-28">
            <Button className="hover:bg-green-500 ">Booking Now</Button>
          </div>
        </div>
        <div className="absolute top-0 left-[-20px] transform scale-x-[-1] ">
          <img src={Decore} alt="" />
        </div>
      </div>
      {/* <div className="absolute w-full bottom-[-100px] bg-white/20 backdrop-blur-sm">
        <span className="text-black text-5xl flex justify-center ">Filter room</span>
        <div>
          <Search placeholder="input search text"  />
        </div>
        <div></div>
      </div> */}
      <div className="flex justify-center font-serif pt-36">
        <span className="text-3xl">The System we have</span>
      </div>
      <div className="flex gap-5 px-20 py-3">
        <Card className="w-1/4">
          <CardContent>
            <div className="flex flex-col  items-center p-6 gap-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Face_ID_logo.svg/2048px-Face_ID_logo.svg.png"
                width={50}
              />
              <span className=" text-xl font-bold">Identify with FaceID</span>

              <span className="pl-4 text-sm w-60">
                Our system will be booking and checking in using FaceID making
                it safer and more convenient
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className="w-1/4">
          <CardContent>
            <div className="flex flex-col  items-center py-5 gap-2">
              <img
                src="https://cdn0.iconfinder.com/data/icons/seo-web-4-1/128/Vigor_Shield-Protection-Web-Browser-Safezone-256.png"
                width={50}
              />
              <span className=" text-xl font-bold">
                User Information Security
              </span>
              <span className="pl-4 text-sm w-64">
                Our system will commit to protecting all user information when
                using the platform
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className="w-1/4">
          <CardContent>
            <div className="flex flex-col  items-center py-5 gap-2">
              <img
                src="https://cdn3.iconfinder.com/data/icons/business-insurance-9/64/business_insurance-09-256.png"
                width={50}
              />
              <span className=" text-xl font-bold">
                Always transparent policy
              </span>

              <span className="pl-4 text-sm w-64">
                We always have transparent policies, always putting students'
                privileges and interests first
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className="w-1/4">
          <CardContent>
            <div className="flex flex-col  items-center py-5 gap-2">
              <img
                src="https://cdn3.iconfinder.com/data/icons/domicile-2/68/handle_code_door_entrance_hotel_room-256.png"
                width={50}
              />
              <span className=" text-xl font-bold">Security by code</span>
              <span className="pl-4 text-sm w-64">
                In addition to facial recognition, we also add code codes on the
                front doors of the rooms, in case of recognition errors, we can
                still use the code we provide to open the door.
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col justify-center items-center pb-5 pt-8 ">
        <span className="text-3xl mb-4">Available Rooms</span>
      </div>
      <div>
        <Carousel />
      </div>
      {/* <div className="flex flex-col justify-center items-center pb-5  ">
        <span className="text-3xl mb-4">Rooms are being repaired or have full slots</span>
      </div>
      <div>
        <Carosuel />
      </div> */}
      <div className=" flex flex-col pb-44 gap-6">
        <span className="flex justify-center text-3xl text-stone-400">
          The system is trusted for use by schools of the FPT education system
        </span>
        <div className="flex justify-evenly">
          <img
            src="https://upload.wikimedia.org/wikipedia/vi/2/2d/Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_FPT.svg"
            width={150}
          />
          <img
            src="https://logowik.com/content/uploads/images/university-of-greenwich2357.jpg"
            width={200}
          />
          <img
            src="https://blob-careerlinkvn.careerlink.vn/company_logos/aedbaad1bf7526aa7fa3d85ad9c5c5dc.png"
            width={150}
          />
          <img
            src="https://static.unimates.edu.vn/wp-content/uploads/2021/03/Melbourne-Polytechnic.png"
            width={150}
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROlK278Xt7DKb1h5y75CIjdUKdPU2DmyS_sw&s"
            width={300}
          />
          <img
            src="data:image/png;base64,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"
            width={150}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
