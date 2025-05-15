import Link from "next/link";
import Image from "next/image";
import AnimationContainer from "./global/animation-container";
import TextHoverEffect from "./global/text-hover-effect";
import {
  GitHubIcon,
  TwitterIcon,
  LinkedInIcon,
  MessageCircleIcon,
} from "@/components/ui/social-icons";
import { buttonVariants } from "@/components/ui/button";

const APP_NAME = "Artintel";

const Footer = () => {
  return (
    <footer
      className="flex flex-col relative items-center justify-center border-t border-border pt-16 pb-8 md:pb-0 px-6 lg:px-8 w-full max-w-6xl mx-auto lg:pt-32 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)]"
      data-oid="dx9v0i5"
    >
      <div
        className="absolute top-0 left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-1.5 bg-foreground rounded-full"
        data-oid=".mpua1h"
      ></div>

      <div
        className="grid gap-8 xl:grid-cols-3 xl:gap-8 w-full"
        data-oid="hyx::e2"
      >
        {/* Brand Info */}
        <AnimationContainer delay={0.1} data-oid="z6qy7xo">
          <div
            className="flex flex-col items-start justify-start md:max-w-[300px]"
            data-oid="fswx13g"
          >
            <Link
              href="/"
              className="flex items-center gap-2"
              data-oid="y3a2jyq"
            >
              <Image
                src="/icons/artintel-logo.png"
                alt="Artintel Logo"
                width={28}
                height={28}
                className="text-primary"
                data-oid="7:5hl96"
              />

              <span
                className="text-lg font-bold font-heading !leading-none bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent"
                data-oid="8.e5d:d"
              >
                {APP_NAME}
              </span>
            </Link>
            <p
              className="text-muted-foreground mt-4 text-sm text-start"
              data-oid="a9_1f-x"
            >
              A comprehensive, no-code platform for discovering, fine-tuning,
              and deploying open-source Large Language Models (LLMs) and Small
              Language Models (SLMs).
            </p>
            <div className="mt-6 flex items-center gap-4" data-oid="82all-5">
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
                data-oid="b29ahao"
              >
                <TwitterIcon className="h-5 w-5" data-oid="u_mh:8f" />
                <span className="sr-only" data-oid=".x5l1rt">
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
                data-oid=":ur2b65"
              >
                <GitHubIcon className="h-5 w-5" data-oid="rpwqsej" />
                <span className="sr-only" data-oid="rv_mr0o">
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
                data-oid="54domt_"
              >
                <LinkedInIcon className="h-5 w-5" data-oid="m23y3kf" />
                <span className="sr-only" data-oid="ys8l5u.">
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
                data-oid="5ki97b7"
              >
                <MessageCircleIcon className="h-5 w-5" data-oid="8p_xz-c" />
                <span className="sr-only" data-oid="-jyvquw">
                  Discord
                </span>
              </Link>
            </div>
          </div>
        </AnimationContainer>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:col-span-2"
          data-oid="ynmr2:r"
        >
          {/* Product Column */}
          <AnimationContainer delay={0.2} data-oid="4j0q_i6">
            <div data-oid="te-d6.1">
              <h3
                className="text-base font-medium text-white"
                data-oid="ejpvofe"
              >
                Product
              </h3>
              <ul
                className="mt-4 space-y-2 text-sm text-muted-foreground"
                data-oid="-fweev7"
              >
                <li data-oid="if1zr.6">
                  <Link
                    href="/features"
                    className="hover:text-foreground transition-colors duration-300"
                    data-oid="cmvttbx"
                  >
                    Features
                  </Link>
                </li>
                <li data-oid="0_um8_9">
                  <Link
                    href="/how-it-works"
                    className="hover:text-foreground transition-colors duration-300"
                    data-oid="1xu1j7g"
                  >
                    How It Works
                  </Link>
                </li>
                <li data-oid="1psmioj">
                  <Link
                    href="/pricing"
                    className="hover:text-foreground transition-colors duration-300"
                    data-oid="5fmfs-g"
                  >
                    Pricing
                  </Link>
                </li>

              </ul>
            </div>
          </AnimationContainer>

          {/* Models Column */}
          <AnimationContainer delay={0.3} data-oid="-.tv2rv">
            <div data-oid="26vruou">
              <h3
                className="text-base font-medium text-white"
                data-oid="e4l9id_"
              >
                Models
              </h3>
              <ul
                className="mt-4 space-y-2 text-sm text-muted-foreground"
                data-oid="o-qw1fa"
              >
                <li data-oid="6xygk97">
                  <Link
                    href="/catalog"
                    className="hover:text-foreground transition-colors duration-300"
                    data-oid="-0l-qj1"
                  >
                    All Models
                  </Link>
                </li>
                <li data-oid="oz.q35_">
                  <Link
                    href="/slm-models"
                    className="hover:text-foreground transition-colors duration-300"
                    data-oid="c95obsf"
                  >
                    SLM Models
                  </Link>
                </li>
                <li data-oid="wyrw3ge">
                  <Link
                    href="/llm-models"
                    className="hover:text-foreground transition-colors duration-300"
                    data-oid="70bglxk"
                  >
                    LLM Models
                  </Link>
                </li>
                <li data-oid="nnc3k5z">
                  <Link
                    href="/performance"
                    className="hover:text-foreground transition-colors duration-300"
                    data-oid="i4.l9if"
                  >
                    Performance
                  </Link>
                </li>
                <li data-oid="7vz712i">
                  <Link
                    href="/docs/api"
                    className="hover:text-foreground transition-colors duration-300"
                    data-oid="chowh_6"
                  >
                    API Reference
                  </Link>
                </li>
                <li data-oid="d:wctlw">
                  <Link
                    href="/status"
                    className="hover:text-foreground transition-colors duration-300"
                    data-oid="asldf4h"
                  >
                    Status
                  </Link>
                </li>
              </ul>
            </div>
          </AnimationContainer>

          {/* Company Column */}
          <AnimationContainer delay={0.4} data-oid="mo:tgmq">
            <div data-oid="dmoutn2">
              <h3
                className="text-base font-medium text-white"
                data-oid="36xlat6"
              >
                Company
              </h3>
              <ul
                className="mt-4 space-y-2 text-sm text-muted-foreground"
                data-oid="dlst4tn"
              >
                <li data-oid="y3tjv59">
                  <Link
                    href="/about"
                    className="hover:text-foreground transition-colors duration-300"
                    data-oid="6zmldoo"
                  >
                    About Us
                  </Link>
                </li>
                <li data-oid="r10s2xa">
                  <Link
                    href="/contact"
                    className="hover:text-foreground transition-colors duration-300"
                    data-oid="9fjcvq4"
                  >
                    Contact
                  </Link>
                </li>
                <li data-oid="_d6s3vw">
                  <Link
                    href="/terms"
                    className="hover:text-foreground transition-colors duration-300"
                    data-oid="uz7g_a0"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li data-oid="2ccynk5">
                  <Link
                    href="/privacy"
                    className="hover:text-foreground transition-colors duration-300"
                    data-oid="tsi1h1w"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li data-oid="o1vkiwa">
                  <Link
                    href="/cookies"
                    className="hover:text-foreground transition-colors duration-300"
                    data-oid=".4yrazv"
                  >
                    Cookie Policy
                  </Link>
                </li>
                <li data-oid="gdpr-link">
                  <Link
                    href="/gdpr"
                    className="hover:text-foreground transition-colors duration-300"
                    data-oid="gdpr-anchor"
                  >
                    GDPR Compliance
                  </Link>
                </li>
                <li data-oid="security-link">
                  <Link
                    href="/security"
                    className="hover:text-foreground transition-colors duration-300"
                    data-oid="security-anchor"
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
        data-oid="_:vg:vf"
      >
        <AnimationContainer delay={0.5} data-oid="r2:tk7n">
          <p
            className="text-xs text-muted-foreground text-center md:text-left"
            data-oid="d2w_:ha"
          >
            &copy; {new Date().getFullYear()} Artintel, Inc. All rights
            reserved.
          </p>
        </AnimationContainer>
        <AnimationContainer delay={0.6} data-oid="e2mwyyq">
          <div
            className="flex flex-wrap justify-center md:justify-end gap-3 mt-4 md:mt-0"
            data-oid="czd6:bw"
          >
            <span
              className="text-xs text-muted-foreground bg-background/30 px-2 py-1 rounded-full"
              data-oid="d6h4na2"
            >
              AI
            </span>
            <span
              className="text-xs text-muted-foreground bg-background/30 px-2 py-1 rounded-full"
              data-oid="70--ptx"
            >
              Machine Learning
            </span>
            <span
              className="text-xs text-muted-foreground bg-background/30 px-2 py-1 rounded-full"
              data-oid="fhlwrc9"
            >
              NLP
            </span>
            <span
              className="text-xs text-muted-foreground bg-background/30 px-2 py-1 rounded-full"
              data-oid="h19dez2"
            >
              Research
            </span>
          </div>
        </AnimationContainer>
      </div>
      <div
        className="h-[20rem] lg:h-[20rem] hidden md:flex items-center justify-center"
        data-oid="e0oqe_2"
      >
        <TextHoverEffect text="ARTINTEL" data-oid=".9b01-9" />
      </div>
    </footer>
  );
};

export default Footer;
