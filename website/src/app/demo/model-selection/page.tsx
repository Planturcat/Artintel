"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import ModelSelection from "@/components/model-selection";

export default function ModelSelectionDemo() {
  return (
    <div className="relative min-h-screen w-full flex flex-col bg-black">
      <div className="flex-1">
        <ModelSelection />
      </div>

      <div className="py-8 flex justify-center">
        <Link href="/demo">
          <Button size="lg">Return to Demo Home</Button>
        </Link>
      </div>
    </div>
  );
}
