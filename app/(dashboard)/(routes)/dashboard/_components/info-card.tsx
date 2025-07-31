import { IconBadge } from "@/components/icons-badge";
import { LucideIcon } from "lucide-react";

interface infoCardProps {
    numberOfItems: number;
    variant?: "default" | "success";
    label: string;
    icon: LucideIcon;
}

export const InfoCard = ({
    variant,
    icon: Icon,
    numberOfItems,
    label,
} : infoCardProps) => {
  return (
    <div className="border rounded-md flex items-center gap-x-2 p-3">
        <IconBadge
            variant={variant}
            icon={Icon}
        />
        <div>
            <p className="font-medium ">
                {label}
            </p>
            <p className="text-gray-500 text-sm">
                {numberOfItems} kursus
            </p>
        </div>
    </div>
  );
};
