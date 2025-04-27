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
  ArrowRight,
  Calendar,
  Clock,
  User,
  Tag,
  Share2,
  Bookmark,
  MessageSquare,
  ChevronLeft,
  Code,
  Cpu,
  Database,
  Layers,
  Settings,
  BarChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Fine-Tuning Mistral 7B for Customer Support | Artintel Blog",
  description:
    "Learn how to fine-tune the Mistral 7B model for customer support applications using Artintel's no-code platform.",
};

// Custom BlogHeader component
const BlogHeader = () => {
  return (
    <div className="border-b border-border/40 pb-8 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Button asChild variant="ghost" size="sm" className="gap-1">
          <Link href="/blog">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Blog</span>
          </Link>
        </Button>
      </div>
      
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
        Fine-Tuning Mistral 7B for Customer Support Applications
      </h1>
      
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>May 15, 2023</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>12 min read</span>
        </div>
        <div className="flex items-center gap-1">
          <User className="h-4 w-4" />
          <span>By Sarah Johnson, AI Engineer</span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="rounded-full">Mistral 7B</Badge>
        <Badge variant="outline" className="rounded-full">Fine-Tuning</Badge>
        <Badge variant="outline" className="rounded-full">Customer Support</Badge>
        <Badge variant="outline" className="rounded-full">Tutorial</Badge>
      </div>
    </div>
  );
};

// Custom BlogImage component
const BlogImage = ({ src, alt, caption }: { src: string; alt: string; caption?: string }) => {
  return (
    <div className="my-8 rounded-lg overflow-hidden border border-border/40">
      <div className="relative h-[300px] md:h-[400px] w-full">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
      {caption && (
        <div className="bg-muted/30 p-3 text-sm text-muted-foreground text-center">
          {caption}
        </div>
      )}
    </div>
  );
};

