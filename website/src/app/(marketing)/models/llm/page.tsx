import React from "react";
import Wrapper from "@/components/global/wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Brain,
  Database,
  Cpu,
  HardDrive,
  Zap,
  Rocket,
  Globe,
  BarChart,
  Server,
  FileText,
  Clock,
  CheckCircle,
  Code,
  BookOpen,
  Network,
  Lightbulb,
  Shield,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import AnimationContainer from "@/components/global/animation-container";
import { Metadata } from "next";
import MacbookShowcase from "@/components/MacbookShowcase";

export const metadata: Metadata = {
  title: "Large Language Models (LLMs) | Artintel",
  description: "Large Language Models (LLMs) for complex AI tasks, advanced reasoning and powerful understanding with Artintel's platform.",
};

// Custom LLMFeatureCard component
const LLMFeatureCard = ({
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

// Custom LLMHero component
const LLMHero = () => {
  // Define LLM-specific features for the MacbookShowcase
  const llmFeatures = [
    {
      title: "Advanced Reasoning",
      description: "Solve complex multi-step problems with sophisticated logical reasoning capabilities"
    },
    {
      title: "Rich Knowledge Base",
      description: "Access extensive pre-trained knowledge spanning diverse domains and topics"
    },
    {
      title: "Long Context Windows",
      description: "Process 8K-100K tokens for comprehensive document analysis and extended conversations"
    },
    {
      title: "Creative Generation",
      description: "Generate high-quality content across formats including text, code, and creative writing"
    },
    {
      title: "Multi-task Capabilities",
      description: "Perform diverse tasks from summarization to translation without specialized fine-tuning"
    },
    {
      title: "Complex Instruction Following",
      description: "Execute sophisticated, multi-part instructions with nuanced understanding"
    }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-background/90 py-20 md:py-24">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/4 top-1/4 h-80 w-80 rounded-full bg-primary/10 blur-[120px]"></div>
        <div className="absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-primary/10 blur-[120px]"></div>
      </div>

      {/* Neural network visualization - distinctive to LLM page */}
      <div className="absolute inset-0 z-0 opacity-15 overflow-hidden">
        <svg width="100%" height="100%" viewBox="0 0 1000 800" className="absolute inset-0">
          <g className="nodes">
            {Array.from({ length: 18 }).map((_, i) => (
              <circle 
                key={i} 
                r="8" 
                cx={200 + Math.random() * 600} 
                cy={100 + Math.random() * 600}
                fill="#00CBDD" 
                className="animate-pulse-slow" 
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </g>
          <g className="links">
            {Array.from({ length: 30 }).map((_, i) => (
              <line 
                key={i} 
                x1={200 + Math.random() * 600} 
                y1={100 + Math.random() * 600}
                x2={200 + Math.random() * 600} 
                y2={100 + Math.random() * 600}
                stroke="#00CBDD" 
                strokeOpacity="0.3" 
                strokeWidth="1.5"
                className="animate-dash-offset"
                style={{ animationDelay: `${i * 0.07}s` }}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* Grid pattern background with deeper opacity - distinctive to LLM page */}
      <div className="absolute inset-0 z-0 opacity-7">
        <div className="h-full w-full grid grid-cols-12 grid-rows-6">
          {Array.from({ length: 72 }).map((_, i) => (
            <div key={i} className="border border-primary/30" />
          ))}
        </div>
      </div>

      <Wrapper className="relative z-10">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div>
            <div className="mb-3 inline-flex items-center rounded-full border border-primary/40 bg-primary/5 px-3 py-1 text-sm text-primary">
              <Brain className="mr-1 h-3 w-3" />
              <span>Large Language Models</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-4">
              <span className="text-primary">Powerful</span>{" "}
              Intelligence for{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Complex Tasks</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-6">
              Large Language Models (LLMs) deliver remarkable reasoning, knowledge, and generation capabilities for advanced applications that require deep understanding and sophisticated responses.
            </p>

            <div className="mb-8 grid grid-cols-3 gap-4">
              <div className="rounded-lg border border-primary/20 bg-card/30 p-3 backdrop-blur-sm hover:bg-primary/5 transition-colors duration-300">
                <div className="mb-1 flex items-center">
                  <Brain className="mr-1 h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    Powerful
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Deep understanding
                </p>
              </div>
              <div className="rounded-lg border border-primary/20 bg-card/30 p-3 backdrop-blur-sm hover:bg-primary/5 transition-colors duration-300">
                <div className="mb-1 flex items-center">
                  <Database className="mr-1 h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    Context
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  8K-100K tokens
                </p>
              </div>
              <div className="rounded-lg border border-primary/20 bg-card/30 p-3 backdrop-blur-sm hover:bg-primary/5 transition-colors duration-300">
                <div className="mb-1 flex items-center">
                  <Rocket className="mr-1 h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    Advanced
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Multi-step reasoning
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary">
                <Link href="#models">
                  Browse LLM Models
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-primary/30 hover:bg-primary/5"
              >
                <Link href="#features">
                  Learn More About LLMs
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            {/* Using MacbookShowcase to display LLM features */}
            <div className="relative z-10 w-full">
              <MacbookShowcase features={llmFeatures} rotationSpeed={8} featureChangeInterval={3500} />
                    </div>
            
            {/* Additional decorative elements specific to LLM page */}
            <div className="absolute inset-0 z-0 opacity-30">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-primary/20 animate-pulse-slow"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-primary/10 animate-pulse-slow animation-delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 rounded-full border border-primary/5 animate-pulse-slow animation-delay-2000"></div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

// Animated section component
const AnimatedSection = ({ title, description, children }: { title: string; description: string; children: React.ReactNode }) => {
  return (
    <AnimationContainer className="w-full mt-12">
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

// Model Card component
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
            LLM
          </Badge>
        </div>
        <div className="flex items-center text-xs text-muted-foreground mt-1">
          <Brain className="mr-1 h-3 w-3" />
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
          <FileText className="mr-1 h-3 w-3" />
          <span>License: {license}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default function LLMModelPage() {
  return (
    <>
      {/* Hero Section */}
      <LLMHero />

      <Wrapper className="mb-12 mt-12 flex flex-col items-center justify-center">
        {/* Definition Section */}
        <AnimatedSection 
          title="What Are Large Language Models?" 
          description="LLMs are sophisticated neural networks with billions of parameters, trained on vast text datasets">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-muted-foreground">
              Large Language Models (LLMs) typically range from a few billion to hundreds of billions of parameters. 
              These sophisticated neural networks are trained on vast datasets to understand and generate human-like text,
              demonstrating remarkable capabilities in reasoning, knowledge retrieval, and creative generation.
            </p>
          </div>
        </AnimatedSection>

        {/* Key Strengths Section */}
        <AnimatedSection 
          title="Key Strengths of LLMs" 
          description="Advanced capabilities that make LLMs powerful tools for complex tasks">
          <div className="grid md:grid-cols-3 gap-6">
            <LLMFeatureCard
              title="Advanced Reasoning"
              description="LLMs can handle complex multi-step reasoning tasks, including problem-solving, logical deduction, and creative ideation."
              icon={Brain}
            />
            <LLMFeatureCard
              title="Rich Knowledge"
              description="Pre-trained on vast internet-scale datasets, LLMs contain extensive knowledge spanning diverse domains and topics."
              icon={Database}
            />
            <LLMFeatureCard
              title="Long Context Windows"
              description="With context windows of 8K-100K tokens, LLMs can process entire documents and maintain coherence across lengthy conversations."
              icon={FileText}
            />
            <LLMFeatureCard
              title="Creative Generation"
              description="From poetry to code, LLMs can generate highly creative, diverse, and contextually appropriate content across formats."
              icon={Rocket}
            />
            <LLMFeatureCard
              title="Multi-task Capability"
              description="A single LLM can perform numerous tasks without task-specific fine-tuning, from translation to summarization to code generation."
              icon={Globe}
            />
            <LLMFeatureCard
              title="Nuanced Understanding"
              description="LLMs demonstrate robust comprehension of subtle contexts, implied meanings, and complex instructions."
              icon={CheckCircle}
            />
          </div>
        </AnimatedSection>

        {/* Advanced Capabilities Section */}
        <AnimatedSection 
          title="Advanced Capabilities" 
          description="What makes LLMs particularly powerful for complex tasks">
          <div className="grid md:grid-cols-3 gap-6">
            <LLMFeatureCard
              title="Emergent Abilities"
              description="As models scale, they develop unexpected capabilities that weren't explicitly trained for, such as chain-of-thought reasoning and multi-step planning."
              icon={Lightbulb}
            />
            <LLMFeatureCard
              title="Zero/Few-shot Learning"
              description="LLMs can perform new tasks with minimal or no examples, generalizing their knowledge to unfamiliar problems."
              icon={Zap}
            />
            <LLMFeatureCard
              title="Cross-domain Transfer"
              description="Knowledge acquired in one domain can be applied to other domains, enabling versatile applications across different fields."
              icon={Network}
            />
          </div>
        </AnimatedSection>

        {/* Popular Models Section */}
        <AnimatedSection 
          title="Popular LLM Models" 
          description="Leading Large Language Models with exceptional capabilities" 
          id="models">
          <div className="grid md:grid-cols-3 gap-6">
            <ModelCard
              name="GPT-4"
              description="OpenAI's most advanced LLM, featuring exceptional reasoning, knowledge, and instruction-following capabilities."
              parameterCount="~1.8T (estimated)"
              domains={["General", "Reasoning", "Code", "Writing"]}
              license="Proprietary"
            />
            <ModelCard
              name="Claude 3 Opus"
              description="Anthropic's most capable model, designed for complex tasks requiring deep understanding and nuanced responses."
              parameterCount="~175B (estimated)"
              domains={["General", "Reasoning", "Safety"]}
              license="Proprietary"
            />
            <ModelCard
              name="Llama 2 70B"
              description="Meta's open-source LLM offering strong performance across a wide range of tasks with an open license."
              parameterCount="70B"
              domains={["General", "Instruction", "Chat"]}
              license="Llama 2 Community License"
            />
            <ModelCard
              name="Falcon 180B"
              description="One of the largest open-source models, trained on a diverse dataset with strong performance across benchmarks."
              parameterCount="180B"
              domains={["General", "Science", "Research"]}
              license="Apache 2.0"
            />
            <ModelCard
              name="Mistral 7B"
              description="Compact but powerful model that outperforms many larger LLMs, optimized for efficiency and performance."
              parameterCount="7B"
              domains={["General", "Instruction", "Efficiency"]}
              license="Apache 2.0"
            />
            <ModelCard
              name="CodeLlama 34B"
              description="Specialized for code generation and understanding, with enhanced performance on programming tasks."
              parameterCount="34B"
              domains={["Code", "Programming", "Technical"]}
              license="Llama 2 Community License"
            />
          </div>
        </AnimatedSection>

        {/* Enterprise Applications */}
        <AnimatedSection 
          title="Enterprise Applications" 
          description="How organizations are using LLMs to transform their operations">
          <div className="grid md:grid-cols-3 gap-6">
            <LLMFeatureCard
              title="Content Creation"
              description="Marketing teams leverage LLMs to generate blogs, social media content, product descriptions, and email campaigns at scale."
              icon={BookOpen}
            />
            <LLMFeatureCard
              title="Research Assistance"
              description="Research teams use LLMs to analyze scientific literature, generate hypotheses, and summarize complex findings across disciplines."
              icon={Lightbulb}
            />
            <LLMFeatureCard
              title="Conversational AI"
              description="Customer service operations deploy LLMs to handle complex support issues, providing detailed, contextual responses to user queries."
              icon={Globe}
            />
          </div>
        </AnimatedSection>

        {/* Resource Requirements Section */}
        <AnimatedSection 
          title="Resource Requirements" 
          description="Hardware considerations for deploying Large Language Models">
          <Card className="bg-card/50 border border-border/80 hover:border-primary/30 transition-colors hover:shadow-md overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30"></div>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <HardDrive className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-medium">Memory Requirements</h3>
                  </div>
                  <p className="text-muted-foreground">
                    LLMs typically require significant memory resources:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>7B parameter models: 14GB+ in FP16 precision</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>13B parameter models: 26GB+ in FP16 precision</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>70B parameter models: 140GB+ in FP16 precision</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Memory requirements scale with context length</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Server className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-medium">Hardware Recommendations</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Optimal LLM deployment typically requires:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Consumer: NVIDIA RTX 4090 (24GB) for smaller LLMs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Professional: NVIDIA A100 (40/80GB) for mid-size LLMs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Enterprise: Multiple A100s or H100s for 70B+ models</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>Quantization can reduce requirements by 2-4x</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Optimization Techniques */}
        <AnimatedSection 
          title="Optimization Techniques" 
          description="Methods to make LLM deployment more efficient and cost-effective">
          <div className="grid md:grid-cols-3 gap-6">
            <LLMFeatureCard
              title="Quantization"
              description="Reduce model precision from 32-bit or 16-bit floating-point to 8-bit integers or lower, decreasing memory usage while maintaining most of the performance."
              icon={Cpu}
            />
            <LLMFeatureCard
              title="Parameter-Efficient Fine-Tuning"
              description="Techniques like LoRA and QLoRA allow adapting LLMs to specific tasks by training only a small number of additional parameters."
              icon={Zap}
            />
            <LLMFeatureCard
              title="Model Pruning"
              description="Remove unnecessary connections in the neural network to create more compact models with similar capabilities."
              icon={Shield}
            />
          </div>
        </AnimatedSection>

        {/* Call to Action */}
        <AnimationContainer className="w-full mt-16">
          <Card className="bg-primary/5 border border-primary/20 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
            <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 pb-6 relative z-10">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Ready to leverage the power of LLMs?</h2>
                <p className="text-muted-foreground">
                  Artintel provides a comprehensive platform to help you discover, fine-tune, and deploy LLMs for your specific use cases.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="rounded-full group-hover:bg-primary/90 transition-colors">
                  <Link href="/features">Explore Features</Link>
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
}
