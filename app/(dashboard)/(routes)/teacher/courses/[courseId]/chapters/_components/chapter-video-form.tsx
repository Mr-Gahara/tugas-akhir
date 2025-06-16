"use client";

import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Pencil, PlusCircle, VideoIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import MuxPlayer from "@mux/mux-player-react";
import { Chapter, MuxData } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";
import { useForm } from "react-hook-form"; // Added import
import { zodResolver } from "@hookform/resolvers/zod"; // Added import

// FIXED: Simplified props interface
interface ChapterVideoFormProps {
  initialData: Chapter & { muxData?: MuxData | null }; // Removed unnecessary nesting
  courseId: string;
  chapterId: string; // Added chapterId for clarity
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

const ChapterVideoForm = ({ initialData, courseId, chapterId }: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // Added loading state
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoUrl: initialData.videoUrl || "",
    },
  });

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsUploading(true);
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
      toast.success("chapter video updated successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to update video chapter");
      console.error("chapter video update error:", error);
    } finally {
      setIsUploading(false);
      setIsEditing(false);
    }
  };
  
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-bold flex items-center justify-between">
        Chapter video
        <Button 
          onClick={toggleEdit} 
          variant="ghost" 
          className="font-bold"
          disabled={isUploading} // Disable while uploading
        >
          {isEditing ? (
            "Cancel"
          ) : initialData.videoUrl ? (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit video
            </>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a video
            </>
          )}
        </Button>
      </div>
      
      {!isEditing ? (
        !initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <VideoIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <MuxPlayer
              playbackId={initialData?.muxData?.playbackId || ""}
            />
          </div>
        )
      ) : (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                form.setValue("videoUrl", url);
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            upload a video file here.
          </div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          video can take a few minutes to process before it is available for playback.
        </div>
      )}
    </div>
  );
};

export default ChapterVideoForm;