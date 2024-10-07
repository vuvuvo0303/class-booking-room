import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { createRoomType } from "@/lib/api/room-type-api";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Room Types name must be at least 2 characters.",
    })
    .max(10, {
      message: "Room Types name must not contain more than 10 characters.",
    }),

});

const AddRoomTypes = ({ rerender }: { rerender: () => void }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });


  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createRoomType(values);
    setTimeout(() => {
      rerender();
    }, 500);
  }

  return (
    <DialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create new Room Types</DialogTitle>

            <DialogDescription asChild>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Type Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter room type name" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </DialogDescription>

            
          </DialogHeader>
          <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default AddRoomTypes;
