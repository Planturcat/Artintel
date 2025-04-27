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
  Building,
  ArrowRight,
  Search,
  Filter,
  CircleDollarSign,
  Clock,
  LineChart,
  Cpu,
  BrainCircuit,
  Shield,
  FileText,
  Briefcase,
  Globe,
  ShoppingBag,
  Stethoscope,
  Landmark,
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
import Image from "next/image";

export const metadata: Metadata = {
  title: "Case Studies | Artintel Resources",
  description:
    "Real-world examples of how organizations across various industries are leveraging Artintel to solve complex problems and achieve business results.",
};

// Custom CaseStudiesHero component
const CaseStudiesHero = () => {
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
            <Building className="mr-1 h-3 w-3" />
            <span>Success Stories</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-4">
            Artintel{" "}
            <span className="text-primary">Case Studies</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-6">
            Explore real-world examples of how organizations across various industries are leveraging Artintel to solve complex problems and achieve measurable business results.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="relative flex-1 max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search case studies..."
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

// Custom CaseStudyCard component
const CaseStudyCard = ({
  title,
  company,
  industry,
  description,
  results,
  imageSrc,
  href,
  featured = false,
}: {
  title: string;
  company: string;
  industry: string;
  description: string;
  results: { label: string; value: string; icon: React.ElementType }[];
  imageSrc: string;
  href: string;
  featured?: boolean;
}) => {
  return (
    <Card className={`h-full flex flex-col border-border/80 hover:border-primary/50 transition-colors overflow-hidden ${featured ? "border-primary/30 shadow-md" : ""}`}>
      {featured && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-primary text-primary-foreground">Featured</Badge>
        </div>
      )}
      <div className="relative h-48 w-full">
        <Image
          src={imageSrc}
          alt={company}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
        <div className="absolute bottom-4 left-4">
          <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
            {industry}
          </Badge>
        </div>
      </div>
      <CardHeader>
        <div className="text-sm text-muted-foreground mb-1">{company}</div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground mb-6">{description}</p>
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Key Results:</h4>
          {results.map((result, index) => {
            const Icon = result.icon;
            return (
              <div key={index} className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-primary/10">
                  <Icon className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm text-muted-foreground">{result.label}</span>
                  <span className="text-sm font-medium">{result.value}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80 hover:bg-transparent">
          <Link href={href} className="flex items-center">
            Read Case Study <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

// Main Page Component
const CaseStudiesPage = () => {
  return (
    <>
      {/* Hero Section */}
      <CaseStudiesHero />

      <Wrapper className="mb-12 mt-12 flex flex-col items-center justify-center">
        {/* Featured Case Studies */}
        <AnimationContainer className="w-full">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Case Studies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CaseStudyCard
              title="Reducing Customer Support Costs by 60% with Fine-Tuned SLMs"
              company="FinTech Corp"
              industry="Financial Services"
              description="How a leading fintech company switched from expensive API calls to fine-tuned small language models, reducing their AI costs significantly while maintaining quality."
              results={[
                { label: "Cost Reduction", value: "60%", icon: CircleDollarSign },
                { label: "Response Time", value: "< 100ms", icon: Clock },
                { label: "Customer Satisfaction", value: "95%", icon: LineChart },
              ]}
              imageSrc="/images/case-studies/fintech.jpg"
              href="/resources/case-studies/fintech-cost-reduction"
              featured={true}
            />
            <CaseStudyCard
              title="Enhancing Product Recommendations with Custom LLMs"
              company="Global Retail Inc."
              industry="E-Commerce"
              description="How a global e-commerce retailer implemented custom language models to provide personalized product recommendations, increasing conversion rates and average order value."
              results={[
                { label: "Conversion Rate", value: "+32%", icon: LineChart },
                { label: "Avg. Order Value", value: "+18%", icon: CircleDollarSign },
                { label: "Processing Time", value: "200ms", icon: Clock },
              ]}
              imageSrc="/images/case-studies/ecommerce.jpg"
              href="/resources/case-studies/ecommerce-recommendations"
              featured={true}
            />
            <CaseStudyCard
              title="Secure Document Processing in Healthcare"
              company="MedTech Solutions"
              industry="Healthcare"
              description="How a healthcare provider implemented on-premises language models to process sensitive patient documents while maintaining HIPAA compliance and data security."
              results={[
                { label: "Processing Time", value: "-75%", icon: Clock },
                { label: "Compliance", value: "100%", icon: Shield },
                { label: "Data Security", value: "On-Premises", icon: Shield },
              ]}
              imageSrc="/images/case-studies/healthcare.jpg"
              href="/resources/case-studies/healthcare-document-processing"
              featured={true}
            />
          </div>
        </AnimationContainer>

        {/* Case Studies by Industry */}
        <AnimationContainer className="w-full mt-20">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="rounded-full">
                <TabsTrigger value="all" className="rounded-full">All Industries</TabsTrigger>
                <TabsTrigger value="finance" className="rounded-full">Finance</TabsTrigger>
                <TabsTrigger value="retail" className="rounded-full">Retail</TabsTrigger>
                <TabsTrigger value="healthcare" className="rounded-full">Healthcare</TabsTrigger>
                <TabsTrigger value="technology" className="rounded-full">Technology</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CaseStudyCard
                  title="Reducing Customer Support Costs by 60% with Fine-Tuned SLMs"
                  company="FinTech Corp"
                  industry="Financial Services"
                  description="How a leading fintech company switched from expensive API calls to fine-tuned small language models, reducing their AI costs significantly while maintaining quality."
                  results={[
                    { label: "Cost Reduction", value: "60%", icon: CircleDollarSign },
                    { label: "Response Time", value: "< 100ms", icon: Clock },
                    { label: "Customer Satisfaction", value: "95%", icon: LineChart },
                  ]}
                  imageSrc="/images/case-studies/fintech.jpg"
                  href="/resources/case-studies/fintech-cost-reduction"
                />
                <CaseStudyCard
                  title="Enhancing Product Recommendations with Custom LLMs"
                  company="Global Retail Inc."
                  industry="E-Commerce"
                  description="How a global e-commerce retailer implemented custom language models to provide personalized product recommendations, increasing conversion rates and average order value."
                  results={[
                    { label: "Conversion Rate", value: "+32%", icon: LineChart },
                    { label: "Avg. Order Value", value: "+18%", icon: CircleDollarSign },
                    { label: "Processing Time", value: "200ms", icon: Clock },
                  ]}
                  imageSrc="/images/case-studies/ecommerce.jpg"
                  href="/resources/case-studies/ecommerce-recommendations"
                />
                <CaseStudyCard
                  title="Secure Document Processing in Healthcare"
                  company="MedTech Solutions"
                  industry="Healthcare"
                  description="How a healthcare provider implemented on-premises language models to process sensitive patient documents while maintaining HIPAA compliance and data security."
                  results={[
                    { label: "Processing Time", value: "-75%", icon: Clock },
                    { label: "Compliance", value: "100%", icon: Shield },
                    { label: "Data Security", value: "On-Premises", icon: Shield },
                  ]}
                  imageSrc="/images/case-studies/healthcare.jpg"
                  href="/resources/case-studies/healthcare-document-processing"
                />
                <CaseStudyCard
                  title="Automating Legal Document Review"
                  company="LegalTech Partners"
                  industry="Legal Services"
                  description="How a legal services firm implemented AI to automate the initial review of contracts and legal documents, reducing review time and improving accuracy."
                  results={[
                    { label: "Review Time", value: "-65%", icon: Clock },
                    { label: "Accuracy", value: "94%", icon: LineChart },
                    { label: "Cost Savings", value: "$1.2M/year", icon: CircleDollarSign },
                  ]}
                  imageSrc="/images/case-studies/legal.jpg"
                  href="/resources/case-studies/legal-document-review"
                />
                <CaseStudyCard
                  title="Multilingual Customer Support at Scale"
                  company="TechGiant Inc."
                  industry="Technology"
                  description="How a global technology company implemented language models to provide 24/7 customer support in 20+ languages without expanding their support team."
                  results={[
                    { label: "Languages Supported", value: "24", icon: Globe },
                    { label: "Resolution Rate", value: "87%", icon: LineChart },
                    { label: "Support Costs", value: "-40%", icon: CircleDollarSign },
                  ]}
                  imageSrc="/images/case-studies/tech.jpg"
                  href="/resources/case-studies/multilingual-support"
                />
                <CaseStudyCard
                  title="Optimizing Manufacturing Documentation"
                  company="Industrial Systems Co."
                  industry="Manufacturing"
                  description="How a manufacturing company used AI to streamline technical documentation creation and maintenance, improving accuracy and reducing time-to-market."
                  results={[
                    { label: "Documentation Time", value: "-50%", icon: Clock },
                    { label: "Error Reduction", value: "78%", icon: LineChart },
                    { label: "Time-to-Market", value: "-35%", icon: Clock },
                  ]}
                  imageSrc="/images/case-studies/manufacturing.jpg"
                  href="/resources/case-studies/manufacturing-documentation"
                />
              </div>
            </TabsContent>

            <TabsContent value="finance">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CaseStudyCard
                  title="Reducing Customer Support Costs by 60% with Fine-Tuned SLMs"
                  company="FinTech Corp"
                  industry="Financial Services"
                  description="How a leading fintech company switched from expensive API calls to fine-tuned small language models, reducing their AI costs significantly while maintaining quality."
                  results={[
                    { label: "Cost Reduction", value: "60%", icon: CircleDollarSign },
                    { label: "Response Time", value: "< 100ms", icon: Clock },
                    { label: "Customer Satisfaction", value: "95%", icon: LineChart },
                  ]}
                  imageSrc="/images/case-studies/fintech.jpg"
                  href="/resources/case-studies/fintech-cost-reduction"
                />
                <CaseStudyCard
                  title="AI-Powered Fraud Detection"
                  company="Global Banking Corp"
                  industry="Banking"
                  description="How a major bank implemented language models to enhance their fraud detection systems, identifying suspicious patterns in transaction descriptions and communications."
                  results={[
                    { label: "Fraud Detection", value: "+42%", icon: Shield },
                    { label: "False Positives", value: "-35%", icon: LineChart },
                    { label: "Cost Savings", value: "$3.5M/year", icon: CircleDollarSign },
                  ]}
                  imageSrc="/images/case-studies/banking.jpg"
                  href="/resources/case-studies/banking-fraud-detection"
                />
                <CaseStudyCard
                  title="Streamlining Insurance Claims Processing"
                  company="InsureTech Solutions"
                  industry="Insurance"
                  description="How an insurance company automated claims processing using language models, reducing processing time and improving customer satisfaction."
                  results={[
                    { label: "Processing Time", value: "-70%", icon: Clock },
                    { label: "Accuracy", value: "92%", icon: LineChart },
                    { label: "Customer Satisfaction", value: "+45%", icon: LineChart },
                  ]}
                  imageSrc="/images/case-studies/insurance.jpg"
                  href="/resources/case-studies/insurance-claims-processing"
                />
              </div>
            </TabsContent>

            <TabsContent value="retail">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CaseStudyCard
                  title="Enhancing Product Recommendations with Custom LLMs"
                  company="Global Retail Inc."
                  industry="E-Commerce"
                  description="How a global e-commerce retailer implemented custom language models to provide personalized product recommendations, increasing conversion rates and average order value."
                  results={[
                    { label: "Conversion Rate", value: "+32%", icon: LineChart },
                    { label: "Avg. Order Value", value: "+18%", icon: CircleDollarSign },
                    { label: "Processing Time", value: "200ms", icon: Clock },
                  ]}
                  imageSrc="/images/case-studies/ecommerce.jpg"
                  href="/resources/case-studies/ecommerce-recommendations"
                />
                <CaseStudyCard
                  title="AI-Powered Inventory Management"
                  company="Retail Chain Inc."
                  industry="Retail"
                  description="How a retail chain used language models to optimize inventory management by analyzing customer feedback, reviews, and market trends."
                  results={[
                    { label: "Inventory Costs", value: "-25%", icon: CircleDollarSign },
                    { label: "Stock Accuracy", value: "98%", icon: LineChart },
                    { label: "Revenue Increase", value: "+15%", icon: LineChart },
                  ]}
                  imageSrc="/images/case-studies/retail.jpg"
                  href="/resources/case-studies/retail-inventory-management"
                />
                <CaseStudyCard
                  title="Enhancing Customer Experience with AI Assistants"
                  company="Luxury Brands Co."
                  industry="Luxury Retail"
                  description="How a luxury retail brand implemented AI assistants to provide personalized shopping experiences both online and in-store."
                  results={[
                    { label: "Customer Engagement", value: "+65%", icon: LineChart },
                    { label: "Conversion Rate", value: "+28%", icon: LineChart },
                    { label: "Customer Satisfaction", value: "92%", icon: LineChart },
                  ]}
                  imageSrc="/images/case-studies/luxury.jpg"
                  href="/resources/case-studies/luxury-retail-assistants"
                />
              </div>
            </TabsContent>

            <TabsContent value="healthcare">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CaseStudyCard
                  title="Secure Document Processing in Healthcare"
                  company="MedTech Solutions"
                  industry="Healthcare"
                  description="How a healthcare provider implemented on-premises language models to process sensitive patient documents while maintaining HIPAA compliance and data security."
                  results={[
                    { label: "Processing Time", value: "-75%", icon: Clock },
                    { label: "Compliance", value: "100%", icon: Shield },
                    { label: "Data Security", value: "On-Premises", icon: Shield },
                  ]}
                  imageSrc="/images/case-studies/healthcare.jpg"
                  href="/resources/case-studies/healthcare-document-processing"
                />
                <CaseStudyCard
                  title="Streamlining Clinical Documentation"
                  company="Regional Hospital Network"
                  industry="Healthcare"
                  description="How a hospital network implemented AI to assist clinicians with documentation, reducing administrative burden and improving accuracy."
                  results={[
                    { label: "Documentation Time", value: "-45%", icon: Clock },
                    { label: "Physician Satisfaction", value: "+68%", icon: LineChart },
                    { label: "Accuracy", value: "96%", icon: LineChart },
                  ]}
                  imageSrc="/images/case-studies/hospital.jpg"
                  href="/resources/case-studies/clinical-documentation"
                />
                <CaseStudyCard
                  title="AI-Assisted Medical Research"
                  company="BioResearch Labs"
                  industry="Pharmaceutical"
                  description="How a pharmaceutical research company used language models to accelerate literature review and hypothesis generation for drug discovery."
                  results={[
                    { label: "Research Time", value: "-60%", icon: Clock },
                    { label: "New Hypotheses", value: "+120%", icon: LineChart },
                    { label: "Development Time", value: "-30%", icon: Clock },
                  ]}
                  imageSrc="/images/case-studies/pharma.jpg"
                  href="/resources/case-studies/medical-research"
                />
              </div>
            </TabsContent>

            <TabsContent value="technology">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CaseStudyCard
                  title="Multilingual Customer Support at Scale"
                  company="TechGiant Inc."
                  industry="Technology"
                  description="How a global technology company implemented language models to provide 24/7 customer support in 20+ languages without expanding their support team."
                  results={[
                    { label: "Languages Supported", value: "24", icon: Globe },
                    { label: "Resolution Rate", value: "87%", icon: LineChart },
                    { label: "Support Costs", value: "-40%", icon: CircleDollarSign },
                  ]}
                  imageSrc="/images/case-studies/tech.jpg"
                  href="/resources/case-studies/multilingual-support"
                />
                <CaseStudyCard
                  title="Accelerating Software Development"
                  company="DevOps Solutions"
                  industry="Software Development"
                  description="How a software development company used AI coding assistants to accelerate development, improve code quality, and reduce bugs."
                  results={[
                    { label: "Development Speed", value: "+35%", icon: Clock },
                    { label: "Bug Reduction", value: "-42%", icon: LineChart },
                    { label: "Developer Productivity", value: "+50%", icon: LineChart },
                  ]}
                  imageSrc="/images/case-studies/software.jpg"
                  href="/resources/case-studies/software-development"
                />
                <CaseStudyCard
                  title="AI-Enhanced Customer Insights"
                  company="Data Analytics Inc."
                  industry="Data Analytics"
                  description="How a data analytics company used language models to extract deeper insights from customer feedback and social media data."
                  results={[
                    { label: "Insight Generation", value: "+85%", icon: LineChart },
                    { label: "Analysis Time", value: "-70%", icon: Clock },
                    { label: "Client Satisfaction", value: "98%", icon: LineChart },
                  ]}
                  imageSrc="/images/case-studies/analytics.jpg"
                  href="/resources/case-studies/customer-insights"
                />
              </div>
            </TabsContent>
          </Tabs>
        </AnimationContainer>

        {/* ROI by Industry */}
        <AnimationContainer className="w-full mt-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">ROI by Industry</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Average return on investment reported by our customers across different industries
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="bg-card/50 border border-border/80">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Landmark className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Financial Services</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">320%</div>
                <p className="text-sm text-muted-foreground">
                  Average ROI within 12 months of implementation
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border border-border/80">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <ShoppingBag className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Retail & E-Commerce</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">280%</div>
                <p className="text-sm text-muted-foreground">
                  Average ROI within 12 months of implementation
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border border-border/80">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Stethoscope className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Healthcare</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">250%</div>
                <p className="text-sm text-muted-foreground">
                  Average ROI within 12 months of implementation
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border border-border/80">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Cpu className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Technology</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">350%</div>
                <p className="text-sm text-muted-foreground">
                  Average ROI within 12 months of implementation
                </p>
              </CardContent>
            </Card>
          </div>
        </AnimationContainer>

        {/* CTA Section */}
        <AnimationContainer className="mt-20 w-full">
          <Card className="border-none shadow-md bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="pt-8 pb-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Ready to Create Your Success Story?</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Join the growing list of organizations that are transforming their operations with Artintel's language model solutions.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/contact">Schedule a Consultation</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full"
                >
                  <Link href="/pricing">View Pricing Plans</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </AnimationContainer>
      </Wrapper>
    </>
  );
};

export default CaseStudiesPage;
