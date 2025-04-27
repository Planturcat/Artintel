import React from "react";
import Wrapper from "@/components/global/wrapper";
import AnimationContainer from "@/components/global/animation-container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Cpu,
  Zap,
  Rocket,
  BarChart,
  Server,
  Scale,
  Clock,
  DollarSign,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

// Custom ModelHero component
const ModelHero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background to-background/80 py-20 md:py-24">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-primary/10 blur-[100px]"></div>
        <div className="absolute right-1/4 bottom-1/3 h-64 w-64 rounded-full bg-primary/10 blur-[100px]"></div>
      </div>

      {/* Grid pattern background */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="h-full w-full grid grid-cols-12 grid-rows-6">
          {Array.from({ length: 72 }).map((_, i) => (
            <div key={i} className="border border-primary/20" />
          ))}
        </div>
      </div>

      <Wrapper className="relative z-10">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div>
            <div className="mb-3 inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-sm text-primary">
              <Layers className="mr-1 h-3 w-3" />
              <span>Language Models</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-4">
              SLM vs{" "}
              <span className="text-primary">LLM</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-6">
              Understanding the key differences between Small Language Models (SLMs) and Large Language Models (LLMs), and how to choose the right one for your needs.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/features">Explore Features</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full"
              >
                <Link href="/contact">Request Demo</Link>
              </Button>
            </div>
          </div>

          <div className="relative h-[400px] flex items-center justify-center">
            {/* Visual comparison of SLM vs LLM */}
            <div className="relative w-full h-full">
              {/* SLM Side */}
              <div className="absolute left-0 top-0 w-1/2 h-full flex flex-col items-center justify-center p-4">
                <div className="h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-16 w-16 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">SLM</h3>
                <p className="text-center text-sm text-muted-foreground">Small Language Models</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Faster</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Lower Cost</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Edge Deployment</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="absolute left-1/2 top-0 h-full w-0.5 bg-primary/20 transform -translate-x-1/2"></div>

              {/* LLM Side */}
              <div className="absolute right-0 top-0 w-1/2 h-full flex flex-col items-center justify-center p-4">
                <div className="h-40 w-40 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Rocket className="h-20 w-20 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">LLM</h3>
                <p className="text-center text-sm text-muted-foreground">Large Language Models</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">More Powerful</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Larger Context</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Advanced Reasoning</span>
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

// Custom ComparisonCard component
const ComparisonCard = ({
  title,
  slmDescription,
  llmDescription,
  icon: Icon,
}: {
  title: string;
  slmDescription: string;
  llmDescription: string;
  icon: React.ElementType;
}) => {
  return (
    <Card className="bg-card/50 border border-border/80">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
            <h4 className="font-medium mb-2 flex items-center">
              <Zap className="h-4 w-4 text-primary mr-1" /> SLM
            </h4>
            <p className="text-sm text-muted-foreground">{slmDescription}</p>
          </div>
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
            <h4 className="font-medium mb-2 flex items-center">
              <Rocket className="h-4 w-4 text-primary mr-1" /> LLM
            </h4>
            <p className="text-sm text-muted-foreground">{llmDescription}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ModelsPage = () => {
  return (
    <>
      {/* Custom Hero Section */}
      <ModelHero />

      <Wrapper className="mb-12 mt-20 flex flex-col items-center justify-center">
        {/* Introduction */}
        <AnimationContainer className="w-full">
          <Card className="border-none shadow-md bg-card/30">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Understanding Language Models
              </CardTitle>
              <CardDescription>
                The AI ecosystem has witnessed a rapid proliferation of language models
              </CardDescription>
            </CardHeader>
            <CardContent className="text-left space-y-4">
              <p>
                Initially, <strong>smaller language models</strong> like BERT or DistilBERT broke through to demonstrate the power of self-attention and transformer architectures. Over time, these models have scaled up to billions (and even hundreds of billions) of parameters, leading to the advent of <strong>large language models</strong> (LLMs) like GPT-3.5/4, Falcon 180B, Llama 70B, and more.
              </p>
              <p>
                Despite the hype around LLMs, SLMs still remain <strong>highly relevant</strong>, especially in scenarios constrained by cost, latency, or deployment environment. Deciding whether an SLM or an LLM best fits your use case is crucial for a successful AI strategy.
              </p>
            </CardContent>
          </Card>
        </AnimationContainer>

        {/* What Are SLMs? */}
        <AnimationContainer className="mt-12 w-full">
          <Card className="border-none shadow-md bg-card/30">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                What Are SLMs?
              </CardTitle>
              <CardDescription>
                Small Language Models typically range from a few million to a few billion parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="text-left space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-medium mb-4">Popular Examples</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>BERT (Base ~110M parameters)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>DistilBERT (~66M parameters)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Smaller GPT variants (e.g., GPT-2 small)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Mobile or embedded-focused models like Phi-2 or TinyBERT</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-4">Key Strengths</h3>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <Zap className="h-3 w-3 text-primary" />
                      </div>
                      <div>
                        <span className="font-medium">Lower Resource Footprint</span>
                        <p className="text-sm text-muted-foreground">Can often be run on a standard CPU or lower-tier GPUs, making them ideal for devices with limited memory.</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <Clock className="h-3 w-3 text-primary" />
                      </div>
                      <div>
                        <span className="font-medium">Faster Inference</span>
                        <p className="text-sm text-muted-foreground">Due to smaller size, these models can process requests more quickly, supporting near-real-time applications.</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <DollarSign className="h-3 w-3 text-primary" />
                      </div>
                      <div>
                        <span className="font-medium">Cost-Effectiveness</span>
                        <p className="text-sm text-muted-foreground">Training or inference with an SLM is substantially cheaper than with a 70B-parameter or 180B-parameter model.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimationContainer>

        {/* What Are LLMs? */}
        <AnimationContainer className="mt-12 w-full">
          <Card className="border-none shadow-md bg-card/30">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                What Are LLMs?
              </CardTitle>
              <CardDescription>
                Large Language Models range from several billion to hundreds of billions of parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="text-left space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-medium mb-4">Popular Examples</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>GPT-3.5/4 (proprietary, but billions of parameters)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Falcon 40B, Falcon 180B</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Llama 70B</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>BLOOM 176B</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-4">Key Strengths</h3>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <Sparkles className="h-3 w-3 text-primary" />
                      </div>
                      <div>
                        <span className="font-medium">Rich Understanding</span>
                        <p className="text-sm text-muted-foreground">Larger parameter counts enable these models to encode a vast array of knowledge, capturing nuanced language patterns and domain-specific jargon.</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <Layers className="h-3 w-3 text-primary" />
                      </div>
                      <div>
                        <span className="font-medium">Longer Context Windows</span>
                        <p className="text-sm text-muted-foreground">Many LLMs can handle thousands of tokens in a single pass, enabling complex conversation threads or large text inputs.</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <Rocket className="h-3 w-3 text-primary" />
                      </div>
                      <div>
                        <span className="font-medium">Creative & Adaptive Text Generation</span>
                        <p className="text-sm text-muted-foreground">Capable of producing more coherent, context-aware, and even creative outputs in tasks like storytelling, summarization, or code generation.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimationContainer>

        {/* Key Comparisons */}
        <AnimationContainer className="mt-12 w-full">
          <h2 className="text-3xl font-bold mb-8 text-center">Key Comparisons</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <ComparisonCard
              title="Performance"
              icon={BarChart}
              slmDescription="Typically respond faster (sub-100ms latencies), suitable for real-time or high-volume endpoints."
              llmDescription="May have latencies of 300ms–2s or more, depending on hardware scaling and the length of input."
            />
            <ComparisonCard
              title="Resource Requirements"
              icon={Server}
              slmDescription="Can run on a single GPU with 4–16GB VRAM or even on CPU for smaller models."
              llmDescription="Might require tens or even hundreds of GBs across multiple GPUs/TPUs."
            />
            <ComparisonCard
              title="Cost Implications"
              icon={DollarSign}
              slmDescription="Low inference cost. Potentially viable even on CPU-only servers for small-scale usage."
              llmDescription="Inference can be expensive, especially if high throughput is needed. Offloading to GPU or specialized hardware is generally required."
            />
            <ComparisonCard
              title="Use Cases"
              icon={Cpu}
              slmDescription="Text classification, entity recognition, simple chatbots, edge deployments on IoT devices or mobile apps."
              llmDescription="Complex QA, summarization, creative content generation, high-value enterprise analytics, and cross-lingual tasks."
            />
          </div>
        </AnimationContainer>

        {/* Selecting the Right Model */}
        <AnimationContainer className="mt-20 w-full">
          <Card className="border-none shadow-md bg-card/30">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Selecting the Right Model
              </CardTitle>
              <CardDescription>
                Key questions to guide your choice
              </CardDescription>
            </CardHeader>
            <CardContent className="text-left space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <span className="font-bold text-primary">1</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Task Complexity</h3>
                      <p className="text-muted-foreground">Do you need advanced reasoning, multi-turn context, or creative text generation? If yes, an LLM is likely beneficial.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <span className="font-bold text-primary">2</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Resource Constraints</h3>
                      <p className="text-muted-foreground">Are you limited by budget, hardware, or real-time latency requirements? If so, an SLM might be more suitable.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <span className="font-bold text-primary">3</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Size of Your Dataset</h3>
                      <p className="text-muted-foreground">Fine-tuning an LLM with massive amounts of data can yield great results—but is your data truly large and complex?</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <span className="font-bold text-primary">4</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Deployment Environment</h3>
                      <p className="text-muted-foreground">Are you targeting cloud servers with large GPUs, or do you need to run on edge devices or on-prem hardware with limited capacity?</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimationContainer>

        {/* How Artintel Bridges Both Worlds */}
        <AnimationContainer className="mt-12 w-full">
          <Card className="border-none shadow-md bg-gradient-to-r from-primary/10 to-primary/5">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                How Artintel Bridges Both Worlds
              </CardTitle>
              <CardDescription>
                Our platform provides tools for both SLMs and LLMs
              </CardDescription>
            </CardHeader>
            <CardContent className="text-left">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Server className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Model Directory with Rankings</h3>
                      <p className="text-muted-foreground">Clear side-by-side stats of SLMs vs. LLMs (memory usage, domain tags, cost estimates).</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Cpu className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Guided Fine-Tuning</h3>
                      <p className="text-muted-foreground">Tools that automatically configure hyperparameters based on model size, dataset scale, and your hardware.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <DollarSign className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Cost Monitoring</h3>
                      <p className="text-muted-foreground">Real-time dashboards showing how each inference call or training epoch impacts your budget.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Rocket className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Deployment Flexibility</h3>
                      <p className="text-muted-foreground">Whether you want to deploy a small DistilBERT instance for classification or scale a Falcon 180B model across multiple GPUs, Artintel orchestrates the environment.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <BarChart className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Alerts & Recommendations</h3>
                      <p className="text-muted-foreground">If your usage patterns exceed an SLM's capacity or if your LLM is incurring large bills, Artintel can recommend alternatives or scaling strategies.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimationContainer>

        {/* Summary */}
        <AnimationContainer className="mt-12 w-full">
          <div className="bg-card/30 border border-border/50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Summary</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-muted-foreground">
                <strong className="text-foreground">SLMs</strong> offer speed, cost savings, and simplicity, making them suitable for everyday tasks that don't require deep reasoning or huge context windows.
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">LLMs</strong> unlock advanced language understanding and generation capabilities but come with higher cost and complexity.
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Artintel</strong> enables you to experiment with both SLMs and LLMs in a unified environment, so you can easily <strong className="text-foreground">choose, fine-tune, deploy, and scale</strong> the model type that aligns with your organization's goals and constraints.
              </p>
            </div>
          </div>
        </AnimationContainer>

        {/* CTA Section */}
        <AnimationContainer className="mt-20 w-full text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore our platform and discover how Artintel can help you leverage the power of both SLMs and LLMs for your specific use case.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/pricing">View Pricing Plans</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full"
            >
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </AnimationContainer>
      </Wrapper>
    </>
  );
};

export default ModelsPage;
