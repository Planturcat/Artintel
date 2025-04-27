import { cn } from "@/lib";
import { LucideIcon } from "lucide-react";

interface StatItemProps {
  value: string;
  label: string;
  icon?: LucideIcon;
  className?: string;
}

export const StatItem = ({
  value,
  label,
  icon: Icon,
  className,
}: StatItemProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-3 rounded-lg bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/50",
        className
      )}
    >
      {Icon && <Icon className="w-4 h-4 mb-1 text-primary" />}
      <span className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500">
        {value}
      </span>
      <span className="text-xs text-muted-foreground mt-0.5 text-center">
        {label}
      </span>
    </div>
  );
};

interface StatsCardProps {
  className?: string;
  stats: {
    value: string;
    label: string;
    icon?: LucideIcon;
  }[];
}

const StatsCard = ({ className, stats }: StatsCardProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-4 gap-2 w-full max-w-3xl mx-auto",
        className
      )}
    >
      {stats.map((stat, index) => (
        <StatItem
          key={index}
          value={stat.value}
          label={stat.label}
          icon={stat.icon}
        />
      ))}
    </div>
  );
};

export default StatsCard;
