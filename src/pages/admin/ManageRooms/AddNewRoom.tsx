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
import { createRoom } from "@/lib/api/room-api";
import { useEffect, useState } from "react";
import { getAllRoomType } from "@/lib/api/room-type-api";
import { RoomTypes } from "@/types/room-type";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  roomName: z
    .string()
    .min(2, {
      message: "RoomName must be at least 2 characters.",
    })
    .max(10, {
      message: "RoomName must not contain more than 10 characters.",
    }),
  capacity: z
    .number({
      required_error: "Capacity is required.",
      invalid_type_error: "Capacity must be a number.",
    })
    .min(1, "Capacity must be at least 1."),
  roomTypeId: z.string().nonempty({ message: "Room Type is required." }),
  status: z.string().nonempty({ message: "Room Type is required." }),
});

const AddNewRoom = ({ rerender }: { rerender: () => void }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomName: "",
      status: "Active",
      capacity: undefined,
      roomTypeId: "",
    },
  });

  const [dataRoomTypes, setDataRoomTypes] = useState<RoomTypes[]>([]);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      const result = await getAllRoomType();
      if (result.error) {
        console.error(result.error);
      } else {
        setDataRoomTypes(result.data);
      }
    };
    fetchRoomTypes();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createRoom(values);
    setTimeout(() => {
      rerender();
    }, 500);
  }

  return (
    <DialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create new room</DialogTitle>

            <DialogDescription asChild>
              <FormField
                control={form.control}
                name="roomName"
                render={({ field }) => (
                  <FormItem>
                    <label>Room Name</label>
                    <FormControl>
                      <Input placeholder="Enter Room Name" {...field} />
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
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <label>Capacity</label>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter Capacity"
                        onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                      />
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
                name="roomTypeId"
                render={({ field }) => (
                  <FormItem>
                    <label>Room Type</label>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Room Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {dataRoomTypes.map((roomType) => (
                            <SelectItem key={roomType.id} value={roomType.id + ""}>
                              {roomType.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <label>Status</label>
                    <FormControl>
                      <Input placeholder="Enter Status" defaultValue="Active" {...field} disabled/>
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose>
              <Button type="submit">Create</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default AddNewRoom;
