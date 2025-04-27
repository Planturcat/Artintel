"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SVGTestPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 bg-black">
      <div className="z-10 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-foreground to-neutral-500">
          SVG Model Logo Test
        </h1>

        <div className="flex flex-col items-center gap-8 mb-8">
          {/* Original SVG directly embedded */}
          <div className="p-6 bg-neutral-900 rounded-lg">
            <h2 className="text-xl font-medium mb-4">Direct SVG Embed</h2>
            <div className="w-24 h-24">
              <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Background container with rounded corners */}
                <path opacity="0.4"
                  d="M22 7.81V16.18C22 19.82 19.83 21.99 16.19 21.99H7.81C4.17 22 2 19.83 2 16.19V7.81C2 4.17 4.17 2 7.81 2H16.18C19.83 2 22 4.17 22 7.81Z"
                  fill="#00cbdd" />

                {/* Mask to keep logos within the rounded container */}
                <mask id="logoMask">
                  <rect x="2" y="2" width="20" height="20" fill="white" />
                </mask>

                {/* Marquee with 3 visible logos, middle one enlarged */}
                <g mask="url(#logoMask)">
                  {/* Animation container */}
                  <g id="marqueeContainer">
                    {/* Animation to move the logos */}
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      from="0,0"
                      to="-24,0"
                      dur="6s"
                      repeatCount="indefinite"
                      additive="sum" />

                    {/* Logo 1 (Llama) */}
                    <image href="/model/Llama.png" x="4" y="8" width="8" height="8" preserveAspectRatio="xMidYMid meet" />

                    {/* Logo 2 (DeepSeek) - Enlarged in middle position */}
                    <image href="/model/DeepSeek.png" x="16" y="4" width="16" height="16" preserveAspectRatio="xMidYMid meet" />

                    {/* Logo 3 (Falcon) */}
                    <image href="/model/Falcon.png" x="36" y="8" width="8" height="8" preserveAspectRatio="xMidYMid meet" />

                    {/* Logo 4 (GPT-J) */}
                    <image href="/model/gpt-j-6b.png" x="48" y="8" width="8" height="8" preserveAspectRatio="xMidYMid meet" />

                    {/* Logo 5 (Mistral) - Will move to middle position */}
                    <image href="/model/Mistral.png" x="60" y="8" width="8" height="8" preserveAspectRatio="xMidYMid meet" />

                    {/* Logo 6 (MPT) */}
                    <image href="/model/mpt-7b.png" x="72" y="8" width="8" height="8" preserveAspectRatio="xMidYMid meet" />

                    {/* Logo 7 (Phi) */}
                    <image href="/model/Phi.png" x="84" y="8" width="8" height="8" preserveAspectRatio="xMidYMid meet" />

                    {/* Logo 8 (Qwen) */}
                    <image href="/model/Qwen.png" x="96" y="8" width="8" height="8" preserveAspectRatio="xMidYMid meet" />

                    {/* Logo 9 (SantaCoder) */}
                    <image href="/model/SantaCoder.png" x="108" y="8" width="8" height="8" preserveAspectRatio="xMidYMid meet" />

                    {/* Repeat first logos to make the loop seamless */}
                    <image href="/model/Llama.png" x="120" y="8" width="8" height="8" preserveAspectRatio="xMidYMid meet" />
                    <image href="/model/DeepSeek.png" x="132" y="8" width="8" height="8" preserveAspectRatio="xMidYMid meet" />
                  </g>
                </g>
              </svg>
            </div>
          </div>

          {/* SVG from public directory */}
          <div className="p-6 bg-neutral-900 rounded-lg">
            <h2 className="text-xl font-medium mb-4">SVG from Public Directory</h2>
            <div className="w-24 h-24">
              <Image
                src="/icons/perk-one.svg"
                alt="Model Logo Marquee"
                width={96}
                height={96}
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Individual model logos for reference */}
          <div className="p-6 bg-neutral-900 rounded-lg">
            <h2 className="text-xl font-medium mb-4">Individual Model Logos</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center">
                <Image src="/model/Llama.png" alt="Llama" width={48} height={48} />
                <p className="text-xs mt-2">Llama</p>
              </div>
              <div className="flex flex-col items-center">
                <Image src="/model/DeepSeek.png" alt="DeepSeek" width={48} height={48} />
                <p className="text-xs mt-2">DeepSeek</p>
              </div>
              <div className="flex flex-col items-center">
                <Image src="/model/Falcon.png" alt="Falcon" width={48} height={48} />
                <p className="text-xs mt-2">Falcon</p>
              </div>
              <div className="flex flex-col items-center">
                <Image src="/model/gpt-j-6b.png" alt="GPT-J" width={48} height={48} />
                <p className="text-xs mt-2">GPT-J</p>
              </div>
              <div className="flex flex-col items-center">
                <Image src="/model/Mistral.png" alt="Mistral" width={48} height={48} />
                <p className="text-xs mt-2">Mistral</p>
              </div>
              <div className="flex flex-col items-center">
                <Image src="/model/mpt-7b.png" alt="MPT" width={48} height={48} />
                <p className="text-xs mt-2">MPT</p>
              </div>
              <div className="flex flex-col items-center">
                <Image src="/model/Phi.png" alt="Phi" width={48} height={48} />
                <p className="text-xs mt-2">Phi</p>
              </div>
              <div className="flex flex-col items-center">
                <Image src="/model/Qwen.png" alt="Qwen" width={48} height={48} />
                <p className="text-xs mt-2">Qwen</p>
              </div>
              <div className="flex flex-col items-center">
                <Image src="/model/SantaCoder.png" alt="SantaCoder" width={48} height={48} />
                <p className="text-xs mt-2">SantaCoder</p>
              </div>
            </div>
          </div>
        </div>

        <Link href="/demo">
          <Button size="lg">Return to Demo Home</Button>
        </Link>
      </div>
    </div>
  );
}
