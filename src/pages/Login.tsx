import useAuthStore from "@/store/AuthStore";
import { useNavigate } from "react-router-dom";
import background from "../assets/background.png";
import logofpt from "../assets/fptu_white_logo.png";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login, loginGoogle } from "@/lib/api/auth-api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auth, googleProvider } from "@/config/firebase";
import { signInWithPopup } from "firebase/auth";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"; // import Select từ Shadcn
import { Loader } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const loggedUser = useAuthStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("Student");

  const FormSchema = z.object({
    email: z.string().min(2, {
      message: "Email must be at least 2 characters.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  });

  function InputForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    });

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
      setIsLoading(true);
      const result = await login(data.email, data.password);
      if (result.error) {
        toast.error(result.error);
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
        if (loggedUser.role == "Admin") {
          navigate("/admin");
        } else if (loggedUser.role == "Manager") {
          navigate("/manager");
        } else if (loggedUser.role == "Student") {
          navigate("/");
        }
      }
    }, []);

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} className="w-[400px]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    {...field}
                    className="w-[400px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full h-10" disabled={isLoading}>
            {
              isLoading ? <Loader className="animate-spin"/> : "Login"
            }
          </Button>
        </form>
      </Form>
    );
  }
  const handleLoginGoogle = async () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // console.log(credential);
        // console.log(result);
        handleGoogleLogin(role, (result.user as any).accessToken);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleGoogleLogin = async (role: string, accessToken: string) => {
    setIsLoading(true);
    const result = await loginGoogle(role, accessToken);
    if (result.error) {
      toast.error("Login failed");
    } else {
      localStorage.setItem("accessToken", result.data);
      toast.success("Login Successfully");
      setTimeout(() => {
        navigate(0);
      }, 500);
    }
    setIsLoading(false);
  };
  return (
    <>
      <div className="flex w-auto overflow-hidden md:p-10 justify-center">
        {/* <Button onClick={mockLoginAsManager}>Mock Login as Manager</Button> */}
        {/* <Button onClick={mockLoginAsAdmin}>Mock Login as Admin</Button> */}
        <div className="flex w-full md:w-[85%] bg-white drop-shadow-[0_0_10px_rgba(0,0,0,0.5)] rounded-xl overflow-hidden h-screen">
          <div className="bg-contain relative hidden md:block">
            <img
              src={background}
              alt=""
              className="h-full relative select-none"
            />
            <img src={logofpt} width={100} className="absolute top-5 left-5" />
            <span className="text-white absolute top-[220px] left-24 text-5xl font-semibold">
              Welcome
            </span>
            <span className="text-white absolute top-[280px] left-56">
              Log-in to continue
            </span>
            <span className="absolute bottom-5 left-8  text-[18px] text-white">
              fu-booking-room.vercel.app
            </span>
          </div>
          <div className="flex-1 h-full py-14 overflow-auto px-10">
            <div className="flex justify-center h-20 ">
              <span className="text-6xl font-bold text-o">Login</span>
            </div>
            <div className="flex justify-center pb-4  ">
              <span className="">"Ready for a global career"</span>
            </div>
            <div className="flex justify-center ">
              <InputForm />
            </div>
            <div className="flex justify-center items-center py-6">
              <hr className="border-gray-500 w-1/4 border-t-1" />
              <span className="text-gray-500 text-center mx-2">or</span>
              <hr className="border-gray-500 w-1/4 border-t-1" />
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <p className="font-semibold">Login as</p>
              <Select
                onValueChange={(value) => {
                  setRole(value);
                }}
                defaultValue={"Student"}
              >
                <SelectTrigger className="w-[150px]">{role}</SelectTrigger>
                <SelectContent>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Student">Student</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center">
              <Button
                className="flex w-[400px] bg-gray-50 hover:bg-gray-100 gap-9 drop-shadow-lg h-12 justify-between"
                onClick={handleLoginGoogle}
                disabled={isLoading}
              >
                <img
                  src="https://techdocs.akamai.com/identity-cloud/img/social-login/identity-providers/iconfinder-new-google-favicon-682665.png"
                  width={20}
                />
                <span className="text-black ">Login with Google Account</span>
                <span></span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
