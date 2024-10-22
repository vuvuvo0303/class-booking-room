import { Button } from "@/components/ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useLoading from "@/hooks/use-loading";
import { createDepartment } from "@/lib/api/department-api";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Department name must be at least 2 characters.",
    })
    .max(50, {
      message: "Department name must not contain more than 10 characters.",
    }),
});

const AddNewDepartment = ({ rerender }: { rerender: () => void }) => {
  const { isSubmitting, setIsSubmitting } = useLoading();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const createResult = await createDepartment({ name: values.name });
    if (createResult.error) {
      toast.error(createResult.error);
    } else {
      setTimeout(() => {
        rerender();
      }, 500);
    }
    setIsSubmitting(false);
  }
  return (
    <DialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create new department</DialogTitle>

            <DialogDescription asChild>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <label>Department name</label>
                    <FormControl>
                      <Input placeholder="Enter Department name" {...field} />
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
              <Button type="submit">
                {isSubmitting ? <LoaderIcon className="animate-spin"/> : "Create"}
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default AddNewDepartment;
