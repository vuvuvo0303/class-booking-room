import footerweb from "../assets/footerweb.png";

const Footer = () => {
  return (
    <>
      <div className="relative w-full pb-50 pt-1 border-y-0.5 border-black">
        <div className="flex justify-center ">
          <img src="https://vietnamteachingjobs.com/wp-content/uploads/wpjobboard/company/2392/company-logo/img-logo-fe.png" width={200} />
        </div>
        <div className="flex flex-col items-center  gap-3">
          <span>The website was built by a team of FPTU HCM students with the subject SWD392</span>
        </div>

        <div className="flex justify-around px-10 py-5">
          <div>
            <div className="bg-blue-400 text-white py-2 px-5 rounded-full items-center flex justify-center">
              <span>Contact Us</span>
            </div>
            <div>
              <div className="flex gap-6 pt-4">
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
          <div>
            <div className="flex justify-center">
              <span className="bg-blue-400  text-white py-2 px-12 rounded-full">Information</span>
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
        </div>

        <div className="absolute bottom-0 w-full -z-20">
          <img className=" w-full" src={footerweb} alt="" />
        </div>
      </div>
    </>
  );
};

export default Footer;
