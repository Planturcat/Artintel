import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="container relative min-h-screen flex items-center justify-center mx-auto w-full"
      data-oid="gv4tida"
    >
      <div className="lg:p-8 mx-auto w-full max-w-sm" data-oid="5y:wi1_">
        <Link href="/" className="absolute top-4 left-4" data-oid=":3otrz5">
          <Button size="sm" variant="outline" data-oid="rhdb_ih">
            <ArrowLeftIcon className="size-4 mr-1" data-oid=".a_x5dx" />
            Home
          </Button>
        </Link>
        {children}
      </div>
    </div>
  );
}
