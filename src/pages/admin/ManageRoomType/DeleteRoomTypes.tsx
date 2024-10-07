import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";
import { deleteRoomType } from "@/lib/api/room-type-api";
import { RoomTypes } from "@/types/room-type";
  
  const DeleteRoomTypes = ({
    roomtype,
    rerender,
  }: {
    roomtype: RoomTypes;
    rerender: () => void;
  }) => {
    async function handleDelete() {
      await deleteRoomType(roomtype.id);
      setTimeout(() => {
          rerender();
      }, 500);
    }
    return (
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {roomtype.name}</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete and remove
            data from servers
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
  
  export default DeleteRoomTypes;
  