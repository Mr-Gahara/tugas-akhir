import { db } from "@/lib/db";

export const getProgress = async (
  userId: string,
  courseId: string
): Promise<number> => {
  try {
    const publishedChapter = await db.chapter.findMany({
      where: {
        courseId: courseId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    });

    const publishedChapterIds = publishedChapter.map((chapter) => chapter.id);
    
    const validCompletedChapters = await db.userProgress.count({
      where: {
        userId: userId,
        chapterId: {
          in: publishedChapterIds,
        },
        isCompleted: true,
      },
    });

    const progressPrecentage = (validCompletedChapters / publishedChapterIds.length) * 100;

    return progressPrecentage;
  } catch (error) {
    console.log("[ERROR_GET_PROGRESS]: ", error);
    return 0;
  }
};
