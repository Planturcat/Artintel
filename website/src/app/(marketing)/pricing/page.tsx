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
  Check,
  X,
  Sparkles,
  Rocket,
  Building,
  HelpCircle,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Custom PricingHero component
const PricingHero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background to-background/80 py-20 md:py-24">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/3 top-1/3 h-64 w-64 rounded-full bg-primary/10 blur-[100px]"></div>
        <div className="absolute right-1/3 bottom-1/3 h-64 w-64 rounded-full bg-primary/10 blur-[100px]"></div>
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
            <Sparkles className="mr-1 h-3 w-3" />
            <span>Transparent Pricing</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-4">
            Choose the Right{" "}
            <span className="text-primary">Plan</span>{" "}
            for Your Needs
          </h1>

          <p className="text-lg text-muted-foreground mb-6">
            Artintel offers flexible pricing options to accommodate organizations of all sizes, from startups to enterprises. Select the plan that best fits your requirements and budget.
          </p>
        </div>
      </Wrapper>
    </div>
  );
};

// Custom PricingTier component
const PricingTier = ({
  name,
  description,
  price,
  features,
  icon: Icon,
  popular = false,
  buttonText = "Get Started",
  buttonLink = "#",
}: {
  name: string;
  description: string;
  price: string;
  features: { text: string; included: boolean }[];
  icon: React.ElementType;
  popular?: boolean;
  buttonText?: string;
  buttonLink?: string;
}) => {
  return (
    <Card className={`flex flex-col h-full ${popular ? "border-primary shadow-lg" : "border-border/80"}`}>
      {popular && (
        <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
          <div className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
            Popular
          </div>
        </div>
      )}
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <div className={`p-2 rounded-md ${popular ? "bg-primary/20" : "bg-primary/10"}`}>
            <Icon className={`h-5 w-5 ${popular ? "text-primary" : "text-primary/80"}`} />
          </div>
          <CardTitle className="text-2xl">{name}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mb-6">
          <div className="text-3xl font-bold">{price}</div>
        </div>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              {feature.included ? (
                <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
              ) : (
                <X className="h-5 w-5 text-muted-foreground/50 mr-2 flex-shrink-0" />
              )}
              <span className={feature.included ? "" : "text-muted-foreground/70"}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          asChild
          className={`w-full rounded-full ${popular ? "" : "bg-card hover:bg-card/80 text-foreground border border-border"}`}
          variant={popular ? "default" : "outline"}
        >
          <Link href={buttonLink}>{buttonText}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const PricingPage = () => {
  return (
    <>
      {/* Custom Hero Section */}
      <PricingHero />

      <Wrapper className="mb-12 mt-12 flex flex-col items-center justify-center">
        {/* Pricing Tiers */}
        <AnimationContainer className="w-full">
          <div className="grid md:grid-cols-3 gap-6">
            <PricingTier
              name="Free"
              description="Perfect for startups, educators, and solo developers"
              price="$0"
              icon={Zap}
              buttonText="Sign Up Free"
              buttonLink="/signup"
              features={[
                { text: "Access to lightweight SLMs (BERT, DistilBERT)", included: true },
                { text: "Community forum support", included: true },
                { text: "Local/offline model use", included: true },
                { text: "Basic model comparison", included: true },
                { text: "Limited cloud deployment", included: true },
                { text: "Advanced fine-tuning templates", included: false },
                { text: "Mid-sized LLMs (Mistral 7B)", included: false },
                { text: "Large LLMs (Falcon 180B, Llama 70B)", included: false },
                { text: "Compliance tools (HIPAA, GDPR)", included: false },
                { text: "24/7 support", included: false },
              ]}
            />
            <PricingTier
              name="Pro"
              description="For SMEs and mid-sized tech teams ready for production"
              price="$499/month"
              icon={Rocket}
              popular={true}
              buttonText="Start Pro Trial"
              buttonLink="/signup?plan=pro"
              features={[
                { text: "All Free tier features", included: true },
                { text: "Mid-sized LLMs (Mistral 7B, Falcon 7B)", included: true },
                { text: "Guided fine-tuning with templates", included: true },
                { text: "One-click cloud deployment", included: true },
                { text: "Real-time cost tracking", included: true },
                { text: "Email/chat priority support", included: true },
                { text: "GPU acceleration (T4, A10)", included: true },
                { text: "Basic compliance tools", included: true },
                { text: "Large LLMs (Falcon 180B, Llama 70B)", included: false },
                { text: "Air-gapped deployments", included: false },
              ]}
            />
            <PricingTier
              name="Enterprise"
              description="For regulated industries and large global enterprises"
              price="Custom Pricing"
              icon={Building}
              buttonText="Contact Sales"
              buttonLink="/contact"
              features={[
                { text: "All Pro tier features", included: true },
                { text: "Large LLMs (Falcon 180B, Llama 70B)", included: true },
                { text: "Advanced compliance & security", included: true },
                { text: "Hybrid/on-prem deployment", included: true },
                { text: "24/7 phone support & account manager", included: true },
                { text: "Custom pipelines & solutions", included: true },
                { text: "Multi-GPU or multi-node training", included: true },
                { text: "Enterprise observability integration", included: true },
                { text: "Air-gapped deployments", included: true },
                { text: "Volume-based or custom pricing", included: true },
              ]}
            />
          </div>
        </AnimationContainer>

        {/* Feature Comparison */}
        <AnimationContainer className="mt-20 w-full">
          <Card className="border-none shadow-md bg-card/30">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Feature Comparison
              </CardTitle>
              <CardDescription>
                Detailed breakdown of features across all plans
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-4 px-2">Feature</th>
                      <th className="text-center py-4 px-2">Free</th>
                      <th className="text-center py-4 px-2">Pro</th>
                      <th className="text-center py-4 px-2">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-2 font-medium">Lightweight SLMs (BERT, DistilBERT)</td>
                      <td className="text-center py-3 px-2"><Check className="h-5 w-5 text-primary mx-auto" /></td>
                      <td className="text-center py-3 px-2"><Check className="h-5 w-5 text-primary mx-auto" /></td>
                      <td className="text-center py-3 px-2"><Check className="h-5 w-5 text-primary mx-auto" /></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2 font-medium">Mid-Sized LLMs (Mistral 7B)</td>
                      <td className="text-center py-3 px-2"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                      <td className="text-center py-3 px-2"><Check className="h-5 w-5 text-primary mx-auto" /></td>
                      <td className="text-center py-3 px-2"><Check className="h-5 w-5 text-primary mx-auto" /></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2 font-medium">Large LLMs (Falcon 180B, Llama 70B)</td>
                      <td className="text-center py-3 px-2"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                      <td className="text-center py-3 px-2"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                      <td className="text-center py-3 px-2"><Check className="h-5 w-5 text-primary mx-auto" /></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2 font-medium">No-Code Fine-Tuning Templates</td>
                      <td className="text-center py-3 px-2"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                      <td className="text-center py-3 px-2"><Check className="h-5 w-5 text-primary mx-auto" /></td>
                      <td className="text-center py-3 px-2"><Check className="h-5 w-5 text-primary mx-auto" /></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2 font-medium">Advanced Compliance (HIPAA, GDPR)</td>
                      <td className="text-center py-3 px-2"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                      <td className="text-center py-3 px-2">Basic</td>
                      <td className="text-center py-3 px-2">Full Suite</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2 font-medium">Air-Gapped Deployments</td>
                      <td className="text-center py-3 px-2"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                      <td className="text-center py-3 px-2"><X className="h-5 w-5 text-muted-foreground/50 mx-auto" /></td>
                      <td className="text-center py-3 px-2"><Check className="h-5 w-5 text-primary mx-auto" /></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2 font-medium">One-Click Cloud Deployment</td>
                      <td className="text-center py-3 px-2">Limited</td>
                      <td className="text-center py-3 px-2"><Check className="h-5 w-5 text-primary mx-auto" /></td>
                      <td className="text-center py-3 px-2"><Check className="h-5 w-5 text-primary mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2 font-medium">Support</td>
                      <td className="text-center py-3 px-2">Forums</td>
                      <td className="text-center py-3 px-2">Email/Chat</td>
                      <td className="text-center py-3 px-2">Phone + Account Manager</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </AnimationContainer>

        {/* FAQ Section */}
        <AnimationContainer className="mt-20 w-full">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our pricing and plans
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="bg-card/50 border border-border/80">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Can I upgrade from Free to Pro easily?</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes. All data and model artifacts remain intact. You simply change your billing plan, which unlocks Pro-tier features immediately.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border border-border/80">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Is on-prem deployment possible at the Pro Tier?</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Limited on-prem support is included, but advanced features—like multi-node GPU training or air-gapped compliance—are exclusive to Enterprise Premium.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border border-border/80">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Do I own the fine-tuned model?</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Absolutely. Your data remains your own, and any derivative model artifacts created through your datasets are fully owned by you. Some open-source licenses require attribution, which Artintel will guide you through.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border border-border/80">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">How does the cost of Enterprise Premium get calculated?</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Typically, it's a base subscription plus usage-based fees. For large-scale or specialized projects, you can work with the Artintel solutions team on a custom agreement.
                </p>
              </CardContent>
            </Card>
          </div>
        </AnimationContainer>

        {/* CTA Section */}
        <AnimationContainer className="mt-20 w-full text-center">
          <Card className="border-none shadow-md bg-gradient-to-r from-primary/10 to-primary/5 p-8">
            <CardContent className="pt-6">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Choose the plan that's right for your organization and start building AI-powered applications today.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/signup">Sign Up Now</Link>
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
            </CardContent>
          </Card>
        </AnimationContainer>
      </Wrapper>
    </>
  );
};

export default PricingPage;
