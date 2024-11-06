import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";
  import { deleteUser } from "@/lib/api/user-api";
  import { User } from "@/types/user";
  
  const DeleteStaff = ({
    user,
    rerender,
  }: {
    user: User;
    rerender: () => void;
  }) => {
    async function handleDelete() {
      await deleteUser(user.id);
      setTimeout(() => {
        rerender();
      }, 500);
    }
    return (
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {user.fullName}</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete and remove
            data from servers
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogDescription />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-red-500">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    );
  };
  
  export default DeleteStaff;
  