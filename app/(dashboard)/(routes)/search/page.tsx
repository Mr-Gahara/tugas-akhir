import { db } from "@/lib/db";
import Categories from "./_components/Categories";
import SearchInput from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CoursesList from "./_components/courses-list";

interface searchPageProps {
  searchParams: {
    title: string,
    categoryId: string,
  }
}

const SearchPage = async ({
  searchParams
}: searchPageProps) => {

  const { userId } = await auth();

  if (!userId) {
    return redirect("/")
  }
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourses({
    userId,
    ...searchParams
  });


  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        <CoursesList items={courses}/>
      </div>
    </>
  );
};

export default SearchPage;
