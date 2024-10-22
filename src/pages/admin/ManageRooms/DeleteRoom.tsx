import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";
import { deleteRoom } from "@/lib/api/room-api";
import { Room } from "@/types/room";
  const DeleteRoom = ({
    room,
    rerender,
  }: {
    room: Room;
    rerender: () => void;
  }) => {
    async function handleDelete() {
      await deleteRoom(room.id);
      setTimeout(() => {
          rerender();
      }, 500);
    }
    return (
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {room.roomName}</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure to delete this room?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogDescription />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-red-500">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    );
  };
  
  export default DeleteRoom;
  