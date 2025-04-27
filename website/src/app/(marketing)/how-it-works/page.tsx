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
  Database,
  Cpu,
  Server,
  BarChart,
  Rocket,
  Zap,
  ArrowRight,
  Search,
  FileText,
  Settings,
  Upload,
  Code,
  Globe,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Custom HowItWorksHero component
const HowItWorksHero = () => {
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
        <div className="text-center max-w-3xl mx-auto">
          <div className="mb-3 inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-sm text-primary">
            <Layers className="mr-1 h-3 w-3" />
            <span>Platform Overview</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-4">
            How{" "}
            <span className="text-primary">Artintel</span>{" "}
            Works
          </h1>

          <p className="text-lg text-muted-foreground mb-6">
            A step-by-step guide to discovering, fine-tuning, and deploying language models with our comprehensive platform.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
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
      </Wrapper>
    </div>
  );
};

// Custom ProcessStep component
const ProcessStep = ({
  number,
  title,
  description,
  icon: Icon,
  isLast = false,
}: {
  number: number;
  title: string;
  description: string;
  icon: React.ElementType;
  isLast?: boolean;
}) => {
  return (
    <div className="relative">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <span className="text-lg font-bold">{number}</span>
          </div>
          {!isLast && (
            <div className="absolute left-6 top-12 h-full w-px bg-primary/20 -translate-x-1/2"></div>
          )}
        </div>
        <div className="pt-1">
          <div className="flex items-center gap-2 mb-2">
            <Icon className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-bold">{title}</h3>
          </div>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};

// Custom FeatureHighlight component
const FeatureHighlight = ({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
}) => {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

const HowItWorksPage = () => {
  return (
    <>
      {/* Custom Hero Section */}
      <HowItWorksHero />

      <Wrapper className="mb-12 mt-20 flex flex-col items-center justify-center">
        {/* Platform Overview */}
        <AnimationContainer className="w-full">
          <Card className="border-none shadow-md bg-card/30">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Platform Overview
              </CardTitle>
              <CardDescription>
                Artintel simplifies the entire AI workflow
              </CardDescription>
            </CardHeader>
            <CardContent className="text-left space-y-4">
              <p>
                Artintel is a comprehensive, no-code platform that enables organizations to discover, fine-tune, and deploy open-source Large Language Models (LLMs) and Small Language Models (SLMs). It bridges the gap between cutting-edge AI research and practical industry applications, ensuring that even teams without deep machine learning expertise can leverage powerful language models for their unique use cases.
              </p>
              <div className="grid md:grid-cols-4 gap-6 mt-6">
                <Card className="bg-card/50 border border-border/80">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Search className="h-5 w-5 text-primary" />
                      <CardTitle className="text-base">Discover</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Find the perfect model for your specific use case from our curated catalog.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 border border-border/80">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Upload className="h-5 w-5 text-primary" />
                      <CardTitle className="text-base">Ingest</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Easily upload and preprocess your data for model training.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 border border-border/80">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-primary" />
                      <CardTitle className="text-base">Fine-Tune</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Customize models for your domain with our no-code interface.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 border border-border/80">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-primary" />
                      <CardTitle className="text-base">Deploy</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Launch your model to production with one click and monitor performance.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </AnimationContainer>

        {/* Step-by-Step Process */}
        <AnimationContainer className="mt-20 w-full">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Step-by-Step Process
          </h2>
          <div className="max-w-3xl mx-auto space-y-12">
            <ProcessStep
              number={1}
              title="Model Selection"
              description="Browse our curated catalog of language models, filtering by size, domain, license, or performance metrics. Our intelligent recommendation system can suggest the best model for your specific use case based on your requirements."
              icon={Search}
            />
            <ProcessStep
              number={2}
              title="Data Integration"
              description="Upload your data through our secure web interface or connect to cloud storage services like Amazon S3, Google Cloud Storage, or Azure Blob. Our automated preprocessing pipelines handle cleaning, deduplication, and PII detection."
              icon={Database}
            />
            <ProcessStep
              number={3}
              title="Fine-Tuning Configuration"
              description="Use our no-code fine-tuning studio to configure your training job. Our step-by-step wizard guides you through selecting hyperparameters, with smart defaults for beginners and advanced options for experts."
              icon={Settings}
            />
            <ProcessStep
              number={4}
              title="Training Execution"
              description="Launch your training job with a single click. Our platform automatically provisions the necessary infrastructure, whether it's a single GPU for smaller models or a multi-GPU cluster for larger ones. Monitor progress in real-time."
              icon={Cpu}
            />
            <ProcessStep
              number={5}
              title="Model Deployment"
              description="Deploy your fine-tuned model to production with our one-click deployment system. Choose between cloud, on-premises, or hybrid environments based on your needs. Set up authentication, rate limiting, and versioning."
              icon={Rocket}
            />
            <ProcessStep
              number={6}
              title="Monitoring & Optimization"
              description="Track your model's performance, costs, and usage patterns through our comprehensive dashboards. Receive alerts for anomalies and get recommendations for optimizing performance and reducing costs."
              icon={BarChart}
              isLast={true}
            />
          </div>
        </AnimationContainer>

        {/* Use Case Example */}
        <AnimationContainer className="mt-20 w-full">
          <Card className="border-none shadow-md bg-gradient-to-r from-primary/10 to-primary/5">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Use Case Example: Customer Support Chatbot
              </CardTitle>
              <CardDescription>
                See how a company might use Artintel to build an AI-powered customer support solution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                      <span className="text-sm font-bold">1</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Identify Requirements</h3>
                    <p className="text-sm text-muted-foreground">
                      The company determines they need a chatbot that can answer product questions, handle basic troubleshooting, and escalate complex issues to human agents.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                      <span className="text-sm font-bold">2</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Select Model</h3>
                    <p className="text-sm text-muted-foreground">
                      Using Artintel's model catalog, they filter for models optimized for conversational AI and select Mistral 7B as a good balance of performance and resource requirements.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                      <span className="text-sm font-bold">3</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Prepare Training Data</h3>
                    <p className="text-sm text-muted-foreground">
                      They upload their existing customer support transcripts, product documentation, and FAQs. Artintel's preprocessing pipeline automatically formats this into conversation pairs suitable for fine-tuning.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                      <span className="text-sm font-bold">4</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Fine-Tune Model</h3>
                    <p className="text-sm text-muted-foreground">
                      Using the no-code fine-tuning studio, they configure a training job with recommended hyperparameters. The platform spins up the necessary GPU resources and trains the model over several hours.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                      <span className="text-sm font-bold">5</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Deploy & Integrate</h3>
                    <p className="text-sm text-muted-foreground">
                      With one click, they deploy the fine-tuned model to a cloud environment. Artintel generates API endpoints that they integrate with their website and mobile app using the provided code snippets.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                      <span className="text-sm font-bold">6</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Monitor & Improve</h3>
                    <p className="text-sm text-muted-foreground">
                      They use Artintel's dashboards to track user satisfaction, response accuracy, and costs. Based on this data, they periodically update the model with new training data to improve performance.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimationContainer>

        {/* Key Platform Components */}
        <AnimationContainer className="mt-20 w-full">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Key Platform Components
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-card/50 border border-border/80">
              <CardHeader>
                <CardTitle className="text-xl">Model Selection Module</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <FeatureHighlight
                    title="Curated Model Catalog"
                    description="A constantly updated directory of recommended models, focusing on reliability, license clarity, and robust performance."
                    icon={FileText}
                  />
                  <FeatureHighlight
                    title="Performance Benchmarks"
                    description="Comprehensive metrics on model performance across various tasks and domains to help you make informed decisions."
                    icon={BarChart}
                  />
                  <FeatureHighlight
                    title="Smart Recommendations"
                    description="AI-powered suggestions based on your specific use case, data characteristics, and resource constraints."
                    icon={Zap}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 border border-border/80">
              <CardHeader>
                <CardTitle className="text-xl">Data Integration Module</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <FeatureHighlight
                    title="Flexible Data Ingestion"
                    description="Support for various file formats and data sources, including local uploads, cloud storage, and database connections."
                    icon={Database}
                  />
                  <FeatureHighlight
                    title="Automated Preprocessing"
                    description="Built-in pipelines for cleaning, deduplication, and formatting your data for optimal training results."
                    icon={Settings}
                  />
                  <FeatureHighlight
                    title="Privacy & Compliance"
                    description="Automatic detection and handling of personally identifiable information (PII) to ensure compliance with regulations."
                    icon={Server}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 border border-border/80">
              <CardHeader>
                <CardTitle className="text-xl">Fine-Tuning Engine</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <FeatureHighlight
                    title="No-Code Interface"
                    description="Intuitive wizard for configuring training jobs without requiring deep technical knowledge."
                    icon={Settings}
                  />
                  <FeatureHighlight
                    title="Scalable Infrastructure"
                    description="Automatic provisioning of the right computing resources, from single GPUs to multi-node clusters."
                    icon={Cpu}
                  />
                  <FeatureHighlight
                    title="Experiment Tracking"
                    description="Comprehensive logging of training runs, allowing you to compare different approaches and configurations."
                    icon={BarChart}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 border border-border/80">
              <CardHeader>
                <CardTitle className="text-xl">Deployment & Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <FeatureHighlight
                    title="One-Click Deployment"
                    description="Streamlined process for containerizing and deploying your model to your chosen environment."
                    icon={Rocket}
                  />
                  <FeatureHighlight
                    title="API Management"
                    description="Built-in tools for creating, securing, and managing API endpoints for your models."
                    icon={Code}
                  />
                  <FeatureHighlight
                    title="Performance Analytics"
                    description="Real-time dashboards for monitoring usage, latency, costs, and other key metrics."
                    icon={BarChart}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
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
              <Link href="/contact">Request Demo</Link>
            </Button>
          </div>
        </AnimationContainer>
      </Wrapper>
    </>
  );
};

export default HowItWorksPage;
