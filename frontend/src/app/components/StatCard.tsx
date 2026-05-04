import React from "react";
import { LucideIcon } from "lucide-react";

type StatCardProps = {
  icon: LucideIcon | React.ReactNode;
  value: number | string;
  label: string;
  iconColor?: string;
  className?: string;
};

export function StatCard({
  icon: Icon,
  value,
  label,
  iconColor = "#1351b4",
  className = "",
}: StatCardProps) {
  return (
    <div
      className={`bg-white shadow-[0px_1px_6px_0px_rgba(51,51,51,0.16)] p-[16px] rounded-lg ${className}`}
    >
      <div className="flex flex-col items-center gap-2">
        {typeof Icon === "function" ? (
          <Icon className="size-8" style={{ color: iconColor }} />
        ) : (
          <div style={{ color: iconColor }}>{Icon}</div>
        )}
        <p className="text-[24px] font-bold text-black">{value}</p>
        <p className="text-[12px] text-center text-black">{label}</p>
      </div>
    </div>
  );
}
