import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Navigation, Autoplay } from "swiper/modules";
import { Card, CardContent } from "../ui/card";
import { Link } from "react-router-dom"; 

export default function CarouselArticles() {
  const limitText = (text: string, wordLimit: number): string => {
    const words = text.trim().split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
  };

  const text1 = `
    Trường ĐH FPT nhận giải thưởng "Campus Transformation outstanding Achievement Award" (Trường đại học
    thực hiện chuyển đổi số xuất sắc) trong khuôn khổ Hội nghị toàn cầu của Coursera năm 2023, diễn ra
    ngày 13/4. Đây là hội nghị thường niên lớn nhất của nền tảng học trực tuyến hàng đầu Coursera.
  `;

  const text2 = `
    Chỉ trong vài tháng, sinh viên ĐH FPT liên tiếp nhận tin vui khi trường được vinh danh trên các đấu
    trường quốc tế như giải thưởng The BrandLaureate cho hạng mục ĐH xuất sắc, hay trước đó là giải
    thưởng Tổ chức công nghiệp điện toán châu Á - châu Đại Dương (ASOCIO) 2018 cho hạng mục Tổ chức đào
    tạo công nghệ thông tin xuất sắc. Dưới đây là những yếu tố giúp ĐH FPT trở thành trường công nghệ
    đạt chuẩn quốc tế.
  `;

  const text3 = `Chủ trương xã hội hóa giáo dục, theo tinh thần Nghị quyết số 29-NQ/T.Ư của Ban Chấp hành Trung ương Đảng khóa XI về đổi mới căn bản, toàn diện giáo dục, đã không chỉ giúp giải quyết vấn đề tài chính từ ngân sách nhà nước dành cho nhu cầu phát triển giáo dục mà còn mở rộng các chủ thể tham gia vào giáo dục để nâng cao chất lượng và hiệu quả.`;

  const text4 = `Đại học FPT vừa trở thành trường đại học thứ 5 đạt chuẩn theo bộ tiêu chuẩn đánh giá mới. Với kết quả này, theo Luật Giáo dục Đại học sửa đổi, Đại học FPT chính thức được tự chủ trong việc mở ngành và liên kết đào tạo.`;

  const text5 = `Ngay từ khi mới là sinh viên, Ngô Quang Khánh, Trường đại học FPT ngành Kỹ thuật phần mềm, đã được nhận vào thực tập và làm việc với khách hàng Nhật Bản tại Công ty CP Phần mềm FPT (FPT Software).`;

  const text6 = `Lễ trao giải Thương hiệu có tầm ảnh hưởng BrandLaureate 2018-2019 diễn ra tối 27/6 tại Malaysia đã xướng tên ĐH FPT và Tổ chức Giáo dục FPT trong hạng mục thương hiệu có sức ảnh hưởng trong lĩnh vực giáo dục năm 2018-2019.`;

  return (
    <div className="w-full flex justify-center my-8">
      <Swiper
        direction={"horizontal"}
        slidesPerView={4}
        spaceBetween={20}
        navigation={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Navigation, Autoplay]}
        className="mySwiper w-full max-w-full h-auto rounded-lg overflow-visible"
      >
        <SwiperSlide className="h-auto">
          <Card className="w-[100%] h-[490px] shadow-lg shadow-orange-300 hover:shadow-orange-500 duration-300 ease-in-out rounded-lg">
            <CardContent className="p-0">
              <div className="rounded-t-lg overflow-hidden">
                <img
                  className="object-cover w-full h-[200px]"
                  src="https://i1-vnexpress.vnecdn.net/2023/04/14/Image-982735978-ExtractWord-1-9358-4190-1681473190.png?w=1020&h=0&q=100&dpr=1&fit=crop&s=mknYG2x4Xir1xqHj-ptvJw"
                  alt="FPT University"
                />
              </div>
              <div className="p-5 flex flex-col gap-4">
                <div className="flex gap-3">
                  <Link
                    to="https://vnexpress.net/dh-fpt-nhan-giai-chuyen-doi-so-xuat-sac-4593676.html"
                    className="font-bold text-lg hover:cursor-pointer text-blue-500 "
                  >
                    ĐH FPT nhận giải chuyển đổi số xuất sắc
                  </Link>
                </div>
                <div className="flex gap-3">
                  <span className="text-sm">{limitText(text1, 40)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </SwiperSlide>

        <SwiperSlide className="h-auto">
          <Card className="w-[100%] h-[490px] shadow-lg shadow-orange-300 hover:shadow-orange-500 duration-300 ease-in-out rounded-lg">
            <CardContent className="p-0">
              <div className="rounded-t-lg overflow-hidden">
                <img
                  className="object-cover w-full h-[200px]"
                  src="https://hcmuni.fpt.edu.vn/Data/Sites/1/media/z2021/minh-h%E1%BB%8Da/campus8-(1)-(1).jpg"
                  alt="FPT University"
                />
              </div>
              <div className="p-5 flex flex-col gap-4">
                <div className="flex gap-3">
                  <Link
                    to="https://hcmuni.fpt.edu.vn/4-tieu-chi-giup-dh-fpt-tro-thanh-truong-cong-nghe-dat-chuan-quoc-te"
                    className="font-bold text-lg hover:cursor-pointer text-blue-500 "
                  >
                    4 tiêu chí giúp ĐH FPT trở thành trường công nghệ đạt chuẩn quốc tế
                  </Link>
                </div>
                <div className="flex gap-3">
                  <span className="text-sm">{limitText(text2, 40)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </SwiperSlide>

        <SwiperSlide className="h-auto">
          <Card className="w-[100%] h-[490px] shadow-lg shadow-orange-300 hover:shadow-orange-500 duration-300 ease-in-out rounded-lg">
            <CardContent className="p-0">
              <div className="rounded-t-lg overflow-hidden">
                <img
                  className="object-cover w-full h-[200px]"
                  src="https://hcmuni.fpt.edu.vn/Data/Sites/1/media/201911-l%E1%BB%85-t%E1%BB%91t-nghi%E1%BB%87p-/dsc_6123.jpg"
                  alt="FPT University"
                />
              </div>
              <div className="p-5 flex flex-col gap-4">
                <div className="flex gap-3">
                  <Link
                    to="https://hcmuni.fpt.edu.vn/xa-hoi-hoa-giao-duc-dua-giao-duc-dao-tao-hoi-nhap-the-gioi"
                    className="font-bold text-lg hover:cursor-pointer text-blue-500 "
                  >
                    Xã hội hóa giáo dục: Đưa giáo dục đào tạo hội nhập thế giới
                  </Link>
                </div>
                <div className="flex gap-3">
                  <span className="text-sm">{limitText(text3, 40)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </SwiperSlide>

        <SwiperSlide className="h-auto">
          <Card className="w-[100%] h-[490px] shadow-lg shadow-orange-300 hover:shadow-orange-500 duration-300 ease-in-out rounded-lg">
            <CardContent className="p-0">
              <div className="rounded-t-lg overflow-hidden">
                <img
                  className="object-cover w-full h-[200px]"
                  src="https://hcmuni.fpt.edu.vn/Data/Sites/1/media/2019/dai_hoc_fpt_1.jpg"
                  alt="FPT University"
                />
              </div>
              <div className="p-5 flex flex-col gap-4">
                <div className="flex gap-3">
                  <Link
                    to="https://daihoc.fpt.edu.vn/dat-kiem-dinh-chat-luong-dai-hoc-fpt-duoc-tu-chu-trong-mo-nganh-va-lien-ket-dao-tao/"
                    className="font-bold text-lg hover:cursor-pointer text-blue-500 "
                  >
                    Đạt kiểm định chất lượng, Đại học FPT là trường đại học thứ 5 được chủ động mở ngành
                  </Link>
                </div>
                <div className="flex gap-3">
                  <span className="text-sm">{limitText(text4, 40)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </SwiperSlide>

        <SwiperSlide className="h-auto">
          <Card className="w-[100%] h-[490px] shadow-lg shadow-orange-300 hover:shadow-orange-500 duration-300 ease-in-out rounded-lg">
            <CardContent className="p-0">
              <div className="rounded-t-lg overflow-hidden">
                <img
                  className="object-cover w-full h-[200px]"
                  src="https://scontent.xx.fbcdn.net/v/t1.15752-9/462537134_1606223373631263_6013399984732306110_n.jpg?stp=dst-jpg_p206x206&_nc_cat=111&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeFzjfVCvSJgY2oroux2uSKNiQ7VGwJeuuiJDtUbAl666J9sqRBLAcnfZ674NZLgAVjRpVPHd_deFIhHjRrrQ7p0&_nc_ohc=Y0SNvVlrSYsQ7kNvgFOdCiP&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&_nc_gid=Axof8_lpTEu9gpRpbBOrJMq&oh=03_Q7cD1QFEuXVJXf98onWJre3j1MtZU0_jFKc_ErEK3YA3yflXRw&oe=673189DC"
                  alt="FPT University"
                />
              </div>
              <div className="p-5 flex flex-col gap-4">
                <div className="flex gap-3">
                  <Link
                    to="https://nguoidothi.net.vn/nhac-cu-dan-toc-tro-thanh-mon-hoc-bat-buoc-o-truong-dai-hoc-fpt-34585.html"
                    className="font-bold text-lg hover:cursor-pointer text-blue-500 "
                  >
                    Nhạc cụ dân tộc trở thành môn học bắt buộc ở trường đại học FPT
                  </Link>
                </div>
                <div className="flex gap-3">
                  <span className="text-sm">{limitText(text5, 40)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </SwiperSlide>

        <SwiperSlide className="h-auto">
          <Card className="w-[100%] h-[490px] shadow-lg shadow-orange-300 hover:shadow-orange-500 duration-300 ease-in-out rounded-lg">
            <CardContent className="p-0">
              <div className="rounded-t-lg overflow-hidden">
                <img
                  className="object-cover w-full h-[200px]"
                  src="https://hcmuni.fpt.edu.vn/Data/Sites/1/media/2019/fpt-edu-lien-tiep-gianh-2-giai-quoc-te-danh-cho-don-vi-giao-duc-co-tam-anh-huong-the-brand-laureate-2019-docx-1561713499149.jpeg"
                  alt="FPT University"
                />
              </div>
              <div className="p-5 flex flex-col gap-4">
                <div className="flex gap-3">
                  <Link
                    to="https://hcmuni.fpt.edu.vn/dai-hoc-fpt-tiep-tuc-duoc-vinh-danh-tai-giai-thuong-quoc-te-brandlaureate"
                    className="font-bold text-lg hover:cursor-pointer text-blue-500 "
                  >
                    Đại học FPT tiếp tục được vinh danh tại giải thưởng quốc tế BrandLaureate
                  </Link>
                </div>
                <div className="flex gap-3">
                  <span className="text-sm">{limitText(text6, 40)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
