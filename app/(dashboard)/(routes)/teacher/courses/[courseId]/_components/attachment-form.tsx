"use client";

import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { File, Loader2, PlusCircle, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";
import { useForm } from "react-hook-form"; 
import { zodResolver } from "@hookform/resolvers/zod"; 

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] } 
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

const AttachmentForm = ({ initialData, courseId }: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false); 
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: initialData.imageUrl || "",
    },
  });

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsUploading(true);
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Course updated successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to update Course");
      console.error("Course update error:", error);
    } finally {
      setIsUploading(false);
      setIsEditing(false);
    }
  };

  const onDelete = async (id: string) => {
    try {
      console.log("Deleting attachment with ID:", id);
      console.log("Course ID:", courseId);
      console.log("Full URL:", `/api/courses/${courseId}/attachments/${id}`);
      setDeletingId(id);
      // Fixed: Use attachmentId parameter name to match your route
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Attachment deleted successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete attachment");
      console.error("Delete attachment error:", error); // Added error logging
    } finally {
      setDeletingId(null);
    }
  }
  
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-bold flex items-center justify-between">
        Course Attachments
        <Button 
          onClick={toggleEdit} 
          variant="ghost" 
          className="font-bold"
          disabled={isUploading}
        >
          {isEditing && "Cancel"}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a file
            </>
          )}
        </Button>
      </div>
      
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No attachments available. Click "Add a file" to upload.
            </p>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div key={attachment.id} className="flex items-center w-full p-3 bg-sky-100 border-sky-200 border text-sky-700 rounded-md">
                  <File className="h-4 w-4 mr-2 flex-shrink-0"/>
                  <p className="text-xs line-clamp truncate">
                    {attachment.name}
                  </p>
                  {deletingId === attachment.id && (
                    <div className="ml-auto">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <button 
                      onClick={() => onDelete(attachment.id)} 
                      className="ml-auto hover:opacity-75 transition"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <>
          <FileUpload 
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add anything that students need to complete the course.
          </div>
        </>
      )}
    </div>
  );
};

export default AttachmentForm;