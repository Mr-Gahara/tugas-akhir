import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new UploadThingError("Unauthorized");
  }
  return { userId };
};
export const ourFileRouter = {
  courseImage: f({ 
    image: { maxFileSize: "4MB", maxFileCount: 1 } 
  })
  .middleware(() => handleAuth())
  .onUploadComplete( async ({ file, metadata }) => {
    console.log("Upload complete for user:", metadata.userId, file.url);
    return { uploadedBy: metadata.userId, url: file.url };
  }),

  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),

  chapterVideo: f({
    video: {
      maxFileSize: "512GB",
      maxFileCount: 1,
    },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

