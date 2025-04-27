"use client";

import React from "react";
import { Wrapper, AnimationContainer, MaxWidthWrapper } from "@/components";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { BentoGrid } from "@/components/ui/bento-grid";
import {
  BarChart3,
  Building2,
  LineChart,
  Lock,
  Rocket,
  Scale,
  Server,
  Settings,
  Sparkles,
  Zap,
  Globe,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Custom BentoGridItem component to replace the one in the bento-grid.tsx file
const BentoGridItem = ({
  title,
  description,
  icon,
  className,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`rounded-lg border border-border/40 bg-card/50 p-6 shadow-sm transition-all hover:shadow-md ${className}`}
      data-oid="f420bpc"
    >
      <div className="flex items-center gap-2 mb-3" data-oid="z3eu0oj">
        {icon}
        <h3 className="font-semibold text-lg" data-oid="3y6h4ah">
          {title}
        </h3>
      </div>
      <p className="text-muted-foreground" data-oid="h17h.q3">
        {description}
      </p>
    </div>
  );
};

// Custom TimelineItem component
const TimelineItem = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex gap-4 mb-8 last:mb-0" data-oid="w36oh7:">
      <div className="flex flex-col items-center" data-oid="a-m46ip">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary"
          data-oid="z206k9-"
        >
          <Icon className="h-5 w-5" data-oid="c4p:wlb" />
        </div>
        <div className="h-full w-px bg-border mt-2" data-oid="x.5k0ky" />
      </div>
      <div data-oid="lzl6sxm">
        <h3 className="font-semibold text-lg mb-2" data-oid="waq.m5h">
          {title}
        </h3>
        <div className="text-muted-foreground" data-oid="s4u0j6:">
          {children}
        </div>
      </div>
    </div>
  );
};

