import { GetProps, Input } from "antd";

type OTPProps = GetProps<typeof Input.OTP>;

const VerifyPage = () => {
  const onChange: OTPProps["onChange"] = (text) => {
    console.log("onChange:", text);
  };

  const sharedProps: OTPProps = {
    onChange,
  };
  return (
    <>
      <div className="flex justify-center px-4 md:px-0 py-20 md:py-40">
        <div className="flex flex-col gap-4 max-w-lg w-full">
        
          <div className="flex justify-center">
            <span className="text-xl md:text-2xl font-semibold">
              Enter Your OTP
            </span>
          </div>
         
          <span className="text-xs md:text-sm text-center">
            The OTP code is sent to your email, please check your email to get
            the OTP code
          </span>
        
          <Input.OTP
            formatter={(str) => str.toUpperCase()}
            className="w-full"
            {...sharedProps}
          />
         
          <div className="flex flex-col md:flex-row gap-2 justify-center items-center">
            <span className="text-sm">You Haven't Received OTP Code?</span>
            <span className="font-bold text-sm cursor-pointer hover:text-blue-500">
              Resend Code
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyPage;
