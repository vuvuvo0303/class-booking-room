import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";
import { deleteReport } from "@/lib/api/report-api";
import { Report } from "@/types/report";
  
  const DeleteReport = ({
    report,
    rerender,
  }: {
    report: Report;
    rerender: () => void;
  }) => {
    async function handleDelete() {
      await deleteReport(report.id);
      setTimeout(() => {
          rerender();
      }, 500);
    }
    return (
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {report.id}</AlertDialogTitle>
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
  
  export default DeleteReport;
  