import { db } from "@/lib/db";
import { Course, Purchase } from "@prisma/client";

type PurchaseWithCourse = Purchase & {
    Course: Course;
}

const groupByCourse = (purchases: PurchaseWithCourse[]) => {
    const grouped: { [courseTitle: string]: number } = {};
    purchases.forEach((purchase) => {
        const courseTitle = purchase.Course.title;
        if (!grouped[courseTitle]) {
            grouped[courseTitle] = 0;
        }
        grouped[courseTitle] += purchase.Course.price!;
    });

    return grouped;
};

export const getAnalytics = async (userId: string) => {
    try {
        const purchases = await db.purchase.findMany({
            where: {
                course: {
                    userId: userId,
                }
            },
            include: {
                course: true,
            }
        });

        // Map 'course' to 'Course' to match PurchaseWithCourse type
        const purchasesWithCourse: PurchaseWithCourse[] = purchases.map(p => ({
            ...p,
            Course: p.course
        }));

        const groupedEarnings = groupByCourse(purchasesWithCourse);
        const data = Object.entries(groupedEarnings).map(([courseTitle, total]) => ({
            name: courseTitle,
            total: total,
        }));

        const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);

        const totalSales = purchasesWithCourse.length;

        return {
            data,
            totalRevenue,
            totalSales,
        };
    } catch (error) {
        console.log("Error fetching analytics:", error);
        return {
            data: [],
            totalRevenue: 0,
            totalSales: 0,
        }
    }
}