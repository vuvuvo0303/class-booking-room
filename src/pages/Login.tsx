import useAuthStore from "@/store/AuthStore";
import { useNavigate } from "react-router-dom";
import background from "../assets/background.png";
import logofpt from "../assets/fptu_white_logo.png";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auth, googleProvider } from "@/config/firebase";
import { signInWithPopup } from "firebase/auth";
import { Loader } from "lucide-react";
import { loginGoogle } from "@/lib/api/auth-api";

const Login = () => {
  const navigate = useNavigate();
  const loggedUser = useAuthStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginGoogle = async () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        handleGoogleLogin("Student", (result.user as any).accessToken);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleGoogleLogin = async (role: string, accessToken: string) => {
    setIsLoading(true);
    const result = await loginGoogle(role, accessToken);
    if (result.error) {
      toast.error(result.error, { toastId: "loginErrorToast" });
    } else {
      localStorage.setItem("accessToken", result.data);
      toast.success("Login Successfully");
      setTimeout(() => {
        navigate(0);
      }, 500);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (loggedUser) {
      if (loggedUser.role === "Manager") {
        navigate("/manager");
      } else if (loggedUser.role === "Student") {
        navigate("/");
      }
    }
  }, [loggedUser]);

  return (
    <>
      <div className="flex w-auto overflow-hidden md:p-10 justify-center">
        <div className="flex w-full md:w-[85%] bg-white drop-shadow-[0_0_10px_rgba(0,0,0,0.5)] rounded-xl overflow-hidden h-screen">
          <div className="bg-contain relative hidden md:block">
            <img src={background} alt="" className="h-full relative select-none" />
            <img src={logofpt} width={100} className="absolute top-5 left-5" />
            <span className="text-white absolute top-[220px] left-24 text-5xl font-semibold">Welcome</span>
            <span className="text-white absolute top-[280px] left-56">Log-in to continue</span>
            <span
              className="cursor-pointer absolute bottom-5 left-8 text-[18px] text-white"
              onClick={() => navigate("/")}
            >
              fu-booking-room.vercel.app
            </span>
          </div>
          <div className="flex-1 h-full py-14 overflow-auto px-10">
            <div className="flex justify-center h-20">
              <span className="text-6xl font-bold text-o">Login</span>
            </div>
            <div className="flex justify-center pb-4">
              <span className="">"Ready for a global career"</span>
            </div>
            <div className="flex flex-col items-center justify-center pt-40 gap-4">
              <div className="flex items-center gap-4">
              <hr className="border-gray-500 w-1/2 border-t-1" />
                <span className="px-4 text-gray-700 w-[430px]">Login for Student & Staff</span>
                <hr className="border-gray-500 w-1/2 border-t-1" />
              </div>

              <Button
                className="flex w-[400px] bg-gray-50 hover:bg-gray-100 gap-9 drop-shadow-lg h-12 "
                onClick={handleLoginGoogle}
                disabled={isLoading}
              >
                <img
                  src="https://techdocs.akamai.com/identity-cloud/img/social-login/identity-providers/iconfinder-new-google-favicon-682665.png"
                  width={20}
                />
                <span className="text-black">Login with Google Account</span>
                {isLoading && <Loader className="animate-spin" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
