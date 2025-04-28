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
  Code,
  Check,
  FileCheck,
  Smartphone,
  Lightbulb,
  Shield
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
    <div className="relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-background/90 py-20 md:py-24">
      {/* Decorative elements - unique to SLM page with lighter effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/3 top-1/4 h-48 w-48 rounded-full bg-primary/5 blur-[80px]"></div>
        <div className="absolute right-1/3 bottom-1/4 h-48 w-48 rounded-full bg-primary/5 blur-[80px]"></div>
      </div>

      {/* Lightning bolt pattern background - distinctive to SLM page */}
      <div className="absolute inset-0 z-0 opacity-5">
        <svg width="100%" height="100%" className="absolute inset-0">
          <pattern id="lightning-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M40,20 L30,50 L45,55 L25,80" stroke="#00CBDD" strokeWidth="2" fill="none" />
            <path d="M70,10 L60,40 L75,45 L55,90" stroke="#00CBDD" strokeWidth="2" fill="none" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#lightning-pattern)" />
        </svg>
      </div>

      {/* Fast-moving particles - unique to SLM page */}
      <div className="absolute inset-0 z-0 opacity-20">
        {Array.from({ length: 15 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-ping-fast"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Grid pattern background - lighter than LLM page */}
      <div className="absolute inset-0 z-0 opacity-3">
        <div className="h-full w-full grid grid-cols-20 grid-rows-10">
          {Array.from({ length: 200 }).map((_, i) => (
            <div key={i} className="border border-primary/10" />
          ))}
        </div>
      </div>

      <Wrapper className="relative z-10">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div>
            <div className="mb-3 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary">
              <Cpu className="mr-1 h-3 w-3" />
              <span>Small Language Models</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-4">
              <span className="text-primary">Fast</span> &{" "}
              <span className="bg-gradient-to-r from-primary/80 to-primary/60 bg-clip-text text-transparent">Efficient</span>{" "}
              AI
            </h1>

            <p className="text-lg text-muted-foreground mb-6">
              Small Language Models (SLMs) deliver impressive performance with minimal resource requirements, making them ideal for edge computing, mobile applications, and high-throughput services.
            </p>

            <div className="mb-8 grid grid-cols-3 gap-4">
              <div className="rounded-lg border border-primary/20 bg-card/30 p-3 backdrop-blur-sm hover:bg-primary/5 transition-colors duration-300">
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
              <div className="rounded-lg border border-primary/20 bg-card/30 p-3 backdrop-blur-sm hover:bg-primary/5 transition-colors duration-300">
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
              <div className="rounded-lg border border-primary/20 bg-card/30 p-3 backdrop-blur-sm hover:bg-primary/5 transition-colors duration-300">
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
              <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-primary/80 to-primary/60 hover:from-primary/70 hover:to-primary/50">
                <Link href="#models">
                  Browse SLM Models
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-primary/20 hover:bg-primary/5"
              >
                <Link href="#features">
                  Learn More About SLMs
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative flex justify-center">
            {/* Fast-moving animation showcase - distinctive to SLM page */}
            <div className="relative h-96 w-full max-w-lg">
              {/* Main device */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card/40 border border-primary/20 rounded-xl p-6 backdrop-blur-sm w-72 h-80 flex flex-col items-center justify-between shadow-lg">
                <div className="w-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Cpu className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold">Small Language Models</h3>
                  </div>
                  
                  {/* SLM Specs */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Size:</span>
                      <span className="font-medium">~1MB to ~5GB</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Parameters:</span>
                      <span className="font-medium">~1M to ~3B</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Latency:</span>
                      <span className="font-medium">10-100ms</span>
                    </div>
                  </div>
                  
                  {/* Fast processing visualization */}
                  <div className="h-12 border border-primary/20 rounded bg-background/50 p-2 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div 
                          key={i} 
                          className="h-1.5 bg-primary/60 rounded animate-pulse" 
                          style={{ 
                            width: `${3 + Math.random() * 10}px`, 
                            marginRight: '3px',
                            animationDelay: `${i * 0.1}s` 
                          }}
                        ></div>
                      ))}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-card/50"></div>
                  </div>
                </div>
                
                {/* Indicators for low resource usage - SLM specific */}
                <div className="w-full grid grid-cols-3 gap-3">
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-400 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">CPU</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-400 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">RAM</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-400 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">Storage</span>
                  </div>
                </div>
              </div>
              
              {/* Floating mobile device to emphasize edge deployment */}
              <div className="absolute top-[15%] right-[15%] bg-card/40 border border-primary/20 rounded-lg p-3 backdrop-blur-sm w-32 h-56 shadow-md animate-float">
                <div className="flex justify-center mb-2">
                  <Smartphone className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-2">
                  <div className="h-1.5 w-full bg-primary/20 rounded-full"></div>
                  <div className="h-1.5 w-4/5 bg-primary/20 rounded-full"></div>
                  <div className="h-1.5 w-3/5 bg-primary/20 rounded-full"></div>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-[8px] text-center text-muted-foreground font-medium">SLM on Edge</div>
                  <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden mt-1">
                    <div className="h-full bg-green-400 rounded-full animate-pulse" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </div>
              
              {/* Floating IoT device */}
              <div className="absolute bottom-[20%] left-[15%] bg-card/40 border border-primary/20 rounded-lg p-2 backdrop-blur-sm w-24 h-24 shadow-md animate-float animation-delay-500">
                <div className="flex justify-center mb-1">
                  <Cpu className="h-3 w-3 text-primary" />
                </div>
                <div className="space-y-1.5">
                  <div className="h-1 w-full bg-primary/20 rounded-full"></div>
                  <div className="h-1 w-4/5 bg-primary/20 rounded-full"></div>
                </div>
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="text-[6px] text-center text-muted-foreground font-medium">IoT Device</div>
                  <div className="h-0.5 w-full bg-gray-200 rounded-full overflow-hidden mt-0.5">
                    <div className="h-full bg-green-400 rounded-full animate-pulse" style={{ width: '95%' }}></div>
                  </div>
                </div>
              </div>
              
              {/* Fast data transmission lines */}
              <svg className="absolute inset-0 z-0 w-full h-full" viewBox="0 0 400 400">
                <line x1="50" y1="200" x2="200" y2="200" stroke="#00CBDD" strokeWidth="1" strokeDasharray="5,5" className="animate-dash-offset-fast" />
                <line x1="350" y1="200" x2="200" y2="200" stroke="#00CBDD" strokeWidth="1" strokeDasharray="5,5" className="animate-dash-offset-fast animation-delay-300" />
                <line x1="200" y1="50" x2="200" y2="200" stroke="#00CBDD" strokeWidth="1" strokeDasharray="5,5" className="animate-dash-offset-fast animation-delay-600" />
              </svg>
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
    <Card className="bg-card/50 border border-border/80 h-full hover:border-primary/30 hover:shadow-md transition-all group">
      <CardHeader className="pb-2">
        <div className="p-2 rounded-lg bg-primary/10 w-fit mb-2 group-hover:bg-primary/20 transition-colors">
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
    <Card className="h-full flex flex-col border-border/80 hover:border-primary/50 transition-colors hover:shadow-md group">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl group-hover:text-primary transition-colors">{name}</CardTitle>
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

// Animated section component
const AnimatedSection = ({ title, description, children }: { title: string; description: string; children: React.ReactNode }) => {
  return (
    <AnimationContainer className="w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">{title}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
      </div>
      {children}
    </AnimationContainer>
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
        <AnimatedSection 
          title="What Are Small Language Models?" 
          description="Small Language Models (SLMs) are compact, efficient AI models designed for specific tasks and resource-constrained environments">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="bg-card/50 border border-border/80 hover:border-primary/30 transition-colors hover:shadow-md">
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
                      className="text-sm py-1.5 border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors"
                    >
                      {model}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border border-border/80 hover:border-primary/30 transition-colors hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle>Typical Parameter Range</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  SLMs typically range from:
                </p>
                <div className="flex items-center justify-center">
                  <div className="w-full h-4 bg-primary/10 rounded-full relative">
                    <div className="absolute left-0 top-0 h-4 w-1/3 bg-primary/30 rounded-l-full"></div>
                    <div className="absolute inset-0 flex items-center justify-between px-4 text-xs">
                      <span>1M</span>
                      <span>3B</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 max-w-3xl mx-auto text-center">
            <p className="text-muted-foreground">
              Small Language Models represent a class of AI models that balance performance with efficiency. 
              With parameter counts ranging from a few million to a few billion, these models are designed 
              to perform specific tasks with exceptional speed and minimal resource requirements.
            </p>
          </div>
        </AnimatedSection>

        {/* Key Advantages */}
        <div id="features">
          <AnimatedSection 
            title="Key Advantages" 
            description="Small Language Models offer significant benefits for resource-constrained environments">
          <div className="grid md:grid-cols-3 gap-6">
            <SLMFeatureCard
              icon={Laptop}
              title="Lower Resource Footprint"
                description="Can run on standard CPUs or lower-tier GPUs, making them ideal for devices with limited memory including edge devices and mobile applications."
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

            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <SLMFeatureCard
                icon={Smartphone}
                title="On-Device Processing"
                description="Keep data local and improve privacy by processing information directly on user devices without sending sensitive data to the cloud."
              />
              <SLMFeatureCard
                icon={Shield}
                title="Enhanced Privacy"
                description="On-device processing means sensitive user data never leaves the device, making SLMs an excellent choice for privacy-sensitive applications."
              />
              <SLMFeatureCard
                icon={Gauge}
                title="Reduced Latency"
                description="Eliminate network round-trips to deliver near-instantaneous responses, critical for real-time applications and improved user experience."
              />
            </div>
          </AnimatedSection>
        </div>

        {/* SLM-Friendly Tasks */}
        <AnimatedSection 
          title="SLM-Friendly Tasks" 
          description="Applications where Small Language Models excel">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="bg-card/50 border border-border/80 hover:border-primary/30 transition-colors hover:shadow-md">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5 text-primary" />
                  <CardTitle>Text & Language Processing</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-card/30 hover:bg-primary/5 transition-colors">
                    <h4 className="font-medium mb-1">Text Classification</h4>
                    <p className="text-sm text-muted-foreground">
                      Sentiment analysis, spam detection, topic categorization, and intent recognition.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-card/30 hover:bg-primary/5 transition-colors">
                    <h4 className="font-medium mb-1">Named Entity Recognition</h4>
                    <p className="text-sm text-muted-foreground">
                      Identifying people, organizations, locations, and other entities in text.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-card/30 hover:bg-primary/5 transition-colors">
                    <h4 className="font-medium mb-1">Question Answering</h4>
                    <p className="text-sm text-muted-foreground">
                      Simple factual Q&A systems with predefined knowledge bases.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border border-border/80 hover:border-primary/30 transition-colors hover:shadow-md">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Server className="h-5 w-5 text-primary" />
                  <CardTitle>Deployment Scenarios</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-card/30 hover:bg-primary/5 transition-colors">
                    <h4 className="font-medium mb-1">Edge Devices</h4>
                    <p className="text-sm text-muted-foreground">
                      IoT devices, mobile phones, and other hardware with limited processing power.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-card/30 hover:bg-primary/5 transition-colors">
                    <h4 className="font-medium mb-1">Embedded Systems</h4>
                    <p className="text-sm text-muted-foreground">
                      Integration with hardware-constrained systems that require natural language understanding.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-card/30 hover:bg-primary/5 transition-colors">
                    <h4 className="font-medium mb-1">High-Volume Processing</h4>
                    <p className="text-sm text-muted-foreground">
                      Applications that need to process thousands of text samples per second with low latency.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </AnimatedSection>

        {/* Technical Innovations Section */}
        <AnimatedSection 
          title="Technical Innovations" 
          description="Advanced techniques that make SLMs efficient and powerful">
          <div className="grid md:grid-cols-3 gap-6">
            <SLMFeatureCard
              icon={Cpu}
              title="Quantization"
              description="Reduce precision of model weights from 32-bit float to 8-bit or even 4-bit integers, dramatically decreasing memory footprint while maintaining accuracy."
            />
            <SLMFeatureCard
              icon={Code}
              title="Knowledge Distillation"
              description="Train smaller models to mimic the behavior of larger ones, effectively condensing knowledge while reducing computational requirements."
            />
            <SLMFeatureCard
              icon={Lightbulb}
              title="Efficient Architectures"
              description="Specialized model designs like MobileBERT and TinyBERT optimize for speed and memory usage through architectural innovations."
            />
          </div>
        </AnimatedSection>

        {/* Featured SLM Models */}
        <div id="models">
          <AnimatedSection 
            title="Featured SLM Models" 
            description="Explore our collection of Small Language Models optimized for different use cases">
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
          </AnimatedSection>
        </div>

        {/* Real-world Applications */}
        <AnimatedSection 
          title="Real-world Applications" 
          description="How organizations leverage SLMs in production environments">
          <div className="grid md:grid-cols-3 gap-6">
            <SLMFeatureCard
              icon={FileCheck}
              title="Document Processing"
              description="Financial institutions use SLMs to automate document categorization, data extraction, and compliance verification on thousands of documents daily."
            />
            <SLMFeatureCard
              icon={Database}
              title="Customer Support"
              description="E-commerce companies deploy SLMs on their platforms to provide instant responses to common customer queries without routing to expensive larger models."
            />
            <SLMFeatureCard
              icon={Smartphone}
              title="Mobile Assistants"
              description="SLMs power on-device voice assistants that respond quickly to commands while preserving user privacy and functioning offline."
            />
          </div>
        </AnimatedSection>

        {/* CTA Section */}
        <AnimationContainer className="mt-20 w-full">
          <Card className="border-none shadow-md bg-gradient-to-br from-primary/5 to-primary/10 overflow-hidden relative group">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <CardContent className="pt-8 pb-8 relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Ready to Get Started with SLMs?</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Explore our platform and discover how Artintel can help you leverage the power of Small Language Models for your specific use case.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" className="rounded-full group-hover:bg-primary/90 transition-colors">
                  <Link href="/pricing">View Pricing Plans</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full group-hover:bg-primary/5 transition-colors"
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
