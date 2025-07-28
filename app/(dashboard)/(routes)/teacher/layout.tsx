import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isTeacher } from "@/lib/teacher";

const TeacherLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = await auth();

  if (!isTeacher(userId)) {
    return redirect("/");
  }

  if (isTeacher(userId)) {
    return <>{children}</>;
  }
};

export default TeacherLayout;
