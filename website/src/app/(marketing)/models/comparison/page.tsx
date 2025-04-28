"use client";

import React, { useEffect, useRef, useState } from "react";
import MaxWidthWrapper from "@/components/global/max-width-wrapper";
import AnimationContainer from "@/components/global/animation-container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BrainCircuit,
  Cpu,
  BarChart,
  Zap,
  Rocket,
  Clock,
  HardDrive,
  Server,
  CircleDollarSign,
  Star,
  Award,
  ArrowRight,
  Scale,
  CheckIcon,
  XIcon,
  AlertCircle,
  LineChart,
  Search,
  Code,
  Languages,
  Network,
  Pen,
  FileText,
  CheckCircle,
  Brain,
  Smartphone,
  Laptop,
} from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib";
import styles from "@/styles/terms-animations.module.css";
import { Wrapper } from "@/components";

// Model Type Card Component
const ModelTypeCard = ({
  icon: Icon,
  title,
  description,
  features,
  recommendation,
  className,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  recommendation: string;
  className?: string;
}) => {
  return (
    <Card
      className={cn(
        "bg-card/50 border border-border/80 h-full shadow-sm transition-all hover:shadow-md",
        className,
      )}
      data-oid="ei0n1.q"
    >
      <CardHeader className="pb-2" data-oid="71-3ij9">
        <div className="flex items-center gap-3" data-oid="r93en-e">
          <div className="p-2 rounded-xl bg-primary/10" data-oid="7e1rjx4">
            <Icon className="h-8 w-8 text-primary" data-oid="igk_i47" />
          </div>
          <div data-oid="kmi6v_q">
            <CardTitle className="text-2xl" data-oid="oxxhvv6">
              {title}
            </CardTitle>
            <CardDescription className="text-sm" data-oid="n4fmb1r">
              {recommendation}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4" data-oid="4f_g_hn">
        <p className="text-muted-foreground" data-oid="hl38ww0">
          {description}
        </p>
        <div className="space-y-2" data-oid="s-3619n">
          <p className="font-medium" data-oid="doqt4-v">
            Key features:
          </p>
          <ul className="space-y-1" data-oid="zdi7j22">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-muted-foreground"
                data-oid="yp8w77u"
              >
                <CheckIcon
                  className="h-4 w-4 text-primary mt-0.5 flex-shrink-0"
                  data-oid="nru4gxw"
                />

                <span data-oid="c__e:f:">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

// Custom ComparisonHero component
const ComparisonHero = () => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle mouse movement to update slider position
    const handleMouseMove = (e: MouseEvent) => {
    if (!isSliding || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const newPosition = Math.max(30, Math.min(70, (x / rect.width) * 100));
    setSliderPosition(newPosition);
  };

  // State to track if user is dragging the slider
  const [isSliding, setIsSliding] = useState<boolean>(false);

  // Add event listeners for mouse up/down
  useEffect(() => {
    const handleMouseUp = () => {
      setIsSliding(false);
    };
    
    if (isSliding) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isSliding]);

  // Handle model type toggle for interactive comparison
  const handleModelTypeToggle = (type: "slm" | "llm") => {
    setSliderPosition(type === "slm" ? 30 : 70);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-background/90 py-20 md:py-24">
      {/* Split background effect - distinctive to comparison page */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-primary/5 blur-3xl opacity-30" 
             style={{ right: `${100 - sliderPosition}%` }}></div>
        <div className="absolute inset-y-0 right-0 w-1/2 bg-primary/10 blur-3xl opacity-40" 
             style={{ left: `${sliderPosition}%` }}></div>
      </div>

      {/* Combined visual elements from both SLM and LLM pages */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* SLM-style lightning elements on left side */}
        <div className="absolute inset-y-0 left-0 opacity-10" style={{ width: `${sliderPosition}%` }}>
          <svg width="100%" height="100%" className="absolute inset-0">
            <pattern id="lightning-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M40,20 L30,50 L45,55 L25,80" stroke="#00CBDD" strokeWidth="2" fill="none" />
              <path d="M70,10 L60,40 L75,45 L55,90" stroke="#00CBDD" strokeWidth="2" fill="none" />
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#lightning-pattern)" />
          </svg>
        </div>

        {/* LLM-style node connections on right side */}
        <div className="absolute inset-y-0 right-0 opacity-10" style={{ width: `${100 - sliderPosition}%` }}>
          <svg width="100%" height="100%" viewBox="0 0 500 500" className="absolute inset-0">
            <g className="nodes">
        {Array.from({ length: 12 }).map((_, i) => (
                <circle 
            key={i}
                  r="4" 
                  cx={100 + Math.random() * 300} 
                  cy={50 + Math.random() * 400}
                  fill="#00CBDD" 
          />
        ))}
            </g>
            <g className="links">
              {Array.from({ length: 20 }).map((_, i) => (
                <line 
                  key={i} 
                  x1={100 + Math.random() * 300} 
                  y1={50 + Math.random() * 400}
                  x2={100 + Math.random() * 300} 
                  y2={50 + Math.random() * 400}
                  stroke="#00CBDD" 
                  strokeOpacity="0.3" 
                  strokeWidth="1"
                />
              ))}
            </g>
          </svg>
        </div>
      </div>

      {/* Dividing line with interactive handle */}
      <div
        ref={containerRef}
        className="absolute inset-0 z-10 pointer-events-none"
      >
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-primary/30 pointer-events-auto cursor-col-resize"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={() => setIsSliding(true)}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shadow-lg">
            <div className="w-5 h-5 rounded-full bg-primary/50 animate-pulse"></div>
          </div>
        </div>
      </div>

      <Wrapper className="relative z-20">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div>
            <div className="mb-3 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary">
              <Scale className="mr-1 h-3 w-3" />
              <span>Model Comparison</span>
      </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-4">
              <span className="text-primary">Choose</span> the{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Right Model</span>
          </h1>

            <p className="text-lg text-muted-foreground mb-6">
              Compare Small Language Models (SLMs) and Large Language Models (LLMs) to find the perfect balance of performance, efficiency, and capabilities for your specific needs.
            </p>

            <div className="mb-8 flex gap-4">
              <button
                onClick={() => handleModelTypeToggle("slm")}
                className={`relative rounded-lg border p-4 transition-all duration-300 flex-1 ${sliderPosition <= 50 ? 'border-primary bg-primary/10' : 'border-primary/20 bg-card/30'}`}
              >
                <div className="flex items-center mb-1">
                  <Zap className="mr-2 h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Small Language Models</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Efficient & fast for specific tasks
                </p>
                {sliderPosition <= 50 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full" />
                )}
              </button>
              
              <button
                onClick={() => handleModelTypeToggle("llm")}
                className={`relative rounded-lg border p-4 transition-all duration-300 flex-1 ${sliderPosition > 50 ? 'border-primary bg-primary/10' : 'border-primary/20 bg-card/30'}`}
              >
                <div className="flex items-center mb-1">
                  <Brain className="mr-2 h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Large Language Models</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Powerful & versatile for complex tasks
                </p>
                {sliderPosition > 50 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full" />
                )}
              </button>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full">
                <Link href="#features">
                  Compare Features
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full"
              >
                <Link href="#guide">
                  Decision Guide
                </Link>
              </Button>
          </div>
        </div>

          <div className="hidden md:block relative">
            {/* Interactive model comparison visualization */}
            <div className="relative flex items-center justify-center h-96">
              <div className="absolute inset-0 flex">
                {/* SLM side */}
                <div 
                  className="h-full bg-primary/5 border-r border-primary/20 flex items-center justify-center overflow-hidden transition-all duration-300"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <div className="relative transform scale-90 transition-all duration-300" style={{ opacity: sliderPosition > 30 ? 1 : 0.7 }}>
                    <div className="p-4 rounded-lg bg-card/50 border border-primary/20 shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 rounded-md bg-primary/10">
                          <Zap className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium">Small Language Model</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Size:</span>
                          <span>2.5 GB</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Speed:</span>
                          <span>15ms</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Memory:</span>
                          <span>4 GB RAM</span>
                        </div>
                      </div>
                      <div className="mt-3 text-xs text-muted-foreground">
                        Ideal for: Classification, NER, Text embeddings
                      </div>
          </div>

                    {/* Small devices using SLM */}
                    <div className="absolute -top-6 -left-6 w-12 h-20 bg-card/50 border border-primary/20 rounded-md shadow-sm flex flex-col items-center justify-center">
                      <Smartphone className="h-3 w-3 text-primary mb-1" />
                      <div className="h-0.5 w-5 bg-green-400 rounded-full"></div>
                      <div className="text-[5px] mt-0.5">Mobile</div>
                    </div>
                    <div className="absolute -bottom-8 -left-12 w-10 h-10 bg-card/50 border border-primary/20 rounded-md shadow-sm flex flex-col items-center justify-center">
                      <Laptop className="h-2 w-2 text-primary mb-0.5" />
                      <div className="h-0.5 w-4 bg-green-400 rounded-full"></div>
                      <div className="text-[4px]">Edge</div>
                    </div>
                  </div>
                </div>
                
                {/* LLM side */}
                <div 
                  className="h-full bg-primary/10 flex items-center justify-center overflow-hidden transition-all duration-300"
                  style={{ width: `${100 - sliderPosition}%` }}
                >
                  <div className="relative transform scale-90 transition-all duration-300" style={{ opacity: sliderPosition < 70 ? 1 : 0.7 }}>
                    <div className="p-4 rounded-lg bg-card/50 border border-primary/20 shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 rounded-md bg-primary/10">
                          <Brain className="h-4 w-4 text-primary" />
          </div>
                        <span className="font-medium">Large Language Model</span>
        </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Size:</span>
                          <span>140 GB</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Speed:</span>
                          <span>500ms</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Memory:</span>
                          <span>80 GB RAM</span>
                        </div>
                      </div>
                      <div className="mt-3 text-xs text-muted-foreground">
                        Ideal for: Reasoning, generation, complex tasks
                      </div>
                    </div>
                    
                    {/* Datacenter using LLM */}
                    <div className="absolute -top-8 -right-8 w-14 h-14 bg-card/50 border border-primary/20 rounded-md shadow-sm flex flex-col items-center justify-center">
                      <Server className="h-3 w-3 text-primary mb-1" />
                      <div className="h-0.5 w-6 bg-amber-400 rounded-full"></div>
                      <div className="text-[5px] mt-0.5">Data Center</div>
                    </div>
                    <div className="absolute -bottom-7 -right-10 w-12 h-12 bg-card/50 border border-primary/20 rounded-md shadow-sm flex flex-col items-center justify-center">
                      <HardDrive className="h-2.5 w-2.5 text-primary mb-0.5" />
                      <div className="h-0.5 w-5 bg-amber-400 rounded-full"></div>
                      <div className="text-[5px]">GPU Cluster</div>
                    </div>
                  </div>
                </div>
              </div>
                
              {/* Comparison metrics that appear at the bottom */}
              <div className="absolute bottom-0 left-0 right-0 bg-card/60 backdrop-blur-sm border-t border-primary/10 p-2 flex justify-between text-xs">
                <div className="flex flex-col items-center">
                  <span className="text-muted-foreground">Memory</span>
                  <div className="w-24 h-1.5 bg-gray-200 rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-green-400 rounded-full" style={{ width: `${sliderPosition}%` }}></div>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-muted-foreground">Speed</span>
                  <div className="w-24 h-1.5 bg-gray-200 rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-green-400 rounded-full" style={{ width: `${sliderPosition}%` }}></div>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-muted-foreground">Capability</span>
                  <div className="w-24 h-1.5 bg-gray-200 rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: `${100 - sliderPosition}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

// Feature comparison component
const FeatureComparison = () => {
  return (
    <div className="py-12" data-oid="-34sgvw">
      <MaxWidthWrapper data-oid="a0n0np4">
        <AnimationContainer data-oid="frg0:u2">
          <h2
            className="text-3xl font-bold text-center mb-2"
            data-oid="y2kazi9"
          >
            Feature Comparison
          </h2>
          <p
            className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto"
            data-oid="6et_17j"
          >
            Explore the key differences between Small and Large Language Models
            across various dimensions
          </p>

          <div className="relative overflow-hidden" data-oid="ydk81jt">
            <div
              className="rounded-lg border border-border/70 overflow-hidden bg-card/30"
              data-oid="::he4mf"
            >
              <Table data-oid="uttn39u">
                <TableHeader data-oid="b6q.w6x">
                  <TableRow className="bg-muted/50" data-oid="fdc0mzq">
                    <TableHead className="w-[250px]" data-oid="gkbwaez">
                      Feature
                    </TableHead>
                    <TableHead data-oid=":jupu28">
                      Small Language Models
                    </TableHead>
                    <TableHead data-oid="23wf:kc">
                      Large Language Models
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody data-oid="18a9loz">
                  <TableRow data-oid="jd2tnr6">
                    <TableCell className="font-medium" data-oid="rj26u.j">
                      <div
                        className="flex items-center gap-2"
                        data-oid="i6qr94."
                      >
                        <HardDrive
                          className="h-4 w-4 text-primary"
                          data-oid="_2sf1rv"
                        />

                        <span data-oid="di73ehv">Parameter Count</span>
                      </div>
                    </TableCell>
                    <TableCell data-oid="kq1:i-.">
                      Few million to ~3 billion parameters
                    </TableCell>
                    <TableCell data-oid="wzfti88">
                      Several billion to hundreds of billions of parameters
                    </TableCell>
                  </TableRow>
                  <TableRow data-oid="3kivelv">
                    <TableCell className="font-medium" data-oid="bnch82h">
                      <div
                        className="flex items-center gap-2"
                        data-oid="tqbwtct"
                      >
                        <Server
                          className="h-4 w-4 text-primary"
                          data-oid="m1zzsfk"
                        />

                        <span data-oid="ulipujc">Hardware Requirements</span>
                      </div>
                    </TableCell>
                    <TableCell data-oid="ulxlkol">
                      <div
                        className="flex items-center gap-1"
                        data-oid="1x_jg2s"
                      >
                        <Badge
                          variant="outline"
                          className="bg-green-500/10 text-green-500 border-green-500/20"
                          data-oid="a271wvq"
                        >
                          Low
                        </Badge>
                        <span
                          className="text-sm text-muted-foreground"
                          data-oid="_jisfmc"
                        >
                          Can run on CPUs or single consumer GPUs
                        </span>
                      </div>
                    </TableCell>
                    <TableCell data-oid="cp7o1qc">
                      <div
                        className="flex items-center gap-1"
                        data-oid="d1i3eop"
                      >
                        <Badge
                          variant="outline"
                          className="bg-amber-500/10 text-amber-500 border-amber-500/20"
                          data-oid="49wv_f4"
                        >
                          High
                        </Badge>
                        <span
                          className="text-sm text-muted-foreground"
                          data-oid="skanh4c"
                        >
                          Multiple high-end GPUs or specialized hardware
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow data-oid="6qptv2e">
                    <TableCell className="font-medium" data-oid="4g.jfs2">
                      <div
                        className="flex items-center gap-2"
                        data-oid=":bq1tu."
                      >
                        <Clock
                          className="h-4 w-4 text-primary"
                          data-oid="ejs3fak"
                        />

                        <span data-oid="frzm8ex">Inference Speed</span>
                      </div>
                    </TableCell>
                    <TableCell data-oid="wlqdadr">
                      <div
                        className="flex items-center gap-1"
                        data-oid="ywkoc8f"
                      >
                        <Badge
                          variant="outline"
                          className="bg-green-500/10 text-green-500 border-green-500/20"
                          data-oid="cy3gpb3"
                        >
                          Fast
                        </Badge>
                        <span
                          className="text-sm text-muted-foreground"
                          data-oid="hgqywt_"
                        >
                          Typically sub-100ms latency
                        </span>
                      </div>
                    </TableCell>
                    <TableCell data-oid="kzk522t">
                      <div
                        className="flex items-center gap-1"
                        data-oid="tnek.jl"
                      >
                        <Badge
                          variant="outline"
                          className="bg-amber-500/10 text-amber-500 border-amber-500/20"
                          data-oid="xvpj-_z"
                        >
                          Slower
                        </Badge>
                        <span
                          className="text-sm text-muted-foreground"
                          data-oid="1qkanf9"
                        >
                          300ms-2s or more depending on length
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow data-oid="dcl53ge">
                    <TableCell className="font-medium" data-oid="zmhbsal">
                      <div
                        className="flex items-center gap-2"
                        data-oid="3rf3-mb"
                      >
                        <CircleDollarSign
                          className="h-4 w-4 text-primary"
                          data-oid="9n5mj3h"
                        />

                        <span data-oid="6yv.q7_">Cost Efficiency</span>
                      </div>
                    </TableCell>
                    <TableCell data-oid="gxj_c2a">
                      <div
                        className="flex items-center gap-1"
                        data-oid=".njp78."
                      >
                        <Badge
                          variant="outline"
                          className="bg-green-500/10 text-green-500 border-green-500/20"
                          data-oid="pfq6a7x"
                        >
                          Cost-Effective
                        </Badge>
                        <span
                          className="text-sm text-muted-foreground"
                          data-oid="62p98ps"
                        >
                          Lower compute and hosting costs
                        </span>
                      </div>
                    </TableCell>
                    <TableCell data-oid=".ltxpty">
                      <div
                        className="flex items-center gap-1"
                        data-oid="ct3aawd"
                      >
                        <Badge
                          variant="outline"
                          className="bg-amber-500/10 text-amber-500 border-amber-500/20"
                          data-oid="_o0ugar"
                        >
                          Expensive
                        </Badge>
                        <span
                          className="text-sm text-muted-foreground"
                          data-oid="fwfj6-y"
                        >
                          Higher operational costs for training and inference
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow data-oid="1qcw1bm">
                    <TableCell className="font-medium" data-oid=".uvc81k">
                      <div
                        className="flex items-center gap-2"
                        data-oid="dsfq2m1"
                      >
                        <Search
                          className="h-4 w-4 text-primary"
                          data-oid="ioks5a9"
                        />

                        <span data-oid="c3q4zgz">Context Window</span>
                      </div>
                    </TableCell>
                    <TableCell data-oid="5sax-u6">
                      Shorter (typically 512-2048 tokens)
                    </TableCell>
                    <TableCell data-oid="98d5m5f">
                      Longer (4K-100K+ tokens depending on model)
                    </TableCell>
                  </TableRow>
                  <TableRow data-oid="r-813w8">
                    <TableCell className="font-medium" data-oid="e_-fkvn">
                      <div
                        className="flex items-center gap-2"
                        data-oid=".t9w6n."
                      >
                        <Star
                          className="h-4 w-4 text-primary"
                          data-oid="ij55lso"
                        />

                        <span data-oid="f_83gb9">Capabilities</span>
                      </div>
                    </TableCell>
                    <TableCell data-oid="de_-g7f">
                      Classification, basic Q&A, specific domain tasks
                    </TableCell>
                    <TableCell data-oid="9yq-6w3">
                      Complex reasoning, creative generation, broad knowledge
                    </TableCell>
                  </TableRow>
                  <TableRow data-oid="szyhwln">
                    <TableCell className="font-medium" data-oid="mk4ei_3">
                      <div
                        className="flex items-center gap-2"
                        data-oid="3kb3.5l"
                      >
                        <Award
                          className="h-4 w-4 text-primary"
                          data-oid="pmend22"
                        />

                        <span data-oid="wapowmk">Ideal Use Cases</span>
                      </div>
                    </TableCell>
                    <TableCell data-oid="._s.mc1">
                      Edge deployments, specific enterprise tasks, real-time
                      applications
                    </TableCell>
                    <TableCell data-oid="du0ujws">
                      Advanced chatbots, content creation, research assistants,
                      complex analytics
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </AnimationContainer>
      </MaxWidthWrapper>
    </div>
  );
};

// Use Case Section
const UseCaseSection = () => {
  return (
    <div className="py-16 bg-muted/30" data-oid="sg1bf24">
      <MaxWidthWrapper data-oid="a_jorie">
        <AnimationContainer data-oid="tlr9:jy">
          <h2
            className="text-3xl font-bold text-center mb-2"
            data-oid="-g6fjyh"
          >
            Recommended Use Cases
          </h2>
          <p
            className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
            data-oid="cn5n906"
          >
            Choosing the right model type depends on your specific needs and
            constraints
          </p>

          <Tabs
            defaultValue="slm"
            className="max-w-4xl mx-auto"
            data-oid="3h54_hq"
          >
            <TabsList
              className="grid w-full grid-cols-2 mb-8"
              data-oid="gs2d259"
            >
              <TabsTrigger
                value="slm"
                className="text-base gap-2"
                data-oid="f225m74"
              >
                <Cpu className="h-4 w-4" data-oid="qebh6kv" />
                <span data-oid="0at-.ip">SLM Use Cases</span>
              </TabsTrigger>
              <TabsTrigger
                value="llm"
                className="text-base gap-2"
                data-oid="_e5yktt"
              >
                <BrainCircuit className="h-4 w-4" data-oid="5f5v8no" />
                <span data-oid="gnax3d-">LLM Use Cases</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="slm" className="space-y-6" data-oid="8lv9gnn">
              <div className="grid md:grid-cols-2 gap-6" data-oid="08bq7_8">
                <Card
                  className="bg-card/50 border border-border/80"
                  data-oid="05si143"
                >
                  <CardHeader className="pb-2" data-oid="w:19.1o">
                    <div className="flex items-center gap-2" data-oid="3u99y_7">
                      <div
                        className="p-2 rounded-lg bg-primary/10"
                        data-oid="z_urq-w"
                      >
                        <BarChart
                          className="h-5 w-5 text-primary"
                          data-oid="-ba.075"
                        />
                      </div>
                      <CardTitle data-oid="g5c863q">
                        Text Classification
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent data-oid="wpqg.c9">
                    <p className="text-muted-foreground" data-oid="2lc2jwg">
                      Efficiently categorize text into predefined classes like
                      sentiment analysis, topic labeling, or intent detection
                      with minimal computational resources.
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className="bg-card/50 border border-border/80"
                  data-oid="fcc6dm_"
                >
                  <CardHeader className="pb-2" data-oid="zyw.g8n">
                    <div className="flex items-center gap-2" data-oid="nl2vbl7">
                      <div
                        className="p-2 rounded-lg bg-primary/10"
                        data-oid="aio086i"
                      >
                        <Rocket
                          className="h-5 w-5 text-primary"
                          data-oid="uo40p62"
                        />
                      </div>
                      <CardTitle data-oid="5tie23c">Edge Deployments</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent data-oid="58a0sqr">
                    <p className="text-muted-foreground" data-oid="7nq0dph">
                      Deploy AI capabilities directly on mobile devices, IoT
                      sensors, or other edge hardware where connectivity or
                      computational resources are limited.
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className="bg-card/50 border border-border/80"
                  data-oid="eb_ysei"
                >
                  <CardHeader className="pb-2" data-oid="fw43t8b">
                    <div className="flex items-center gap-2" data-oid="r0kpbf6">
                      <div
                        className="p-2 rounded-lg bg-primary/10"
                        data-oid="pub6veu"
                      >
                        <Clock
                          className="h-5 w-5 text-primary"
                          data-oid="jhfw-fh"
                        />
                      </div>
                      <CardTitle data-oid="-cb3_n5">
                        Real-Time Applications
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent data-oid="0pg_qv2">
                    <p className="text-muted-foreground" data-oid="099z90:">
                      Power applications that require immediate responses, such
                      as live customer service assistants, real-time content
                      moderation, or interactive features.
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className="bg-card/50 border border-border/80"
                  data-oid="b4my3:h"
                >
                  <CardHeader className="pb-2" data-oid="_vvuvus">
                    <div className="flex items-center gap-2" data-oid="ud2ml2a">
                      <div
                        className="p-2 rounded-lg bg-primary/10"
                        data-oid="i0d-nyt"
                      >
                        <Server
                          className="h-5 w-5 text-primary"
                          data-oid="br50h.t"
                        />
                      </div>
                      <CardTitle data-oid="k:fpvgf">
                        High-Volume Services
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent data-oid="k3khe.u">
                    <p className="text-muted-foreground" data-oid="ci9mqa_">
                      Handle large numbers of concurrent requests efficiently
                      when cost or server capacity is a concern, such as
                      company-wide search or customer-facing applications.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center mt-8" data-oid="yt56fnr">
                <Link
                  href="/models/slm"
                  className={cn(buttonVariants({ size: "lg" }), "rounded-full")}
                  data-oid="b_b.kfb"
                >
                  Explore SLM Catalog
                  <ArrowRight className="ml-2 h-4 w-4" data-oid="u8qahh8" />
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="llm" className="space-y-6" data-oid=".k2uw4c">
              <div className="grid md:grid-cols-2 gap-6" data-oid="hj2u8gc">
                <Card
                  className="bg-card/50 border border-border/80"
                  data-oid="dzfascp"
                >
                  <CardHeader className="pb-2" data-oid="qsa.k9m">
                    <div className="flex items-center gap-2" data-oid="2os4an-">
                      <div
                        className="p-2 rounded-lg bg-primary/10"
                        data-oid="662:ua."
                      >
                        <BrainCircuit
                          className="h-5 w-5 text-primary"
                          data-oid=":115g46"
                        />
                      </div>
                      <CardTitle data-oid="4bfu1n4">
                        Complex Reasoning
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent data-oid="z25pcz6">
                    <p className="text-muted-foreground" data-oid="kfd1to9">
                      Tackle tasks that require deep understanding, multi-step
                      reasoning, or domain expertise such as advanced question
                      answering or problem-solving scenarios.
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className="bg-card/50 border border-border/80"
                  data-oid="lbo7469"
                >
                  <CardHeader className="pb-2" data-oid="tnbk4pt">
                    <div className="flex items-center gap-2" data-oid="pg01uqj">
                      <div
                        className="p-2 rounded-lg bg-primary/10"
                        data-oid=".lk7xu_"
                      >
                        <Pen
                          className="h-5 w-5 text-primary"
                          data-oid="bf72t.b"
                        />
                      </div>
                      <CardTitle data-oid="d1l57zo">Content Creation</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent data-oid="9e-.d9a">
                    <p className="text-muted-foreground" data-oid=".6i5n3r">
                      Generate high-quality, creative content like marketing
                      copy, storylines, code, or long-form articles that
                      maintain coherence and style throughout.
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className="bg-card/50 border border-border/80"
                  data-oid="8xcjo3i"
                >
                  <CardHeader className="pb-2" data-oid="fm476ne">
                    <div className="flex items-center gap-2" data-oid="7ib-rhd">
                      <div
                        className="p-2 rounded-lg bg-primary/10"
                        data-oid="yzhx2e_"
                      >
                        <FileText
                          className="h-5 w-5 text-primary"
                          data-oid="a8.zsn5"
                        />
                      </div>
                      <CardTitle data-oid="oj0jg8q">
                        Document Analysis
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent data-oid="cxylfk:">
                    <p className="text-muted-foreground" data-oid="9r7i::k">
                      Process and understand long documents like legal
                      contracts, research papers, or extensive reports that
                      require maintaining context over thousands of tokens.
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className="bg-card/50 border border-border/80"
                  data-oid="movm7z9"
                >
                  <CardHeader className="pb-2" data-oid="7cxx7b8">
                    <div className="flex items-center gap-2" data-oid="4-a0o1:">
                      <div
                        className="p-2 rounded-lg bg-primary/10"
                        data-oid="-873fwx"
                      >
                        <Languages
                          className="h-5 w-5 text-primary"
                          data-oid="xoz9xsh"
                        />
                      </div>
                      <CardTitle data-oid="qk85cc0">
                        Cross-Lingual Tasks
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent data-oid="i0eb35k">
                    <p className="text-muted-foreground" data-oid="aha1cj3">
                      Handle translation, multi-lingual content generation, or
                      cross-lingual information retrieval where broader language
                      understanding is necessary.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center mt-8" data-oid=".gmd5k6">
                <Link
                  href="/models/llm"
                  className={cn(buttonVariants({ size: "lg" }), "rounded-full")}
                  data-oid="lmd7e46"
                >
                  Explore LLM Catalog
                  <ArrowRight className="ml-2 h-4 w-4" data-oid="wmd3mby" />
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </AnimationContainer>
      </MaxWidthWrapper>
    </div>
  );
};

// Artintel Platform Section
const ArtintelPlatformSection = () => {
  return (
    <div className="py-16" data-oid="m6s4.6f">
      <MaxWidthWrapper data-oid="qlrs:8.">
        <AnimationContainer data-oid="yvo2y1b">
          <div className="text-center mb-10" data-oid="9a2shvj">
            <div
              className="inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-sm text-primary mb-3"
              data-oid="7-4709_"
            >
              <Zap className="mr-1 h-3 w-3" data-oid="535eldi" />
              <span data-oid="4.9b2le">Artintel Advantage</span>
            </div>
            <h2 className="text-3xl font-bold mb-2" data-oid="60qj2q1">
              How Artintel Bridges Both Worlds
            </h2>
            <p
              className="text-muted-foreground max-w-2xl mx-auto"
              data-oid="in24x2n"
            >
              We provide the tools and infrastructure to help you choose,
              fine-tune, and deploy the right model for your specific needs
            </p>
          </div>

          <div
            className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            data-oid="fdarlqu"
          >
            <Card
              className="bg-card/50 border border-border/80"
              data-oid="9d-yy20"
            >
              <CardHeader className="pb-2" data-oid="xd.x1hm">
                <div
                  className="p-2 rounded-lg bg-primary/10 w-fit mb-2"
                  data-oid="q8ukr_w"
                >
                  <Search className="h-5 w-5 text-primary" data-oid="8h3.ty_" />
                </div>
                <CardTitle data-oid="r39_q8m">
                  Model Directory & Rankings
                </CardTitle>
              </CardHeader>
              <CardContent data-oid="v4hpc9r">
                <p className="text-muted-foreground" data-oid=".r4q-fq">
                  Clear side-by-side statistics comparing SLMs vs. LLMs,
                  including memory usage, domain tags, and cost estimates to
                  help you make informed decisions.
                </p>
              </CardContent>
            </Card>

            <Card
              className="bg-card/50 border border-border/80"
              data-oid="qqd9oi6"
            >
              <CardHeader className="pb-2" data-oid=".vxm:eq">
                <div
                  className="p-2 rounded-lg bg-primary/10 w-fit mb-2"
                  data-oid="z.2x71n"
                >
                  <BarChart
                    className="h-5 w-5 text-primary"
                    data-oid="k-g8upf"
                  />
                </div>
                <CardTitle data-oid="j1swzfc">Cost Monitoring</CardTitle>
              </CardHeader>
              <CardContent data-oid="7ba2m60">
                <p className="text-muted-foreground" data-oid="3ihem6i">
                  Real-time dashboards that show how each inference call or
                  training epoch impacts your budget, helping you optimize for
                  cost-efficiency.
                </p>
              </CardContent>
            </Card>

            <Card
              className="bg-card/50 border border-border/80"
              data-oid="_gltc6h"
            >
              <CardHeader className="pb-2" data-oid="2td7-w:">
                <div
                  className="p-2 rounded-lg bg-primary/10 w-fit mb-2"
                  data-oid="-tgns29"
                >
                  <Server className="h-5 w-5 text-primary" data-oid="swj5sno" />
                </div>
                <CardTitle data-oid="29-253a">Deployment Flexibility</CardTitle>
              </CardHeader>
              <CardContent data-oid="i6rv2p0">
                <p className="text-muted-foreground" data-oid="9xnwlds">
                  Deploy anything from a small DistilBERT instance for
                  classification to scaling Falcon 180B across multiple GPUs
                  with our orchestration tools.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mt-12" data-oid="qn5cr-v">
            <Link
              href="/pricing"
              className={cn(buttonVariants({ size: "lg" }), "rounded-full")}
              data-oid="_gj-ag_"
            >
              See Our Pricing
              <ArrowRight className="ml-2 h-4 w-4" data-oid="vcvdmro" />
            </Link>
          </div>
        </AnimationContainer>
      </MaxWidthWrapper>
    </div>
  );
};

// Add a new decision guide component
const DecisionGuideSection = () => {
  return (
    <div className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5 opacity-50"></div>
      <div className="absolute h-px w-full top-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      <div className="absolute h-px w-full bottom-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      <MaxWidthWrapper className="relative z-10">
        <AnimationContainer>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Decision Guide: Which Model Type Is Right For You?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Follow this decision tree to help determine whether Small or Large Language Models better fit your use case
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <Card className="bg-card/50 border border-border/80 hover:border-primary/30 transition-colors hover:shadow-md overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30"></div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HardDrive className="h-5 w-5 text-primary" />
                  <span>Resource Constraints</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-primary/10 mt-1">
                    <Cpu className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-1">Choose SLMs if:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Deployment on mobile devices, IoT, or edge hardware</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Limited GPU resources or budget constraints</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Offline operation is required</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-primary/10 mt-1">
                    <Brain className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-1">Choose LLMs if:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Access to high-end GPUs or cloud resources</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Can tolerate higher latency (100ms-2s)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Budget allows for higher compute costs</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 border border-border/80 hover:border-primary/30 transition-colors hover:shadow-md overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30"></div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5 text-primary" />
                  <span>Task Complexity</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-primary/10 mt-1">
                    <Cpu className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-1">Choose SLMs if:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Simple classification or categorization tasks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Specific, well-defined NLP functions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>High-volume, repetitive text processing</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-primary/10 mt-1">
                    <Brain className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-1">Choose LLMs if:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Multi-step reasoning or complex problem-solving</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Creative content generation or summarization</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Tasks requiring broad knowledge or contextual understanding</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </AnimationContainer>
      </MaxWidthWrapper>
    </div>
  );
};

// Main Page Component
const ModelComparisonPage = () => {
  return (
    <>
      <ComparisonHero />

      <FeatureComparison />

      <DecisionGuideSection />

      <UseCaseSection />
      
      <ArtintelPlatformSection />
    </>
  );
};

export default ModelComparisonPage;
