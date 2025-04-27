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
  Building,
  FileText,
  MessageSquare,
  Briefcase,
  Stethoscope,
  Scale,
  BookOpen,
  ShoppingBag,
  Layers,
  ArrowRight,
  CheckCircle,
  Zap,
  BarChart,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Custom UseCasesHero component
const UseCasesHero = () => {
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
            <Briefcase className="mr-1 h-3 w-3" />
            <span>Industry Solutions</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-4">
            Artintel{" "}
            <span className="text-primary">Use Cases</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-6">
            Discover how organizations across various industries are leveraging Artintel's platform to build powerful AI solutions that drive innovation and efficiency.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="rounded-full">
              <Link href="#industry-solutions">Explore Solutions</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full"
            >
              <Link href="/contact">Request Demo</Link>
            </Button>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

// Custom IndustryCard component
const IndustryCard = ({
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
            Learn more <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

// Custom UseCaseDetail component
const UseCaseDetail = ({
  title,
  description,
  challenges,
  solution,
  results,
  icon: Icon,
}: {
  title: string;
  description: string;
  challenges: string[];
  solution: string;
  results: string[];
  icon: React.ElementType;
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-md bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>
      
      <p className="text-muted-foreground">{description}</p>
      
      <div>
        <h4 className="text-lg font-medium mb-2">Challenges</h4>
        <ul className="space-y-2">
          {challenges.map((challenge, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="mt-1 flex-shrink-0">
                <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
              </div>
              <span className="text-muted-foreground">{challenge}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h4 className="text-lg font-medium mb-2">Solution</h4>
        <p className="text-muted-foreground">{solution}</p>
      </div>
      
      <div>
        <h4 className="text-lg font-medium mb-2">Results</h4>
        <ul className="space-y-2">
          {results.map((result, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{result}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <Button asChild className="mt-4">
        <Link href="/contact">Request Similar Solution</Link>
      </Button>
    </div>
  );
};

// Custom BenefitCard component
const BenefitCard = ({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
}) => {
  return (
    <Card className="bg-card/50 border border-border/80">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

const UseCasesPage = () => {
  return (
    <>
      {/* Custom Hero Section */}
      <UseCasesHero />

      <Wrapper className="mb-12 mt-12 flex flex-col items-center justify-center">
        {/* Industry Solutions */}
        <AnimationContainer className="w-full" id="industry-solutions">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Industry Solutions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore how Artintel's platform is being used across different industries to solve complex challenges with AI.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <IndustryCard
              title="Customer Service"
              description="Enhance customer support with AI-powered chatbots, ticket classification, and knowledge base search to reduce response times and improve satisfaction."
              icon={MessageSquare}
              href="#customer-service"
            />
            <IndustryCard
              title="Healthcare"
              description="Streamline clinical documentation, extract insights from medical literature, and assist with patient triage through specialized language models."
              icon={Stethoscope}
              href="#healthcare"
            />
            <IndustryCard
              title="Legal"
              description="Automate contract analysis, legal research, and document review to increase efficiency and accuracy while reducing costs."
              icon={Scale}
              href="#legal"
            />
            <IndustryCard
              title="Finance"
              description="Enhance risk assessment, automate financial document processing, and improve compliance monitoring with specialized AI models."
              icon={Building}
              href="#finance"
            />
            <IndustryCard
              title="Education"
              description="Create personalized learning experiences, automate grading, and develop intelligent tutoring systems to improve educational outcomes."
              icon={BookOpen}
              href="#education"
            />
            <IndustryCard
              title="Retail & E-commerce"
              description="Optimize product descriptions, enhance search functionality, and create personalized shopping experiences with AI-powered recommendations."
              icon={ShoppingBag}
              href="#retail"
            />
          </div>
        </AnimationContainer>

        {/* Detailed Use Cases */}
        <AnimationContainer className="mt-20 w-full">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Detailed Use Cases</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dive deeper into specific implementations and see how organizations are achieving tangible results with Artintel.
            </p>
          </div>

          <Tabs defaultValue="customer-service" className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 h-auto">
              <TabsTrigger value="customer-service" className="py-2">
                <MessageSquare className="h-4 w-4 mr-2 md:mr-0 md:mb-1" />
                <span className="hidden md:block">Customer Service</span>
              </TabsTrigger>
              <TabsTrigger value="healthcare" className="py-2">
                <Stethoscope className="h-4 w-4 mr-2 md:mr-0 md:mb-1" />
                <span className="hidden md:block">Healthcare</span>
              </TabsTrigger>
              <TabsTrigger value="legal" className="py-2">
                <Scale className="h-4 w-4 mr-2 md:mr-0 md:mb-1" />
                <span className="hidden md:block">Legal</span>
              </TabsTrigger>
              <TabsTrigger value="finance" className="py-2">
                <Building className="h-4 w-4 mr-2 md:mr-0 md:mb-1" />
                <span className="hidden md:block">Finance</span>
              </TabsTrigger>
              <TabsTrigger value="education" className="py-2">
                <BookOpen className="h-4 w-4 mr-2 md:mr-0 md:mb-1" />
                <span className="hidden md:block">Education</span>
              </TabsTrigger>
              <TabsTrigger value="retail" className="py-2">
                <ShoppingBag className="h-4 w-4 mr-2 md:mr-0 md:mb-1" />
                <span className="hidden md:block">Retail</span>
              </TabsTrigger>
            </TabsList>
            <div className="mt-6 p-6 border rounded-lg">
              <TabsContent value="customer-service">
                <UseCaseDetail
                  title="AI-Powered Customer Support Automation"
                  description="A global telecommunications company with over 50 million customers needed to improve their customer support efficiency while maintaining high satisfaction rates."
                  challenges={[
                    "High volume of repetitive customer inquiries overwhelming support staff",
                    "Long wait times leading to customer frustration",
                    "Inconsistent responses across different support channels",
                    "Difficulty scaling support operations during peak periods"
                  ]}
                  solution="Using Artintel's platform, the company fine-tuned a Mistral 7B model on their support documentation, past customer interactions, and product information. They deployed this model as a customer support chatbot on their website and mobile app, with seamless handoff to human agents for complex issues."
                  results={[
                    "70% reduction in first-response time for customer inquiries",
                    "45% of support tickets now resolved without human intervention",
                    "Customer satisfaction scores improved by 18%",
                    "Support staff now focusing on complex issues requiring human expertise"
                  ]}
                  icon={MessageSquare}
                />
              </TabsContent>
              <TabsContent value="healthcare">
                <UseCaseDetail
                  title="Clinical Documentation Assistant"
                  description="A network of hospitals and clinics sought to reduce the administrative burden on healthcare providers while improving the quality and completeness of clinical documentation."
                  challenges={[
                    "Physicians spending 2+ hours daily on documentation instead of patient care",
                    "Inconsistent documentation quality affecting billing and care coordination",
                    "Difficulty extracting structured data from clinical notes",
                    "Strict compliance requirements for handling patient data"
                  ]}
                  solution="The organization used Artintel to fine-tune a specialized SLM for medical text processing. The model was deployed in a HIPAA-compliant environment and integrated with their electronic health record system to assist with note-taking, coding suggestions, and documentation review."
                  results={[
                    "Reduced documentation time by 40% for physicians",
                    "Improved clinical coding accuracy by 35%",
                    "Enhanced completeness of clinical notes with relevant medical details",
                    "Maintained full compliance with privacy regulations through on-premises deployment"
                  ]}
                  icon={Stethoscope}
                />
              </TabsContent>
              <TabsContent value="legal">
                <UseCaseDetail
                  title="Contract Analysis and Review Automation"
                  description="A large law firm handling thousands of contracts annually needed to streamline their review process while maintaining high accuracy and identifying potential risks."
                  challenges={[
                    "Time-consuming manual review of lengthy contracts",
                    "Inconsistent identification of key clauses and potential risks",
                    "Difficulty comparing contract terms against standard templates",
                    "Need for maintaining attorney-client privilege and data security"
                  ]}
                  solution="The firm implemented a custom LLM fine-tuned on their contract database using Artintel's platform. The model was trained to identify key clauses, flag non-standard language, extract obligations, and highlight potential risks. It was deployed in their secure environment with role-based access controls."
                  results={[
                    "Reduced initial contract review time by 65%",
                    "Improved risk identification by 40% compared to junior associates",
                    "Standardized contract analysis process across the firm",
                    "Maintained full confidentiality with secure on-premises deployment"
                  ]}
                  icon={Scale}
                />
              </TabsContent>
              <TabsContent value="finance">
                <UseCaseDetail
                  title="Financial Document Processing and Analysis"
                  description="A financial services company processing thousands of loan applications monthly needed to automate document review and risk assessment while ensuring regulatory compliance."
                  challenges={[
                    "Manual processing of diverse financial documents causing delays",
                    "Inconsistent risk assessment across different analysts",
                    "Difficulty keeping up with changing regulatory requirements",
                    "Need for explainable decision-making for compliance purposes"
                  ]}
                  solution="The company used Artintel to develop a specialized model for financial document processing. The model was fine-tuned on loan applications, financial statements, and regulatory guidelines. It was integrated with their existing workflow system to extract key information, flag discrepancies, and provide risk assessments."
                  results={[
                    "Reduced document processing time from days to minutes",
                    "Improved consistency in risk assessment by 50%",
                    "Enhanced regulatory compliance with automated checks",
                    "Provided transparent reasoning for all flagged issues"
                  ]}
                  icon={Building}
                />
              </TabsContent>
              <TabsContent value="education">
                <UseCaseDetail
                  title="Personalized Learning Assistant"
                  description="An online education platform with over 500,000 students wanted to provide personalized learning experiences and feedback at scale."
                  challenges={[
                    "Inability to provide timely, personalized feedback to all students",
                    "Difficulty adapting content to different learning styles and paces",
                    "Limited capacity for one-on-one tutoring and support",
                    "Need for consistent assessment across diverse subjects"
                  ]}
                  solution="The platform implemented multiple fine-tuned models using Artintel's platform. These models provided automated essay feedback, generated practice questions based on student performance, answered student questions, and recommended personalized learning paths based on individual progress and learning patterns."
                  results={[
                    "Students receiving feedback on assignments within minutes instead of days",
                    "25% improvement in course completion rates",
                    "Increased student satisfaction scores by 40%",
                    "Expanded course offerings without proportional increase in teaching staff"
                  ]}
                  icon={BookOpen}
                />
              </TabsContent>
              <TabsContent value="retail">
                <UseCaseDetail
                  title="Enhanced E-commerce Search and Recommendations"
                  description="A major online retailer with millions of products wanted to improve their search functionality and product recommendations to increase conversion rates and customer satisfaction."
                  challenges={[
                    "Poor search results for natural language queries",
                    "Generic product recommendations not reflecting customer intent",
                    "Difficulty handling seasonal trends and changing customer preferences",
                    "Need for real-time processing of large volumes of search queries"
                  ]}
                  solution="The retailer used Artintel to fine-tune models for semantic search and personalized recommendations. The models were trained on product catalogs, customer reviews, browsing patterns, and purchase history. They were deployed as API endpoints integrated with their e-commerce platform."
                  results={[
                    "Improved search relevance by 60% for natural language queries",
                    "Increased conversion rate by 35% through better product recommendations",
                    "Reduced search abandonment rate by 45%",
                    "Enhanced ability to adapt to seasonal trends and changing preferences"
                  ]}
                  icon={ShoppingBag}
                />
              </TabsContent>
            </div>
          </Tabs>
        </AnimationContainer>

        {/* Key Benefits */}
        <AnimationContainer className="mt-20 w-full">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Key Benefits</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Why organizations choose Artintel for their AI implementation needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BenefitCard
              title="Rapid Implementation"
              description="Get from concept to production in weeks, not months, with our no-code platform and pre-built templates for common use cases."
              icon={Zap}
            />
            <BenefitCard
              title="Domain Customization"
              description="Fine-tune models on your specific industry data to achieve higher accuracy and relevance for your unique challenges."
              icon={Layers}
            />
            <BenefitCard
              title="Cost Efficiency"
              description="Optimize for both performance and cost with the right-sized model for your needs, from lightweight SLMs to powerful LLMs."
              icon={BarChart}
            />
            <BenefitCard
              title="Flexible Deployment"
              description="Deploy models in the cloud, on-premises, or in hybrid environments based on your security and compliance requirements."
              icon={Rocket}
            />
            <BenefitCard
              title="Scalable Architecture"
              description="Handle growing volumes of requests with infrastructure that automatically scales to meet demand without performance degradation."
              icon={Building}
            />
            <BenefitCard
              title="Comprehensive Support"
              description="Get expert guidance at every step, from initial concept and model selection to deployment and ongoing optimization."
              icon={MessageSquare}
            />
          </div>
        </AnimationContainer>

        {/* CTA Section */}
        <AnimationContainer className="mt-20 w-full">
          <Card className="border-none shadow-md bg-gradient-to-r from-primary/10 to-primary/5 p-8">
            <CardContent className="pt-6 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Organization?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Discover how Artintel can help you implement AI solutions tailored to your specific industry challenges. Our team of experts is ready to guide you through the process.
              </p>
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

export default UseCasesPage;
