import React from "react";
import MaxWidthWrapper from "@/components/global/max-width-wrapper";
import AnimationContainer from "@/components/global/animation-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Layers, Rocket, Brain } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib";

// Import enhanced LLM components
import EnhancedLLMHero from "@/components/llm-catalog/enhanced-llm-hero";

// Import LLM catalog components
import ModelComparison from "@/components/llm-catalog/model-comparison";
import ModelUseCases from "@/components/llm-catalog/model-use-cases";
import ModelBenchmarks from "@/components/llm-catalog/model-benchmarks";

// Custom LLMFeatureCard component
const LLMFeatureCard = ({
  icon: Icon,
  title,
  description,
  className,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  className?: string;
}) => {
  return (
    <Card
      className={cn(
        "bg-card/50 border border-border/80 h-full shadow-sm hover:shadow-md transition-all",
        className,
      )}
      data-oid="fa-a2.5"
    >
      <CardHeader className="pb-2" data-oid="4v9g.og">
        <div className="flex items-center gap-2" data-oid="9th31xa">
          <Icon className="h-5 w-5 text-primary" data-oid="27ew:3r" />
          <CardTitle className="text-xl" data-oid="h0-bqt-">
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent data-oid="e.:913z">
        <p className="text-muted-foreground" data-oid="k:i5:a-">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

const LLMModelsPage = () => {
  return (
    <>
      {/* Hero Section */}
      <EnhancedLLMHero data-oid="3vp.19_" />

      <MaxWidthWrapper
        className="mb-12 mt-20 flex flex-col items-center justify-center text-center"
        data-oid="-nx-46r"
      >
        {/* Definition Section */}
        <AnimationContainer className="w-full mb-16" data-oid="3raptqo">
          <h2
            className="text-3xl font-bold mb-6 text-center"
            data-oid="lfrgo01"
          >
            What Are Large Language Models?
          </h2>
          <Card className="border-none shadow-md bg-card/30" data-oid="5c.z-ld">
            <CardHeader data-oid="mktjzdl">
              <CardTitle className="text-2xl font-bold" data-oid="zk4h3qu">
                Definition
              </CardTitle>
            </CardHeader>
            <CardContent className="text-left space-y-4" data-oid="eack1a5">
              <p data-oid="e_klj0k">
                <strong data-oid="r8rrqat">Large Language Models (LLMs)</strong>{" "}
                typically range from{" "}
                <span className="text-primary font-medium" data-oid="57a4ucx">
                  several billion to hundreds of billions of parameters
                </span>
                . These models represent the cutting edge of AI language
                capabilities, offering powerful natural language understanding,
                reasoning, and generation for complex tasks.
              </p>
              <p className="text-muted-foreground" data-oid="q1rt_q9">
                Notable examples include:
              </p>
              <div
                className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2"
                data-oid="ms:o_l_"
              >
                {[
                  "GPT-3.5/4",
                  "Falcon 40B",
                  "Falcon 180B",
                  "Llama 70B",
                  "BLOOM 176B",
                ].map((model, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="text-sm py-1.5 border-primary/20 bg-primary/5"
                    data-oid="urduuwq"
                  >
                    {model}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimationContainer>

        {/* Strengths Section */}
        <AnimationContainer className="w-full mb-16" data-oid="_1i73rd">
          <h2
            className="text-3xl font-bold mb-8 text-center"
            data-oid="ci5p.sv"
          >
            Key Strengths
          </h2>
          <div className="grid md:grid-cols-3 gap-6" data-oid="1c:jhz5">
            <LLMFeatureCard
              icon={Brain}
              title="Rich Understanding"
              description="Larger parameter counts enable these models to encode a vast array of knowledge, capturing nuanced language patterns and domain-specific jargon."
              data-oid="z0k.wws"
            />

            <LLMFeatureCard
              icon={Layers}
              title="Longer Context Windows"
              description="Many LLMs can handle thousands of tokens in a single pass, enabling complex conversation threads or large text inputs."
              data-oid="_0nytcu"
            />

            <LLMFeatureCard
              icon={Rocket}
              title="Creative Generation"
              description="Capable of producing more coherent, context-aware, and even creative outputs in tasks like storytelling, summarization, or code generation."
              data-oid="v3.:syb"
            />
          </div>
        </AnimationContainer>

        {/* Limitations Section */}
        <AnimationContainer className="w-full mb-16" data-oid="ek99omp">
          <h2
            className="text-3xl font-bold mb-8 text-center"
            data-oid="xat.eqm"
          >
            Key Limitations
          </h2>
          <div className="grid md:grid-cols-3 gap-6" data-oid="kkvvx54">
            <Card
              className="bg-card/50 border border-border/80"
              data-oid="48sx:cw"
            >
              <CardHeader className="pb-2" data-oid="ay3myys">
                <CardTitle className="text-xl" data-oid="1.7:gl0">
                  High Computational Requirements
                </CardTitle>
              </CardHeader>
              <CardContent data-oid="omgts.2">
                <p className="text-muted-foreground" data-oid="kvoanap">
                  Training or even inference can require multiple high-end GPUs
                  or TPUs, leading to substantial operational costs.
                </p>
              </CardContent>
            </Card>
            <Card
              className="bg-card/50 border border-border/80"
              data-oid="mabv-vz"
            >
              <CardHeader className="pb-2" data-oid="l4tft1h">
                <CardTitle className="text-xl" data-oid="eniq6is">
                  Slower Response Times
                </CardTitle>
              </CardHeader>
              <CardContent data-oid="_3tvc8h">
                <p className="text-muted-foreground" data-oid="7f1y1h9">
                  Larger models may have higher latency (300ms–2s or more),
                  making them less suited to real-time or ultra-low-latency
                  scenarios.
                </p>
              </CardContent>
            </Card>
            <Card
              className="bg-card/50 border border-border/80"
              data-oid="i.sj.0_"
            >
              <CardHeader className="pb-2" data-oid="1.t4bsz">
                <CardTitle className="text-xl" data-oid="4vexxrh">
                  Potential Overfitting
                </CardTitle>
              </CardHeader>
              <CardContent data-oid="c2sli0g">
                <p className="text-muted-foreground" data-oid="yd48nlm">
                  Without careful fine-tuning or regularization, large models
                  can memorize training data or exhibit erratic behavior on
                  niche tasks.
                </p>
              </CardContent>
            </Card>
          </div>
        </AnimationContainer>

        {/* Use Cases Section */}
        <ModelUseCases data-oid="ou1vwh:" />

        {/* Performance Considerations */}
        <AnimationContainer className="w-full mb-16 mt-12" data-oid="gu65x07">
          <h2
            className="text-3xl font-bold mb-8 text-center"
            data-oid="v7bi47_"
          >
            Performance Considerations
          </h2>
          <div className="grid md:grid-cols-2 gap-6" data-oid="wdl84.j">
            <Card
              className="bg-card/50 border border-border/80"
              data-oid="0f3z8ay"
            >
              <CardHeader data-oid="15efqlw">
                <CardTitle className="text-xl" data-oid="f8kq1e:">
                  Resource Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4" data-oid="rg6at_c">
                <p
                  className="text-muted-foreground text-left"
                  data-oid="63y9bk8"
                >
                  LLMs typically have significant hardware requirements:
                </p>
                <ul
                  className="space-y-2 text-muted-foreground text-left"
                  data-oid="pl2ctvz"
                >
                  <li className="flex items-start gap-2" data-oid="-zkw9wo">
                    <ArrowRight
                      className="h-4 w-4 text-primary mt-1 flex-shrink-0"
                      data-oid="_:_0dvc"
                    />

                    <span data-oid="kpewku6">
                      Memory: Often requires tens or even hundreds of GBs across
                      multiple GPUs/TPUs
                    </span>
                  </li>
                  <li className="flex items-start gap-2" data-oid="djv8j4i">
                    <ArrowRight
                      className="h-4 w-4 text-primary mt-1 flex-shrink-0"
                      data-oid="b04.b8a"
                    />

                    <span data-oid="0ut8:0l">
                      Training: Multi-GPU distributed setups with training costs
                      of thousands of dollars per day
                    </span>
                  </li>
                  <li className="flex items-start gap-2" data-oid="v_dfg2e">
                    <ArrowRight
                      className="h-4 w-4 text-primary mt-1 flex-shrink-0"
                      data-oid="ocft:qy"
                    />

                    <span data-oid="51bw.mn">
                      Inference: High-throughput deployments require GPU or
                      specialized hardware
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card
              className="bg-card/50 border border-border/80"
              data-oid="qjz3rwt"
            >
              <CardHeader data-oid="qcvxgi0">
                <CardTitle className="text-xl" data-oid="52d871s">
                  Scaling Strategy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4" data-oid="pq4kzdf">
                <p
                  className="text-muted-foreground text-left"
                  data-oid="25nk892"
                >
                  Effective deployment of LLMs often requires advanced scaling
                  strategies:
                </p>
                <ul
                  className="space-y-2 text-muted-foreground text-left"
                  data-oid="q:0_veb"
                >
                  <li className="flex items-start gap-2" data-oid="a.73eg3">
                    <ArrowRight
                      className="h-4 w-4 text-primary mt-1 flex-shrink-0"
                      data-oid="irdf:4n"
                    />

                    <span data-oid="1no0z09">
                      Model parallelism: Splitting the model across multiple
                      devices
                    </span>
                  </li>
                  <li className="flex items-start gap-2" data-oid="efs1h-:">
                    <ArrowRight
                      className="h-4 w-4 text-primary mt-1 flex-shrink-0"
                      data-oid="jlj:f59"
                    />

                    <span data-oid="eank3gn">
                      Pipeline parallelism: Different layers run on different
                      devices
                    </span>
                  </li>
                  <li className="flex items-start gap-2" data-oid=":q.u5pe">
                    <ArrowRight
                      className="h-4 w-4 text-primary mt-1 flex-shrink-0"
                      data-oid="qn103xs"
                    />

                    <span data-oid="f-75-m3">
                      Quantization: Reducing precision of model weights to
                      optimize memory usage
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </AnimationContainer>

        {/* Benchmarks Section */}
        <ModelBenchmarks data-oid="qkokz0t" />

        {/* Comparison Section */}
        <ModelComparison data-oid="sn0hgoq" />

        {/* CTA Section */}
        <AnimationContainer className="w-full mt-16 mb-20" data-oid="n43v8:5">
          <Card
            className="border-none shadow-md bg-gradient-to-br from-primary/5 to-primary/10"
            data-oid="nnt5bq2"
          >
            <CardContent className="py-8" data-oid="j-0kobq">
              <h3 className="text-2xl font-bold mb-4" data-oid="jlfthh2">
                Ready to explore LLMs with ArtIntel?
              </h3>
              <p
                className="text-muted-foreground max-w-2xl mx-auto mb-6"
                data-oid="f-2_tln"
              >
                ArtIntel helps you navigate the complex world of Large Language
                Models, providing guidance on model selection, fine-tuning, and
                deployment based on your specific use case and resource
                constraints.
              </p>
              <div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                data-oid="d9rp02e"
              >
                <Link
                  href="/catalog"
                  className={buttonVariants({ size: "lg" })}
                  data-oid="2qrg8-_"
                >
                  Browse Our Catalog
                </Link>
                <Link
                  href="/slm-models"
                  className={buttonVariants({ size: "lg", variant: "outline" })}
                  data-oid="l_cwb2e"
                >
                  Compare with SLMs
                </Link>
              </div>
            </CardContent>
          </Card>
        </AnimationContainer>
      </MaxWidthWrapper>
    </>
  );
};

export default LLMModelsPage;
