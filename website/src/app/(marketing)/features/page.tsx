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
import MacbookShowcase from "@/components/MacbookShowcase";
import FlipCard from "@/components/FlipCard";
import SplitComparisonSection from "@/components/SplitComparisonSection";

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
  // Define features to display in the MacbookShowcase
  const features = [
    {
      title: "Model Selection & Discovery",
      description: "Find the perfect model for your specific needs with our curated catalog."
    },
    {
      title: "Data Integration & Preprocessing",
      description: "Easily connect to your data sources and prepare data for training."
    },
    {
      title: "Fine-Tuning Workflows",
      description: "Adapt models to your domain with our no-code fine-tuning studio."
    },
    {
      title: "Deployment & Serving",
      description: "Deploy models to any environment with just a few clicks."
    },
    {
      title: "Monitoring & Alerts",
      description: "Track model performance and receive alerts when issues arise."
    },
    {
      title: "Security & Compliance",
      description: "Enterprise-grade security with end-to-end encryption and access controls."
    }
  ];

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

          <div className="relative flex items-center justify-center">
            {/* Replace the previous animated showcase with MacbookShowcase */}
            <MacbookShowcase features={features} />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

const FeaturesPage = () => {
  // Define comparison metrics for the SplitComparisonSection
  const modelMetrics = [
    {
      id: "latency",
      label: "Inference Latency",
      llmValue: "300-1500ms",
      slmValue: "20-100ms",
      description: "Inference latency measures the time it takes to generate a response. SLMs excel at low latency, making them ideal for real-time applications, while LLMs may take longer but can generate more complex responses."
    },
    {
      id: "memory",
      label: "Memory Requirements",
      llmValue: "8-80GB",
      slmValue: "500MB-4GB",
      description: "Memory requirements affect where and how you can deploy models. SLMs can run on edge devices with limited memory, while LLMs typically need substantial GPU/TPU resources."
    },
    {
      id: "accuracy",
      label: "Task Accuracy",
      llmValue: "90-98%",
      slmValue: "75-90%",
      description: "Accuracy on standard benchmarks varies by task. LLMs tend to perform better on complex reasoning tasks, while SLMs can be competitive on specialized, narrow tasks."
    },
    {
      id: "tokensec",
      label: "Tokens/Second",
      llmValue: "10-50",
      slmValue: "100-500",
      description: "Processing speed in tokens per second affects throughput. SLMs generate text much faster, allowing for higher throughput in production environments."
    },
    {
      id: "cost",
      label: "Monthly Serving Cost",
      llmValue: "$500-5,000",
      slmValue: "$50-500",
      description: "Hosting costs vary based on usage patterns, but SLMs are typically an order of magnitude less expensive to serve than LLMs for similar workloads."
    }
  ];

  return (
    <>
      {/* Custom Hero Section */}
      <FeaturesHero />

      <Wrapper className="mb-12 mt-20 flex flex-col items-center justify-center">
        {/* Model Selection & Discovery - Updated with FlipCards */}
        <AnimationContainer className="w-full">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Model Selection & Discovery</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Find the perfect model for your specific use case with our intelligent discovery tools
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <FlipCard 
              frontTitle="Curated Model Catalog"
              frontDescription="Access a handpicked selection of the best open-source language models, pre-tested and ready to deploy."
              frontIcon={<Server className="h-5 w-5" />}
              backTitle="Extensive Model Library"
              backDescription="Browse and compare over 200 models across different specialties, sizes, and capabilities."
              backDetails={
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Filter by parameter count, license type, and performance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Detailed model cards with benchmarks and ideal use cases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Community reviews and ratings for each model</span>
                  </li>
                </ul>
              }
              buttonText="Browse Models"
              buttonHref="/models"
            />
            
            <FlipCard 
              frontTitle="Intelligent Recommendations"
              frontDescription="Our AI assistant helps you find the ideal model based on your specific requirements and constraints."
              frontIcon={<Sparkles className="h-5 w-5" />}
              backTitle="Smart Model Matching"
              backDescription="Answer a few questions about your use case, and we'll recommend the perfect model."
              backDetails={
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Personalized recommendations based on your priorities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Compare similar models head-to-head</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Get alerted when better models for your use case are released</span>
                  </li>
                </ul>
              }
              buttonText="Get Recommendations"
              buttonHref="/models/finder"
            />
            
            <FlipCard 
              frontTitle="Benchmarking Tools"
              frontDescription="Evaluate model performance on your specific tasks and datasets before committing to a selection."
              frontIcon={<BarChart className="h-5 w-5" />}
              backTitle="Custom Evaluation Suite"
              backDescription="Test models against your own data to find the best performer for your specific needs."
              backDetails={
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Upload your test dataset and define evaluation metrics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Run comparative evaluations across multiple models</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Detailed reports with accuracy, latency, and cost metrics</span>
                  </li>
                </ul>
              }
              buttonText="Start Benchmarking"
              buttonHref="/models/benchmark"
            />
          </div>
        </AnimationContainer>

        {/* Comprehensive Model Support - Updated with SplitComparisonSection */}
        <AnimationContainer className="mt-24 w-full">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Model Support</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Artintel gives you the flexibility to work with both Large and Small Language Models
            </p>
          </div>
          
          <SplitComparisonSection 
            llmTitle="Large Language Models (LLMs)"
            llmDescription="Powerful models with billions of parameters for advanced use cases requiring deep understanding and complex reasoning."
            slmTitle="Small Language Models (SLMs)"
            slmDescription="Efficient, lightweight models optimized for speed, low resource usage, and deployment in constrained environments."
            metrics={modelMetrics}
            className="mt-8"
          />
          
          <div className="mt-12 text-center">
            <Button asChild className="rounded-full">
              <Link href="/models/comparison">View Detailed Comparison</Link>
            </Button>
          </div>
        </AnimationContainer>

        {/* Data Integration & Preprocessing */}
        <AnimationContainer className="mt-24 w-full">
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