// Custom AboutHero component
const AboutHero = () => {
  return (
    <div
      className="relative overflow-hidden bg-gradient-to-b from-background to-background/80 py-20 md:py-24"
      data-oid="w:k.egj"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0" data-oid="-d14f.h">
        <div
          className="absolute left-1/3 top-1/4 h-64 w-64 rounded-full bg-primary/10 blur-[100px]"
          data-oid="aoypvf3"
        ></div>
        <div
          className="absolute right-1/3 bottom-1/4 h-64 w-64 rounded-full bg-primary/10 blur-[100px]"
          data-oid="z1cat1y"
        ></div>
      </div>

      {/* Grid pattern background */}
      <div className="absolute inset-0 z-0 opacity-5" data-oid=".qqna4d">
        <div
          className="h-full w-full grid grid-cols-12 grid-rows-6"
          data-oid="ce_8q0f"
        >
          {Array.from({ length: 72 }).map((_, i) => (
            <div
              key={i}
              className="border border-primary/20"
              data-oid=":3j44:j"
            />
          ))}
        </div>
      </div>

      <Wrapper className="relative z-10" data-oid="p4lkqzt">
        <div
          className="grid gap-8 md:grid-cols-2 items-center"
          data-oid="r4ge-84"
        >
          <div data-oid="akw:cv_">
            <div
              className="mb-3 inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-sm text-primary"
              data-oid="ubim6oh"
            >
              <BookOpen className="mr-1 h-3 w-3" data-oid="pc3k0d9" />
              <span data-oid="1sb74..">About Artintel</span>
            </div>

            <h1
              className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-4"
              data-oid="bsc52ny"
            >
              Democratizing{" "}
              <span className="text-primary" data-oid="ir.rxwj">
                AI
              </span>{" "}
              for Everyone
            </h1>

            <p
              className="text-lg text-muted-foreground mb-6"
              data-oid="zdxwn-y"
            >
              Bridging the gap between cutting-edge AI research and practical
              industry applications, enabling organizations to discover,
              fine-tune, and deploy language models.
            </p>

            <div className="flex flex-wrap gap-4" data-oid="12z7a_x">
              <Button
                asChild
                size="lg"
                className="rounded-full"
                data-oid=":_atho8"
              >
                <Link href="/features" data-oid="ekk4lwj">
                  Explore Features
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full"
                data-oid="9mas8:2"
              >
                <Link href="/contact" data-oid=":88e7mw">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>

          <div
            className="relative h-[400px] flex items-center justify-center"
            data-oid="aoi192_"
          >
            {/* Animated globe with connecting points */}
            <div
              className="relative w-[320px] h-[320px] rounded-full border border-primary/30 flex items-center justify-center"
              data-oid="69b7nnw"
            >
              <div
                className="absolute inset-0 rounded-full border border-dashed border-primary/20 animate-[spin_60s_linear_infinite]"
                data-oid="dsole2g"
              ></div>
              <div
                className="absolute inset-2 rounded-full border border-dashed border-primary/20 animate-[spin_45s_linear_infinite_reverse]"
                data-oid="7mfzymw"
              ></div>
              <div
                className="absolute inset-4 rounded-full border border-dashed border-primary/20 animate-[spin_30s_linear_infinite]"
                data-oid="syb3zdg"
              ></div>

              {/* Connection points */}
              {Array.from({ length: 8 }).map((_, i) => {
                const rotation = i * (360 / 8);
                const distance = 130;
                const x = Math.cos((rotation * Math.PI) / 180) * distance;
                const y = Math.sin((rotation * Math.PI) / 180) * distance;

                return (
                  <div
                    key={i}
                    className="absolute h-3 w-3 rounded-full bg-primary/50 animate-pulse"
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                    data-oid="-pmwhpq"
                  >
                    <div
                      className="absolute inset-0 rounded-full bg-primary/40 animate-ping"
                      data-oid="puc:33l"
                    ></div>
                  </div>
                );
              })}

              {/* Center sphere */}
              <div
                className="relative h-24 w-24 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center backdrop-blur-sm border border-primary/30"
                data-oid="i2qbbml"
              >
                <Sparkles className="h-8 w-8 text-primary" data-oid="z_spavv" />
                <div
                  className="absolute inset-0 rounded-full bg-primary/5 animate-pulse"
                  data-oid="iqy52oz"
                ></div>
              </div>
            </div>

            {/* Company stats */}
            <div
              className="absolute -bottom-4 left-0 rounded-lg border border-primary/20 bg-card/30 p-3 backdrop-blur-sm"
              data-oid="qgy._qd"
            >
              <div
                className="flex items-center text-primary"
                data-oid="sosl329"
              >
                <Globe className="h-4 w-4 mr-1" data-oid="1__da2a" />
                <span className="text-sm font-medium" data-oid="x_w04k2">
                  Global Reach
                </span>
              </div>
              <p className="text-xs text-muted-foreground" data-oid="qaaom8m">
                Supporting 50+ countries
              </p>
            </div>

            <div
              className="absolute -bottom-4 right-0 rounded-lg border border-primary/20 bg-card/30 p-3 backdrop-blur-sm"
              data-oid="cv_0819"
            >
              <div
                className="flex items-center text-primary"
                data-oid="sthobfw"
              >
                <Building2 className="h-4 w-4 mr-1" data-oid="y_lkgpp" />
                <span className="text-sm font-medium" data-oid="_xn4ldu">
                  Enterprise Ready
                </span>
              </div>
              <p className="text-xs text-muted-foreground" data-oid="xec27b1">
                500+ organizations
              </p>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

const AboutPage = () => {
  return (
    <>
      {/* Custom Hero Section */}
      <AboutHero data-oid="oq6ik4t" />

      <Wrapper
        className="mb-12 mt-20 flex flex-col items-center justify-center"
        data-oid="n-h8pc8"
      >
        {/* Background and Motivation */}
        <AnimationContainer className="w-full" data-oid="invn7l9">
          <Card className="border-none shadow-md bg-card/30" data-oid="94ftn6s">
            <CardHeader data-oid="-rqul4k">
              <CardTitle className="text-2xl font-bold" data-oid="1f3byoa">
                Background and Motivation
              </CardTitle>
            </CardHeader>
            <CardContent className="text-left space-y-4" data-oid="30mlf2d">
              <p data-oid="urrw31o">
                The landscape of Artificial Intelligence is evolving rapidly,
                with powerful language models emerging at a pace that even
                seasoned data scientists find difficult to keep up with. While
                models like BERT, GPT, Falcon, and LLaMA show remarkable
                capabilities, most organizations struggle with:
              </p>
              <ul className="list-disc pl-6 space-y-2" data-oid="_do70bi">
                <li data-oid="_.242su">
                  Identifying which model is best suited for their domain
                  (legal, healthcare, finance, etc.)
                </li>
                <li data-oid="a2:sz54">
                  Integrating these models with existing data securely and
                  reliably
                </li>
                <li data-oid="cgc4isx">
                  Fine-tuning models to address highly specific tasks without
                  over-complicating the process
                </li>
                <li data-oid="9e4fe7j">
                  Managing deployment and monitoring performance for real-world
                  usage
                </li>
              </ul>
              <p data-oid="wws03m:">
                Artintel was created to simplify these challenges by offering an
                end-to-end platform that consolidates all essential processes in
                one place—providing curated lists of models, easy data
                ingestion, intuitive fine-tuning workflows, and robust
                deployment/monitoring pipelines.
              </p>
            </CardContent>
          </Card>
        </AnimationContainer>

        {/* Core Philosophy Grid */}
        <AnimationContainer className="mt-12 w-full" data-oid="13od64d">
          <h2
            className="text-3xl font-bold mb-6 text-center"
            data-oid="wugwx3t"
          >
            Core Philosophy
          </h2>
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
            data-oid="3mc.nl8"
          >
            <BentoGridItem
              title="Accessibility"
              description="We believe that AI should be accessible to any team. Artintel emphasizes an intuitive user interface with step-by-step wizards for tasks like data ingestion, hyperparameter tuning, and deployment configuration."
              icon={<Zap className="h-6 w-6 text-primary" data-oid="9p-0lia" />}
              className="md:col-span-2"
              data-oid="4zakera"
            />

            <BentoGridItem
              title="Customization"
              description="Language models are most valuable when they're tailored to the domain. Our no-code approach ensures even non-technical teams can fine-tune models for their specific use cases."
              icon={
                <Settings className="h-6 w-6 text-primary" data-oid="w2mev63" />
              }
              data-oid=":u76bv1"
            />

            <BentoGridItem
              title="Scalability"
              description="Different businesses have different needs. Artintel provides scalable solutions that can start small (on CPU-based servers) and expand to large GPU or TPU clusters as usage grows."
              icon={
                <LineChart
                  className="h-6 w-6 text-primary"
                  data-oid="i.ul62_"
                />
              }
              data-oid="wb6-ak."
            />

            <BentoGridItem
              title="Security & Compliance"
              description="In regulated industries, data is highly protected. We build in HIPAA and GDPR-ready tools to ensure data privacy, secure logging, and role-based access controls."
              icon={
                <Lock className="h-6 w-6 text-primary" data-oid="-mv_i-." />
              }
              className="md:col-span-2"
              data-oid="ex7su2t"
            />
          </div>
        </AnimationContainer>

        {/* Goals and Vision Timeline */}
        <AnimationContainer className="mt-20 w-full" data-oid="ugn.huf">
          <h2
            className="text-3xl font-bold mb-10 text-center"
            data-oid="h-p31wa"
          >
            Goals and Vision
          </h2>
          <div className="max-w-3xl mx-auto" data-oid="a2d0.lu">
            <TimelineItem
              icon={Building2}
              title="Empower Businesses"
              data-oid="5n._ct2"
            >
              <p data-oid="m4ui6:x">
                Democratize AI by lowering the barrier of entry so companies
                with minimal ML resources can still benefit from advanced
                language models. Offer specialized templates and pre-tuned
                models for verticals like manufacturing, legal, healthcare, and
                retail.
              </p>
            </TimelineItem>
            <TimelineItem
              icon={BarChart3}
              title="Lower AI Complexity"
              data-oid="u4nby21"
            >
              <p data-oid="c7ns1uo">
                Enable data scientists and subject matter experts to collaborate
                within a user-friendly interface. Provide comprehensive
                tutorials on tasks like ingestion, training, and deployment to
                minimize guesswork.
              </p>
            </TimelineItem>
            <TimelineItem
              icon={Lock}
              title="Ensure Security & Compliance"
              data-oid="9cz4pwj"
            >
              <p data-oid=":v4k4kq">
                Implement granular access control where each team member can be
                assigned roles with distinct permissions. Protect data in
                transit with SSL and at rest with robust encryption policies.
              </p>
            </TimelineItem>
            <TimelineItem
              icon={Rocket}
              title="Foster Innovation"
              data-oid="gzw-80q"
            >
              <p data-oid=":x8bes9">
                Make it quick to spin up prototypes and run them in test
                environments, fostering an iterative development mindset. Build
                a vibrant user community that exchanges best practices,
                domain-specific prompts, and transformation scripts.
              </p>
            </TimelineItem>
          </div>
        </AnimationContainer>

        {/* Platform Architecture */}
        <AnimationContainer className="mt-20 w-full" data-oid="aj.ea35">
          <Card className="border-none shadow-md bg-card/30" data-oid="1xkqzod">
            <CardHeader data-oid=":0bzctd">
              <CardTitle className="text-2xl font-bold" data-oid="2c_yzji">
                Platform Architecture Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="text-left" data-oid="o3jerzu">
              <p className="mb-4" data-oid="g-975ry">
                While Artintel presents a no-code interface, under the hood it
                orchestrates a complex set of services:
              </p>
              <div className="grid md:grid-cols-2 gap-4" data-oid="o_v6j68">
                <Card
                  className="bg-card/50 border border-border/80"
                  data-oid="mdqpwa_"
                >
                  <CardHeader className="pb-2" data-oid="dx00d51">
                    <CardTitle
                      className="text-base font-semibold"
                      data-oid="3gmg942"
                    >
                      Model Selection Module
                    </CardTitle>
                  </CardHeader>
                  <CardContent data-oid="no3lypw">
                    <p
                      className="text-sm text-muted-foreground"
                      data-oid="3.lyjd3"
                    >
                      A curated directory that allows you to search by model
                      size, domain, license, or performance scores.
                    </p>
                  </CardContent>
                </Card>
                <Card
                  className="bg-card/50 border border-border/80"
                  data-oid="5mcdzes"
                >
                  <CardHeader className="pb-2" data-oid="s_.8sra">
                    <CardTitle
                      className="text-base font-semibold"
                      data-oid=".t_2mc3"
                    >
                      Data Integration Module
                    </CardTitle>
                  </CardHeader>
                  <CardContent data-oid="rjybi.c">
                    <p
                      className="text-sm text-muted-foreground"
                      data-oid="gz0bb2w"
                    >
                      Connects to local files or external data sources with
                      automated checks for PII detection and basic cleaning.
                    </p>
                  </CardContent>
                </Card>
                <Card
                  className="bg-card/50 border border-border/80"
                  data-oid="i6ypalm"
                >
                  <CardHeader className="pb-2" data-oid="se8xlxq">
                    <CardTitle
                      className="text-base font-semibold"
                      data-oid="wyz28jb"
                    >
                      Fine-Tuning Engine
                    </CardTitle>
                  </CardHeader>
                  <CardContent data-oid="vxroarm">
                    <p
                      className="text-sm text-muted-foreground"
                      data-oid="hk6y8q6"
                    >
                      Utilizes popular frameworks in a managed environment,
                      scaling from a single GPU to a multi-GPU cluster.
                    </p>
                  </CardContent>
                </Card>
                <Card
                  className="bg-card/50 border border-border/80"
                  data-oid="-gk8fsu"
                >
                  <CardHeader className="pb-2" data-oid="ph:ik2v">
                    <CardTitle
                      className="text-base font-semibold"
                      data-oid="1bc4xno"
                    >
                      Deployment & Monitoring
                    </CardTitle>
                  </CardHeader>
                  <CardContent data-oid="9co_:lz">
                    <p
                      className="text-sm text-muted-foreground"
                      data-oid="prazbfn"
                    >
                      Wraps your model in a container environment with a
                      versioning system for safe rollouts and comprehensive
                      monitoring.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </AnimationContainer>

        {/* Key Differentiators */}
        <AnimationContainer className="mt-20 w-full" data-oid="xy02yet">
          <h2
            className="text-3xl font-bold mb-8 text-center"
            data-oid="8ab7jw4"
          >
            Key Differentiators
          </h2>
          <div
            className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
            data-oid="ffnr03w"
          >
            <Card
              className="bg-card/50 border border-border/80"
              data-oid="9312_zv"
            >
              <CardHeader data-oid="gn89a.h">
                <div className="flex items-center gap-2" data-oid="zqwa6md">
                  <Server className="h-5 w-5 text-primary" data-oid="fzyet-0" />
                  <CardTitle className="text-xl" data-oid="dgamdjs">
                    Curated Model Catalog
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent data-oid="by04kw8">
                <p className="text-muted-foreground" data-oid="2ts76r0">
                  Constantly updated list of recommended models, focused on
                  reliability, license clarity, and robust performance.
                </p>
              </CardContent>
            </Card>
            <Card
              className="bg-card/50 border border-border/80"
              data-oid="0zw08qf"
            >
              <CardHeader data-oid="5mu-l7t">
                <div className="flex items-center gap-2" data-oid="9xlj02a">
                  <Scale className="h-5 w-5 text-primary" data-oid="fx9c8dj" />
                  <CardTitle className="text-xl" data-oid="d5irz-3">
                    License Management
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent data-oid="bk._ltb">
                <p className="text-muted-foreground" data-oid="_ztjix2">
                  We clarify license terms within the platform, ensuring you
                  know whether a model can be used commercially or not.
                </p>
              </CardContent>
            </Card>
            <Card
              className="bg-card/50 border border-border/80"
              data-oid="h-5_-gs"
            >
              <CardHeader data-oid="8-dttr3">
                <div className="flex items-center gap-2" data-oid="hu498f-">
                  <Building2
                    className="h-5 w-5 text-primary"
                    data-oid="xp_nqlj"
                  />

                  <CardTitle className="text-xl" data-oid="ycp.1mx">
                    Industry Specialization
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent data-oid="eqkb4zv">
                <p className="text-muted-foreground" data-oid="w-utx7w">
                  Healthcare, finance, and legal all have specialized data
                  formats and compliance demands met by our industry-specific
                  templates.
                </p>
              </CardContent>
            </Card>
            <Card
              className="bg-card/50 border border-border/80"
              data-oid="8dvigh9"
            >
              <CardHeader data-oid="eie9i6t">
                <div className="flex items-center gap-2" data-oid="-5prnxb">
                  <Settings
                    className="h-5 w-5 text-primary"
                    data-oid="uqkv4dd"
                  />

                  <CardTitle className="text-xl" data-oid="ro3_ba0">
                    Deployment Flexibility
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent data-oid="0mxt_y.">
                <p className="text-muted-foreground" data-oid="_m5mpdn">
                  Choose cloud, on-prem, or hybrid. Companies with sensitive
                  data can keep it local, while still using our deployment
                  tools.
                </p>
              </CardContent>
            </Card>
          </div>
        </AnimationContainer>
      </Wrapper>
    </>
  );
};

export default AboutPage;
