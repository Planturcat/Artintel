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
  BookOpen,
  Code,
  FileText,
  Layers,
  Rocket,
  Settings,
  Terminal,
  Search,
  ArrowRight,
  Server,
  Database,
  BarChart,
  Shield,
  Cpu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";

// Custom DocsHero component
const DocsHero = () => {
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
            <span>Documentation</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-4">
            Artintel{" "}
            <span className="text-primary">Docs</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-6">
            Comprehensive guides, API references, and tutorials to help you get the most out of the Artintel platform.
          </p>

          <div className="mt-8 flex items-center justify-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search documentation..."
                className="pl-10 rounded-full"
              />
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

// Custom DocCard component
const DocCard = ({
  title,
  description,
  icon: Icon,
  href,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
}) => {
  return (
    <Card className="h-full flex flex-col hover:border-primary/50 transition-colors">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80 hover:bg-transparent">
          <Link href={href} className="flex items-center">
            View docs <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

// Custom GuideCard component
const GuideCard = ({
  title,
  description,
  category,
  readTime,
  href,
}: {
  title: string;
  description: string;
  category: string;
  readTime: string;
  href: string;
}) => {
  return (
    <Card className="h-full flex flex-col hover:border-primary/50 transition-colors">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <span>{category}</span>
          <span>•</span>
          <span>{readTime}</span>
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80 hover:bg-transparent">
          <Link href={href} className="flex items-center">
            Read guide <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const DocsPage = () => {
  return (
    <>
      {/* Custom Hero Section */}
      <DocsHero />

      <Wrapper className="mb-12 mt-12 flex flex-col items-center justify-center">
        {/* Main Documentation Categories */}
        <AnimationContainer className="w-full">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Documentation</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive documentation to learn how to use Artintel's platform effectively.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DocCard
              title="Getting Started"
              description="Learn the basics of Artintel's platform, from creating an account to deploying your first model."
              icon={Rocket}
              href="#getting-started"
            />
            <DocCard
              title="Model Selection"
              description="Understand how to choose the right model for your specific use case based on performance, size, and cost."
              icon={Layers}
              href="#model-selection"
            />
            <DocCard
              title="Data Preparation"
              description="Guidelines for preparing and formatting your data for optimal fine-tuning results."
              icon={Database}
              href="#data-preparation"
            />
            <DocCard
              title="Fine-Tuning"
              description="Detailed instructions for customizing models with your own data using our no-code interface."
              icon={Settings}
              href="#fine-tuning"
            />
            <DocCard
              title="Deployment"
              description="Learn how to deploy your models to various environments and integrate them with your applications."
              icon={Server}
              href="#deployment"
            />
            <DocCard
              title="Monitoring & Analytics"
              description="Track your model's performance, usage, and costs with our comprehensive monitoring tools."
              icon={BarChart}
              href="#monitoring"
            />
          </div>
        </AnimationContainer>

        {/* API Reference */}
        <AnimationContainer className="mt-20 w-full">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">API Reference</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive documentation for Artintel's APIs to help you integrate our platform with your applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DocCard
              title="REST API"
              description="Full reference for our RESTful API endpoints, including authentication, request formats, and response schemas."
              icon={Code}
              href="#rest-api"
            />
            <DocCard
              title="Python SDK"
              description="Documentation for our Python SDK, which provides a convenient way to interact with Artintel's platform programmatically."
              icon={Terminal}
              href="#python-sdk"
            />
            <DocCard
              title="JavaScript SDK"
              description="Reference for our JavaScript SDK, designed for browser and Node.js environments."
              icon={Code}
              href="#javascript-sdk"
            />
            <DocCard
              title="Webhooks"
              description="Learn how to set up and use webhooks to receive real-time notifications about events in your Artintel account."
              icon={Server}
              href="#webhooks"
            />
            <DocCard
              title="Authentication"
              description="Detailed information about authentication methods, token management, and security best practices."
              icon={Shield}
              href="#authentication"
            />
            <DocCard
              title="Rate Limits"
              description="Understanding API rate limits, quotas, and best practices for efficient API usage."
              icon={Cpu}
              href="#rate-limits"
            />
          </div>
        </AnimationContainer>

        {/* Popular Guides */}
        <AnimationContainer className="mt-20 w-full">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Popular Guides</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Step-by-step tutorials and guides to help you accomplish common tasks on the Artintel platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GuideCard
              title="Fine-Tuning a Model for Customer Support"
              description="Learn how to prepare your support data, select the right model, and fine-tune it for customer service applications."
              category="Fine-Tuning"
              readTime="15 min read"
              href="#guide-customer-support"
            />
            <GuideCard
              title="Optimizing Inference Costs"
              description="Strategies for reducing inference costs through model quantization, caching, and other optimization techniques."
              category="Deployment"
              readTime="12 min read"
              href="#guide-inference-costs"
            />
            <GuideCard
              title="Building a Semantic Search Engine"
              description="Step-by-step guide to creating a powerful semantic search engine using Artintel's embeddings and vector database integrations."
              category="Integration"
              readTime="20 min read"
              href="#guide-semantic-search"
            />
            <GuideCard
              title="Implementing Effective Prompt Engineering"
              description="Best practices for designing prompts that get the best results from language models."
              category="Usage"
              readTime="10 min read"
              href="#guide-prompt-engineering"
            />
            <GuideCard
              title="Setting Up a Multi-Stage AI Pipeline"
              description="Learn how to create complex AI workflows by chaining multiple models together for sophisticated processing."
              category="Advanced"
              readTime="25 min read"
              href="#guide-ai-pipeline"
            />
            <GuideCard
              title="Implementing RLHF for Model Alignment"
              description="Advanced guide to implementing Reinforcement Learning from Human Feedback to align models with human preferences."
              category="Advanced"
              readTime="30 min read"
              href="#guide-rlhf"
            />
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link href="#all-guides">View All Guides</Link>
            </Button>
          </div>
        </AnimationContainer>

        {/* Code Examples */}
        <AnimationContainer className="mt-20 w-full">
          <Card className="border-none shadow-md bg-card/30">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Code Examples</CardTitle>
              <CardDescription>
                Ready-to-use code snippets for common tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-card/50 border border-border/80">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Python: Fine-tuning API</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                      <code>{`import artintel

# Initialize client
client = artintel.Client(api_key="your_api_key")

# Create fine-tuning job
response = client.fine_tuning.create(
    model="mistral-7b",
    training_file="file_123456",
    hyperparameters={
        "epochs": 3,
        "learning_rate": 1e-5,
        "batch_size": 4
    }
)

# Get job ID
job_id = response.id
print(f"Fine-tuning job created: {job_id}")

# Check status
status = client.fine_tuning.retrieve(job_id)
print(f"Status: {status.status}")
`}</code>
                    </pre>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border border-border/80">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">JavaScript: Model Inference</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                      <code>{`import { ArtintelClient } from 'artintel';

// Initialize client
const client = new ArtintelClient({
  apiKey: 'your_api_key',
});

async function generateResponse() {
  try {
    const response = await client.completions.create({
      model: 'ft:mistral-7b:custom-support:1234',
      prompt: 'How do I reset my password?',
      max_tokens: 150,
      temperature: 0.7,
    });
    
    console.log(response.choices[0].text);
  } catch (error) {
    console.error('Error:', error);
  }
}

generateResponse();
`}</code>
                    </pre>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center mt-8">
                <Button asChild>
                  <Link href="#code-examples">View More Examples</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </AnimationContainer>

        {/* Documentation Resources */}
        <AnimationContainer className="mt-20 w-full">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Additional Resources</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore these resources to deepen your understanding of Artintel's platform and capabilities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-card/50 border border-border/80">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Whitepapers</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  In-depth technical papers on Artintel's architecture, model performance, and industry-specific solutions.
                </p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="#whitepapers">Browse Whitepapers</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border border-border/80">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Case Studies</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Real-world examples of how organizations are using Artintel to solve complex challenges.
                </p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="#case-studies">View Case Studies</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border border-border/80">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Sample Projects</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Complete example projects with source code to help you get started quickly.
                </p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="#sample-projects">Explore Projects</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </AnimationContainer>

        {/* CTA Section */}
        <AnimationContainer className="mt-20 w-full">
          <Card className="border-none shadow-md bg-gradient-to-r from-primary/10 to-primary/5 p-8">
            <CardContent className="pt-6 text-center">
              <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Can't find what you're looking for? Our support team is here to help you get the most out of Artintel.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/contact">Contact Support</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full"
                >
                  <Link href="/community">Join Community</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </AnimationContainer>
      </Wrapper>
    </>
  );
};

export default DocsPage;
