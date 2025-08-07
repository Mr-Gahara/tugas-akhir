"use client";

import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Course } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";
import { useForm } from "react-hook-form"; // Added import
import { zodResolver } from "@hookform/resolvers/zod"; // Added import

// FIXED: Simplified props interface
interface ImageFormProps {
  initialData: Course; // Removed unnecessary nesting
  courseId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // Added loading state
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: initialData.imageUrl || "", // Fixed: removed nesting
    },
  });

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsUploading(true);
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Gambar kursus diperbarui dengan sukses");
      router.refresh();
    } catch (error) {
      toast.error("Gagal memperbarui gambar kursus");
      console.error("Image update error:", error);
    } finally {
      setIsUploading(false);
      setIsEditing(false);
    }
  };
  
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-bold flex items-center justify-between">
        Gambar Modul
        <Button 
          onClick={toggleEdit} 
          variant="ghost" 
          className="font-bold"
          disabled={isUploading}
        >
          {isEditing ? (
            "Batal"
          ) : initialData.imageUrl ? (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Gambar
            </>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              tambah gambar
            </>
          )}
        </Button>
      </div>
      
      {!isEditing ? (
        !initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              src={initialData.imageUrl}
              alt="Course image"
              fill
              className="rounded-md object-cover"
            />
          </div>
        )
      ) : (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                form.setValue("imageUrl", url);
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Disarankan menggunakan aspek rasio 16:9 
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageForm;