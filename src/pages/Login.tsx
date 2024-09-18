import { mockLogin } from "@/lib/api/mock-auth-api";
import useAuthStore from "@/store/AuthStore";
import { Link, useNavigate } from "react-router-dom";
import background from "../assets/background.png";
import logofpt from "../assets/logofpt.svg";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Lottie from "lottie-react";
import { toast } from "@/hooks/use-toast";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import wellcome from "../assets/wellcome.json";
const Login = () => {
  const navigate = useNavigate();
  const loggedUser = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  // const mockLoginAsManager = async () => {
  //   const { data } = await mockLogin("manager");
  //   localStorage.setItem("loggedUser", JSON.stringify(data));
  //   setUser(data);
  //   navigate("/manager");
  // };

  // const mockLoginAsAdmin = async () => {
  //   const { data } = await mockLogin("admin");
  //   localStorage.setItem("loggedUser", JSON.stringify(data));
  //   setUser(data);
  //   navigate("/admin");
  // };

  const logout = () => {
    localStorage.removeItem("loggedUser");
    window.location.reload();
  };

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

    function onSubmit(data: z.infer<typeof FormSchema>) {
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/2 space-y-6">
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
          <FormItem>
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
          </FormItem>

          <Button type="submit" className="w-full h-10 ">
            Submit
          </Button>
        </form>
      </Form>
    );
  }

  return (
    <div className="">
      <Link to={"/"}>{/* <Button>Home</Button> */}</Link>
      {!loggedUser && (
        <>
          {/* <Button onClick={mockLoginAsManager}>Mock Login as Manager</Button> */}
          {/* <Button onClick={mockLoginAsAdmin}>Mock Login as Admin</Button> */}

          <div className="flex w-auto h-screen overflow-hidden">
            <div className="h-full w-[600px] bg-contain ">
              <img src={background} alt="" className="h-full w-full relative" />

              <img src={logofpt} width={180} className="absolute top-5 left-5" />
              <span className="absolute bottom-5 left-8  text-[18px] bg-gradient-to-r from-blue-800 via-orange-700 to-green-500 bg-clip-text text-transparent ">fu-booking-room.vercel.app</span>
              <Lottie
                className="absolute top-44 left-40"
                animationData={wellcome}
                loop={true}
                style={{ height: "300px", width: "300px" }}
              />
            </div>
            <div className="   flex-1 h-full py-14 ">
              <div className="flex justify-center h-20 ">
                <span className="text-6xl font-bold bg-gradient-to-r from-blue-800 via-orange-700 to-green-500 bg-clip-text text-transparent">Login </span>
              </div>
              <div className="flex justify-center pb-4  ">
                <span className="bg-gradient-to-r from-orange-500 to-green-300 bg-clip-text text-transparent">
                "  Ready for a global career "
                </span>
              </div>
              <div className="flex justify-center ">
                <InputForm />
              </div>

              <div className="flex justify-center items-center py-6">
                <hr className="border-black w-1/4 border-t-1" />
                <span className="text-center mx-2">or</span>
                <hr className="border-black w-1/4 border-t-1" />
              </div>
              <div className="flex justify-center">
                <Button className="flex w-1/2 bg-gradient-to-r from-[#e2e8f0] to-[#f1f5f9] gap-9 drop-shadow-lg h-12 ">
                  <img
                    src="https://techdocs.akamai.com/identity-cloud/img/social-login/identity-providers/iconfinder-new-google-favicon-682665.png"
                    width={20}
                  />
                  <span className="text-black ">Login with Google</span>
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
      {loggedUser && <>{/* <Button onClick={logout}>Logout</Button> */}</>}
    </div>
  );
};

export default Login;
