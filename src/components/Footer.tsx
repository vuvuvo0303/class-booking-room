import footerweb from "../assets/footer-background.svg";
import MaxWidthWrapper from "./MaxWidthWrapper";
const Footer = () => {
  return (
    <div>
      <div className="relative w-full pb-50 pt-12 border-y-0.5 border-black">
        <div className="flex justify-center pb-3">
          <img
          src="https://upload.wikimedia.org/wikipedia/vi/thumb/2/2d/Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_FPT.svg/1200px-Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_FPT.svg.png"
            width={200}
          />
        </div>
        <div className="flex flex-col items-center gap-3 mb-10">
            <span>Built by SWD392 team</span>
        </div>
        <MaxWidthWrapper className="grid grid-cols-12 pb-5">
          <div className="col-span-4">
            <div className="items-center flex justify-center mb-5">
              <span className="bg-blue-400 text-white py-2 w-[200px] text-center rounded-full ">Contact us</span>
            </div>
            <div>
              <div className="flex gap-5 justify-center">
                <img
                  src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Facebook_colored_svg_copy-256.png"
                  width={30}
                />
                <img
                  src="https://cdn4.iconfinder.com/data/icons/logos-brands-in-colors/2500/tiktok-icon-white-64.png"
                  width={30}
                />
                <img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-social-github-512.png" width={30} />
                <img
                  src="https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/112-gmail_email_mail-256.png"
                  width={30}
                />
              </div>
            </div>
          </div>
          <div className="col-span-8">
            <div className="flex justify-center">
              <span className="bg-blue-400  text-white py-2 w-[200px] text-center rounded-full">Information</span>
            </div>
            <div className="flex gap-3 pt-4">
              <div className="w-52 ">
                <span className="font-bold">Address:</span>
                <span>Lô E2a-7, Đường D1 Khu Công nghệ cao, P. Long Thạnh Mỹ, TP. Thủ Đức, TP. Hồ Chí Minh</span>
              </div>
              <div className="w-60">
                <span className="font-bold">Phone Number:</span>
                <span>028 7300 1866</span>
              </div>
              <div className="w-52">
                <span className="font-bold">Email:</span>
                <span>fubookingroomhcm@fpt.edu.vn</span>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
        <div className="absolute bottom-0 w-full -z-20">
          <img className=" w-full" src={footerweb} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