// Custom CodeBlock component
const CodeBlock = ({ code, language = "bash" }: { code: string; language?: string }) => {
  return (
    <div className="my-6 rounded-lg overflow-hidden">
      <div className="bg-muted/50 px-4 py-2 text-sm font-medium flex items-center justify-between border-b border-border/40">
        <span>{language}</span>
        <Button variant="ghost" size="sm" className="h-7 px-2">
          <span className="sr-only">Copy code</span>
          <Code className="h-4 w-4" />
        </Button>
      </div>
      <pre className="bg-muted/20 p-4 overflow-x-auto text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
};

// Main Page Component
const FineTuningMistralBlogPost = () => {
  return (
    <Wrapper className="py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <AnimationContainer>
            <article className="prose prose-lg max-w-none">
              <BlogHeader />
              
              <p className="lead text-xl text-muted-foreground mb-8">
                Mistral 7B has emerged as one of the most efficient large language models, offering an excellent balance between performance and resource requirements. In this tutorial, we'll walk through the process of fine-tuning Mistral 7B specifically for customer support applications using Artintel's no-code platform.
              </p>
              
              <BlogImage 
                src="/images/blog/mistral-7b-fine-tuning.jpg" 
                alt="Mistral 7B Fine-Tuning Process"
                caption="Mistral 7B fine-tuning workflow on the Artintel platform"
              />
              
              <h2 className="text-2xl font-bold mt-12 mb-4">Why Mistral 7B for Customer Support?</h2>
              
              <p>
                Before diving into the fine-tuning process, let's understand why Mistral 7B is an excellent choice for customer support applications:
              </p>
              
              <ul className="space-y-2 my-6">
                <li className="flex items-start gap-2">
                  <Cpu className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Efficient Resource Usage:</strong> At 7B parameters, Mistral offers strong performance while requiring significantly fewer computational resources than larger models like Llama 70B or Falcon 180B.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Layers className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Strong Base Capabilities:</strong> Mistral 7B demonstrates impressive reasoning and language understanding capabilities out-of-the-box, providing a solid foundation for fine-tuning.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Lower Latency:</strong> Smaller models like Mistral 7B can process requests faster, which is crucial for real-time customer support interactions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Database className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Cost-Effective Deployment:</strong> The reduced resource requirements translate to lower infrastructure costs for high-volume customer support operations.</span>
                </li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-12 mb-4">Preparing Your Dataset</h2>
              
              <p>
                The quality of your fine-tuning dataset is crucial for success. For customer support applications, you'll want to collect examples that represent the types of interactions your model will handle.
              </p>
              
              <h3 className="text-xl font-semibold mt-8 mb-3">Dataset Structure</h3>
              
              <p>
                Artintel's platform accepts datasets in JSONL format, where each line contains a JSON object representing a conversation. Here's an example structure:
              </p>
              
              <CodeBlock 
                code={`{
  "messages": [
    {"role": "user", "content": "I can't log into my account. It says my password is incorrect but I'm sure it's right."},
    {"role": "assistant", "content": "I'm sorry to hear you're having trouble logging in. Let's troubleshoot this together. First, please check if your Caps Lock key is turned on, as passwords are case-sensitive. If that's not the issue, would you like to try resetting your password?"}
  ]
}`}
                language="json"
              />
              
              <p>
                For effective fine-tuning, aim to collect at least 100-500 high-quality examples that cover the range of customer inquiries your system will handle.
              </p>
              
              <h3 className="text-xl font-semibold mt-8 mb-3">Data Cleaning Tips</h3>
              
              <ul className="space-y-2 my-6">
                <li>Remove personally identifiable information (PII) from your dataset</li>
                <li>Ensure consistent formatting across all examples</li>
                <li>Include a diverse range of customer inquiries and appropriate responses</li>
                <li>Balance different types of support scenarios (account issues, product questions, billing inquiries, etc.)</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-12 mb-4">Fine-Tuning Process on Artintel</h2>
              
              <p>
                Now that your dataset is ready, let's walk through the fine-tuning process on the Artintel platform:
              </p>
              
              <h3 className="text-xl font-semibold mt-8 mb-3">Step 1: Create a New Fine-Tuning Project</h3>
              
              <p>
                Log in to your Artintel dashboard and navigate to the Fine-Tuning section. Click on "Create New Project" and provide a name and description for your customer support model.
              </p>
              
              <h3 className="text-xl font-semibold mt-8 mb-3">Step 2: Select Mistral 7B as Your Base Model</h3>
              
              <p>
                In the model selection screen, choose "Mistral 7B" from the available base models. You can view the model's specifications and performance metrics to confirm it meets your requirements.
              </p>
              
              <BlogImage 
                src="/images/blog/model-selection.jpg" 
                alt="Selecting Mistral 7B on Artintel Platform"
                caption="Model selection interface on the Artintel platform"
              />
              
              <h3 className="text-xl font-semibold mt-8 mb-3">Step 3: Upload Your Dataset</h3>
              
              <p>
                Upload your prepared JSONL dataset. The platform will automatically validate your data format and provide feedback if there are any issues that need to be addressed.
              </p>
              
              <CodeBlock 
                code={`# Example command if using the Artintel CLI
artintel dataset upload --project "customer-support" --file "support_conversations.jsonl"`}
              />
              
              <h3 className="text-xl font-semibold mt-8 mb-3">Step 4: Configure Training Parameters</h3>
              
              <p>
                Adjust the fine-tuning parameters based on your specific needs. Here are our recommended settings for customer support applications:
              </p>
              
              <div className="bg-muted/20 rounded-lg p-6 my-6 border border-border/40">
                <h4 className="font-semibold mb-4">Recommended Parameters</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Learning Rate</p>
                    <p className="font-medium">2e-5</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Epochs</p>
                    <p className="font-medium">3-5</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Batch Size</p>
                    <p className="font-medium">8</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Max Sequence Length</p>
                    <p className="font-medium">2048</p>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mt-8 mb-3">Step 5: Start Fine-Tuning</h3>
              
              <p>
                Once your parameters are configured, click "Start Fine-Tuning" to begin the process. The Artintel platform will handle the computational heavy lifting, and you'll receive notifications as the training progresses.
              </p>
              
              <p>
                Depending on your dataset size and the selected parameters, fine-tuning typically takes 2-4 hours for Mistral 7B.
              </p>
              
              <h3 className="text-xl font-semibold mt-8 mb-3">Step 6: Evaluate Your Fine-Tuned Model</h3>
              
              <p>
                After fine-tuning completes, the platform will provide evaluation metrics to help you assess your model's performance. Pay particular attention to:
              </p>
              
              <ul className="space-y-2 my-6">
                <li className="flex items-start gap-2">
                  <BarChart className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Loss Curves:</strong> Check if the training and validation loss decrease and converge, indicating successful learning.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Settings className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Response Quality:</strong> Use the interactive testing interface to evaluate how well the model handles different customer inquiries.</span>
                </li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-12 mb-4">Deploying Your Fine-Tuned Model</h2>
              
              <p>
                Once you're satisfied with your model's performance, it's time to deploy it for production use:
              </p>
              
              <h3 className="text-xl font-semibold mt-8 mb-3">Deployment Options</h3>
              
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <Card className="bg-card/50 border border-border/80">
                  <CardHeader>
                    <CardTitle>API Deployment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Deploy your model as an API endpoint that can be integrated with your existing customer support systems.
                    </p>
                    <CodeBlock 
                      code={`# Example API call
curl -X POST https://api.artintel.ai/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "model": "your-custom-mistral-7b",
    "messages": [
      {"role": "user", "content": "How do I reset my password?"}
    ]
  }'`}
                      language="bash"
                    />
                  </CardContent>
                </Card>
                
                <Card className="bg-card/50 border border-border/80">
                  <CardHeader>
                    <CardTitle>Widget Integration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Embed your fine-tuned model directly into your website or application using our pre-built chat widget.
                    </p>
                    <CodeBlock 
                      code={`<!-- Add this to your website -->
<script src="https://widget.artintel.ai/v1/chat.js" 
  data-model="your-custom-mistral-7b"
  data-api-key="YOUR_PUBLIC_API_KEY">
</script>`}
                      language="html"
                    />
                  </CardContent>
                </Card>
              </div>
              
              <h2 className="text-2xl font-bold mt-12 mb-4">Monitoring and Improving Your Model</h2>
              
              <p>
                Deployment is just the beginning. To ensure your model continues to perform well:
              </p>
              
              <ul className="space-y-2 my-6">
                <li>Set up monitoring to track model performance and user satisfaction</li>
                <li>Collect feedback from users to identify areas for improvement</li>
                <li>Periodically update your training dataset with new examples</li>
                <li>Re-fine-tune your model as needed to incorporate new knowledge or improve handling of specific scenarios</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-12 mb-4">Conclusion</h2>
              
              <p>
                Fine-tuning Mistral 7B for customer support applications offers an excellent balance of performance and efficiency. By following the steps outlined in this tutorial, you can create a customized AI assistant that understands your products, services, and customer needs.
              </p>
              
              <p>
                The Artintel platform simplifies the fine-tuning process, allowing you to focus on creating high-quality datasets and deploying effective solutions rather than managing complex infrastructure.
              </p>
              
              <p>
                Ready to get started with your own fine-tuning project? <Link href="/contact" className="text-primary hover:underline">Contact our team</Link> for personalized guidance or <Link href="/pricing" className="text-primary hover:underline">explore our pricing plans</Link> to find the right option for your needs.
              </p>
            </article>
            
            <div className="border-t border-border/40 mt-12 pt-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm" className="gap-2 rounded-full">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 rounded-full">
                    <Bookmark className="h-4 w-4" />
                    <span>Save</span>
                  </Button>
                </div>
                <div>
                  <Button variant="outline" size="sm" className="gap-2 rounded-full">
                    <MessageSquare className="h-4 w-4" />
                    <span>Comments (3)</span>
                  </Button>
                </div>
              </div>
            </div>
          </AnimationContainer>
        </div>
        
        <div className="lg:col-span-4">
          <div className="sticky top-24">
            <AnimationContainer>
              <Card className="bg-card/50 border border-border/80 mb-6">
                <CardHeader>
                  <CardTitle>Table of Contents</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <a href="#" className="text-primary hover:underline">Why Mistral 7B for Customer Support?</a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-primary">Preparing Your Dataset</a>
                      <ul className="ml-4 mt-2 space-y-2">
                        <li><a href="#" className="hover:text-primary">Dataset Structure</a></li>
                        <li><a href="#" className="hover:text-primary">Data Cleaning Tips</a></li>
                      </ul>
                    </li>
                    <li>
                      <a href="#" className="hover:text-primary">Fine-Tuning Process on Artintel</a>
                      <ul className="ml-4 mt-2 space-y-2">
                        <li><a href="#" className="hover:text-primary">Step 1: Create a New Project</a></li>
                        <li><a href="#" className="hover:text-primary">Step 2: Select Base Model</a></li>
                        <li><a href="#" className="hover:text-primary">Step 3: Upload Dataset</a></li>
                        <li><a href="#" className="hover:text-primary">Step 4: Configure Parameters</a></li>
                        <li><a href="#" className="hover:text-primary">Step 5: Start Fine-Tuning</a></li>
                        <li><a href="#" className="hover:text-primary">Step 6: Evaluate Model</a></li>
                      </ul>
                    </li>
                    <li><a href="#" className="hover:text-primary">Deploying Your Fine-Tuned Model</a></li>
                    <li><a href="#" className="hover:text-primary">Monitoring and Improving</a></li>
                    <li><a href="#" className="hover:text-primary">Conclusion</a></li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 border border-border/80 mb-6">
                <CardHeader>
                  <CardTitle>Related Articles</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li>
                      <Link href="/blog/business-case-open-source-llm" className="hover:text-primary">
                        The Business Case for Open-Source LLMs
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog/prompt-engineering-guide" className="hover:text-primary">
                        Prompt Engineering Guide for Customer Support
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog/optimizing-llm-inference" className="hover:text-primary">
                        Optimizing LLM Inference for Production
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-none">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2">Ready to fine-tune your own model?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get started with Artintel's no-code fine-tuning platform today.
                  </p>
                  <Button asChild className="w-full">
                    <Link href="/pricing">
                      Try Artintel Free
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </AnimationContainer>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default FineTuningMistralBlogPost;
