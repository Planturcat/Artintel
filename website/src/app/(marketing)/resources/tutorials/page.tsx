import React from "react";
import Wrapper from "@/components/global/wrapper";
import AnimationContainer from "@/components/global/animation-container";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  GraduationCap,
  ArrowRight,
  Clock,
  Filter,
  Search,
  Cpu,
  BrainCircuit,
  Code,
  Database,
  LineChart,
  Settings,
  Layers,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Tutorials | Artintel Resources",
  description:
    "Step-by-step guides and walkthroughs for common tasks and use cases, from model selection to deployment and monitoring.",
};

// Custom TutorialsHero component
const TutorialsHero = () => {
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
            <GraduationCap className="mr-1 h-3 w-3" />
            <span>Learning Center</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-4">
            Artintel{" "}
            <span className="text-primary">Tutorials</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-6">
            Step-by-step guides and walkthroughs to help you get the most out of the Artintel platform, from model selection to deployment and optimization.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="relative flex-1 max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search tutorials..."
                className="pl-10 pr-10 py-6 rounded-full"
              />
              <Button size="sm" className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full h-8">
                Search
              </Button>
            </div>
            <Button variant="outline" className="rounded-full flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

// Custom TutorialCard component
const TutorialCard = ({
  title,
  description,
  category,
  difficulty,
  duration,
  href,
  icon: Icon,
}: {
  title: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  href: string;
  icon: React.ElementType;
}) => {
  return (
    <Card className="h-full flex flex-col border-border/80 hover:border-primary/50 transition-colors">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <Badge variant="outline" className="rounded-full">
            {category}
          </Badge>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{duration}</span>
          </div>
          <Badge 
            variant="secondary" 
            className={`text-xs ${
              difficulty === "Beginner" 
                ? "bg-green-500/10 text-green-500" 
                : difficulty === "Intermediate" 
                ? "bg-yellow-500/10 text-yellow-500" 
                : "bg-red-500/10 text-red-500"
            }`}
          >
            {difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80 hover:bg-transparent">
          <Link href={href} className="flex items-center">
            View Tutorial <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

// Main Page Component
const TutorialsPage = () => {
  return (
    <>
      {/* Hero Section */}
      <TutorialsHero />

      <Wrapper className="mb-12 mt-12 flex flex-col items-center justify-center">
        {/* Tutorial Categories */}
        <AnimationContainer className="w-full">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="rounded-full">
                <TabsTrigger value="all" className="rounded-full">All Tutorials</TabsTrigger>
                <TabsTrigger value="getting-started" className="rounded-full">Getting Started</TabsTrigger>
                <TabsTrigger value="fine-tuning" className="rounded-full">Fine-Tuning</TabsTrigger>
                <TabsTrigger value="deployment" className="rounded-full">Deployment</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <TutorialCard
                  title="Getting Started with Artintel"
                  description="Learn the basics of the Artintel platform, from account setup to navigating the dashboard and understanding key features."
                  category="Getting Started"
                  difficulty="Beginner"
                  duration="15 min"
                  href="/resources/tutorials/getting-started"
                  icon={GraduationCap}
                />
                <TutorialCard
                  title="Choosing the Right Model for Your Use Case"
                  description="A comprehensive guide to selecting the optimal language model based on your specific requirements, constraints, and objectives."
                  category="Model Selection"
                  difficulty="Beginner"
                  duration="20 min"
                  href="/resources/tutorials/choosing-right-model"
                  icon={Layers}
                />
                <TutorialCard
                  title="Fine-Tuning Mistral 7B for Customer Support"
                  description="Learn how to prepare your support data, select the right model, and fine-tune it for customer service applications."
                  category="Fine-Tuning"
                  difficulty="Intermediate"
                  duration="30 min"
                  href="/resources/tutorials/fine-tuning-customer-support"
                  icon={Settings}
                />
                <TutorialCard
                  title="Implementing Effective Prompt Engineering"
                  description="Best practices for designing prompts that get the best results from language models for various applications."
                  category="Prompt Engineering"
                  difficulty="Intermediate"
                  duration="25 min"
                  href="/resources/tutorials/prompt-engineering"
                  icon={MessageSquare}
                />
                <TutorialCard
                  title="Deploying Models to Production"
                  description="A step-by-step guide to deploying your fine-tuned models to production environments, including scaling considerations and monitoring."
                  category="Deployment"
                  difficulty="Advanced"
                  duration="40 min"
                  href="/resources/tutorials/deploying-to-production"
                  icon={Database}
                />
                <TutorialCard
                  title="Optimizing LLM Inference for Production"
                  description="Advanced techniques for optimizing inference performance, reducing latency, and minimizing resource usage in production environments."
                  category="Optimization"
                  difficulty="Advanced"
                  duration="35 min"
                  href="/resources/tutorials/optimizing-inference"
                  icon={LineChart}
                />
                <TutorialCard
                  title="Building a Chatbot with Artintel"
                  description="Create a fully functional chatbot using Artintel's platform, from model selection to deployment and integration with your website."
                  category="Implementation"
                  difficulty="Intermediate"
                  duration="45 min"
                  href="/resources/tutorials/building-chatbot"
                  icon={MessageSquare}
                />
                <TutorialCard
                  title="Integrating Artintel API with Your Application"
                  description="Learn how to integrate Artintel's API with your existing applications using our client libraries for various programming languages."
                  category="Integration"
                  difficulty="Intermediate"
                  duration="30 min"
                  href="/resources/tutorials/api-integration"
                  icon={Code}
                />
                <TutorialCard
                  title="Evaluating Model Performance"
                  description="Techniques and metrics for evaluating language model performance across different tasks and use cases."
                  category="Evaluation"
                  difficulty="Intermediate"
                  duration="25 min"
                  href="/resources/tutorials/evaluating-performance"
                  icon={LineChart}
                />
              </div>
            </TabsContent>

            <TabsContent value="getting-started">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <TutorialCard
                  title="Getting Started with Artintel"
                  description="Learn the basics of the Artintel platform, from account setup to navigating the dashboard and understanding key features."
                  category="Getting Started"
                  difficulty="Beginner"
                  duration="15 min"
                  href="/resources/tutorials/getting-started"
                  icon={GraduationCap}
                />
                <TutorialCard
                  title="Choosing the Right Model for Your Use Case"
                  description="A comprehensive guide to selecting the optimal language model based on your specific requirements, constraints, and objectives."
                  category="Model Selection"
                  difficulty="Beginner"
                  duration="20 min"
                  href="/resources/tutorials/choosing-right-model"
                  icon={Layers}
                />
                <TutorialCard
                  title="Understanding SLMs vs. LLMs"
                  description="Learn the key differences between Small Language Models and Large Language Models, and when to use each type."
                  category="Model Selection"
                  difficulty="Beginner"
                  duration="15 min"
                  href="/resources/tutorials/slm-vs-llm"
                  icon={BrainCircuit}
                />
              </div>
            </TabsContent>

            <TabsContent value="fine-tuning">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <TutorialCard
                  title="Fine-Tuning Mistral 7B for Customer Support"
                  description="Learn how to prepare your support data, select the right model, and fine-tune it for customer service applications."
                  category="Fine-Tuning"
                  difficulty="Intermediate"
                  duration="30 min"
                  href="/resources/tutorials/fine-tuning-customer-support"
                  icon={Settings}
                />
                <TutorialCard
                  title="Data Preparation for Fine-Tuning"
                  description="Best practices for preparing and formatting your data for effective fine-tuning of language models."
                  category="Fine-Tuning"
                  difficulty="Intermediate"
                  duration="25 min"
                  href="/resources/tutorials/data-preparation"
                  icon={Database}
                />
                <TutorialCard
                  title="Advanced Fine-Tuning Techniques"
                  description="Explore advanced techniques like parameter-efficient fine-tuning, LoRA, and instruction tuning for optimal results."
                  category="Fine-Tuning"
                  difficulty="Advanced"
                  duration="40 min"
                  href="/resources/tutorials/advanced-fine-tuning"
                  icon={Settings}
                />
              </div>
            </TabsContent>

            <TabsContent value="deployment">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <TutorialCard
                  title="Deploying Models to Production"
                  description="A step-by-step guide to deploying your fine-tuned models to production environments, including scaling considerations and monitoring."
                  category="Deployment"
                  difficulty="Advanced"
                  duration="40 min"
                  href="/resources/tutorials/deploying-to-production"
                  icon={Database}
                />
                <TutorialCard
                  title="Optimizing LLM Inference for Production"
                  description="Advanced techniques for optimizing inference performance, reducing latency, and minimizing resource usage in production environments."
                  category="Optimization"
                  difficulty="Advanced"
                  duration="35 min"
                  href="/resources/tutorials/optimizing-inference"
                  icon={LineChart}
                />
                <TutorialCard
                  title="Monitoring and Observability"
                  description="Set up comprehensive monitoring and observability for your deployed language models to ensure reliability and performance."
                  category="Deployment"
                  difficulty="Intermediate"
                  duration="30 min"
                  href="/resources/tutorials/monitoring-observability"
                  icon={LineChart}
                />
              </div>
            </TabsContent>
          </Tabs>
        </AnimationContainer>

        {/* Learning Paths */}
        <AnimationContainer className="w-full mt-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Learning Paths</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Structured learning journeys to help you master specific aspects of the Artintel platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-card/50 border border-border/80">
              <CardHeader>
                <div className="p-2 rounded-lg bg-primary/10 w-fit mb-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Beginner's Path</CardTitle>
                <CardDescription>
                  Get started with the fundamentals of AI and language models
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">1</div>
                    <span>Introduction to Language Models</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">2</div>
                    <span>Getting Started with Artintel</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">3</div>
                    <span>Choosing the Right Model</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">4</div>
                    <span>Basic Prompt Engineering</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80 hover:bg-transparent">
                  <Link href="/resources/learning-paths/beginner" className="flex items-center">
                    Start Learning Path <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-card/50 border border-border/80">
              <CardHeader>
                <div className="p-2 rounded-lg bg-primary/10 w-fit mb-2">
                  <Settings className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Fine-Tuning Specialist</CardTitle>
                <CardDescription>
                  Master the art of fine-tuning models for specific use cases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">1</div>
                    <span>Data Preparation Fundamentals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">2</div>
                    <span>Fine-Tuning Basics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">3</div>
                    <span>Advanced Fine-Tuning Techniques</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">4</div>
                    <span>Evaluating Fine-Tuned Models</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80 hover:bg-transparent">
                  <Link href="/resources/learning-paths/fine-tuning" className="flex items-center">
                    Start Learning Path <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-card/50 border border-border/80">
              <CardHeader>
                <div className="p-2 rounded-lg bg-primary/10 w-fit mb-2">
                  <Database className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Production Deployment</CardTitle>
                <CardDescription>
                  Learn how to deploy and manage models in production environments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">1</div>
                    <span>Deployment Architecture</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">2</div>
                    <span>Scaling Strategies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">3</div>
                    <span>Optimization Techniques</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">4</div>
                    <span>Monitoring and Maintenance</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80 hover:bg-transparent">
                  <Link href="/resources/learning-paths/deployment" className="flex items-center">
                    Start Learning Path <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </AnimationContainer>

        {/* Video Tutorials */}
        <AnimationContainer className="w-full mt-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Video Tutorials</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Visual guides and demonstrations to help you navigate the platform and implement AI solutions effectively
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-card/50 border border-border/80">
              <div className="relative aspect-video">
                <div className="absolute inset-0 bg-muted/50 flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full bg-primary/90 flex items-center justify-center">
                    <div className="h-0 w-0 border-y-[8px] border-y-transparent border-l-[12px] border-l-white ml-1"></div>
                  </div>
                </div>
              </div>
              <CardHeader>
                <CardTitle>Getting Started with Artintel</CardTitle>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>10:25</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A comprehensive walkthrough of the Artintel platform, from account setup to basic usage.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border border-border/80">
              <div className="relative aspect-video">
                <div className="absolute inset-0 bg-muted/50 flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full bg-primary/90 flex items-center justify-center">
                    <div className="h-0 w-0 border-y-[8px] border-y-transparent border-l-[12px] border-l-white ml-1"></div>
                  </div>
                </div>
              </div>
              <CardHeader>
                <CardTitle>Fine-Tuning Your First Model</CardTitle>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>15:40</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Step-by-step demonstration of the fine-tuning process, from data preparation to model evaluation.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border border-border/80">
              <div className="relative aspect-video">
                <div className="absolute inset-0 bg-muted/50 flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full bg-primary/90 flex items-center justify-center">
                    <div className="h-0 w-0 border-y-[8px] border-y-transparent border-l-[12px] border-l-white ml-1"></div>
                  </div>
                </div>
              </div>
              <CardHeader>
                <CardTitle>Deploying Models with Artintel</CardTitle>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>12:15</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Learn how to deploy your fine-tuned models to production and integrate them with your applications.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mt-8">
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/resources/videos" className="flex items-center">
                View All Videos <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </AnimationContainer>

        {/* CTA Section */}
        <AnimationContainer className="mt-20 w-full">
          <Card className="border-none shadow-md bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="pt-8 pb-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Need Personalized Guidance?</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our team of AI experts is available to provide personalized training and support tailored to your specific needs.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/contact">Request Custom Training</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full"
                >
                  <Link href="/docs">View Documentation</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </AnimationContainer>
      </Wrapper>
    </>
  );
};

export default TutorialsPage;
