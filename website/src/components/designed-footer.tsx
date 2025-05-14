import Link from "next/link";
import AnimationContainer from "./global/animation-container";
import TextHoverEffect from "./global/text-hover-effect";
import {
  BrainCircuit,
  Github,
  Twitter,
  Linkedin,
  MessageCircle,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { APP_NAME } from "@/constants";

const DesignedFooter = () => {
  return (
    <footer
      className="flex flex-col relative items-center justify-center border-t border-border pt-16 pb-8 md:pb-0 px-6 lg:px-8 w-full max-w-6xl mx-auto lg:pt-32 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)]"
    >
      <div
        className="absolute top-0 left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-1.5 bg-foreground rounded-full"
      ></div>

      <div
        className="grid gap-8 xl:grid-cols-3 xl:gap-8 w-full"
      >
        {/* Brand Info */}
        <AnimationContainer delay={0.1}>
          <div
            className="flex flex-col items-start justify-start md:max-w-[300px]"
          >
            <Link
              href="/"
              className="flex items-center gap-2"
            >


              <span
                className="text-lg font-bold font-heading !leading-none text-white"
              >

        <TextHoverEffect text="ARTINTEL" />

              </span>
            </Link>
            <p
              className="text-muted-foreground mt-4 text-sm text-start"
            >
              A comprehensive, no-code platform for discovering, fine-tuning,
              and deploying open-source Large Language Models (LLMs) and Small
              Language Models (SLMs).
            </p>
            <div className="mt-6 flex items-center gap-4">
              <Link
                href="https://twitter.com/artintel_ai"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  variant: "ghost",
                  size: "icon",
                  className:
                    "rounded-full text-muted-foreground hover:text-white",
                })}
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">
                  Twitter
                </span>
              </Link>
              <Link
                href="https://github.com/artintel-ai"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  variant: "ghost",
                  size: "icon",
                  className:
                    "rounded-full text-muted-foreground hover:text-white",
                })}
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">
                  GitHub
                </span>
              </Link>
              <Link
                href="https://linkedin.com/company/artintel-ai"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  variant: "ghost",
                  size: "icon",
                  className:
                    "rounded-full text-muted-foreground hover:text-white",
                })}
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">
                  LinkedIn
                </span>
              </Link>
              <Link
                href="https://discord.gg/artintel"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  variant: "ghost",
                  size: "icon",
                  className:
                    "rounded-full text-muted-foreground hover:text-white",
                })}
              >
                <MessageCircle className="h-5 w-5" />
                <span className="sr-only">
                  Discord
                </span>
              </Link>
            </div>
          </div>
        </AnimationContainer>

        <div
          className="grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0 md:grid-cols-4"
        >
          {/* Product Column */}
          <AnimationContainer delay={0.2}>
            <div>
              <h3
                className="text-base font-medium text-white"
              >
                Product
              </h3>
              <ul
                className="mt-4 space-y-2 text-sm text-muted-foreground"
              >
                <li>
                  <Link
                    href="/features"
                    className="hover:text-foreground transition-colors duration-300"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/how-it-works"
                    className="hover:text-foreground transition-colors duration-300"
                  >
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    href="/use-cases"
                    className="hover:text-foreground transition-colors duration-300"
                  >
                    Use Cases
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="hover:text-foreground transition-colors duration-300"
                  >
                    Pricing
                  </Link>
                </li>

              </ul>
            </div>
          </AnimationContainer>
          {/* Models Column */}
          <AnimationContainer delay={0.3}>
            <div>
              <h3
                className="text-base font-medium text-white"
              >
                Models
              </h3>
              <ul
                className="mt-4 space-y-2 text-sm text-muted-foreground"
              >
                <li>
                  <Link
                    href="/catalog"
                    className="hover:text-foreground transition-colors duration-300"
                  >
                    All Models
                  </Link>
                </li>
                <li>
                  <Link
                    href="/slm-models"
                    className="hover:text-foreground transition-colors duration-300"
                  >
                    SLM Models
                  </Link>
                </li>
                <li>
                  <Link
                    href="/llm-models"
                    className="hover:text-foreground transition-colors duration-300"
                  >
                    LLM Models
                  </Link>
                </li>
                <li>
                  <Link
                    href="/models/comparison"
                    className="hover:text-foreground transition-colors duration-300"
                  >
                    Model Comparison
                  </Link>
                </li>
              </ul>
            </div>
          </AnimationContainer>
          {/* Resources Column */}
          <AnimationContainer delay={0.4}>
            <div>
              <h3
                className="text-base font-medium text-white"
              >
                Resources
              </h3>
              <ul
                className="mt-4 space-y-2 text-sm text-muted-foreground"
              >
                <li>
                  <Link
                    href="/docs"
                    className="hover:text-foreground transition-colors duration-300"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-foreground transition-colors duration-300"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resources/tutorials"
                    className="hover:text-foreground transition-colors duration-300"
                  >
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/api"
                    className="hover:text-foreground transition-colors duration-300"
                  >
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link
                    href="/status"
                    className="hover:text-foreground transition-colors duration-300"
                  >
                    Status
                  </Link>
                </li>
              </ul>
            </div>
          </AnimationContainer>
          {/* Company Column */}
          <AnimationContainer delay={0.5}>
            <div>
              <h3
                className="text-base font-medium text-white"
              >
                Company
              </h3>
              <ul
                className="mt-4 space-y-2 text-sm text-muted-foreground"
              >
                <li>
                  <Link
                    href="/about"
                    className="hover:text-foreground transition-colors duration-300"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-foreground transition-colors duration-300"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/terms"
                    className="hover:text-foreground transition-colors duration-300"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/privacy-policy"
                    className="hover:text-foreground transition-colors duration-300"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/security"
                    className="hover:text-foreground transition-colors duration-300"
                  >
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </AnimationContainer>
        </div>
      </div>

      {/* Copyright */}
      <div
        className="mt-16 border-t border-border/40 pt-6 md:pt-8 md:flex md:items-center md:justify-between w-full"
      >
        <AnimationContainer delay={0.6}>
          <p
            className="text-xs text-muted-foreground text-center md:text-left"
          >
            &copy; {new Date().getFullYear()} Artintel, Inc. All rights
            reserved.
          </p>
        </AnimationContainer>

        {/* Industry tags */}
        <AnimationContainer delay={0.7}>
          <div
            className="flex flex-wrap justify-center md:justify-end gap-3 mt-4 md:mt-0"
          >
            <span
              className="text-xs text-muted-foreground bg-background/30 px-2 py-1 rounded-full"
            >
              Healthcare
            </span>
            <span
              className="text-xs text-muted-foreground bg-background/30 px-2 py-1 rounded-full"
            >
              Finance
            </span>
            <span
              className="text-xs text-muted-foreground bg-background/30 px-2 py-1 rounded-full"
            >
              Legal
            </span>
            <span
              className="text-xs text-muted-foreground bg-background/30 px-2 py-1 rounded-full"
            >
              Retail
            </span>
            <span
              className="text-xs text-muted-foreground bg-background/30 px-2 py-1 rounded-full"
            >
              Manufacturing
            </span>
            <span
              className="text-xs text-muted-foreground bg-background/30 px-2 py-1 rounded-full"
            >
              Education
            </span>
            <span
              className="text-xs text-muted-foreground bg-background/30 px-2 py-1 rounded-full"
            >
              Research
            </span>

          </div>

        </AnimationContainer>
      </div>

    </footer>
  );
};

export default DesignedFooter;
