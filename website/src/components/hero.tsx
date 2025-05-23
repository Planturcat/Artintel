"use client";

import HeroBackground from "@/components/backgrounds/HeroBackground";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import StatsCard from "./ui/stats-card";
import { Users, Code, Server, Shield } from "lucide-react";
import Images from "./global/images";
import Marquee from "./ui/marquee";

export default function Hero() {
  const stats = [
    {
      value: "40+",
      label: "Models",
      icon: Code,
    },
    {
      value: "50+",
      label: "Languages",
      icon: Server,
    },
    {
      value: "1M+",
      label: "Inferences",
      icon: Users,
    },
    {
      value: "99.9%",
      label: "Uptime",
      icon: Shield,
    },
  ];

  const companies = [
    Images.company1,
    Images.company2,
    Images.company3,
    Images.company4,
    Images.company5,
    Images.company6,
  ];

  return (
    <div className="relative min-h-[90vh] sm:min-h-screen w-full flex flex-col items-center justify-start pt-12 sm:pt-16">
      <HeroBackground />

      <div className="z-10 text-center max-w-5xl mx-auto px-4 mt-24 sm:mt-32 md:mt-40 lg:mt-52">
        <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00CBDD] to-[#00CBDD] px-2 mx-auto w-full sm:w-fit sm:whitespace-nowrap">
          Discover.Fine-tune.Inference.Deploy.
        </h1>

        <p className="text-xl sm:text-2xl font-semibold mb-2">
          Open-source Language Models
        </p>

        <p className="text-base sm:text-lg text-muted-foreground mb-6 max-w-3xl mx-auto px-2">
          The complete no-code platform for language models. Go from idea to implementation in minutes, not months.
          No Machine Learning expertise required. Just pure innovation potential.
        </p>

        <Link href="/">
          <Button size="lg" className="mb-6 sm:mb-8 text-base bg-gradient-to-r from-[#00cbdd] to-[#00cbdd]/70 hover:from-[#00cbdd]/90 hover:to-[#00cbdd]/60 text-white border-none">
            Start free trial
          </Button>
        </Link>

        <div className="w-full mt-4">
          <StatsCard stats={stats} className="scale-[0.85] sm:scale-90 transform origin-top" />
        </div>
{/*
        <div className="mt-12">
          <p className="text-sm md:text-base text-muted-foreground mb-4">
            Trusted by Industry Leaders
          </p>
          <div className="w-full relative max-w-[calc(100vw-2rem)] lg:max-w-2xl mx-auto">
            <Marquee className="[--duration:40s] select-none [--gap:2rem]">
              {[...Array(10)].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center text-muted-foreground h-16"
                >
                  {companies[index % companies.length]({
                    className: "w-auto h-5",
                  })}
                </div>
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 -right-1 w-1/3 bg-gradient-to-l from-[#101010] z-40"></div>
            <div className="pointer-events-none absolute inset-y-0 -left-1 w-1/3 bg-gradient-to-r from-[#101010] z-40"></div>
          </div>
        </div>
*/}
      </div>
    </div>
  );
}
