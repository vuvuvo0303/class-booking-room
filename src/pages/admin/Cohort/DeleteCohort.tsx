import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteCohort } from "@/lib/api/cohort-api";
import { Cohort } from "@/types/cohort";

const DeleteCohort = ({
  cohort,
  rerender,
}: {
  cohort: Cohort;
  rerender: () => void;
}) => {
  async function handleDelete() {
    await deleteCohort(cohort.id);
    setTimeout(() => {
        rerender();
    }, 500);
  }
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete {cohort.cohortCode}</AlertDialogTitle>
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

export default DeleteCohort;
