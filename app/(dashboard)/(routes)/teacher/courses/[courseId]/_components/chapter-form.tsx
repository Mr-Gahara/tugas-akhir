"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Chapter, Course } from "@prisma/client";
import { Input } from "@/components/ui/input";
import ChaptersList from "./chapters-list";

interface ChapterFormProps {
  initialData: Course & { chapters: Chapter[] };
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(1),
});  

const ChapterForm = ({ initialData, courseId }: ChapterFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleCreating = () => {
    setIsCreating((current) => !current);
  };

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values);
      toast.success("Chapter created successfully");
      toggleCreating();
      router.refresh();
    } catch {
      toast.error("Error creating Chapter");
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
        list: updateData
      });
      toast.success("Bab diurutkan dengan sukses");
      router.refresh();
    } catch {
      toast.error("Error mengurutkan bab");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    router.push(`/teacher/courses/${courseId}/chapters/${id}`);
  };

  // Safe access to chapters array
  const chapters = initialData?.chapters || [];

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-sky-700"></div>
        </div>
      )}
      <div className="font-bold flex items-center justify-between">
        Bab modul
        <Button onClick={toggleCreating} variant="ghost" className="font-bold">
          {isCreating ? (
            <>Batal</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Tambah Bab
            </>
          )}
        </Button>
      </div>

      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction to the course'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={!isValid || isSubmitting}>
              Tambah
            </Button>
          </form>
        </Form>
      )}
      
      {!isCreating && (
        <div className="text-sm mt-2">
          {chapters.length === 0 && (
            <p className="text-slate-500 italic">
              Belum ada bab. Klik "Tambah Bab" untuk membuat bab baru.
            </p>
          )}
          {chapters.length > 0 && (
            <ChaptersList 
              onEdit={onEdit}
              onReorder={onReorder}
              items={chapters}
            />
          )}
        </div>
      )}
      
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          tarik dan lepas untuk mengurutkan bab. Klik pada judul bab untuk mengedit.
        </p>
      )}
    </div>
  );
};

export default ChapterForm;