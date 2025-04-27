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
  Search,
  Calendar,
  User,
  Tag,
  ArrowRight,
  BookOpen,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Custom BlogHero component
const BlogHero = () => {
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
        <div className="text-center max-w-3xl mx-auto">
          <div className="mb-3 inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-sm text-primary">
            <BookOpen className="mr-1 h-3 w-3" />
            <span>Knowledge Center</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-4">
            Artintel{" "}
            <span className="text-primary">Blog</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-6">
            Insights, tutorials, and updates from our team of AI experts. Stay informed about the latest developments in language models and AI technology.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles..."
                className="pl-10 rounded-full"
              />
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

// Custom BlogCard component
const BlogCard = ({
  title,
  description,
  date,
  author,
  category,
  readTime,
  slug,
  featured = false,
}: {
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  slug: string;
  featured?: boolean;
}) => {
  return (
    <Card className={`h-full flex flex-col ${featured ? "border-primary shadow-md" : "border-border/80"}`}>
      {featured && (
        <div className="absolute top-4 right-4">
          <div className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
            Featured
          </div>
        </div>
      )}
      <CardHeader className={featured ? "pb-2" : "pb-4"}>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <div className="flex items-center">
            <Calendar className="mr-1 h-3 w-3" />
            <span>{date}</span>
          </div>
          <span>•</span>
          <div className="flex items-center">
            <User className="mr-1 h-3 w-3" />
            <span>{author}</span>
          </div>
          <span>•</span>
          <span>{readTime}</span>
        </div>
        <CardTitle className={`${featured ? "text-2xl" : "text-xl"}`}>{title}</CardTitle>
        <div className="flex items-center mt-2">
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-2 py-0.5 text-xs text-primary">
            <Tag className="mr-1 h-3 w-3" />
            <span>{category}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80 hover:bg-transparent">
          <Link href={`/blog/${slug}`} className="flex items-center">
            Read more <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const BlogPage = () => {
  return (
    <>
      {/* Custom Hero Section */}
      <BlogHero />

      <Wrapper className="mb-12 mt-12 flex flex-col items-center justify-center">
        {/* Featured Article */}
        <AnimationContainer className="w-full">
          <BlogCard
            title="The Evolution of Language Models: From BERT to Modern LLMs"
            description="Explore the fascinating journey of language models, from the groundbreaking BERT to today's massive LLMs like GPT-4 and Falcon 180B. Learn how these models have transformed natural language processing and what the future might hold."
            date="June 15, 2023"
            author="Dr. Sarah Chen"
            category="Research"
            readTime="8 min read"
            slug="evolution-of-language-models"
            featured={true}
          />
        </AnimationContainer>

        {/* Filters */}
        <AnimationContainer className="mt-12 w-full">
          <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Latest Articles</h2>
            <div className="flex flex-wrap gap-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="tutorials">Tutorials</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                  <SelectItem value="case-studies">Case Studies</SelectItem>
                  <SelectItem value="news">News & Updates</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="latest">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </AnimationContainer>

        {/* Blog Grid */}
        <AnimationContainer className="w-full">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BlogCard
              title="Fine-Tuning Mistral 7B for Customer Support: A Step-by-Step Guide"
              description="Learn how to fine-tune the Mistral 7B model for customer support applications using Artintel's no-code platform. This tutorial covers data preparation, training configuration, and deployment."
              date="May 28, 2023"
              author="Alex Johnson"
              category="Tutorials"
              readTime="12 min read"
              slug="fine-tuning-mistral-7b"
            />
            <BlogCard
              title="Case Study: How FinTech Corp Reduced Costs by 60% with SLMs"
              description="Discover how a leading fintech company switched from expensive API calls to fine-tuned small language models, reducing their AI costs by 60% while maintaining high accuracy for their document processing pipeline."
              date="May 15, 2023"
              author="Michael Wong"
              category="Case Studies"
              readTime="6 min read"
              slug="fintech-cost-reduction-slm"
            />
            <BlogCard
              title="Understanding Prompt Engineering for Better LLM Results"
              description="Effective prompt engineering can dramatically improve the output quality of language models. This article covers key techniques, best practices, and common pitfalls to avoid."
              date="May 3, 2023"
              author="Emily Rodriguez"
              category="Tutorials"
              readTime="10 min read"
              slug="prompt-engineering-guide"
            />
            <BlogCard
              title="Introducing Artintel's New Fine-Tuning Studio"
              description="We're excited to announce our completely redesigned Fine-Tuning Studio, featuring an intuitive interface, improved performance monitoring, and support for the latest models including Falcon 180B."
              date="April 22, 2023"
              author="David Kim"
              category="News"
              readTime="4 min read"
              slug="new-fine-tuning-studio"
            />
            <BlogCard
              title="The Business Case for Open-Source Language Models"
              description="Why are more enterprises turning to open-source language models? This article examines the business advantages, including cost savings, customization options, and reduced vendor lock-in."
              date="April 10, 2023"
              author="Lisa Patel"
              category="Research"
              readTime="7 min read"
              slug="business-case-open-source-llm"
            />
            <BlogCard
              title="Optimizing LLM Inference for Production Environments"
              description="Learn practical techniques for optimizing inference speed and reducing costs when deploying large language models in production, including quantization, caching, and hardware selection."
              date="March 28, 2023"
              author="James Wilson"
              category="Tutorials"
              readTime="9 min read"
              slug="optimizing-llm-inference"
            />
          </div>
        </AnimationContainer>

        {/* Pagination */}
        <AnimationContainer className="mt-12 w-full flex justify-center">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="bg-primary/10 text-primary">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <span className="mx-1">...</span>
            <Button variant="outline" size="sm">
              8
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </AnimationContainer>

        {/* Newsletter Signup */}
        <AnimationContainer className="mt-20 w-full">
          <Card className="border-none shadow-md bg-gradient-to-r from-primary/10 to-primary/5 p-8">
            <CardContent className="flex flex-col md:flex-row items-center gap-8 p-0">
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h2>
                <p className="text-muted-foreground mb-4">
                  Stay updated with the latest articles, tutorials, and news about language models and AI technology. We'll send you a monthly digest of our best content.
                </p>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="max-w-md rounded-full"
                  />
                  <Button className="rounded-full">Subscribe</Button>
                </div>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="h-32 w-32 rounded-full bg-primary/20 flex items-center justify-center">
                  <Layers className="h-16 w-16 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimationContainer>

        {/* Popular Categories */}
        <AnimationContainer className="mt-12 w-full">
          <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-card/50 border border-border/80 hover:border-primary/50 transition-colors cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <BookOpen className="mr-2 h-4 w-4 text-primary" />
                  Tutorials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Step-by-step guides for using language models effectively
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border border-border/80 hover:border-primary/50 transition-colors cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <BookOpen className="mr-2 h-4 w-4 text-primary" />
                  Research
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Deep dives into the latest AI research and breakthroughs
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border border-border/80 hover:border-primary/50 transition-colors cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <BookOpen className="mr-2 h-4 w-4 text-primary" />
                  Case Studies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Real-world examples of organizations using language models
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border border-border/80 hover:border-primary/50 transition-colors cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <BookOpen className="mr-2 h-4 w-4 text-primary" />
                  News
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Updates about Artintel and the broader AI industry
                </p>
              </CardContent>
            </Card>
          </div>
        </AnimationContainer>
      </Wrapper>
    </>
  );
};

export default BlogPage;
