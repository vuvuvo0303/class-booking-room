import useAuthStore from "@/store/AuthStore";
import { GetProps, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { verifyUser } from "@/lib/api/auth-api";
import { toast } from "react-toastify";
import useLoading from "@/hooks/use-loading";
import { Loader } from "lucide-react";
type OTPProps = GetProps<typeof Input.OTP>;

const VerifyPage = () => {
  const loggedUser = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const [error, setError] = useState<string | undefined>();
  const { isSubmitting, setIsSubmitting } = useLoading();
  const onChange: OTPProps["onChange"] = async (text) => {
    if (text.length == 6) {
      setIsSubmitting(true);
      const verifyResult = await verifyUser(loggedUser.id, '"' + text + '"');
      if (verifyResult.error) {
        setError("Invalid verification code");
      } else {
        toast.success("Verify account sussessfully.");
        setTimeout(() => {
          navigate("/")
          window.location.reload();
        }, 1000);
      }
      setIsSubmitting(false);
    }
  };
  const sharedProps: OTPProps = {
    onChange,
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate(0);
  };

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
            Our staff will send verification code to {loggedUser?.email} soon,
            please check your email to get the verification code
          </span>
          <Input.OTP
            formatter={(str) => str.toUpperCase()}
            className="w-full"
            {...sharedProps}
            disabled={isSubmitting}
          />
          <div className="flex justify-center">
            {isSubmitting && <Loader className="animate-spin" />}
          </div>
          <div className="text-red-500 text-center">{error}</div>
          <div className="flex flex-col md:flex-row gap-2 justify-center items-center">
            <span className="text-sm">
              Contact our support if you haven't Received verification code.
            </span>
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
