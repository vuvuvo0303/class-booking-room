import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { useForm } from "react-hook-form";
  import { z } from "zod";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { Activity } from "@/types/department";
  import { updateActivity } from "@/lib/api/activity-api";
  const formSchema = z.object({
    code: z
      .string()
      .min(2, {
        message: "Activity code must be at least 2 characters.",
      })
      .max(10, {
        message: "Activity code must not contain more than 10 characters.",
      }),
    name: z
      .string()
      .min(2, {
        message: "Name must be at least 2 characters.",
      })
      .max(50, {
        message: "Name must not contain more than 50 characters.",
      }),
  });
  const UpdateActivity = ({ activity, rerender }: { activity: Activity; rerender: () => void }) => {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        code:activity.code,
        name: activity.name,
      },
    });
    async function onSubmit(values: z.infer<typeof formSchema>) {
      await updateActivity(activity.id, values);
      setTimeout(() => {
        rerender();
      }, 500);
    }
    return (
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Update Activity</DialogTitle>
              <DialogDescription asChild>
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <label>Activity code</label>
                      <FormControl>
                        <Input placeholder="Enter Activity code" {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </DialogDescription>
              <DialogDescription asChild>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <label>Activity Name</label>
                      <FormControl>
                        <Input placeholder="Enter Activity Name" {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </DialogDescription>
            </DialogHeader>
            <DialogDescription />
            <DialogFooter>
              <DialogClose>
                <Button type="submit">Update</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    );
  };
  export default UpdateActivity;
