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
} from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib";
import styles from "@/styles/terms-animations.module.css";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeModelType, setActiveModelType] = useState<"slm" | "llm">("llm");

  useEffect(() => {
    // Particle animation
    const particles = containerRef.current?.querySelectorAll(
      `.${styles.particle}`,
    );

    if (particles) {
      particles.forEach((particle, i) => {
        const speed = 30 + Math.random() * 30;
        const rotation = Math.random() * 360;
        (particle as HTMLElement).style.animation =
          `${styles.floatParticle} ${speed}s linear infinite`;
        (particle as HTMLElement).style.transform = `rotate(${rotation}deg)`;
      });
    }

    // Handle parallax effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const icons = containerRef.current.querySelectorAll(
        `.${styles.parallax}`,
      );
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const moveX = (e.clientX - centerX) / 30;
      const moveY = (e.clientY - centerY) / 30;

      icons.forEach((icon, index) => {
        const depth = (index + 1) * 0.3;
        (icon as HTMLElement).style.transform =
          `translate(${moveX * depth}px, ${moveY * depth}px)`;
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Toggle model type animation
  const handleModelTypeToggle = (type: "slm" | "llm") => {
    setActiveModelType(type);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full py-28 bg-gradient-to-br from-background via-background to-background/90 overflow-hidden"
    >
      {/* Enhanced gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5 opacity-70"
        aria-hidden="true"
      ></div>
      
      {/* Decorative mesh grid background */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgb(38,38,38,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgb(38,38,38,0.2)_1px,transparent_1px)] bg-[size:20px_20px]"
        aria-hidden="true"
      ></div>

      {/* Decorative particles */}
      <div className="absolute inset-0" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className={`${styles.particle} absolute h-px w-[40px] bg-gradient-to-r ${i % 2 === 0 ? "from-primary/30 to-transparent" : "from-transparent to-primary/30"}`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.3 + Math.random() * 0.5,
            }}
          />
        ))}
      </div>

      {/* Enhanced model type comparison visualization */}
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 w-full h-full flex items-center justify-center opacity-20 pointer-events-none"
        aria-hidden="true"
      >
        <div className="relative">
          <div
            className={`transition-all duration-1000 ease-in-out ${activeModelType === "slm" ? "opacity-100" : "opacity-20"}`}
          >
            <div className="relative">
              <div
                className="h-[200px] w-[200px] rounded-full border-4 border-dashed border-primary/40"
              ></div>
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[100px] w-[100px] rounded-full border-2 border-primary/60"
              ></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[50px] w-[50px] rounded-full bg-primary/20"></div>
            </div>
          </div>
          
          <div
            className={`absolute top-0 left-0 transition-all duration-1000 ease-in-out ${activeModelType === "llm" ? "opacity-100" : "opacity-20"}`}
          >
            <div className="relative">
              <div
                className="h-[400px] w-[400px] rounded-full border-4 border-dashed border-primary/40"
              ></div>
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full border-2 border-primary/30"
              ></div>
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[200px] w-[200px] rounded-full border-2 border-primary/20"
              ></div>
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[100px] w-[100px] rounded-full border-2 border-primary/40"
              ></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[50px] w-[50px] rounded-full bg-primary/20"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated floating elements */}
      <div
        className={`absolute transition-opacity duration-500 ${activeModelType === "llm" ? "opacity-100" : "opacity-30"}`}
      >
        <img
          src="/icons/artintel-logo.png"
          alt="Artintel Logo"
          className={`absolute h-14 w-14 top-1/3 left-[20%] ${styles.floatingElement} ${styles.parallax}`}
          style={{ animationDuration: "8s", animationDelay: "0.2s" }}
        />

        <Languages
          className={`absolute text-primary/40 h-10 w-10 bottom-1/3 left-[15%] ${styles.floatingElement} ${styles.parallax}`}
          style={{ animationDuration: "7s", animationDelay: "0.5s" }}
        />

        <Network
          className={`absolute text-primary/50 h-12 w-12 top-1/2 right-[20%] ${styles.floatingElement} ${styles.parallax}`}
          style={{ animationDuration: "9s", animationDelay: "1s" }}
        />

        <Code
          className={`absolute text-primary/40 h-10 w-10 bottom-1/4 right-[25%] ${styles.floatingElement} ${styles.parallax}`}
          style={{ animationDuration: "6s", animationDelay: "1.5s" }}
        />
      </div>

      <div
        className={`absolute transition-opacity duration-500 ${activeModelType === "slm" ? "opacity-100" : "opacity-30"}`}
      >
        <Cpu
          className={`absolute text-primary/60 h-10 w-10 top-1/4 left-[25%] ${styles.floatingElement} ${styles.parallax}`}
          style={{ animationDuration: "6s", animationDelay: "0.3s" }}
        />

        <HardDrive
          className={`absolute text-primary/40 h-8 w-8 bottom-1/4 left-[30%] ${styles.floatingElement} ${styles.parallax}`}
          style={{ animationDuration: "5s", animationDelay: "0.7s" }}
        />

        <Server
          className={`absolute text-primary/50 h-9 w-9 top-1/3 right-[28%] ${styles.floatingElement} ${styles.parallax}`}
          style={{ animationDuration: "7s", animationDelay: "1.2s" }}
        />

        <Clock
          className={`absolute text-primary/40 h-7 w-7 bottom-1/3 right-[22%] ${styles.floatingElement} ${styles.parallax}`}
          style={{ animationDuration: "5.5s", animationDelay: "0.9s" }}
        />
      </div>

      {/* Hero content */}
      <MaxWidthWrapper className="relative z-10">
        <div className="text-center space-y-6 mb-12">
          <div
            className={`p-3 inline-flex rounded-full bg-primary/10 ${styles.pulsingElement}`}
          >
            <Scale className="h-6 w-6 text-primary" />
          </div>

          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter ${styles.slideUp}`}
          >
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">SLM vs LLM:</span>{" "}
            Choosing the Right Model
          </h1>

          <p
            className={`max-w-[700px] mx-auto text-muted-foreground text-lg md:text-xl ${styles.slideUp}`}
            style={{ animationDelay: "0.2s" }}
          >
            Understanding the key differences between Small Language Models and
            Large Language Models to make informed decisions for your AI strategy
          </p>

          {/* Model type toggle */}
          <div
            className={`flex justify-center pt-8 ${styles.slideUp}`}
            style={{ animationDelay: "0.3s" }}
          >
            <div
              className="inline-flex items-center gap-4 p-1 rounded-full border border-border/40 bg-background/50 backdrop-blur-md shadow-md"
            >
              <button
                onClick={() => handleModelTypeToggle("slm")}
                className={`flex items-center gap-2 py-2 px-4 rounded-full transition-all ${activeModelType === "slm" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Cpu className="h-4 w-4" />
                <span>Small LMs</span>
              </button>
              <button
                onClick={() => handleModelTypeToggle("llm")}
                className={`flex items-center gap-2 py-2 px-4 rounded-full transition-all ${activeModelType === "llm" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-foreground"}`}
              >
                <BrainCircuit className="h-4 w-4" />
                <span>Large LMs</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick comparison cards */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div
            className={styles.fadeIn}
            style={{ animationDelay: "0.4s" }}
          >
            <ModelTypeCard
              icon={Cpu}
              title="Small Language Models"
              description="SLMs typically range from a few million to a few billion parameters. They're optimized for efficiency, speed, and specific tasks with lower resource requirements."
              features={[
                "Lower resource footprint, can run on standard CPUs or lower-tier GPUs",
                "Faster inference with low latency (sub-100ms)",
                "Cost-effective for high-volume or edge deployments",
                "Ideal for specific, well-defined tasks",
              ]}
              recommendation="Best for: Edge devices, real-time applications, or specific tasks with limited computing resources"
              className={cn(
                activeModelType === "slm"
                  ? "ring-2 ring-primary/50 shadow-lg shadow-primary/5"
                  : "",
              )}
            />
          </div>

          <div
            className={styles.fadeIn}
            style={{ animationDelay: "0.6s" }}
          >
            <ModelTypeCard
              icon={BrainCircuit}
              title="Large Language Models"
              description="LLMs range from several billion to hundreds of billions of parameters. They excel at complex reasoning, creative generation, and handling nuanced language understanding."
              features={[
                "Rich understanding with vast encoded knowledge",
                "Longer context windows (thousands of tokens)",
                "Creative and adaptive text generation capabilities",
                "Strong zero-shot and few-shot performance",
              ]}
              recommendation="Best for: Complex reasoning, creative generation, or tasks requiring deep language understanding"
              className={cn(
                activeModelType === "llm"
                  ? "ring-2 ring-primary/50 shadow-lg shadow-primary/5"
                  : "",
              )}
            />
          </div>
        </div>
      </MaxWidthWrapper>
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
