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
  BookOpen,
  FileText,
  Code,
  Lightbulb,
  GraduationCap,
  ArrowRight,
  BookMarked,
  FileCode,
  Building,
  Layers,
  Video,
  Newspaper,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Resources | Artintel",
  description:
    "Explore our comprehensive collection of resources including documentation, tutorials, case studies, and more to help you get the most out of the Artintel platform.",
};

// Custom ResourcesHero component
const ResourcesHero = () => {
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
            <BookOpen className="mr-1 h-3 w-3" />
            <span>Knowledge Center</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-4">
            Artintel{" "}
            <span className="text-primary">Resources</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-6">
            Explore our comprehensive collection of resources to help you get the most out of the Artintel platform, from detailed documentation to step-by-step tutorials and real-world case studies.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="rounded-full">
              <Link href="#resource-categories">Browse Resources</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="/docs">View Documentation</Link>
            </Button>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

// Custom ResourceCard component
const ResourceCard = ({
  title,
  description,
  icon: Icon,
  href,
  featured = false,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  featured?: boolean;
}) => {
  return (
    <Card className={`h-full flex flex-col border-border/80 hover:border-primary/50 transition-colors ${featured ? "border-primary/30 shadow-md" : ""}`}>
      {featured && (
        <div className="absolute top-4 right-4">
          <Badge className="bg-primary text-primary-foreground">Featured</Badge>
        </div>
      )}
      <CardHeader>
        <div className="p-2 rounded-lg bg-primary/10 w-fit mb-2">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {/* Content can be added here if needed */}
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80 hover:bg-transparent">
          <Link href={href} className="flex items-center">
            Explore <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

// Custom FeaturedResource component
const FeaturedResource = ({
  title,
  description,
  category,
  readTime,
  href,
  icon: Icon,
}: {
  title: string;
  description: string;
  category: string;
  readTime: string;
  href: string;
  icon: React.ElementType;
}) => {
  return (
    <Card className="border-border/80 hover:border-primary/50 transition-colors">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <div className="flex items-center">
            <Icon className="mr-1 h-3 w-3 text-primary" />
            <span>{category}</span>
          </div>
          <span>•</span>
          <span>{readTime}</span>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80 hover:bg-transparent">
          <Link href={href} className="flex items-center">
            Read more <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

// Main Page Component
const ResourcesPage = () => {
  return (
    <>
      {/* Hero Section */}
      <ResourcesHero />

      <Wrapper className="mb-12 mt-12 flex flex-col items-center justify-center">
        {/* Resource Categories */}
        <AnimationContainer className="w-full" id="resource-categories">
          <h2 className="text-3xl font-bold mb-8 text-center">Resource Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ResourceCard
              title="Documentation"
              description="Comprehensive guides, API references, and technical documentation to help you understand and use the Artintel platform effectively."
              icon={BookOpen}
              href="/docs"
              featured={true}
            />
            <ResourceCard
              title="Tutorials"
              description="Step-by-step guides and walkthroughs for common tasks and use cases, from model selection to deployment and monitoring."
              icon={GraduationCap}
              href="/resources/tutorials"
            />
            <ResourceCard
              title="Case Studies"
              description="Real-world examples of how organizations across various industries are leveraging Artintel to solve complex problems."
              icon={Building}
              href="/resources/case-studies"
            />
            <ResourceCard
              title="API Reference"
              description="Detailed documentation for Artintel's APIs, including authentication, endpoints, request formats, and response schemas."
              icon={Code}
              href="/docs#api-reference"
            />
            <ResourceCard
              title="Whitepapers"
              description="In-depth technical papers on Artintel's architecture, model performance, and industry-specific solutions."
              icon={FileText}
              href="/resources/whitepapers"
            />
            <ResourceCard
              title="Video Tutorials"
              description="Visual guides and demonstrations to help you navigate the platform and implement AI solutions effectively."
              icon={Video}
              href="/resources/videos"
            />
          </div>
        </AnimationContainer>

        {/* Featured Resources */}
        <AnimationContainer className="mt-20 w-full">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeaturedResource
              title="Getting Started with Artintel"
              description="A comprehensive guide to help you navigate the Artintel platform, from account setup to deploying your first model."
              category="Documentation"
              readTime="15 min read"
              href="/docs/getting-started"
              icon={BookOpen}
            />
            <FeaturedResource
              title="Fine-Tuning Models for Customer Support"
              description="Learn how to prepare your support data, select the right model, and fine-tune it for customer service applications."
              category="Tutorial"
              readTime="20 min read"
              href="/resources/tutorials/fine-tuning-customer-support"
              icon={GraduationCap}
            />
            <FeaturedResource
              title="How FinTech Corp Reduced Costs by 60% with SLMs"
              description="Discover how a leading fintech company switched from expensive API calls to fine-tuned small language models, reducing their AI costs significantly."
              category="Case Study"
              readTime="10 min read"
              href="/resources/case-studies/fintech-cost-reduction"
              icon={Building}
            />
            <FeaturedResource
              title="Understanding SLMs vs. LLMs"
              description="A detailed comparison of Small Language Models and Large Language Models, their strengths, limitations, and ideal use cases."
              category="Whitepaper"
              readTime="25 min read"
              href="/resources/whitepapers/slm-vs-llm"
              icon={FileText}
            />
            <FeaturedResource
              title="Implementing Effective Prompt Engineering"
              description="Best practices for designing prompts that get the best results from language models for various applications."
              category="Tutorial"
              readTime="15 min read"
              href="/resources/tutorials/prompt-engineering"
              icon={Lightbulb}
            />
            <FeaturedResource
              title="Artintel REST API Overview"
              description="A comprehensive guide to Artintel's RESTful API, including authentication, endpoints, and example requests and responses."
              category="API Reference"
              readTime="30 min read"
              href="/docs/api-reference"
              icon={Code}
            />
          </div>
        </AnimationContainer>

        {/* Latest Blog Posts */}
        <AnimationContainer className="mt-20 w-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Latest from Our Blog</h2>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/blog" className="flex items-center">
                View all posts <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <FeaturedResource
              title="The Evolution of Language Models: From BERT to Modern LLMs"
              description="Explore the fascinating journey of language models, from the groundbreaking BERT to today's massive LLMs like GPT-4 and Falcon 180B."
              category="Research"
              readTime="8 min read"
              href="/blog/evolution-of-language-models"
              icon={Newspaper}
            />
            <FeaturedResource
              title="Fine-Tuning Mistral 7B for Customer Support"
              description="Learn how to fine-tune the Mistral 7B model for customer support applications using Artintel's no-code platform."
              category="Tutorial"
              readTime="12 min read"
              href="/blog/fine-tuning-mistral-7b"
              icon={GraduationCap}
            />
            <FeaturedResource
              title="The Business Case for Open-Source Language Models"
              description="Why are more enterprises turning to open-source language models? This article examines the business advantages."
              category="Business"
              readTime="7 min read"
              href="/blog/business-case-open-source-llm"
              icon={Building}
            />
          </div>
        </AnimationContainer>

        {/* Resource Library */}
        <AnimationContainer className="mt-20 w-full">
          <Card className="border-none shadow-md bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="pt-8 pb-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Resource Library</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Browse our comprehensive collection of resources by category, topic, or format to find exactly what you need.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                <Card className="bg-card/50 border border-border/80 hover:border-primary/50 transition-colors">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <BookMarked className="mr-2 h-4 w-4 text-primary" />
                      Documentation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Technical guides and reference materials
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-card/50 border border-border/80 hover:border-primary/50 transition-colors">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <GraduationCap className="mr-2 h-4 w-4 text-primary" />
                      Tutorials
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Step-by-step guides and walkthroughs
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-card/50 border border-border/80 hover:border-primary/50 transition-colors">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <FileCode className="mr-2 h-4 w-4 text-primary" />
                      Code Samples
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Example implementations and snippets
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-card/50 border border-border/80 hover:border-primary/50 transition-colors">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Building className="mr-2 h-4 w-4 text-primary" />
                      Case Studies
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Real-world implementation examples
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center mt-8">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/docs">
                    Browse Documentation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </AnimationContainer>

        {/* CTA Section */}
        <AnimationContainer className="mt-20 w-full text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help Getting Started?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our team of AI experts is ready to help you navigate the platform and find the right solution for your specific needs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/contact">Contact Our Team</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full"
            >
              <Link href="/docs/getting-started">Getting Started Guide</Link>
            </Button>
          </div>
        </AnimationContainer>
      </Wrapper>
    </>
  );
};

export default ResourcesPage;
