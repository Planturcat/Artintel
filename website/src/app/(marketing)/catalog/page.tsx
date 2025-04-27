import React from "react";
import Wrapper from "@/components/global/wrapper";
import AnimationContainer from "@/components/global/animation-container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Search,
  Filter,
  Layers,
  Cpu,
  Brain,
  ArrowRight,
  Database,
  Server,
  Zap,
  Clock,
  BarChart,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Model Catalog | Artintel",
  description:
    "Browse our comprehensive catalog of AI models, from small language models (SLMs) to large language models (LLMs), with detailed performance metrics and use case recommendations.",
};

// Custom CatalogHero component
const CatalogHero = () => {
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
            <span>Model Directory</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-4">
            Artintel{" "}
            <span className="text-primary">Model Catalog</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-6">
            Browse our comprehensive collection of language models, from lightweight SLMs to powerful LLMs, with detailed performance metrics and use case recommendations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="relative flex-1 max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search models..."
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

// Custom ModelCard component
const ModelCard = ({
  name,
  description,
  parameterCount,
  type,
  domains,
  license,
}: {
  name: string;
  description: string;
  parameterCount: string;
  type: "SLM" | "LLM";
  domains: string[];
  license: string;
}) => {
  return (
    <Card className="h-full flex flex-col border-border/80 hover:border-primary/50 transition-colors">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{name}</CardTitle>
          <Badge variant={type === "SLM" ? "outline" : "default"} className={type === "SLM" ? "border-primary/30 bg-primary/5 text-primary" : ""}>
            {type}
          </Badge>
        </div>
        <div className="flex items-center text-xs text-muted-foreground mt-1">
          <Layers className="mr-1 h-3 w-3" />
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
          <Tag className="mr-1 h-3 w-3" />
          <span>License: {license}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80 hover:bg-transparent">
          <Link href={`/models/${name.toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center">
            View details <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

// Main Page Component
const CatalogPage = () => {
  return (
    <>
      {/* Hero Section */}
      <CatalogHero />

      <Wrapper className="mb-12 mt-12 flex flex-col items-center justify-center">
        {/* Model Categories */}
        <AnimationContainer className="w-full">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="rounded-full">
                <TabsTrigger value="all" className="rounded-full">All Models</TabsTrigger>
                <TabsTrigger value="slm" className="rounded-full">SLMs</TabsTrigger>
                <TabsTrigger value="llm" className="rounded-full">LLMs</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ModelCard
                  name="BERT Base"
                  description="A bidirectional transformer pre-trained using masked language modeling and next sentence prediction, ideal for understanding context in text."
                  parameterCount="110M"
                  type="SLM"
                  domains={["NLP", "Classification", "Embeddings"]}
                  license="Apache 2.0"
                />
                <ModelCard
                  name="DistilBERT"
                  description="A smaller, faster, cheaper version of BERT that retains 97% of its language understanding capabilities while being 60% faster."
                  parameterCount="66M"
                  type="SLM"
                  domains={["NLP", "Classification", "Mobile"]}
                  license="Apache 2.0"
                />
                <ModelCard
                  name="Phi-2"
                  description="A compact yet powerful language model designed for edge devices and resource-constrained environments."
                  parameterCount="2.7B"
                  type="SLM"
                  domains={["Edge Computing", "Text Generation", "Q&A"]}
                  license="MIT"
                />
                <ModelCard
                  name="Mistral 7B"
                  description="A state-of-the-art language model that offers an excellent balance between performance and resource requirements."
                  parameterCount="7B"
                  type="LLM"
                  domains={["Text Generation", "Reasoning", "Code"]}
                  license="Apache 2.0"
                />
                <ModelCard
                  name="Falcon 40B"
                  description="A powerful open-source language model trained on diverse datasets, offering strong performance across various tasks."
                  parameterCount="40B"
                  type="LLM"
                  domains={["Text Generation", "Reasoning", "Summarization"]}
                  license="TII License"
                />
                <ModelCard
                  name="Llama 70B"
                  description="A large language model with exceptional reasoning capabilities and a wide context window for handling complex tasks."
                  parameterCount="70B"
                  type="LLM"
                  domains={["Advanced Reasoning", "Long Context", "Creative Generation"]}
                  license="Meta License"
                />
                <ModelCard
                  name="TinyBERT"
                  description="An extremely compact model designed for mobile and edge devices with minimal resource requirements."
                  parameterCount="14.5M"
                  type="SLM"
                  domains={["Mobile", "Classification", "Embedded Systems"]}
                  license="MIT"
                />
                <ModelCard
                  name="Falcon 180B"
                  description="One of the largest open-source language models available, offering state-of-the-art performance across a wide range of tasks."
                  parameterCount="180B"
                  type="LLM"
                  domains={["Advanced Reasoning", "Creative Generation", "Enterprise"]}
                  license="TII License"
                />
                <ModelCard
                  name="BLOOM 176B"
                  description="A multilingual large language model with support for 46+ languages and 13 programming languages."
                  parameterCount="176B"
                  type="LLM"
                  domains={["Multilingual", "Code Generation", "Enterprise"]}
                  license="RAIL License"
                />
              </div>
            </TabsContent>

            <TabsContent value="slm">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ModelCard
                  name="BERT Base"
                  description="A bidirectional transformer pre-trained using masked language modeling and next sentence prediction, ideal for understanding context in text."
                  parameterCount="110M"
                  type="SLM"
                  domains={["NLP", "Classification", "Embeddings"]}
                  license="Apache 2.0"
                />
                <ModelCard
                  name="DistilBERT"
                  description="A smaller, faster, cheaper version of BERT that retains 97% of its language understanding capabilities while being 60% faster."
                  parameterCount="66M"
                  type="SLM"
                  domains={["NLP", "Classification", "Mobile"]}
                  license="Apache 2.0"
                />
                <ModelCard
                  name="Phi-2"
                  description="A compact yet powerful language model designed for edge devices and resource-constrained environments."
                  parameterCount="2.7B"
                  type="SLM"
                  domains={["Edge Computing", "Text Generation", "Q&A"]}
                  license="MIT"
                />
                <ModelCard
                  name="TinyBERT"
                  description="An extremely compact model designed for mobile and edge devices with minimal resource requirements."
                  parameterCount="14.5M"
                  type="SLM"
                  domains={["Mobile", "Classification", "Embedded Systems"]}
                  license="MIT"
                />
              </div>
            </TabsContent>

            <TabsContent value="llm">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ModelCard
                  name="Mistral 7B"
                  description="A state-of-the-art language model that offers an excellent balance between performance and resource requirements."
                  parameterCount="7B"
                  type="LLM"
                  domains={["Text Generation", "Reasoning", "Code"]}
                  license="Apache 2.0"
                />
                <ModelCard
                  name="Falcon 40B"
                  description="A powerful open-source language model trained on diverse datasets, offering strong performance across various tasks."
                  parameterCount="40B"
                  type="LLM"
                  domains={["Text Generation", "Reasoning", "Summarization"]}
                  license="TII License"
                />
                <ModelCard
                  name="Llama 70B"
                  description="A large language model with exceptional reasoning capabilities and a wide context window for handling complex tasks."
                  parameterCount="70B"
                  type="LLM"
                  domains={["Advanced Reasoning", "Long Context", "Creative Generation"]}
                  license="Meta License"
                />
                <ModelCard
                  name="Falcon 180B"
                  description="One of the largest open-source language models available, offering state-of-the-art performance across a wide range of tasks."
                  parameterCount="180B"
                  type="LLM"
                  domains={["Advanced Reasoning", "Creative Generation", "Enterprise"]}
                  license="TII License"
                />
                <ModelCard
                  name="BLOOM 176B"
                  description="A multilingual large language model with support for 46+ languages and 13 programming languages."
                  parameterCount="176B"
                  type="LLM"
                  domains={["Multilingual", "Code Generation", "Enterprise"]}
                  license="RAIL License"
                />
              </div>
            </TabsContent>
          </Tabs>
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
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </AnimationContainer>

        {/* Model Selection Guide */}
        <AnimationContainer className="mt-20 w-full">
          <Card className="border-none shadow-md bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="pt-8 pb-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">How to Choose the Right Model</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Selecting the appropriate model depends on your specific use case, resource constraints, and performance requirements.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <Card className="bg-card/50 border border-border/80">
                  <CardHeader className="pb-2">
                    <div className="p-2 rounded-lg bg-primary/10 w-fit mb-2">
                      <Cpu className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>Resource Constraints</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Consider your hardware limitations. SLMs can run on standard CPUs or lower-tier GPUs, while LLMs often require multiple high-end GPUs.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border border-border/80">
                  <CardHeader className="pb-2">
                    <div className="p-2 rounded-lg bg-primary/10 w-fit mb-2">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>Latency Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      SLMs typically offer faster response times (sub-100ms), making them suitable for real-time applications with strict latency requirements.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border border-border/80">
                  <CardHeader className="pb-2">
                    <div className="p-2 rounded-lg bg-primary/10 w-fit mb-2">
                      <Brain className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>Task Complexity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      For advanced reasoning, creative generation, or handling long contexts, LLMs excel. For classification or simpler tasks, SLMs may be sufficient.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center mt-8">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/models/comparison">
                    Compare SLMs vs. LLMs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </AnimationContainer>

        {/* CTA Section */}
        <AnimationContainer className="mt-20 w-full text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore our platform and discover how Artintel can help you leverage the power of language models for your specific use case.
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

export default CatalogPage;
