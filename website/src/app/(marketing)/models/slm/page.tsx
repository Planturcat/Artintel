import React from "react";
import MaxWidthWrapper from "@/components/global/max-width-wrapper";
import { Badge } from "@/components/ui/badge";
import {
  CircleDollarSign,
  Laptop,
  Clock,
  Gauge,
  Cpu,
  BrainCircuit,
  ArrowRight,
  Zap,
  Server,
  Database,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import AnimationContainer from "@/components/global/animation-container";
import Wrapper from "@/components/global/wrapper";

export const metadata: Metadata = {
  title: "Small Language Models (SLMs) | Artintel",
  description:
    "Explore our collection of Small Language Models (SLMs) designed for efficiency, speed, and resource-constrained environments.",
};

// Custom SLMHero component
const SLMHero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background to-background/80 py-20 md:py-24">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/3 top-1/4 h-64 w-64 rounded-full bg-primary/10 blur-[100px]"></div>
        <div className="absolute right-1/3 bottom-1/4 h-64 w-64 rounded-full bg-primary/10 blur-[100px]"></div>
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
              <Cpu className="mr-1 h-3 w-3" />
              <span>Small Language Models</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-4">
              Efficient{" "}
              <span className="text-primary">AI</span>{" "}
              for Everyday Tasks
            </h1>

            <p className="text-lg text-muted-foreground mb-6">
              Explore our collection of Small Language Models (SLMs) designed for efficiency, speed, and resource-constrained environments.
            </p>

            <div className="mb-8 grid grid-cols-3 gap-4">
              <div className="rounded-lg border border-primary/20 bg-card/30 p-3 backdrop-blur-sm">
                <div className="mb-1 flex items-center">
                  <Zap className="mr-1 h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    Efficient
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Low resource usage
                </p>
              </div>
              <div className="rounded-lg border border-primary/20 bg-card/30 p-3 backdrop-blur-sm">
                <div className="mb-1 flex items-center">
                  <Clock className="mr-1 h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    Fast
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Sub-100ms latency
                </p>
              </div>
              <div className="rounded-lg border border-primary/20 bg-card/30 p-3 backdrop-blur-sm">
                <div className="mb-1 flex items-center">
                  <Laptop className="mr-1 h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    Portable
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Edge-compatible
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full">
                <Link href="#models">
                  Browse SLM Models
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full"
              >
                <Link href="/models/comparison">
                  Compare with LLMs
                </Link>
              </Button>
            </div>
          </div>

          <div className="hidden md:block relative">
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10"></div>
            <div className="relative z-0 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl transform scale-75 opacity-50"></div>
                <div className="relative bg-card/30 border border-primary/20 rounded-xl p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Cpu className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold">Small Language Models</h3>
                      <p className="text-sm text-muted-foreground">Efficient AI for constrained environments</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Parameter Range:</span>
                      <span className="font-medium">~1M to ~3B</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Memory Usage:</span>
                      <span className="font-medium">~100MB to ~6GB</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Inference Speed:</span>
                      <span className="font-medium">10-100ms</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Deployment:</span>
                      <span className="font-medium">CPU, Mobile, Edge</span>
                    </div>
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

// Custom SLMFeatureCard component
const SLMFeatureCard = ({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
}) => {
  return (
    <Card className="bg-card/50 border border-border/80 h-full">
      <CardHeader className="pb-2">
        <div className="p-2 rounded-lg bg-primary/10 w-fit mb-2">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

// Custom ModelCard component
const ModelCard = ({
  name,
  description,
  parameterCount,
  domains,
  license,
}: {
  name: string;
  description: string;
  parameterCount: string;
  domains: string[];
  license: string;
}) => {
  return (
    <Card className="h-full flex flex-col border-border/80 hover:border-primary/50 transition-colors">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{name}</CardTitle>
          <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary">
            SLM
          </Badge>
        </div>
        <div className="flex items-center text-xs text-muted-foreground mt-1">
          <Cpu className="mr-1 h-3 w-3" />
          <span>{parameterCount} parameters</span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {domains.map((domain, i) => (
            <Badge key={i} variant="secondary" className="text-xs">
              {domain}
            </Badge>
          ))}
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <ArrowRight className="mr-1 h-3 w-3" />
          <span>License: {license}</span>
        </div>
      </CardContent>
    </Card>
  );
};

// Main Page Component
const SLMModelsPage = () => {
  return (
    <>
      {/* Hero Section */}
      <SLMHero />

      <Wrapper className="mb-12 mt-12 flex flex-col items-center justify-center">
        {/* Definition Section */}
        <AnimationContainer className="w-full">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">What Are Small Language Models?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Small Language Models (SLMs) typically range from a few million to a few billion parameters. 
              These models are designed to be efficient and performant in resource-constrained environments, 
              making them ideal for edge deployments and applications with limited computing resources.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="bg-card/50 border border-border/80">
              <CardHeader className="pb-2">
                <CardTitle>Popular Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mt-2">
                  {[
                    "BERT (110M)",
                    "DistilBERT (66M)",
                    "GPT-2 small",
                    "Phi-2",
                    "TinyBERT",
                  ].map((model, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="text-sm py-1.5 border-primary/20 bg-primary/5"
                    >
                      {model}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border border-border/80">
              <CardHeader className="pb-2">
                <CardTitle>Typical Parameter Range</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  SLMs typically range from:
                </p>
                <div className="flex items-center justify-center">
                  <div className="w-full h-4 bg-primary/10 rounded-full relative">
                    <div className="absolute inset-0 flex items-center justify-between px-4 text-xs">
                      <span>1M</span>
                      <span>3B</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </AnimationContainer>

        {/* Key Advantages */}
        <AnimationContainer className="w-full mt-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Key Advantages</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Small Language Models offer significant benefits for resource-constrained environments
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <SLMFeatureCard
              icon={Laptop}
              title="Lower Resource Footprint"
              description="Can often be run on a standard CPU or lower-tier GPUs, making them ideal for devices with limited memory including edge devices and mobile applications."
            />
            <SLMFeatureCard
              icon={Clock}
              title="Faster Inference"
              description="Due to smaller size, these models can process requests more quickly, often with sub-100ms latencies, supporting near-real-time applications."
            />
            <SLMFeatureCard
              icon={CircleDollarSign}
              title="Cost-Effectiveness"
              description="Lower computational requirements translate to reduced infrastructure costs, especially for high-volume or continuous processing scenarios."
            />
          </div>
        </AnimationContainer>

        {/* SLM-Friendly Tasks */}
        <AnimationContainer className="w-full mt-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">SLM-Friendly Tasks</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tasks where Small Language Models excel
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="bg-card/50 border border-border/80">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5 text-primary" />
                  <CardTitle>Text & Language Processing</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-card/30">
                    <h4 className="font-medium mb-1">Text Classification</h4>
                    <p className="text-sm text-muted-foreground">
                      Sentiment analysis, spam detection, topic categorization, and intent recognition.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-card/30">
                    <h4 className="font-medium mb-1">Named Entity Recognition</h4>
                    <p className="text-sm text-muted-foreground">
                      Identifying people, organizations, locations, and other entities in text.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-card/30">
                    <h4 className="font-medium mb-1">Question Answering</h4>
                    <p className="text-sm text-muted-foreground">
                      Simple factual Q&A systems with predefined knowledge bases.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border border-border/80">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Server className="h-5 w-5 text-primary" />
                  <CardTitle>Deployment Scenarios</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-card/30">
                    <h4 className="font-medium mb-1">Edge Devices</h4>
                    <p className="text-sm text-muted-foreground">
                      IoT devices, mobile phones, and other hardware with limited processing power.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-card/30">
                    <h4 className="font-medium mb-1">Embedded Systems</h4>
                    <p className="text-sm text-muted-foreground">
                      Integration with hardware-constrained systems that require natural language understanding.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-card/30">
                    <h4 className="font-medium mb-1">High-Volume Processing</h4>
                    <p className="text-sm text-muted-foreground">
                      Applications that need to process thousands of text samples per second with low latency.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </AnimationContainer>

        {/* Featured SLM Models */}
        <AnimationContainer className="w-full mt-20" id="models">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Featured SLM Models</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our collection of Small Language Models
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ModelCard
              name="BERT Base"
              description="A bidirectional transformer pre-trained using masked language modeling and next sentence prediction, ideal for understanding context in text."
              parameterCount="110M"
              domains={["NLP", "Classification", "Embeddings"]}
              license="Apache 2.0"
            />
            <ModelCard
              name="DistilBERT"
              description="A smaller, faster, cheaper version of BERT that retains 97% of its language understanding capabilities while being 60% faster."
              parameterCount="66M"
              domains={["NLP", "Classification", "Mobile"]}
              license="Apache 2.0"
            />
            <ModelCard
              name="Phi-2"
              description="A compact yet powerful language model designed for edge devices and resource-constrained environments."
              parameterCount="2.7B"
              domains={["Edge Computing", "Text Generation", "Q&A"]}
              license="MIT"
            />
            <ModelCard
              name="TinyBERT"
              description="An extremely compact model designed for mobile and edge devices with minimal resource requirements."
              parameterCount="14.5M"
              domains={["Mobile", "Classification", "Embedded Systems"]}
              license="MIT"
            />
            <ModelCard
              name="MobileBERT"
              description="A compressed version of BERT optimized for mobile devices with minimal accuracy loss."
              parameterCount="25M"
              domains={["Mobile", "On-device NLP", "Low-latency"]}
              license="Apache 2.0"
            />
            <ModelCard
              name="GPT-2 Small"
              description="A smaller version of GPT-2 that offers decent text generation capabilities with modest resource requirements."
              parameterCount="124M"
              domains={["Text Generation", "Completion", "Summarization"]}
              license="MIT"
            />
          </div>

          <div className="flex justify-center mt-8">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/catalog">
                View Full Catalog
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </AnimationContainer>

        {/* CTA Section */}
        <AnimationContainer className="mt-20 w-full">
          <Card className="border-none shadow-md bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="pt-8 pb-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Ready to Get Started with SLMs?</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Explore our platform and discover how Artintel can help you leverage the power of Small Language Models for your specific use case.
                </p>
              </div>

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
            </CardContent>
          </Card>
        </AnimationContainer>
      </Wrapper>
    </>
  );
};

export default SLMModelsPage;
