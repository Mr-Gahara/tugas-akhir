import getChapter from "@/actions/get-chapter";
import Banner from "@/components/banner";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import VideoPlayer from "./_components/video-player";
import CourseEnrollButton from "./_components/course-enroll-button";
import { Separator } from "@/components/ui/separator";
import Preview from "@/components/preview";
import { File } from "lucide-react";
import { CourseProgressButton } from "./_components/course-progress-button";

type ChapterIdPageProps = {
  params: {
    courseId: string;
    chapterId: string;
  };
};

const ChapterIdPage = async ({ params }: ChapterIdPageProps) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/");
  }

  const {
    chapter,
    course,
    muxData,
    attachment = [],
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  if (!chapter || !course) {
    return redirect("/");
  }

  const isLocked = !chapter.isFree && !purchase;

  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner label="kamu telah menyelesaikan bab ini" variant="success" />
      )}
      {isLocked && (
        <Banner
          label="kamu harus membeli kursus ini untuk melihat bab ini"
          variant="warning"
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4 ">
          <VideoPlayer
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
            {purchase ? (
              <CourseProgressButton 
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              />
            )}
          </div>
          <Separator />
          <div>
            <Preview value={chapter.description!} />
            {!!attachment?.length && (
              <div>
                <Separator />
                <div className="p-4">
                  {attachment.map(
                    (attachment: {
                      id: string;
                      url?: string;
                      name?: string;
                    }) => (
                      <a
                        href={attachment.url || "#"}
                        key={attachment.id}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-3 w-full border text-sky-700 bg-sky-200 rounded-md hover:underline"
                      >
                        <File />
                        <p className="line-clamp-1">
                          {attachment.name || "Download Attachment"}
                        </p>
                      </a>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
