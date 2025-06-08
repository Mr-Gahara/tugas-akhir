"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathName = usePathname();
  const router = useRouter();
  const isActive =
    (pathName === "/" && href === "/") ||
    pathName === href ||
    pathName?.startsWith(`${href}/`);
  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-sky-900 text-sm font-[500] pl-6 transition-all hover:bg-sky-600 hover:text-amber-100",
        isActive &&
          "text-sky-950 hover:text-amber-100 bg-sky-600 bg-opacity-20 hover:bg-sky-600 hover:bg-opacity-100"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            "text-sky-900 hover:text-amber-100",
            isActive && "text-sky-900 hover:text-amber-100"
          )}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-sky-700  h-14 transition-all",
          isActive && "opacity-100"
        )}
      ></div>
    </button>
  );
};
