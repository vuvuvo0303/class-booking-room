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
import { getAllRoomType } from "@/lib/api/room-type-api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Room } from "@/types/room";
import { updateRoom } from "@/lib/api/room-api";
import { toast } from "react-toastify";
import { Image } from "antd";
import uploadFile from "@/utils/upload";

const formSchema = z.object({
  roomName: z
    .string()
    .min(2, { message: "RoomName must be at least 2 characters." })
    .max(20, { message: "RoomName must not contain more than 20 characters." }),
  capacity: z.coerce
    .number({
      required_error: "Capacity is required.",
      invalid_type_error: "Capacity must be a number.",
    })
    .min(1, "Capacity must be at least 1."),
  roomTypeId: z.string({
    required_error: "Room Type is required.",
  }),
  status: z.string().nonempty({ message: "Status is required." }),
  picture: z.any().optional(),
});

const UpdateRoom = ({
  room,
  rerender,
}: {
  room: Room;
  rerender: () => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomName: room.roomName,
      status: room.status,
      capacity: room.capacity,
      roomTypeId: room.roomType.id + "",
      picture: null,
    },
  });

  const [dataRoomTypes, setDataRoomTypes] = useState<RoomTypes[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(room.picture || null); 

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
  }, [room]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const updateResult = await updateRoom(room.id, {
      ...values,
      roomTypeId: parseInt(values.roomTypeId),
    });
    if (updateResult.error) {
      toast.error(updateResult.error);
    } else {
      setTimeout(() => {
        rerender();
      }, 500);
    }
    let pictureUrl = room.picture; 
  

    if (values.picture && values.picture instanceof File) {
      try {
        pictureUrl = await uploadFile(values.picture);
        setImagePreview(pictureUrl); 
      } catch (error) {
        console.error("Error uploading file: ", error);
        return; 
      }
    }
  
    
    await updateRoom(room.id, {
      ...values,
      picture: pictureUrl, 
      roomTypeId: parseInt(values.roomTypeId)
    });
  
  
    setTimeout(() => {
      rerender();
    }, 500);
  }
  
  
  const handleImageChange = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl); 
      form.setValue("picture", file); 
    }
  };
  return (
    <DialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Update Room</DialogTitle>

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
                        {...field}
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
                      <Select
                        onValueChange={field.onChange}
                        value={field.value + ""}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Room Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {dataRoomTypes.map((roomType) => (
                            <SelectItem
                              key={roomType.id}
                              value={roomType.id + ""}
                            >
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
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                          <SelectItem value="Repairing">Repairing</SelectItem>
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
                name="picture"
                render={() => (
                  <FormItem>
                    <label>Upload Image</label>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e.target.files)}
                      />
                    </FormControl>
                    {imagePreview && (
                      <Image
                        src={imagePreview}
                        width={150}
                      />
                    )}
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </DialogDescription>
          </DialogHeader>

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

export default UpdateRoom;
