import React from "react";
import MaxWidthWrapper from "@/components/global/max-width-wrapper";
import { Badge } from "@/components/ui/badge";
import {
  CircleDollarSign,
  Laptop,
  Clock,
  Gauge,
  Cpu,
  BrainCircuit,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

// Import enhanced SLM components
import EnhancedSLMHero from "@/components/slm-catalog/enhanced-slm-hero";
import EnhancedModelComparison from "@/components/slm-catalog/enhanced-model-comparison";
import EnhancedDeviceCompatibility from "@/components/slm-catalog/enhanced-device-compatibility";

// Import modern UI components
import { ModernButton } from "@/components/ui/modern-button";
import {
  ModernCard,
  ModernCardHeader,
  ModernCardTitle,
  ModernCardDescription,
  ModernCardContent,
} from "@/components/ui/modern-card";
import { ModernBentoGrid } from "@/components/ui/modern-bento-grid";

// Import SLM catalog components
import ModelDistillation from "@/components/slm-catalog/model-distillation";
import EdgeDeployment from "@/components/slm-catalog/edge-deployment";

const SLMModelsPage = () => {
  return (
    <>
      {/* Hero Section */}
      <EnhancedSLMHero data-oid="4jbgpbg" />

      <MaxWidthWrapper
        className="mb-12 mt-20 flex flex-col items-center justify-center text-center"
        data-oid="6n1m.e:"
      >
        {/* Definition Section */}
        <div className="w-full mb-16" data-oid="ux_jido">
          <h2
            className="text-3xl font-bold mb-6 text-center text-gradient-primary"
            data-oid="6fded::"
          >
            What Are Small Language Models?
          </h2>
          <ModernCard
            variant="gradient"
            className="glass-card"
            data-oid="7h8282s"
          >
            <ModernCardHeader data-oid="58mkz-h">
              <ModernCardTitle
                className="text-2xl font-bold flex items-center gap-2"
                data-oid="6d6x5bk"
              >
                <Cpu className="h-5 w-5 text-primary" data-oid="1pkmli6" />
                Definition
              </ModernCardTitle>
            </ModernCardHeader>
            <ModernCardContent className="space-y-4" data-oid=":emcea7">
              <p className="text-foreground" data-oid="pqdn2iv">
                <strong data-oid="uke113t">Small Language Models (SLMs)</strong>{" "}
                typically range from{" "}
                <span
                  className="text-gradient-accent font-medium"
                  data-oid="rl1a22n"
                >
                  a few million to a few billion parameters
                </span>
                . These models are designed to be efficient and performant in
                resource-constrained environments, making them ideal for edge
                deployments and applications with limited computing resources.
              </p>
              <p className="text-muted-foreground" data-oid="1.tijn2">
                Popular examples include:
              </p>
              <div className="flex flex-wrap gap-2 mt-2" data-oid="pd-cs0t">
                {[
                  "BERT (110M)",
                  "DistilBERT (66M)",
                  "GPT-2 small",
                  "Phi-2",
                  "TinyBERT",
                ].map((model, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="text-sm py-1.5 border-primary/20 bg-primary/10 hover:bg-primary/20 transition-colors"
                    data-oid=".h:ptox"
                  >
                    {model}
                  </Badge>
                ))}
              </div>
            </ModernCardContent>
          </ModernCard>
        </div>

        {/* Strengths Section */}
        <ModernBentoGrid
          title="Key Advantages"
          description="Small Language Models offer significant benefits for resource-constrained environments"
          items={[
            {
              title: "Lower Resource Footprint",
              description:
                "Can often be run on a standard CPU or lower-tier GPUs, making them ideal for devices with limited memory including edge devices and mobile applications.",
              icon: <Laptop className="h-6 w-6" data-oid="mtsmkqg" />,
              variant: "gradient",
            },
            {
              title: "Faster Inference",
              description:
                "Due to smaller size, these models can process requests more quickly, often with sub-100ms latencies, supporting near-real-time applications.",
              icon: <Clock className="h-6 w-6" data-oid="qsezqf4" />,
              variant: "glow",
            },
            {
              title: "Cost-Effectiveness",
              description:
                "Training or inference with an SLM is substantially cheaper than with larger models, making them accessible for organizations with limited AI budgets.",
              icon: <CircleDollarSign className="h-6 w-6" data-oid="oxy471b" />,
              variant: "default",
            },
          ]}
          className="mb-16"
          data-oid="up8t41d"
        />

        {/* Limitations Section */}
        <div className="w-full mb-16" data-oid="u4idwm_">
          <h2
            className="text-3xl font-bold mb-8 text-center text-gradient-primary"
            data-oid="s:0do:0"
          >
            Key Limitations
          </h2>
          <div
            className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto"
            data-oid="j6xkmzd"
          >
            <ModernCard
              variant="glass"
              interactive={true}
              glowColor="rgba(255, 100, 100, 0.15)"
              data-oid="evyhk.y"
            >
              <ModernCardHeader data-oid="7gvs9ok">
                <ModernCardTitle data-oid="h192k8v">
                  Context Window & Depth
                </ModernCardTitle>
              </ModernCardHeader>
              <ModernCardContent data-oid="bazscto">
                <ModernCardDescription data-oid="p4t5xf.">
                  SLMs tend to handle shorter sequences and have less capacity
                  for complex reasoning or multi-hop analysis, limiting their
                  utility for tasks requiring deep understanding.
                </ModernCardDescription>
              </ModernCardContent>
            </ModernCard>

            <ModernCard
              variant="glass"
              interactive={true}
              glowColor="rgba(255, 100, 100, 0.15)"
              data-oid="q43d95t"
            >
              <ModernCardHeader data-oid="u-gv-ng">
                <ModernCardTitle data-oid="4756jpo">
                  Less Generative Capability
                </ModernCardTitle>
              </ModernCardHeader>
              <ModernCardContent data-oid="dp35mue">
                <ModernCardDescription data-oid="yjlh9gq">
                  While they excel at classification or basic Q&A, they often
                  lack the creative or long-form text generation capabilities of
                  larger language models.
                </ModernCardDescription>
              </ModernCardContent>
            </ModernCard>
          </div>
        </div>

        {/* Use Cases Section */}
        <div className="w-full mb-16" data-oid="z5wm5wm">
          <h2
            className="text-3xl font-bold mb-8 text-center text-gradient-primary"
            data-oid="oda1:dc"
          >
            SLM-Friendly Tasks
          </h2>
          <div
            className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
            data-oid="_co.s4f"
          >
            <ModernCard
              variant="gradient"
              className="h-full"
              data-oid="4x4jbi-"
            >
              <ModernCardHeader data-oid="hfj4cmz">
                <ModernCardTitle
                  className="flex items-center gap-2"
                  data-oid="ncvbm4m"
                >
                  <BrainCircuit
                    className="h-5 w-5 text-primary"
                    data-oid="f85oea3"
                  />
                  Text & Language Processing
                </ModernCardTitle>
              </ModernCardHeader>
              <ModernCardContent data-oid=".5hnjds">
                <div className="space-y-4" data-oid="z96hycr">
                  <div className="glass p-3 rounded-lg" data-oid="o2_5pfa">
                    <h4 className="font-medium mb-1" data-oid="j3mgrj7">
                      Text Classification
                    </h4>
                    <p
                      className="text-sm text-muted-foreground"
                      data-oid="ntrkl6l"
                    >
                      Spam detection, sentiment analysis, or topic labeling with
                      high accuracy and low latency.
                    </p>
                  </div>
                  <div className="glass p-3 rounded-lg" data-oid="hhadj45">
                    <h4 className="font-medium mb-1" data-oid="e_sh:zt">
                      Entity Recognition
                    </h4>
                    <p
                      className="text-sm text-muted-foreground"
                      data-oid="9rxxns1"
                    >
                      Identifying names of people, places, or organizations in
                      texts for information extraction.
                    </p>
                  </div>
                  <div className="glass p-3 rounded-lg" data-oid="delh.cz">
                    <h4 className="font-medium mb-1" data-oid="vq.96se">
                      Simple Chatbots
                    </h4>
                    <p
                      className="text-sm text-muted-foreground"
                      data-oid="u9u6mfd"
                    >
                      For small businesses or local devices with limited GPU
                      budgets that need basic conversational capabilities.
                    </p>
                  </div>
                </div>
              </ModernCardContent>
            </ModernCard>

            <ModernCard
              variant="gradient"
              className="h-full"
              data-oid="h4p3_-g"
            >
              <ModernCardHeader data-oid="pit4-6:">
                <ModernCardTitle
                  className="flex items-center gap-2"
                  data-oid="pe5l4f6"
                >
                  <Cpu className="h-5 w-5 text-primary" data-oid="8m1jit5" />
                  Hardware & Deployment
                </ModernCardTitle>
              </ModernCardHeader>
              <ModernCardContent data-oid="m4j5vof">
                <div className="space-y-4" data-oid="m-8x64t">
                  <div className="glass p-3 rounded-lg" data-oid="z09i0ux">
                    <h4 className="font-medium mb-1" data-oid="wnh:2i_">
                      Edge Deployments
                    </h4>
                    <p
                      className="text-sm text-muted-foreground"
                      data-oid="2vn10k1"
                    >
                      IoT devices or mobile apps with constrained resources that
                      need to run inference locally.
                    </p>
                  </div>
                  <div className="glass p-3 rounded-lg" data-oid="2fg30fk">
                    <h4 className="font-medium mb-1" data-oid="fu4cy2i">
                      Embedded Systems
                    </h4>
                    <p
                      className="text-sm text-muted-foreground"
                      data-oid=".rojv1q"
                    >
                      Integration with hardware-constrained systems that require
                      natural language understanding.
                    </p>
                  </div>
                  <div className="glass p-3 rounded-lg" data-oid="l_:pemw">
                    <h4 className="font-medium mb-1" data-oid="r26xan-">
                      High-Volume Processing
                    </h4>
                    <p
                      className="text-sm text-muted-foreground"
                      data-oid="_x4pb27"
                    >
                      Applications that need to process thousands of text
                      samples per second with low latency.
                    </p>
                  </div>
                </div>
              </ModernCardContent>
            </ModernCard>
          </div>
        </div>

        {/* Distillation Section */}
        <ModelDistillation data-oid=".ye.2n7" />

        {/* Performance Considerations */}
        <div className="w-full mb-16 mt-12" data-oid="48t_afu">
          <h2
            className="text-3xl font-bold mb-8 text-center text-gradient-primary"
            data-oid="y.afg8z"
          >
            Performance Benefits
          </h2>
          <div
            className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
            data-oid="npbtimr"
          >
            <ModernCard variant="glass" interactive={true} data-oid="9::q5yz">
              <ModernCardHeader data-oid="ug:p6u2">
                <ModernCardTitle
                  className="flex items-center gap-2"
                  data-oid="x.tezgf"
                >
                  <Gauge className="h-5 w-5 text-primary" data-oid="0l81h_f" />
                  Latency Advantages
                </ModernCardTitle>
              </ModernCardHeader>
              <ModernCardContent className="space-y-4" data-oid=".ecl15.">
                <ModernCardDescription data-oid="9gj4dng">
                  SLMs typically respond much faster than their larger
                  counterparts:
                </ModernCardDescription>
                <div
                  className="glass p-4 text-sm rounded-lg"
                  data-oid="316sdc5"
                >
                  <ul className="space-y-3" data-oid="ci1qg4i">
                    <li className="flex items-start gap-2" data-oid="p34ht9y">
                      <div
                        className="bg-primary/10 p-1 rounded-full"
                        data-oid="1c0r-h_"
                      >
                        <ArrowRight
                          className="h-3.5 w-3.5 text-primary"
                          data-oid="nzkkp:v"
                        />
                      </div>
                      <div data-oid="ir66kih">
                        <span
                          className="font-medium text-primary"
                          data-oid="hl.vm.f"
                        >
                          SLMs:
                        </span>
                        <span className="text-foreground" data-oid="iofu8bt">
                          Sub-100ms latencies, suitable for real-time or
                          high-volume endpoints
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2" data-oid="0gk_oz:">
                      <div
                        className="bg-primary/10 p-1 rounded-full"
                        data-oid="uu9d-v9"
                      >
                        <ArrowRight
                          className="h-3.5 w-3.5 text-primary"
                          data-oid="6lftaae"
                        />
                      </div>
                      <div data-oid="7_18-1f">
                        <span
                          className="font-medium text-primary"
                          data-oid="1j613oe"
                        >
                          LLMs:
                        </span>
                        <span className="text-foreground" data-oid="b48j933">
                          300ms–2s or more, depending on hardware and input
                          length
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </ModernCardContent>
            </ModernCard>

            <ModernCard variant="glass" interactive={true} data-oid="swg_05w">
              <ModernCardHeader data-oid="nq_ua1u">
                <ModernCardTitle
                  className="flex items-center gap-2"
                  data-oid="zvxc.xy"
                >
                  <CircleDollarSign
                    className="h-5 w-5 text-primary"
                    data-oid="r5b1ybc"
                  />
                  Resource Efficiency
                </ModernCardTitle>
              </ModernCardHeader>
              <ModernCardContent className="space-y-4" data-oid="6s.bl-q">
                <ModernCardDescription data-oid=":q9t5q6">
                  SLMs offer significant resource advantages:
                </ModernCardDescription>
                <div
                  className="glass p-4 text-sm rounded-lg"
                  data-oid="rtg:i32"
                >
                  <ul className="space-y-3" data-oid="jpl7lyh">
                    <li className="flex items-start gap-2" data-oid="tli1ny5">
                      <div
                        className="bg-primary/10 p-1 rounded-full"
                        data-oid="-rj__n0"
                      >
                        <ArrowRight
                          className="h-3.5 w-3.5 text-primary"
                          data-oid="fvhs6aa"
                        />
                      </div>
                      <div data-oid="oifd5:d">
                        <span
                          className="font-medium text-primary"
                          data-oid="5110c39"
                        >
                          Memory:
                        </span>
                        <span className="text-foreground" data-oid="hoofps_">
                          Can run on a single GPU with 4–16GB VRAM or even on
                          CPU
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2" data-oid="_aasfsm">
                      <div
                        className="bg-primary/10 p-1 rounded-full"
                        data-oid="g83v8m_"
                      >
                        <ArrowRight
                          className="h-3.5 w-3.5 text-primary"
                          data-oid="kccw6zl"
                        />
                      </div>
                      <div data-oid="ai_q8l7">
                        <span
                          className="font-medium text-primary"
                          data-oid=".wf_wft"
                        >
                          Training:
                        </span>
                        <span className="text-foreground" data-oid="qnr3f:t">
                          Feasible on a single mid-tier GPU (e.g., an NVIDIA T4
                          or A10)
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2" data-oid="m6qa:vb">
                      <div
                        className="bg-primary/10 p-1 rounded-full"
                        data-oid="leztr.z"
                      >
                        <ArrowRight
                          className="h-3.5 w-3.5 text-primary"
                          data-oid="30jv3rm"
                        />
                      </div>
                      <div data-oid="wll3rlp">
                        <span
                          className="font-medium text-primary"
                          data-oid="f1y5oks"
                        >
                          Scaling:
                        </span>
                        <span className="text-foreground" data-oid="1l0qu4r">
                          Horizontal scaling is simpler since each instance has
                          modest memory needs
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </ModernCardContent>
            </ModernCard>
          </div>
        </div>

        {/* Device Compatibility */}
        <EnhancedDeviceCompatibility data-oid="hyr8_8a" />

        {/* Edge Deployment Section */}
        <EdgeDeployment data-oid=":vr0mb1" />

        {/* Comparison Section */}
        <EnhancedModelComparison data-oid="uvtkuzi" />

        {/* CTA Section */}
        <div className="w-full mt-16 mb-20" data-oid="xr7qt9w">
          <ModernCard
            variant="gradient"
            className="glass-card glow-md"
            data-oid="h.6rwd9"
          >
            <ModernCardContent className="py-12 text-center" data-oid="3rk1mhg">
              <h3
                className="text-3xl font-bold mb-4 text-gradient-primary"
                data-oid="toj.e46"
              >
                Ready to explore SLMs with ArtIntel?
              </h3>
              <p
                className="text-muted-foreground max-w-2xl mx-auto mb-8"
                data-oid="5.708aa"
              >
                ArtIntel helps you find the perfect Small Language Model for
                your use case, providing tools for selection, fine-tuning, and
                efficient deployment across a range of devices and environments.
              </p>
              <div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                data-oid="7yckw0-"
              >
                <ModernButton
                  asChild
                  size="lg"
                  variant="primary"
                  glow="lg"
                  data-oid="ph0xglw"
                >
                  <Link href="/catalog" data-oid="2svl703">
                    Browse Our Catalog
                  </Link>
                </ModernButton>
                <ModernButton
                  asChild
                  size="lg"
                  variant="glass"
                  data-oid="vknul:n"
                >
                  <Link href="/llm-models" data-oid=":cxms3q">
                    Compare with LLMs
                  </Link>
                </ModernButton>
              </div>
            </ModernCardContent>
          </ModernCard>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default SLMModelsPage;
