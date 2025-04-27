import Link from "next/link";
import Image from "next/image";
import AnimationContainer from "./global/animation-container";
import {
  Github,
  Twitter,
  Linkedin,
  MessageCircle,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { APP_NAME } from "@/constants";

const CenteredFooter = () => {
  return (
    <footer
      className="flex flex-col relative items-center justify-center border-t border-border pt-16 pb-8 md:pb-0 px-6 lg:px-8 w-full max-w-6xl mx-auto lg:pt-32 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)]"
    >
      <div
        className="absolute top-0 left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-1.5 bg-foreground rounded-full"
      ></div>

      <div className="flex flex-col items-center justify-center w-full">
        {/* Logo and Brand */}
        <AnimationContainer delay={0.1}>
          <Link href="/" className="flex items-center gap-2 mb-6">
            <Image
              src="/logo/Icon - PNG (1).png"
              alt="Artintel Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="text-xl font-bold font-heading !leading-none">
              {APP_NAME}
            </span>
          </Link>
        </AnimationContainer>

        {/* Navigation Links */}
        <AnimationContainer delay={0.2}>
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8">
            <Link
              href="/about"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/features"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="/models"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Models
            </Link>
            <Link
              href="/pricing"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/resources"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Resources
            </Link>
            <Link
              href="/how-it-works"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/contact"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </nav>
        </AnimationContainer>

        {/* Social Links */}
        <AnimationContainer delay={0.3}>
          <div className="flex items-center justify-center gap-4 mb-8">
            <Link
              href="https://twitter.com/artintel_ai"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                variant: "ghost",
                size: "icon",
                className: "rounded-full text-muted-foreground hover:text-white",
              })}
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="https://github.com/artintel-ai"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                variant: "ghost",
                size: "icon",
                className: "rounded-full text-muted-foreground hover:text-white",
              })}
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://linkedin.com/company/artintel-ai"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                variant: "ghost",
                size: "icon",
                className: "rounded-full text-muted-foreground hover:text-white",
              })}
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="https://discord.gg/artintel"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                variant: "ghost",
                size: "icon",
                className: "rounded-full text-muted-foreground hover:text-white",
              })}
            >
              <MessageCircle className="h-5 w-5" />
              <span className="sr-only">Discord</span>
            </Link>
          </div>
        </AnimationContainer>

        {/* Legal Links */}
        <AnimationContainer delay={0.4}>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8 text-sm text-muted-foreground">
            <Link
              href="/legal/terms"
              className="hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/legal/privacy-policy"
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/legal/cookie"
              className="hover:text-foreground transition-colors"
            >
              Cookie Policy
            </Link>
            <Link
              href="/legal/security"
              className="hover:text-foreground transition-colors"
            >
              Security
            </Link>
          </div>
        </AnimationContainer>

        {/* Copyright */}
        <AnimationContainer delay={0.5}>
          <p className="text-sm text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
        </AnimationContainer>
      </div>
    </footer>
  );
};

export default CenteredFooter;
