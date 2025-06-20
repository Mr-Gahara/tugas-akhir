"use client";

import toast from "react-hot-toast";
import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        if (res && res.length > 0 && res[0].url) {
          onChange(res[0].url);
        }
      }}
      onUploadError={(error: Error) => {
        toast.error(`ERROR! ${error?.message}`);
      }}
      config={{
        mode: "auto",
      }}
    />
  );
};