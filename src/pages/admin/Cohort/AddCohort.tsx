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
import { createCohort } from "@/lib/api/cohort-api";

const formSchema = z.object({
  cohortCode: z
    .string()
    .min(2, {
      message: "Cohort code must be at least 2 characters.",
    })
    .max(10, {
      message: "Cohort code must not contain no more than 10 characters.",
    }),
});
const AddCohort = ({ rerender }: { rerender: () => void }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cohortCode: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createCohort(values);
    setTimeout(() => {
      rerender();
    }, 500);
  }
  return (
    <DialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create new cohort</DialogTitle>
            <DialogDescription asChild>
              <FormField
                control={form.control}
                name="cohortCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter cohort code" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </DialogDescription>
          </DialogHeader>
          <DialogDescription />
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

export default AddCohort;
