import useAuthStore from "@/store/AuthStore";
import { useNavigate } from "react-router-dom";
import anhtruong from "../../assets/anhtruong.jpeg";
import logofpt from "../../assets/logofpt.svg";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/api/auth-api";
import { useEffect } from "react";
import { toast } from "react-toastify";

const LoginAdmin = () => {
  const navigate = useNavigate();
  const loggedUser = useAuthStore((state) => state.user);

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
    };

    useEffect(() => {
      if (loggedUser && loggedUser.role === "Admin") {
        navigate("/admin");
      }
    }, [loggedUser]);

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
          <Button type="submit" className="w-full h-10 ">
            Submit
          </Button>
        </form>
      </Form>
    );
  }

  return (
    <div className="flex w-auto overflow-hidden md:p-10 justify-center">
      <div className="flex w-full md:w-[85%] bg-white drop-shadow-[0_0_10px_rgba(0,0,0,0.5)] rounded-xl overflow-hidden h-screen">
        <div className="bg-contain relative hidden md:block">
          <img src={anhtruong} alt="" width={650} className="h-full relative select-none" />
          <img src={logofpt} width={100} className="absolute top-5 left-5" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-orange-400 absolute top-[220px] left-20 text-5xl font-semibold">
            Welcome
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-500 absolute top-[280px] left-28">
            Log-in to Admin Page
          </span>
          <span className="absolute bottom-5 left-8 text-[18px] text-white">fu-booking-room.vercel.app</span>
        </div>
        <div className="flex-1 h-full py-14 overflow-auto px-10">
          <div className="flex justify-center h-20 items-end gap-1">
            <span className="text-6xl font-bold text-o">Login</span>
            <span className="text-o">for admin</span>
          </div>
          <div className="flex justify-center py-6">
            <span className="">"Ready for a global career"</span>
          </div>
          <div className="flex justify-center pt-20">
            <InputForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
