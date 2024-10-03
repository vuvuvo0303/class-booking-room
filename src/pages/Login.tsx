import { mockLogin } from "@/lib/api/mock-auth-api";
import useAuthStore from "@/store/AuthStore";
import { useNavigate } from "react-router-dom";
import background from "../assets/background.png";
import logofpt from "../assets/fptu_white_logo.png";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/api/auth-api";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const loggedUser = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const mockLoginAsManager = async () => {
    const { data } = await mockLogin("manager");
    localStorage.setItem("loggedUser", JSON.stringify(data));
    setUser(data);
    navigate("/manager");
  };

  const mockLoginAsAdmin = async () => {
    const { data } = await mockLogin("admin");
    localStorage.setItem("loggedUser", JSON.stringify(data));
    setUser(data);
    navigate("/admin");
  };

  // const logout = () => {
  //   localStorage.removeItem("accessToken");
  //   window.location.reload();
  // };

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
      },
    });

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
      const result = await login(data.email, data.password);
      if (result.error) {
        toast.error(result.error);
      } else {
        localStorage.setItem("accessToken", result.data);
        toast.success("Login Successfully")
      }
    };
    useEffect(() => {
      if (loggedUser) {
        if (loggedUser.role == "Admin") {
          navigate("/admin");
        } else if (loggedUser.role == "Manager") {
          navigate("/manager");
        }
      }
    }, []);

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
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
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormItem>
            <FormLabel>Campus</FormLabel>

            <div className="flex pb-5 ">
              {" "}
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Campus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Campus</SelectLabel>
                    <SelectItem value="HCM">Fu-Hồ Chí Minh</SelectItem>
                    <SelectItem value="HN">Fu-Hà Nội</SelectItem>
                    <SelectItem value="CT">Fu-Cần Thơ</SelectItem>
                    <SelectItem value="DN">Fu-Đà Nẵng</SelectItem>
                    <SelectItem value="QN">Fu-Quy Nhơn</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </FormItem> */}

          <Button type="submit" className="w-full h-10 ">
            Submit
          </Button>
        </form>
      </Form>
    );
  }

  return (
    <>
      <div className="flex w-auto overflow-hidden md:p-10 justify-center">
        {/* <Button onClick={mockLoginAsManager}>Mock Login as Manager</Button> */}
        {/* <Button onClick={mockLoginAsAdmin}>Mock Login as Admin</Button> */}
        <div className="flex w-full md:w-[85%] bg-white drop-shadow-[0_0_10px_rgba(0,0,0,0.5)] rounded-xl overflow-hidden h-screen">
          <div className="bg-contain relative hidden md:block">
            <img src={background} alt="" className="h-full relative select-none" />
            <img src={logofpt} width={100} className="absolute top-5 left-5" />
            <span className="text-white absolute top-[220px] left-24 text-5xl font-semibold">Welcome</span>
            <span className="text-white absolute top-[280px] left-56">Log-in to continue</span>
            <span className="absolute bottom-5 left-8  text-[18px] text-white">fu-booking-room.vercel.app</span>
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
            <div className="flex justify-center">
              <Button className="flex w-full bg-gray-50 hover:bg-gray-100 gap-9 drop-shadow-lg h-12 justify-between">
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
      <div className="bg-black flex justify-end gap-2 text-white">
        <button onClick={mockLoginAsAdmin}>Mock login as Admin</button>
        <span>|</span>
        <button onClick={mockLoginAsManager}>Mock login as Manager</button>
      </div>
    </>
  );
};

export default Login;
