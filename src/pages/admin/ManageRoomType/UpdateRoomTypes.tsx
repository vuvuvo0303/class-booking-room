import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
  } from "@/components/ui/form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { useForm } from "react-hook-form";
  import { z } from "zod";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
import { RoomTypes } from "@/types/room-type";
import { updateRoomType } from "@/lib/api/room-type-api";
  
  const formSchema = z.object({
    name: z
      .string()
      .min(2, {
        message: "Cohort code must be at least 2 characters.",
      })
      .max(10, {
        message: "Cohort code must not contain no more than 10 characters.",
      }),
  });
  const UpdateRoomTypes = ({
    roomtype,
    rerender,
  }: {
    roomtype: RoomTypes;
    rerender: () => void;
  }) => {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: roomtype.name,
      },
    });
    async function onSubmit(values: z.infer<typeof formSchema>) {
      await updateRoomType (roomtype.id, values);
      setTimeout(() => {
        rerender();
      }, 500);
    }
    return (
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Update cohort</DialogTitle>
              <DialogDescription asChild>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Enter Room Types" {...field} />
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
  
  export default UpdateRoomTypes;
  