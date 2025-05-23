import { BrainCircuit, Cpu, Gauge, Layers, LayoutGrid, LineChart, Rocket, Server, Settings, Zap, BookOpen, HelpCircle, MessageSquare, Shield, FileText, Cookie, Lock } from "lucide-react";

export const NAV_LINKS = [
  {
    title: "Features",
    href: "/features",
    menu: [
      {
        title: "Model Selection",
        href: "/features#model-selection",
        icon: BrainCircuit,
        tagline: "Find the perfect AI model for your use case"
      },
      {
        title: "Fine-Tuning",
        href: "/features#fine-tuning",
        icon: Settings,
        tagline: "Customize models with your own data"
      },
      {
        title: "Deployment",
        href: "/features#deployment",
        icon: Rocket,
        tagline: "Deploy models to production environments"
      },
      {
        title: "Analytics",
        href: "/features#analytics",
        icon: LineChart,
        tagline: "Track performance and usage metrics"
      }
    ]
  },
  {
    title: "Models",
    href: "/models",
    menu: [
      {
        title: "SLM vs LLM",
        href: "/models",
        icon: Cpu,
        tagline: "Understanding the differences between model types"
      },
      {
        title: "Model Catalog",
        href: "/catalog",
        icon: LayoutGrid,
        tagline: "Browse our complete model catalog"
      },
      {
        title: "Performance",
        href: "/performance",
        icon: Gauge,
        tagline: "Compare model benchmarks and metrics"
      }
    ]
  },
  {
    title: "Pricing",
    href: "/pricing"
  },
  {
    title: "Resources",
    href: "/resources",
    menu: [
      {
        title: "How It Works",
        href: "/how-it-works",
        icon: HelpCircle,
        tagline: "Learn how our platform works"
      },
      {
        title: "Blog",
        href: "/blog",
        icon: BookOpen,
        tagline: "Articles, tutorials and updates"
      },
      {
        title: "Documentation",
        href: "/docs",
        icon: Layers,
        tagline: "Detailed guides and API references"
      },
      {
        title: "Tutorials",
        href: "/resources/tutorials",
        icon: MessageSquare,
        tagline: "Step-by-step guides for using our platform"
      },
      {
        title: "Case Studies",
        href: "/resources/case-studies",
        icon: BookOpen,
        tagline: "Success stories from our customers"
      }
    ]
  },
  {
    title: "Legal",
    href: "/privacy",
    menu: [
      {
        title: "Privacy Policy",
        href: "/privacy",
        icon: Shield,
        tagline: "How we collect and protect your data"
      },
      {
        title: "Terms of Service",
        href: "/terms",
        icon: FileText,
        tagline: "Rules and guidelines for using our platform"
      },
      {
        title: "Cookie Policy",
        href: "/cookies",
        icon: Cookie,
        tagline: "How we use cookies on our website"
      },
      {
        title: "GDPR Compliance",
        href: "/gdpr",
        icon: Lock,
        tagline: "Our compliance with EU data protection laws"
      },
      {
        title: "Security",
        href: "/security",
        icon: Shield,
        tagline: "How we keep your data secure"
      }
    ]
  },
  {
    title: "About",
    href: "/about"
  },
  {
    title: "Contact",
    href: "/contact"
  }
];
