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
  BarChart3,
  Building2,
  LineChart,
  Lock,
  Rocket,
  Scale,
  Server,
  Settings,
  Sparkles,
  Zap,
  Globe,
  BookOpen,
  Database,
  Cpu,
  BarChart,
  Layers,
  Shield,
  Workflow,
  BrainCircuit,
  FileCheck,
  BarChart4,
  RefreshCw,
  UserCheck,
  Code,
  Bot,
  Layout,
  Lightbulb,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Custom FeatureCard component
const FeatureCard = ({
  title,
  description,
  icon: Icon,
  className,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  className?: string;
}) => {
  return (
    <Card className={`bg-card/50 border border-border/80 ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

// Custom FeaturesHero component
const FeaturesHero = () => {
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
              <span>Platform Features</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-4">
              Powerful{" "}
              <span className="text-primary">AI</span>{" "}
              Tools for Everyone
            </h1>

            <p className="text-lg text-muted-foreground mb-6">
              Discover the comprehensive suite of features that make Artintel the leading platform for discovering, fine-tuning, and deploying language models.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/pricing">View Pricing</Link>
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
            {/* Animated feature showcase */}
            <div className="relative w-[320px] h-[320px] rounded-full border border-primary/30 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-dashed border-primary/20 animate-[spin_60s_linear_infinite]"></div>
              <div className="absolute inset-2 rounded-full border border-dashed border-primary/20 animate-[spin_45s_linear_infinite_reverse]"></div>
              <div className="absolute inset-4 rounded-full border border-dashed border-primary/20 animate-[spin_30s_linear_infinite]"></div>

              {/* Feature icons */}
              {[
                { icon: Database, label: "Data Integration" },
                { icon: Cpu, label: "Fine-Tuning" },
                { icon: Server, label: "Deployment" },
                { icon: Shield, label: "Security" },
                { icon: BarChart, label: "Monitoring" },
                { icon: Workflow, label: "Workflows" },
              ].map((item, i) => {
                const rotation = i * (360 / 6);
                const distance = 130;
                const x = Math.cos((rotation * Math.PI) / 180) * distance;
                const y = Math.sin((rotation * Math.PI) / 180) * distance;
                const Icon = item.icon;

                return (
                  <div
                    key={i}
                    className="absolute flex flex-col items-center justify-center"
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                  >
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-1 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}>
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                  </div>
                );
              })}

              {/* Center sphere */}
              <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center backdrop-blur-sm border border-primary/30">
                <Sparkles className="h-8 w-8 text-primary" />
                <div className="absolute inset-0 rounded-full bg-primary/5 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

const FeaturesPage = () => {
  return (
    <>
      {/* Custom Hero Section */}
      <FeaturesHero />

      <Wrapper className="mb-12 mt-20 flex flex-col items-center justify-center">
        {/* Model Selection & Discovery */}
        <AnimationContainer className="w-full">
          <Card className="border-none shadow-md bg-card/30">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Model Selection & Discovery
              </CardTitle>
              <CardDescription>
                Find the perfect model for your specific use case
              </CardDescription>
            </CardHeader>
            <CardContent className="text-left space-y-4">
              <p>
                Artintel provides a curated catalog of language models, making it easy to find the right one for your specific needs:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <FeatureCard
                  title="Curated Model Catalog"
                  description="Browse a wide variety of models from small, resource-friendly options like DistilBERT to large-scale powerhouses like Falcon 180B."
                  icon={Server}
                />
                <FeatureCard
                  title="Intelligent Recommendations"
                  description="Filter by parameter size, licensing constraints, domain relevance, or memory usage to find the perfect model for your needs."
                  icon={Sparkles}
                />
              </div>
            </CardContent>
          </Card>
        </AnimationContainer>

        {/* Language Model Types */}
        <AnimationContainer className="mt-12 w-full">
          <Card className="border-none shadow-md bg-card/30">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Comprehensive Model Support
              </CardTitle>
              <CardDescription>
                Support for both Large and Small Language Models to fit any requirement
              </CardDescription>
            </CardHeader>
            <CardContent className="text-left space-y-4">
              <p>
                Artintel provides robust support for different types of language models, giving you flexibility to choose based on your specific requirements:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card className="bg-primary/5 border border-primary/20">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Rocket className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-xl">Large Language Models (LLMs)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-muted-foreground">
                      Powerful models with billions of parameters for advanced use cases requiring deep understanding and complex reasoning.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Advanced reasoning capabilities with multi-step problem solving</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Rich knowledge base from extensive pre-training</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Support for long contexts (8K-100K tokens)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Ideal for content generation, complex support, research</span>
                      </li>
                    </ul>
                    <div className="mt-4">
                      <Button asChild variant="outline" size="sm" className="rounded-full">
                        <Link href="/models/llm">Explore LLMs</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-primary/5 border border-primary/20">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Zap className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-xl">Small Language Models (SLMs)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-muted-foreground">
                      Efficient, lightweight models optimized for speed, low resource usage, and deployment in constrained environments.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Fast inference with sub-100ms latency</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Low resource requirements for edge deployment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Cost-effective for high-volume processing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>Ideal for mobile, IoT, and embedded systems</span>
                      </li>
                    </ul>
                    <div className="mt-4">
                      <Button asChild variant="outline" size="sm" className="rounded-full">
                        <Link href="/models/slm">Explore SLMs</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-4 text-center">
                <Button asChild className="rounded-full">
                  <Link href="/models/comparison">Compare LLMs vs SLMs</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </AnimationContainer>

        {/* Data Integration & Preprocessing */}
        <AnimationContainer className="mt-12 w-full">
          <Card className="border-none shadow-md bg-card/30">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Data Integration & Preprocessing
              </CardTitle>
              <CardDescription>
                Seamlessly connect and prepare your data
              </CardDescription>
            </CardHeader>
            <CardContent className="text-left space-y-4">
              <p>
                Easily ingest and prepare your data for model training with our comprehensive data tools:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <FeatureCard
                  title="Data Ingestion"
                  description="Upload local files or connect to cloud storage services like Amazon S3, Google Cloud Storage, and Azure Blob."
                  icon={Database}
                />
                <FeatureCard
                  title="Preprocessing Pipelines"
                  description="Automatically clean, deduplicate, and normalize your data. Detect and redact PII for compliance with HIPAA or GDPR."
                  icon={Workflow}
                />
              </div>
            </CardContent>
          </Card>
        </AnimationContainer>

        {/* Fine-Tuning Workflows */}
        <AnimationContainer className="mt-12 w-full">
          <Card className="border-none shadow-md bg-card/30">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Fine-Tuning Workflows
              </CardTitle>
              <CardDescription>
                Custom-tailor models to your specific data and use case
              </CardDescription>
            </CardHeader>
            <CardContent className="text-left space-y-4">
              <p>
                Adapt pre-trained models to your specific domain and tasks with our intuitive fine-tuning workflows:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <FeatureCard
                  title="No-Code Fine-Tuning Studio"
                  description="Our step-by-step wizard guides you through selecting a base model, choosing a dataset, configuring hyperparameters, and launching the training job."
                  icon={Settings}
                />
                <FeatureCard
                  title="Advanced Training Options"
                  description="For SLMs, leverage techniques like quantization and distillation. For LLMs, use parameter-efficient methods like LoRA to reduce GPU memory usage."
                  icon={BrainCircuit}
                />
              </div>
            </CardContent>
          </Card>
        </AnimationContainer>

        {/* Deployment & Serving */}
        <AnimationContainer className="mt-12 w-full">
          <Card className="border-none shadow-md bg-card/30">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Deployment & Serving
              </CardTitle>
              <CardDescription>
                Get your models into production with ease
              </CardDescription>
            </CardHeader>
            <CardContent className="text-left space-y-4">
              <p>
                Artintel offers versatile deployment options for models of all sizes:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <FeatureCard
                  title="One-Click Deploy"
                  description="Containerize your fine-tuned model, set up required dependencies, and deploy it to your selected environment with a single click."
                  icon={Rocket}
                />
                <FeatureCard
                  title="Versatile Deployment Options"
                  description="Deploy LLMs to high-performance cloud environments, or SLMs to edge devices, mobile applications, or embedded systems."
                  icon={Globe}
                />
              </div>
            </CardContent>
          </Card>
        </AnimationContainer>

        {/* Monitoring & Alerts */}
        <AnimationContainer className="mt-12 w-full">
          <Card className="border-none shadow-md bg-card/30">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Monitoring & Alerts
              </CardTitle>
              <CardDescription>
                Keep track of your models' performance in real-time
              </CardDescription>
            </CardHeader>
            <CardContent className="text-left space-y-4">
              <p>
                Monitor the performance of your deployed models and receive alerts when issues arise:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <FeatureCard
                  title="Real-Time Metrics"
                  description="Track latency, throughput, and hardware utilization in real-time dashboards to identify bottlenecks or scale needs."
                  icon={BarChart3}
                />
                <FeatureCard
                  title="Custom Alerts"
                  description="Set thresholds for latency, error rates, or costs, and receive notifications via email or Slack when these are breached."
                  icon={LineChart}
                />
              </div>
            </CardContent>
          </Card>
        </AnimationContainer>

        {/* Cost Management */}
        <AnimationContainer className="mt-12 w-full">
          <Card className="border-none shadow-md bg-card/30">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Cost Management
              </CardTitle>
              <CardDescription>
                Optimize your AI spending with transparent billing and cost controls
              </CardDescription>
            </CardHeader>
            <CardContent className="text-left space-y-4">
              <p>
                Keep your AI costs under control with our comprehensive cost management features:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <FeatureCard
                  title="Transparent Billing"
                  description="See detailed breakdowns of GPU hours, storage usage, and data transfer, with unified cost reporting across multiple clouds."
                  icon={Building2}
                />
                <FeatureCard
                  title="Auto-Scaling & Optimization"
                  description="Automatically scale resources up or down based on demand, and leverage quantization and distillation for cost-effective inference."
                  icon={RefreshCw}
                />
              </div>
            </CardContent>
          </Card>
        </AnimationContainer>

        {/* Security & Compliance */}
        <AnimationContainer className="mt-12 w-full">
          <Card className="border-none shadow-md bg-card/30">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Security & Compliance
              </CardTitle>
              <CardDescription>
                Protect your data and meet regulatory requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="text-left space-y-4">
              <p>
                Artintel takes security and compliance seriously, with features designed to protect your data and meet regulatory requirements:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <FeatureCard
                  title="End-to-End Encryption"
                  description="All data pipelines use HTTPS/TLS to ensure security in transit, while sensitive data is encrypted at rest."
                  icon={Lock}
                />
                <FeatureCard
                  title="Access Controls & Auditing"
                  description="Fine-grained access controls ensure that only authorized team members can access sensitive data or perform actions."
                  icon={UserCheck}
                />
              </div>
            </CardContent>
          </Card>
        </AnimationContainer>

        {/* Data Correction & Quality Enhancement */}
        <AnimationContainer className="mt-12 w-full">
          <Card className="border-none shadow-md bg-card/30">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Data Correction & Quality Enhancement
              </CardTitle>
              <CardDescription>
                Improve your training data for better model performance
              </CardDescription>
            </CardHeader>
            <CardContent className="text-left space-y-4">
              <p>
                Ensure your training data is high-quality to get the best results from your models:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <FeatureCard
                  title="Interactive Data Quality Dashboard"
                  description="Identify outliers, mislabeled examples, and inconsistent patterns in your training data with our interactive visualization tools."
                  icon={FileCheck}
                />
                <FeatureCard
                  title="Automated Data Enhancement"
                  description="Apply proven techniques like data augmentation, cleansing, and transformation to improve model performance."
                  icon={Sparkles}
                />
              </div>
            </CardContent>
          </Card>
        </AnimationContainer>

        {/* Mash AI Agent */}
        <AnimationContainer className="mt-12 w-full">
          <Card className="border-none shadow-md bg-card/30">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Mash AI Agent
              </CardTitle>
              <CardDescription>
                An intelligent assistant to guide you through the model selection and fine-tuning process
              </CardDescription>
            </CardHeader>
            <CardContent className="text-left space-y-4">
              <p>
                Get expert guidance at every step with our intelligent AI assistant:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <FeatureCard
                  title="AI-Powered Recommendations"
                  description="Receive personalized recommendations for model selection, data preparation, and training parameters based on your specific use case."
                  icon={Bot}
                />
                <FeatureCard
                  title="Interactive UI Creation"
                  description="Let Mash help you design effective UIs and dashboards for your AI applications with intelligent suggestions."
                  icon={Layout}
                />
              </div>
              <div className="mt-6 text-center">
                <Button asChild className="rounded-full">
                  <Link href="/mash-chatbot">Try Mash Agent</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </AnimationContainer>

        {/* Call-to-Action */}
        <AnimationContainer className="mt-16 w-full">
          <Card className="bg-primary/5 border border-primary/20">
            <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6 p-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">Ready to transform your AI capabilities?</h2>
                <p className="text-muted-foreground">
                  Start building with Artintel today and harness the power of both LLMs and SLMs for your applications.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/pricing">View Pricing</Link>
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
            </CardContent>
          </Card>
        </AnimationContainer>
      </Wrapper>
    </>
  );
};

export default FeaturesPage;
