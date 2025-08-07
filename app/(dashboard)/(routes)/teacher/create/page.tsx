"use client";

import * as zod from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import error from "next/error";

const formschema = zod.object({
  title: zod.string().min(1, { message: "title is required" }),
});

const CreatePage = () => {
  const { user } = useUser();
  const router = useRouter();
  const form = useForm<zod.infer<typeof formschema>>({
    resolver: zodResolver(formschema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;
  console.log("User ID:", user?.id);

  const onSubmit = async (values: zod.infer<typeof formschema>) => {
    try {
        const response = await axios.post("/api/courses", values);
        router.push(`/teacher/courses/${response.data.id}`);

        toast.success("Course created successfully");
    } catch  {
        toast.error("something went wrong");       
    }
  };

  return <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
    <div>
        <h1 className="text-2xl">
            Judul Modul Anda
        </h1>
        <p className="text-sm text-slate-600">
            Modul apa yang ingin anda buat? judul dapat diganti nanti, jadi jangan khawatir.
        </p>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
                <FormField control={form.control} name="title" render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Nama Modul
                        </FormLabel>
                        <FormControl>
                            <Input disabled={isSubmitting} placeholder="contoh: 'Komposisi warna'" {...field}/>
                        </FormControl>
                        <FormDescription>
                            Apa yang ingin anda ajar di modul ini?
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}/>
                <div className="flex items-center gap-x-2">
                    <Link href="/teacher/courses">
                        <Button type="button" variant="ghost">Batal</Button>
                    </Link>
                    <Button type="submit" disabled={!isValid || isSubmitting}>Lanjut</Button>
                </div>
            </form>
        </Form>
    </div>
  </div>;
};

export default CreatePage;
