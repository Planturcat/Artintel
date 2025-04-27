import Link from "next/link";
import { AnimationContainer, Icons } from "@/components";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import {
  BrainCircuit,
  Github,
  Twitter,
  Linkedin,
  MessageCircle,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { APP_NAME } from "@/utils/constants/site";

const Footer = () => {
  return (
    <footer
      className="flex flex-col relative items-center justify-center border-t border-border pt-16 pb-8 md:pb-0 px-6 lg:px-8 w-full max-w-6xl mx-auto lg:pt-32 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)]"
      data-oid="o:x1dg8"
    >
      <div
        className="absolute top-0 left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-1.5 bg-foreground rounded-full"
        data-oid="aopew56"
      ></div>

      <div
        className="grid gap-8 xl:grid-cols-3 xl:gap-8 w-full"
        data-oid="j9iyvfe"
      >
        {/* Brand Info */}
        <AnimationContainer delay={0.1} data-oid="n5y.wev">
          <div
            className="flex flex-col items-start justify-start md:max-w-[300px]"
            data-oid="19.6k4r"
          >
            <Link
              href="/"
              className="flex items-center gap-2"
              data-oid="0_2_.m."
            >
              <img
                src="/icons/Black Icon.jpg"
                alt="Artintel Logo"
                className="w-7 h-7"
                data-oid="5nsikul"
              />

              <span
                className="text-lg font-bold font-heading !leading-none text-white"
                data-oid=".dx7z.0"
              >
                {APP_NAME}
              </span>
            </Link>
            <p
              className="text-muted-foreground mt-4 text-sm text-start"
              data-oid="m03tmht"
            >
              A comprehensive, no-code platform for discovering, fine-tuning,
              and deploying open-source Large Language Models (LLMs) and Small
              Language Models (SLMs).
            </p>
            <div className="mt-6 flex items-center gap-4" data-oid="5luyqwe">
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
                data-oid="yzcxyh5"
              >
                <Twitter className="h-5 w-5" data-oid="bcr98-j" />
                <span className="sr-only" data-oid="k0ovv63">
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
                data-oid="g33:-7_"
              >
                <Github className="h-5 w-5" data-oid="t01zwae" />
                <span className="sr-only" data-oid="y18rvon">
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
                data-oid="3gt7us7"
              >
                <Linkedin className="h-5 w-5" data-oid="47an9_5" />
                <span className="sr-only" data-oid="sxmf5zx">
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
                data-oid="lv52dnx"
              >
                <MessageCircle className="h-5 w-5" data-oid="vhe2h.j" />
                <span className="sr-only" data-oid="zd5uv:_">
                  Discord
                </span>
              </Link>
            </div>
          </div>
        </AnimationContainer>

        <div
          className="grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0 md:grid-cols-4"
          data-oid="sux0af5"
        >
          {" "}
          {/* Adjusted grid columns for 4 sections */}
          {/* Product Column */}
          <AnimationContainer delay={0.2} data-oid="lhh_ilh">
            <div data-oid="4zt9yww">
              <h3
                className="text-base font-medium text-white"
                data-oid="y7u:lqc"
              >
                Product
              </h3>
              <ul
                className="mt-4 space-y-2 text-sm text-muted-foreground"
                data-oid="nheto4a"
              >
                <li data-oid="3-6v7od">
                  <Link
                    href="/features"
                    className="hover:text-foreground transition-colors duration-300"
                    data-oid="9y6drgo"
                  >
                    Features
                  </Link>
                </li>
                <li data-oid="pdz_3zr">
                  <Link
                    href="/how-it-works"
                    className="hover:text-foreground transition-colors duration-300"
                    data-oid="4m9xxrg"
                  >
                    How It Works
                  </Link>
                </li>
                <li data-oid="b9ifrj2">
                  <Link
                    href="/use-cases"
                    className="hover:text-foreground transition-colors duration-300"
                    data-oid="5.9hefw"
                  >
                    Use Cases
                  </Link>
                </li>
                <li data-oid="42ty1bs">
                  <Link
                    href="/pricing"
                    className="hover:text-foreground transition-colors duration-300"
                    data-oid="..d85:d"
                  >
                    Pricing
                  </Link>
                </li>
                <li data-oid="gfq-e2h">
                  <Link
                    href="/community"
                    className="hover:text-foreground transition-colors duration-300"
                    data-oid="271cqe5"
                  >
                    Community
                  </Link>
                </li>
              </ul>
            </div>
          </AnimationContainer>
          {/* Models Column */}
          <AnimationContainer delay={0.3} data-oid="57kk9r9">
            <div data-oid="1.4m2f7">
              <h3
                className="text-base font-medium text-white"
                data-oid="m7d7c1w"
              >
                Models
              </h3>
              <ul
                className="mt-4 space-y-2 text-sm text-muted-foreground"
                data-oid="h6_s_zm"
              >
                <li data-oid="wa9g-qz">
                  <Link
                    href="/catalog"
                    className="hover:text-foreground transition-colors duration-300"
                    data-oid="amz8cab"
                  >
                    All Models
                  </Link>
                </li>
                <li data-oid="106ba3:">
                  <Link
                    href="/slm-models"
                    className="hover:text-foreground transition-colors duration-300"
                    data-oid="ifj3f2l"
                  >
                    SLM Models
                  </Link>
                </li>
                <li data-oid="b-sgiy_">
                  <Link
                    href="/llm-models"
                    className="hover:text-foreground transition-colors duration-300"
                    data-oid="trvob5-"
                  >
                    LLM Models
                  </Link>
                </li>
                <li data-oid="f0k3_io">
                  <Link
                    href="/models/comparison"
                    className="hover:text-foreground transition-colors duration-300"
                    data-oid="75ce5dy"
                  >
                    Model Comparison
                  </Link>
                </li>
              </ul>
            </div>
          </AnimationContainer>
          {/* Resources Column */}
          <AnimationContainer delay={0.4} data-oid="55ledaq">
            <div data-oid="uxt0e97">
              <h3
                className="text-base font-medium text-white"
                data-oid="k:r5z3e"
              >
                Resources
              </h3>
              <ul
                className="mt-4 space-y-2 text-sm text-muted-foreground"
                data-oid="oeqem-_"
              >
                <li data-oid="l-xew1e">
                  <Link
                    href="/docs"
                    className="hover:text-foreground transition-colors duration-300"
                    data-oid="tv9cnqb"
                  >
                    Documentation
                  </Link>
                </li>
                <li data-oid="l.0tpwx">
                  <Link
                    href="/blog"
                    className="hover:text-foreground transition-colors duration-300"
                    data-oid="asrjjp4"
                  >
                    Blog
                  </Link>
                </li>
                <li data-oid="b7i7von">
                  <Link
                    href="/docs/tutorials"
                    className="hover:text-foreground transition-colors duration-300"
                    data-oid="-yemf4z"
                  >
                    Tutorials
                  </Link>
                </li>
                <li data-oid="m4.mw4n">
                  <Link
                    href="/docs/api"
                    className="hover:text-foreground transition-colors duration-300"
                    data-oid="lr6gs1k"
                  >
                    API Reference
                  </Link>
                </li>
                <li data-oid="p5e4r4s">
                  <Link
                    href="/status"
                    className="hover:text-foreground transition-colors duration-300"
                    data-oid="3-4r:25"
                  >
                    Status
                  </Link>
                </li>
              </ul>
            </div>
          </AnimationContainer>
          {/* Company Column */}
          <AnimationContainer delay={0.5} data-oid="2web2:3">
            <div data-oid="xrgov_g">
              <h3
                className="text-base font-medium text-white"
                data-oid="jqgbyq8"
              >
                Company
              </h3>
              <ul
                className="mt-4 space-y-2 text-sm text-muted-foreground"
                data-oid=":3bcvig"
              >
                <li data-oid="s427nkz">
                  <Link
                    href="/about"
                    className="hover:text-foreground transition-colors duration-300"
                    data-oid="l5vmktz"
                  >
                    About Us
                  </Link>
                </li>
                <li data-oid="r.k7:az">
                  <Link
                    href="/contact"
                    className="hover:text-foreground transition-colors duration-300"
                    data-oid="wgmy920"
                  >
                    Contact
                  </Link>
                </li>
                <li data-oid=":zl2pb8">
                  <Link
                    href="/terms"
                    className="hover:text-foreground transition-colors duration-300"
                    data-oid="q2r.bhy"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li data-oid="x28tzk-">
                  <Link
                    href="/privacy-policy"
                    className="hover:text-foreground transition-colors duration-300"
                    data-oid="6sewwc8"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li data-oid="zyxuttu">
                  <Link
                    href="/security"
                    className="hover:text-foreground transition-colors duration-300"
                    data-oid="de9w3ya"
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
        data-oid="kh8zi81"
      >
        <AnimationContainer delay={0.6} data-oid=":jcqxyo">
          <p
            className="text-xs text-muted-foreground text-center md:text-left"
            data-oid="4vbik.t"
          >
            &copy; {new Date().getFullYear()} Artintel, Inc. All rights
            reserved.
          </p>
        </AnimationContainer>

        {/* Industry tags */}
        <AnimationContainer delay={0.7} data-oid="2ob32xb">
          <div
            className="flex flex-wrap justify-center md:justify-end gap-3 mt-4 md:mt-0"
            data-oid="bxepo7i"
          >
            <span
              className="text-xs text-muted-foreground bg-background/30 px-2 py-1 rounded-full"
              data-oid="_z8v3:_"
            >
              Healthcare
            </span>
            <span
              className="text-xs text-muted-foreground bg-background/30 px-2 py-1 rounded-full"
              data-oid="ds2szhi"
            >
              Finance
            </span>
            <span
              className="text-xs text-muted-foreground bg-background/30 px-2 py-1 rounded-full"
              data-oid="o9in0dl"
            >
              Legal
            </span>
            <span
              className="text-xs text-muted-foreground bg-background/30 px-2 py-1 rounded-full"
              data-oid="j4dnq9i"
            >
              Retail
            </span>
            <span
              className="text-xs text-muted-foreground bg-background/30 px-2 py-1 rounded-full"
              data-oid="i3we4fy"
            >
              Manufacturing
            </span>
            <span
              className="text-xs text-muted-foreground bg-background/30 px-2 py-1 rounded-full"
              data-oid="0jw.sja"
            >
              Education
            </span>
            <span
              className="text-xs text-muted-foreground bg-background/30 px-2 py-1 rounded-full"
              data-oid="2c29q7c"
            >
              Research
            </span>
          </div>
        </AnimationContainer>
      </div>
      <div
        className="h-[20rem] lg:h-[20rem] hidden md:flex items-center justify-center"
        data-oid="yc58t_m"
      >
        <TextHoverEffect text="ARTINTEL" data-oid="f.xbwmr" />
      </div>
    </footer>
  );
};

export default Footer;
