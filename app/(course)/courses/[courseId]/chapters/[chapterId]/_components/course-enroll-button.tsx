"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";

interface CourseEnrollButtonProps {
  courseId: string;
  price: number;
}

const CourseEnrollButton = ({ courseId, price }: CourseEnrollButtonProps) => {
  return (
    <Button size="lg" className="w-full md:w-auto">
      Beli Sekarang ({formatPrice(price)})
    </Button>
  );
};

export default CourseEnrollButton;