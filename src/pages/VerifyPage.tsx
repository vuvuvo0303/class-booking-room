import useAuthStore from "@/store/AuthStore";
import { GetProps, Input } from "antd";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { sendVerifycationEmail, verifyUser } from "@/lib/api/auth-api";
import { toast } from "react-toastify";
import useLoading from "@/hooks/use-loading";
import { Loader } from "lucide-react";
type OTPProps = GetProps<typeof Input.OTP>;

const VerifyPage = () => {
  const loggedUser = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const [error, setError] = useState<string | undefined>();
  const { isLoading, setIsLoading, isSubmitting, setIsSubmitting } =
    useLoading();
  const isSentVerification = Cookies.get("sent_verification") != null;
  const onChange: OTPProps["onChange"] = async (text) => {
    if (text.length == 6) {
      setIsSubmitting(true);
      const verifyResult = await verifyUser(loggedUser.id, "\"" + text + "\"");
      if (verifyResult.error) {
        setError("Invalid OTP");
      } else {
        toast.success("Verify account sussessfully.");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
      setIsSubmitting(false);
    }
  };
  const sharedProps: OTPProps = {
    onChange,
  };

  const handleResend = async () => {
    setIsLoading(true);
    const emailResult = await sendVerifycationEmail(loggedUser.id);
    if (emailResult.error) {
      toast.error(emailResult.error);
    } else {
      toast.success("New verification email sent successfully.");
    }
    setIsLoading(false);
  };
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate(0);
  };
  useEffect(() => {
    const sendEmail = async () => {
      if (!isSentVerification) {
        Cookies.set("sent_verification", new Date().toISOString(), {
          expires: 1 / 8,
        });
        const emailResult = await sendVerifycationEmail(loggedUser.id);
        if (emailResult.error) {
          toast.error(emailResult.error);
        }
      }
    };
    sendEmail();
  }, []);

  useEffect(() => {
    if (!loggedUser || loggedUser.isVerify) {
      navigate("/");
    }
  }, [loggedUser]);

  return (
    <div className="flex flex-col justify-between items-center">
      <div className="flex justify-center px-4 md:px-0 py-20 md:py-40">
        <div className="flex flex-col gap-4 max-w-lg w-full">
          <div className="flex justify-center">
            <span className="text-xl md:text-2xl font-semibold">
              Your account is not verified yet!
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
            disabled={isSubmitting}
          />
          {isSubmitting && <Loader className="animate-spin" />}
          <div className="text-red-500 text-center">{error}</div>
          <div className="flex flex-col md:flex-row gap-2 justify-center items-center">
            <span className="text-sm">You Haven't Received OTP Code?</span>
            <span
              className="font-bold text-sm cursor-pointer hover:text-blue-500"
              onClick={handleResend}
            >
              Resend Code
            </span>
            {isLoading && <Loader className="animate-spin" />}
          </div>
        </div>
      </div>
      <div
        className="underline text-blue-500 cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </div>
    </div>
  );
};

export default VerifyPage;
