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
                Customize models for your specific domain
              </CardDescription>
            </CardHeader>
            <CardContent className="text-left space-y-4">
              <p>
                Tailor language models to your specific domain with our intuitive fine-tuning tools:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <FeatureCard
                  title="No-Code Fine-Tuning Studio"
                  description="A step-by-step wizard guides you through selecting a base model, choosing a dataset, configuring hyperparameters, and launching the training job."
                  icon={Settings}
                />
                <FeatureCard
                  title="Training Infrastructure"
                  description="Automatically spin up GPU instances on AWS, Azure, or GCP, or use your own on-premises hardware for training."
                  icon={Cpu}
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
                Get your models into production quickly and reliably
              </CardDescription>
            </CardHeader>
            <CardContent className="text-left space-y-4">
              <p>
                Deploy your fine-tuned models to production with just a few clicks:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <FeatureCard
                  title="One-Click Deploy"
                  description="Containerize your fine-tuned model, set up dependencies, and push it to your chosen environment (cloud, on-prem, or hybrid) with a single click."
                  icon={Rocket}
                />
                <FeatureCard
                  title="Inference Endpoints"
                  description="Create flexible REST or gRPC endpoints with built-in authentication, rate limiting, and version management for safe iteration."
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
                Keep track of performance and costs
              </CardDescription>
            </CardHeader>
            <CardContent className="text-left space-y-4">
              <p>
                Monitor your models' performance and costs in real-time:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <FeatureCard
                  title="Real-Time Metrics"
                  description="Track latency, throughput, hardware utilization, and other key metrics to identify bottlenecks and scaling needs."
                  icon={BarChart}
                />
                <FeatureCard
                  title="Custom Alerts"
                  description="Set up threshold-based alerts for latency, error rates, costs, and performance regressions to stay informed about your models."
                  icon={BarChart3}
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
                Enterprise-grade security for sensitive data
              </CardDescription>
            </CardHeader>
            <CardContent className="text-left space-y-4">
              <p>
                Protect your data and models with our comprehensive security features:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <FeatureCard
                  title="End-to-End Encryption"
                  description="All data pipelines use HTTPS/TLS for transit, while sensitive data is stored encrypted at rest with robust cloud or on-prem solutions."
                  icon={Lock}
                />
                <FeatureCard
                  title="Access Controls & Auditing"
                  description="Fine-grained role-based access controls and comprehensive logging ensure only authorized users can access sensitive resources."
                  icon={Shield}
                />
              </div>
            </CardContent>
          </Card>
        </AnimationContainer>

        {/* CTA Section */}
        <AnimationContainer className="mt-20 w-full text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience the power of Artintel's comprehensive platform for yourself. Choose the plan that's right for your organization and start building AI-powered applications today.
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

export default FeaturesPage;
