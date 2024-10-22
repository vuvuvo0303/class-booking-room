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
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
  import { Department } from "@/types/department";
  import { useEffect, useState } from "react";
  import { getAllDepartments } from "@/lib/api/department-api";
  import { createActivity } from "@/lib/api/activity-api";
  
  const formSchema = z.object({
    code: z
      .string()
      .min(2, {
        message: "Activity code must be at least 2 characters.",
      })
      .max(10, {
        message: "Activity code must not contain more than 10 characters.",
      }),
    name: z
      .string()
      .min(2, {
        message: "Name must be at least 2 characters.",
      })
      .max(50, {
        message: "Name must not contain more than 50 characters.",
      }),
    departmentId:z.string().nonempty({ message: "Room Type is required." }),
  });
  
  const AddActivity = ({ rerender }: { rerender: () => void }) => {
    const [dataDepartment, setDataDepartment] = useState<Department[]>([]);
  
    useEffect(() => {
      const fetchDataDepartment = async () => {
        const result = await getAllDepartments();
        if (result.error) {
          console.log(result.error);
        } else {
          setDataDepartment(result.data);
        }
      };
      fetchDataDepartment();
    }, []);
  
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        code: "",
        name: "",
        departmentId: "",
      },
    });
  
    async function onSubmit(values: z.infer<typeof formSchema>) {
      try {
        const ActivityValues = {
          code: values.code,
          name: values.name,
          departmentId: parseInt(values.departmentId),
        };
        await createActivity(ActivityValues);
        
    
  
        setTimeout(() => {
          rerender();
        }, 500);
        
      } catch (error) {
        console.error("Error creating activity: ", error);
      }
    }
  
    return (
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Create new Activity</DialogTitle>
              <DialogDescription asChild>
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <label>Activity code</label>
                      <FormControl>
                        <Input placeholder="Enter Activity code" {...field} />
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <label>Activity Name</label>
                      <FormControl>
                        <Input placeholder="Enter Activity Name" {...field} />
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
                  name="departmentId"
                  render={({ field }) => (
                    <FormItem>
                      <label>Department</label>
                      <FormControl>
                        <Select 
                          onValueChange={field.onChange} 
                          value={field.value }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Department" />
                          </SelectTrigger>
                          <SelectContent>
                            {dataDepartment.map((department) => (
                              <SelectItem key={department.id} value={department.id +""}>
                                {department.name}
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
  
  export default AddActivity;
  