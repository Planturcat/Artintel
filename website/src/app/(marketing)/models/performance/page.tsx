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
  BarChart,
  Gauge,
  Cpu,
  BrainCircuit,
  ArrowRight,
  Clock,
  CircleDollarSign,
  Zap,
  Server,
  LineChart,
  BarChart2,
  PieChart,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Model Performance | Artintel",
  description:
    "Compare the performance of different language models across various benchmarks, tasks, and resource requirements to find the right model for your needs.",
};

// Custom PerformanceHero component
const PerformanceHero = () => {
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
            <BarChart className="mr-1 h-3 w-3" />
            <span>Performance Metrics</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-4">
            Model{" "}
            <span className="text-primary">Performance</span>{" "}
            Benchmarks
          </h1>

          <p className="text-lg text-muted-foreground mb-6">
            Compare the performance of different language models across various benchmarks, tasks, and resource requirements to find the right model for your needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="rounded-full">
              <a href="#benchmarks">View Benchmarks</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="/catalog">Browse Models</Link>
            </Button>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

// Custom BenchmarkCard component
const BenchmarkCard = ({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
}) => {
  return (
    <Card className="bg-card/50 border border-border/80 h-full">
      <CardHeader className="pb-2">
        <div className="p-2 rounded-lg bg-primary/10 w-fit mb-2">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

// Main Page Component
const ModelPerformancePage = () => {
  return (
    <>
      {/* Hero Section */}
      <PerformanceHero />

      <Wrapper className="mb-12 mt-12 flex flex-col items-center justify-center">
        {/* Benchmark Categories */}
        <AnimationContainer className="w-full" id="benchmarks">
          <h2 className="text-3xl font-bold mb-8 text-center">Benchmark Categories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <BenchmarkCard
              icon={BarChart2}
              title="Natural Language Understanding"
              description="Evaluates a model's ability to comprehend text, including tasks like sentiment analysis, text classification, and named entity recognition."
            />
            <BenchmarkCard
              icon={LineChart}
              title="Text Generation Quality"
              description="Measures the coherence, relevance, and creativity of generated text across various domains and contexts."
            />
            <BenchmarkCard
              icon={Gauge}
              title="Resource Efficiency"
              description="Compares models based on memory usage, inference speed, and computational requirements for different deployment scenarios."
            />
          </div>
        </AnimationContainer>

        {/* Performance Comparison */}
        <AnimationContainer className="w-full mt-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Performance Comparison</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Compare the performance of different language models across key metrics
            </p>
          </div>

          <Tabs defaultValue="nlu" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="nlu" className="text-base">
                NLU Benchmarks
              </TabsTrigger>
              <TabsTrigger value="generation" className="text-base">
                Generation Quality
              </TabsTrigger>
              <TabsTrigger value="efficiency" className="text-base">
                Resource Efficiency
              </TabsTrigger>
            </TabsList>

            <TabsContent value="nlu">
              <Card>
                <CardHeader>
                  <CardTitle>Natural Language Understanding Benchmarks</CardTitle>
                  <CardDescription>
                    Performance on GLUE, SuperGLUE, and other NLU benchmarks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Model</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>GLUE Score</TableHead>
                        <TableHead>SuperGLUE Score</TableHead>
                        <TableHead>MMLU Score</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">BERT Base</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary">
                            SLM
                          </Badge>
                        </TableCell>
                        <TableCell>79.6</TableCell>
                        <TableCell>69.0</TableCell>
                        <TableCell>38.2</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">DistilBERT</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary">
                            SLM
                          </Badge>
                        </TableCell>
                        <TableCell>77.0</TableCell>
                        <TableCell>64.5</TableCell>
                        <TableCell>35.0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Mistral 7B</TableCell>
                        <TableCell>
                          <Badge>LLM</Badge>
                        </TableCell>
                        <TableCell>85.7</TableCell>
                        <TableCell>78.2</TableCell>
                        <TableCell>62.5</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Llama 2 7B</TableCell>
                        <TableCell>
                          <Badge>LLM</Badge>
                        </TableCell>
                        <TableCell>83.9</TableCell>
                        <TableCell>76.5</TableCell>
                        <TableCell>58.7</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Falcon 40B</TableCell>
                        <TableCell>
                          <Badge>LLM</Badge>
                        </TableCell>
                        <TableCell>88.2</TableCell>
                        <TableCell>82.1</TableCell>
                        <TableCell>70.3</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="generation">
              <Card>
                <CardHeader>
                  <CardTitle>Text Generation Quality</CardTitle>
                  <CardDescription>
                    Performance on text generation tasks and human evaluation metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Model</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Coherence</TableHead>
                        <TableHead>Relevance</TableHead>
                        <TableHead>Creativity</TableHead>
                        <TableHead>Factuality</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">GPT-2 Small</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary">
                            SLM
                          </Badge>
                        </TableCell>
                        <TableCell>3.2/5</TableCell>
                        <TableCell>3.0/5</TableCell>
                        <TableCell>2.8/5</TableCell>
                        <TableCell>3.1/5</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Phi-2</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary">
                            SLM
                          </Badge>
                        </TableCell>
                        <TableCell>3.7/5</TableCell>
                        <TableCell>3.5/5</TableCell>
                        <TableCell>3.2/5</TableCell>
                        <TableCell>3.8/5</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Mistral 7B</TableCell>
                        <TableCell>
                          <Badge>LLM</Badge>
                        </TableCell>
                        <TableCell>4.2/5</TableCell>
                        <TableCell>4.0/5</TableCell>
                        <TableCell>3.9/5</TableCell>
                        <TableCell>4.1/5</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Llama 2 70B</TableCell>
                        <TableCell>
                          <Badge>LLM</Badge>
                        </TableCell>
                        <TableCell>4.5/5</TableCell>
                        <TableCell>4.3/5</TableCell>
                        <TableCell>4.2/5</TableCell>
                        <TableCell>4.4/5</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Falcon 180B</TableCell>
                        <TableCell>
                          <Badge>LLM</Badge>
                        </TableCell>
                        <TableCell>4.7/5</TableCell>
                        <TableCell>4.6/5</TableCell>
                        <TableCell>4.5/5</TableCell>
                        <TableCell>4.5/5</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="efficiency">
              <Card>
                <CardHeader>
                  <CardTitle>Resource Efficiency</CardTitle>
                  <CardDescription>
                    Comparison of memory usage, inference speed, and computational requirements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Model</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Memory Usage</TableHead>
                        <TableHead>Inference Speed</TableHead>
                        <TableHead>GPU Requirements</TableHead>
                        <TableHead>CPU Viable</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">TinyBERT</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary">
                            SLM
                          </Badge>
                        </TableCell>
                        <TableCell>~50MB</TableCell>
                        <TableCell>10-20ms</TableCell>
                        <TableCell>None</TableCell>
                        <TableCell>Yes</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">BERT Base</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary">
                            SLM
                          </Badge>
                        </TableCell>
                        <TableCell>~440MB</TableCell>
                        <TableCell>30-50ms</TableCell>
                        <TableCell>None</TableCell>
                        <TableCell>Yes</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Phi-2</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary">
                            SLM
                          </Badge>
                        </TableCell>
                        <TableCell>~5GB</TableCell>
                        <TableCell>100-200ms</TableCell>
                        <TableCell>Entry-level</TableCell>
                        <TableCell>Limited</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Mistral 7B</TableCell>
                        <TableCell>
                          <Badge>LLM</Badge>
                        </TableCell>
                        <TableCell>~14GB</TableCell>
                        <TableCell>300-500ms</TableCell>
                        <TableCell>Mid-tier</TableCell>
                        <TableCell>No</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Llama 2 70B</TableCell>
                        <TableCell>
                          <Badge>LLM</Badge>
                        </TableCell>
                        <TableCell>~140GB</TableCell>
                        <TableCell>1-2s</TableCell>
                        <TableCell>High-end</TableCell>
                        <TableCell>No</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Falcon 180B</TableCell>
                        <TableCell>
                          <Badge>LLM</Badge>
                        </TableCell>
                        <TableCell>~360GB</TableCell>
                        <TableCell>2-4s</TableCell>
                        <TableCell>Multiple high-end</TableCell>
                        <TableCell>No</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </AnimationContainer>

        {/* Task-Specific Performance */}
        <AnimationContainer className="w-full mt-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Task-Specific Performance</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See how different models perform on specific tasks
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Cpu className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Classification Tasks</CardTitle>
                    <CardDescription>Sentiment analysis, topic classification, etc.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary">
                        SLM
                      </Badge>
                      <span className="font-medium">BERT Base</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: "92%" }}></div>
                      </div>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary">
                        SLM
                      </Badge>
                      <span className="font-medium">RoBERTa</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: "94%" }}></div>
                      </div>
                      <span className="text-sm font-medium">94%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge>LLM</Badge>
                      <span className="font-medium">Mistral 7B</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: "95%" }}></div>
                      </div>
                      <span className="text-sm font-medium">95%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge>LLM</Badge>
                      <span className="font-medium">Falcon 40B</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: "97%" }}></div>
                      </div>
                      <span className="text-sm font-medium">97%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <BrainCircuit className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Reasoning Tasks</CardTitle>
                    <CardDescription>Logical reasoning, problem-solving, etc.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary">
                        SLM
                      </Badge>
                      <span className="font-medium">BERT Base</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: "45%" }}></div>
                      </div>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary">
                        SLM
                      </Badge>
                      <span className="font-medium">Phi-2</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: "68%" }}></div>
                      </div>
                      <span className="text-sm font-medium">68%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge>LLM</Badge>
                      <span className="font-medium">Mistral 7B</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: "78%" }}></div>
                      </div>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge>LLM</Badge>
                      <span className="font-medium">Llama 2 70B</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: "86%" }}></div>
                      </div>
                      <span className="text-sm font-medium">86%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </AnimationContainer>

        {/* Model Selection Guide */}
        <AnimationContainer className="w-full mt-20">
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
                      <Layers className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>Task Complexity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      For simple classification or structured tasks, SLMs often perform nearly as well as LLMs. For complex reasoning, creative generation, or nuanced understanding, LLMs excel.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border border-border/80">
                  <CardHeader className="pb-2">
                    <div className="p-2 rounded-lg bg-primary/10 w-fit mb-2">
                      <Server className="h-5 w-5 text-primary" />
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
                      <CircleDollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>Cost Considerations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      For high-volume applications, SLMs can offer significant cost savings in terms of infrastructure and operational expenses compared to LLMs.
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
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Ideal Model?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore our catalog and discover the perfect language model for your specific use case and performance requirements.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/catalog">Browse Model Catalog</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full"
            >
              <Link href="/contact">Get Expert Advice</Link>
            </Button>
          </div>
        </AnimationContainer>
      </Wrapper>
    </>
  );
};

export default ModelPerformancePage;
