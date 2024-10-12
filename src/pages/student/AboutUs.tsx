import { Card, CardContent } from "@/components/ui/card";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import CarouselArticles from "@/components/carosuel/CarouselArticles";
import CarouselAwards from "@/components/carosuel/CarouselAwards";

const AboutUs = () => {
  return (
    <div className="">
      <div className="flex pt-32 gap-16 pl-20">
        <div>
          <iframe
            src="https://www.youtube.com/embed/z7c61nR6uQM?si=Uq6nHB5-rNrOtKmB&autoplay=1&loop=1&playlist=z7c61nR6uQM&controls=0&rel=0"
            width="600"
            height="400"
          ></iframe>
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <span className=" text-4xl font-bold">Our Story</span>
          </div>
          <span className=" w-[700px]">
            Welcome to the Face ID Classroom Booking Project, an advanced technology solution that helps FPT University
            HCM students and trainees book classrooms quickly, safely and conveniently. Our mission is to bring a modern
            and secure room setup system with facial recognition technology, helping to automate the process and reduce
            waiting time, while improving room management efficiency. The development team consists of a group of
            students who are passionate about technology, with the support of its members, it is important to end
            cutting-edge technology with user-friendly and efficient experiences.
          </span>
          <div className="border border-gray-400 mt-6"></div>
          <div>
            <div className="flex flex-col">
              <span>Have any question?</span>
              <span>Contact Us?</span>
            </div>
            <div className="pt-5 flex gap-16">
              <div className="flex items-center gap-3">
                <img src="https://cdn0.iconfinder.com/data/icons/picons-social/57/64-viber-256.png" width={30} />
                <span className="text-xl">028 7300 1866</span>
              </div>
              <div className="flex items-center gap-3">
                <img src="https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_email-256.png" width={30} />
                <span className="text-xl">fubookingroomhcm@fpt.edu.vn</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Container cho phần nội dung tiếp theo */}
      <div className="relative pt-56">
        {/* Nền màu đen */}
        <div className="bg-orange-400 w-screen h-auto z-20">
          <div className="pt-72">
            <div className="flex justify-center pb-5">
              <span className="text-white text-3xl font-bold">Outstanding features of the system</span>
            </div>
            <div className="flex gap-5 px-20 pb-9">
              <Card className="w-1/4">
                <CardContent>
                  <div className="flex flex-col items-center p-6 gap-2">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Face_ID_logo.svg/2048px-Face_ID_logo.svg.png"
                      width={50}
                    />
                    <span className="text-xl font-bold">Identify with FaceID</span>

                    <span className="pl-4 text-sm w-60">
                      Our system will be booking and checking in using FaceID making it safer and more convenient
                    </span>
                  </div>
                </CardContent>
              </Card>
              <Card className="w-1/4">
                <CardContent>
                  <div className="flex flex-col items-center py-5 gap-2">
                    <img
                      src="https://cdn0.iconfinder.com/data/icons/seo-web-4-1/128/Vigor_Shield-Protection-Web-Browser-Safezone-256.png"
                      width={50}
                    />
                    <span className="text-xl font-bold">User Information Security</span>

                    <span className="pl-4 text-sm w-64">
                      Our system will commit to protecting all user information when using the platform
                    </span>
                  </div>
                </CardContent>
              </Card>
              <Card className="w-1/4">
                <CardContent>
                  <div className="flex flex-col items-center py-5 gap-2">
                    <img
                      src="https://cdn3.iconfinder.com/data/icons/business-insurance-9/64/business_insurance-09-256.png"
                      width={50}
                    />
                    <span className="text-xl font-bold">Always transparent policy</span>

                    <span className="pl-4 text-sm w-64">
                      We always have transparent policies, always putting students' privileges and interests first
                    </span>
                  </div>
                </CardContent>
              </Card>
              <Card className="w-1/4">
                <CardContent>
                  <div className="flex flex-col items-center py-5 gap-2">
                    <img
                      src="https://cdn3.iconfinder.com/data/icons/domicile-2/68/handle_code_door_entrance_hotel_room-256.png"
                      width={50}
                    />
                    <span className="text-xl font-bold">Security by code</span>

                    <span className="pl-4 text-sm w-64">
                      In addition to facial recognition, we also add code codes on the front doors of the rooms, in case
                      of recognition errors, we can still use the code we provide to open the door.
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Phần nội dung với absolute */}
        <div className="absolute top-20 left-0 right-0 flex justify-between px-10 py-12 bg-stone-100 w-[75%] mx-auto rounded-2xl z-10">
          <div className="flex flex-col gap-8">
            <span className="text-3xl font-bold">About FPT University</span>
            <span className="w-[600px]">
              FPT University Ho Chi Minh City is a private university famous for its information technology and business
              administration training programs. The school focuses on developing practical skills, particularly in the
              IT sector, in order to meet the demand for high-quality human resources. With a modern learning
              environment and international links, FPT Ho Chi Minh City is an ideal choice for students who want to
              pursue a career in the technology industry.
            </span>
            <span className="w-[600px]">
              FPT University Ho Chi Minh City focuses on developing practical, creative and entrepreneurial skills,
              meeting the demand for high-quality human resources.
            </span>
          </div>
          <img
            src="https://university.fpt.edu.vn/hcm/wp-content/uploads/2024/06/219973792_358782625767210_9221924035741697055_n-1.jpg"
            width={450}
          />
        </div>
      </div>

      {/* Phần Swiper */}
      <div className="flex justify-center py-9">
        <span className="text-3xl font-bold">Articles about Us</span>
      </div>
      <div className="px-9">
        <CarouselArticles />
      </div>
      <div className="flex justify-center">
        <span className="text-3xl font-bold">The Awards we have achieved</span>
      </div>
      <div className="py-20">
        <CarouselAwards />
      </div>
    </div>
  );
};

export default AboutUs;
