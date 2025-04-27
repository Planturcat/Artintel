"use client";

import HeroBackground from "@/components/backgrounds/HeroBackground";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArtintelHowItWorks } from "@/components/demo";
import { Metadata } from "next";


export default function DemoPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4">
      <HeroBackground />

      <div className="z-10 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-foreground to-neutral-500">
          Background Demo
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          This page demonstrates the HeroBackground component in isolation.
          The background combines elements from HeroPathEquilibrium and artintel-word-background,
          featuring a central orb with the Artintel logo and animated paths.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center flex-wrap">
          <Link href="/">
            <Button size="lg">Return to Home</Button>
          </Link>
          <Link href="/demo/svg-test">
            <Button size="lg" variant="outline">SVG Model Logo Test</Button>
          </Link>
          <Link href="/demo/model-selection">
            <Button size="lg" variant="outline">Model Selection Demo</Button>
          </Link>
          <Link href="/demo/artintel-how-it-works">
            <Button size="lg" variant="outline">Artintel How It Works</Button>
          </Link>
          <Link href="/demo/dashboards">
            <Button size="lg" variant="outline">Dashboard Components</Button>
          </Link>
          <Link href="/demo/svg-showcase">
            <Button size="lg" variant="outline">SVG Showcase</Button>
          </Link>
        </div>
      </div>

      <ArtintelHowItWorks />
    </div>
  );
}
