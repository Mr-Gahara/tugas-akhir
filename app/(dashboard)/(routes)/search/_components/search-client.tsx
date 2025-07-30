"use client";

import { Suspense } from "react";
import { Category, Course } from "@prisma/client";
import Categories from "./Categories";
import SearchInput from "@/components/search-input";
import CoursesList from "./courses-list";

// Define the types needed for the props
type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

interface SearchClientProps {
  categories: Category[];
  courses: CourseWithProgressWithCategory[];
}

// This is your new client component that handles all UI
export const SearchClient = ({ categories, courses }: SearchClientProps) => {
  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <Suspense fallback={null}>
          <SearchInput />
        </Suspense>
      </div>
      <div className="p-6 space-y-4">
        <Suspense fallback={<div>Memuat kategori...</div>}>
          <Categories items={categories} />
        </Suspense>
        <Suspense fallback={<div>Memuat kursus...</div>}>
          <CoursesList items={courses} />
        </Suspense>
      </div>
    </>
  );
};