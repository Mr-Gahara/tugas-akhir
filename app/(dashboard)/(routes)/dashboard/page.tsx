import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CoursesList from "../search/_components/courses-list";
import { Clock } from "lucide-react";
import { InfoCard } from "./_components/info-card";

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    userId
  );

  return (
    <div className="p-6 space-y-4">
        
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard 
          icon={Clock}
          label="Sedang dikerjakan"
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard 
          icon={Clock}
          label="Sudah selesai"
          numberOfItems={completedCourses.length}
        />
      </div>
      <CoursesList
        items={[...coursesInProgress, ...completedCourses]}
      />
    </div>
  );
}
