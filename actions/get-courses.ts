import { Category, Course } from "@prisma/client";
import { getProgress } from "./get-progress";
import { db } from "@/lib/db";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

type GetCourses = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export const getCourses = async ({
  userId,
  title,
  categoryId,
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublised: true, // As per your instruction
        title: {
          contains: title,
          mode: "insensitive",
        },
        categoryId,
      },
      include: {
        category: true,
        Chapters: { // As per your instruction
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purchases: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const coursesWithProgress = await Promise.all(
      courses.map(async (course) => {
        const progressPercentage =
          course.purchases.length > 0
            ? await getProgress(userId, course.id)
            : null;
        const { Chapters, ...reformattedCourse } = course;

        return {
          ...reformattedCourse,
          chapters: Chapters,
          progress: progressPercentage,
        };
      })
    );

    return coursesWithProgress;

  } catch (error) {
    console.log("[ERROR_GET_COURSES]: ", error);
    return [];
  }
};