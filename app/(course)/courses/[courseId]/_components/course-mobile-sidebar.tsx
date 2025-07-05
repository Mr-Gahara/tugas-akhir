import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
  import { Chapter, Course, UserProgress } from "@prisma/client";
  import { Menu } from "lucide-react";
  import CourseSideBar from "./course-sidebar";
  
  // 👇 CHANGE #1: Correct the interface to expect "Chapters" (capital C)
  interface CourseMobileSideBarProps {
    course: Course & {
      Chapters: (Chapter & {
        userProgress: UserProgress[] | null;
      })[];
    };
    progressCount: number;
  }
  
  const CourseMobileSideBar = ({
    course,
    progressCount,
  }: CourseMobileSideBarProps) => {
  
    const courseWithChapters = {
      ...course,
      chapters: course.Chapters,
    };
  
    return (
      <Sheet>
        <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
          <Menu />
        </SheetTrigger>
        <SheetContent className="p-0 bg-white w-72" side="left">
          <SheetHeader>
            <SheetTitle className="sr-only">Course Menu</SheetTitle>
          </SheetHeader>
          <CourseSideBar
            course={courseWithChapters} 
            progressCount={progressCount}
          />
        </SheetContent>
      </Sheet>
    );
  };
  
  export default CourseMobileSideBar;