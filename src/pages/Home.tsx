import { Button } from "@/components/ui/button";
import Decore from "../assets/Decore.png";
import { Card, CardContent } from "@/components/ui/card";
const Home = () => {
  return (
    <>
      <div
        className=" 
    "
      >
        <img
          className="w-full h-[780px] relative object-cover"
          src="https://daihoc.fpt.edu.vn/wp-content/uploads/2022/08/dai-hoc-fpt-tp-hcm-1.jpeg"
          alt=""
        />
        <div className="absolute top-[22%] left-0 z-10 flex flex-col gap-6 pl-10 ">
          <span className="text-orange-500 text-xl font-bold  p-2">Leading FaceID booking system</span>
          <span className="text-6xl font-bold w-[600px]">Quick room registration, easy identification!</span>
          <span className="w-96 text-black ">
            It is a facial recognition system to reserve classrooms made by students of FPT University and has only been
            applied at FPT University Ho Chi Minh campus.
          </span>
          <div className="pl-28">
            <Button className="hover:bg-green-500 ">Booking Now</Button>
          </div>
        </div>
        <div className="absolute top-0 left-[-20px] transform scale-x-[-1] ">
          <img src={Decore} alt="" />
        </div>
      </div>
      <div className="flex justify-center font-serif pt-3">
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
                Our system will be booking and checking in using FaceID making it safer and more convenient
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
              <span className=" text-xl font-bold">User Information Security</span>

              <span className="pl-4 text-sm w-64">
                Our system will commit to protecting all user information when using the platform
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
              <span className=" text-xl font-bold">Always transparent policy</span>

              <span className="pl-4 text-sm w-64">
                We always have transparent policies, always putting students' privileges and interests first
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
                In addition to facial recognition, we also add code codes on the front doors of the rooms, in case of
                recognition errors, we can still use the code we provide to open the door.
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-center font-serif pt-3">
        <span className="text-3xl">Available Rooms</span>
        <div>
          {/* <Carosuel /> */}
        </div>
      </div>
    </>
  );
};

export default Home;
