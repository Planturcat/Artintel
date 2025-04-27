import React from "react";
import { cn } from "@/lib";

interface Props {
  className?: string;
  children: React.ReactNode;
}

const Wrapper = ({ children, className }: Props) => {
  return (
    <div
      className={cn("size-full mx-auto max-w-6xl px-4 md:px-12", className)}
      data-oid="yf5.1h_"
    >
      {children}
    </div>
  );
};

export default Wrapper;
