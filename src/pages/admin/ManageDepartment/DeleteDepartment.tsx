import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteDepartment } from "@/lib/api/department-api";
import { Department } from "@/types/department";

const DeleteDepartment = ({
  department,
  rerender,
}: {
  department: Department;
  rerender: () => void;
}) => {
  async function handleDelete() {
    await deleteDepartment(department.id);
    setTimeout(() => {
      rerender();
    }, 500);
  }
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete {department.name}</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure to delete this department?
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

export default DeleteDepartment;
