import { cn } from "@/lib";
import React from "react";

interface BentoGridProps {
  className?: string;
  children: React.ReactNode;
}

export const BentoGrid = ({ className, children }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className,
      )}
      data-oid="t79phf4"
    >
      {children}
    </div>
  );
};

interface BentoGridItemProps {
  className?: string;
  title: string;
  description: string;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  children,
}: BentoGridItemProps) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-border/40",
        className,
      )}
      data-oid=":iiitjj"
    >
      {header}
      <div className="flex flex-col gap-2 h-full" data-oid="72jmk:n">
        <div className="flex items-center gap-2" data-oid="rplu6ve">
          {icon && (
            <div className="p-2 w-fit rounded-md" data-oid="tneumud">
              {icon}
            </div>
          )}
          <h3 className="font-semibold text-lg" data-oid="j80arfz">
            {title}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground" data-oid="aa5eyoz">
          {description}
        </p>
        {children}
      </div>
    </div>
  );
};
