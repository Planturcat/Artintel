import { cn } from "@/lib";
import { ReactNode } from "react";

interface MaxWidthWrapperProps {
  className?: string;
  children: ReactNode;
}

const MaxWidthWrapper = ({ className, children }: MaxWidthWrapperProps) => {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-screen-xl px-4 md:px-8 lg:px-12",
        className,
      )}
      data-oid=".zzluv-"
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
