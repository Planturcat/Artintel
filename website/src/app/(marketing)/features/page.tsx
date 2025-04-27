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
    <Card className={`bg-card/50 border border-border/80 ${className} relative group overflow-hidden transition-all hover:border-primary/30 hover:shadow-md hover:shadow-primary/5`}>
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
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

// Interactive feature section with animated SVG path connection
const ConnectedFeatureSection = ({ title, description, children }: { title: string; description: string; children: React.ReactNode }) => {
  return (
    <AnimationContainer className="w-full mt-12">
      <Card className="border-none shadow-md bg-card/30 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-20"></div>
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="text-left space-y-4 relative">
          {/* Connection paths as SVG - decorative only */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <path d="M100,50 C150,30 250,120 300,80" stroke="#00CBDD" strokeWidth="2" fill="none" strokeDasharray="5,5" />
              <path d="M300,150 C350,100 450,200 500,150" stroke="#00CBDD" strokeWidth="2" fill="none" strokeDasharray="5,5" />
              <path d="M100,200 C200,250 300,150 400,250" stroke="#00CBDD" strokeWidth="2" fill="none" strokeDasharray="5,5" />
            </svg>
          </div>
          {children}
        </CardContent>
      </Card>
    </AnimationContainer>
  );
};

const FeaturesPage = () => {
  return (
    <>
      {/* Custom Hero Section */}
      <FeaturesHero />

      <Wrapper className="mb-12 mt-20 flex flex-col items-center justify-center">
        {/* Model Selection & Discovery */}
        <ConnectedFeatureSection 
          title="Model Selection & Discovery" 
          description="Find the perfect model for your specific use case">
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
        </ConnectedFeatureSection>

        {/* Language Model Types */}
        <ConnectedFeatureSection 
          title="Comprehensive Model Support" 
          description="Support for both Large and Small Language Models to fit any requirement">
          <p>
            Artintel provides robust support for different types of language models, giving you flexibility to choose based on your specific requirements:
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card className="bg-primary/5 border border-primary/20 hover:shadow-md transition-all hover:shadow-primary/5">
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
            
            <Card className="bg-primary/5 border border-primary/20 hover:shadow-md transition-all hover:shadow-primary/5">
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
        </ConnectedFeatureSection>

        {/* Data Integration & Preprocessing */}
        <ConnectedFeatureSection 
          title="Data Integration & Preprocessing" 
          description="Seamlessly connect and prepare your data">
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
        </ConnectedFeatureSection>

        {/* Fine-Tuning Workflows */}
        <ConnectedFeatureSection 
          title="Fine-Tuning Workflows" 
          description="Custom-tailor models to your specific data and use case">
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
        </ConnectedFeatureSection>

        {/* Deployment & Serving */}
        <ConnectedFeatureSection 
          title="Deployment & Serving" 
          description="Get your models into production with ease">
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
        </ConnectedFeatureSection>

        {/* Monitoring & Alerts */}
        <ConnectedFeatureSection 
          title="Monitoring & Alerts" 
          description="Keep track of your models' performance in real-time">
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
        </ConnectedFeatureSection>

        {/* Cost Management */}
        <ConnectedFeatureSection 
          title="Cost Management" 
          description="Optimize your AI spending with transparent billing and cost controls">
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
        </ConnectedFeatureSection>

        {/* Security & Compliance */}
        <ConnectedFeatureSection 
          title="Security & Compliance" 
          description="Protect your data and meet regulatory requirements">
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
        </ConnectedFeatureSection>

        {/* Data Correction & Quality Enhancement */}
        <ConnectedFeatureSection 
          title="Data Correction & Quality Enhancement" 
          description="Improve your training data for better model performance">
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
        </ConnectedFeatureSection>

        {/* Mash AI Agent */}
        <ConnectedFeatureSection 
          title="Mash AI Agent" 
          description="An intelligent assistant to guide you through the model selection and fine-tuning process">
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
        </ConnectedFeatureSection>

        {/* Industry-Specific Solutions */}
        <ConnectedFeatureSection 
          title="Industry-Specific Solutions" 
          description="Tailored AI implementations for various sectors">
          <p>
            Artintel provides specialized solutions for different industries with unique requirements:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              title="Healthcare"
              description="HIPAA-compliant AI solutions for medical coding, clinical documentation, patient engagement, and healthcare analytics."
              icon={Shield}
            />
            <FeatureCard
              title="Finance"
              description="Secure models for fraud detection, risk assessment, automated underwriting, and regulatory compliance."
              icon={Building2}
            />
            <FeatureCard
              title="Legal"
              description="AI tools for contract analysis, legal research, document review, and compliance monitoring."
              icon={Scale}
            />
          </div>
        </ConnectedFeatureSection>

        {/* Call-to-Action */}
        <AnimationContainer className="mt-16 w-full">
          <Card className="bg-primary/5 border border-primary/20 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
            <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 relative z-10">
              <div>
                <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Ready to transform your AI capabilities?</h2>
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
