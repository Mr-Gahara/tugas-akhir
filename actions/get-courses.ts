import { Category, Course } from "@prisma/client";
import { getProgress } from "./get-progress";
import { db } from "@/lib/db";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapter: { id: string }[];
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
  // TODO: implement function logic here
  try {
    const courses = await db.course.findMany({
      where: {
        isPublised: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
        Chapters: {
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
        createdAt: "desc"
      }
    });
  } catch (error) {
    console.log("[ERROR_GET_COURSES]: ", error);
    return [];
  }
};
