import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  MessageCircle,
  Twitter,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AnimationContainer from "./global/animation-container";
import Wrapper from "./global/wrapper";
import TextHoverEffect from "./global/text-hover-effect";

const APP_NAME = "Artintel";

const PRODUCT_LINKS = [
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "AI Models", href: "/models" },
  { label: "Integration Tools", href: "#" },
  { label: "API Access", href: "#" },
];

const RESOURCES_LINKS = [
  { label: "Documentation", href: "/docs" },
  { label: "Blog", href: "/blog" },
  { label: "Knowledge Base", href: "#" },
  { label: "Research Papers", href: "#" },
  { label: "AI Guides", href: "#" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "GDPR Compliance", href: "/gdpr" },
  { label: "Security", href: "/security" },
];

const SOCIAL_LINKS = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: MessageCircle, href: "#", label: "Discord" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

const INDUSTRY_TAGS = [
  "AI",
  "Machine Learning",
  "NLP",
  "Computer Vision",
  "Data Science",
  "Enterprise AI",
];

const Footer = () => {
  return (
    <footer
      className="flex flex-col relative items-center justify-center border-t border-border pt-16 pb-8 md:pb-0 w-full overflow-hidden bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)]"
      data-oid="v1_0asl"
    >
      <div
        className="absolute top-0 left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-1.5 bg-foreground rounded-full"
        data-oid="htm5uuu"
      ></div>

      <AnimationContainer animation="scaleUp" delay={0.2} data-oid="kzngtz.">
        <div
          className="absolute -top-1/8 lg:-top-1/2 inset-x-0 mx-auto bg-primary/50 lg:bg-primary/70 rounded-full w-1/2 h-1/4 blur-[6rem] lg:blur-[12rem]"
          data-oid="v5hgg_7"
        ></div>
      </AnimationContainer>

      <AnimationContainer animation="scaleUp" delay={0.3} data-oid="lo536j.">
        <div
          className="absolute top-0 w-4/5 mx-auto inset-x-0 h-px bg-gradient-to-r from-primary/0 via-primary/80 to-primary/0"
          data-oid="iz8oc-0"
        ></div>
      </AnimationContainer>

      <Wrapper className="max-w-6xl mx-auto" data-oid="m9uky.i">
        <div
          className="grid gap-8 xl:grid-cols-3 xl:gap-8 w-full"
          data-oid="w1n4bq9"
        >
          <AnimationContainer
            animation="fadeRight"
            delay={0.4}
            data-oid="hpgvrwi"
          >
            <div
              className="flex flex-col items-start justify-start md:max-w-[300px]"
              data-oid="h6xv6ec"
            >
              <Link
                href="/"
                className="flex items-center gap-2"
                data-oid="wena70i"
              >
                <Image
                  src="/icons/artintel-logo.png"
                  alt={APP_NAME}
                  width={32}
                  height={32}
                  className="text-primary"
                  data-oid="s:216w0"
                />

                <span
                  className="text-lg lg:text-xl font-medium bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent"
                  data-oid="eu7auxa"
                >
                  {APP_NAME}
                </span>
              </Link>
              <p
                className="text-muted-foreground mt-4 text-sm text-start"
                data-oid="95hnbt0"
              >
                A comprehensive AI platform for discovering, implementing, and
                managing AI models across various enterprise applications.
              </p>
              <p
                className="text-muted-foreground mt-4 text-sm"
                data-oid="dr59myc"
              >
                123 Pine Avenue, Suite 500
                <br data-oid="6b90g1l" />
                New York, NY 10001
              </p>
              <div
                className="mt-4 text-sm text-muted-foreground"
                data-oid="jo2z::k"
              >
                <p data-oid="uhnimg0">support@artintel.com</p>
                <p data-oid="i4:xx9.">+1 (123) 456-7890</p>
              </div>
              <div className="flex items-center gap-4 mt-6" data-oid="x7a66u-">
                {SOCIAL_LINKS.map((social, index) => (
                  <AnimationContainer
                    key={index}
                    animation="fadeUp"
                    delay={0.6 + index * 0.1}
                    data-oid="xn9_vgx"
                  >
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors rounded-full p-2"
                      aria-label={social.label}
                      data-oid="i_9wk4h"
                    >
                      <social.icon className="size-5" data-oid="dzow5:3" />
                    </Link>
                  </AnimationContainer>
                ))}
              </div>
            </div>
          </AnimationContainer>

          <div
            className="grid grid-cols-2 gap-8 xl:col-span-2 md:grid-cols-4"
            data-oid="unwrp1b"
          >
            <AnimationContainer
              animation="fadeUp"
              delay={0.5}
              data-oid=":9ivi7m"
            >
              <div data-oid="shq6ho-">
                <h3 className="text-base font-medium" data-oid="tgka.gk">
                  Product
                </h3>
                <ul
                  className="mt-4 space-y-2 text-sm text-muted-foreground"
                  data-oid="6_v0d7."
                >
                  {PRODUCT_LINKS.map((link, index) => (
                    <AnimationContainer
                      key={index}
                      animation="fadeLeft"
                      delay={0.6 + index * 0.1}
                      data-oid="jml8e31"
                    >
                      <li data-oid="5cecw1r">
                        <Link
                          href={link.href}
                          className="hover:text-foreground transition-colors duration-300"
                          data-oid="kxd3ntg"
                        >
                          {link.label}
                        </Link>
                      </li>
                    </AnimationContainer>
                  ))}
                </ul>
              </div>
            </AnimationContainer>

            <AnimationContainer
              animation="fadeUp"
              delay={0.5}
              data-oid="bil5g6u"
            >
              <div data-oid="bcwpynk">
                <h3 className="text-base font-medium" data-oid="ulmb_fb">
                  Resources
                </h3>
                <ul
                  className="mt-4 space-y-2 text-sm text-muted-foreground"
                  data-oid="6eb3nx1"
                >
                  {RESOURCES_LINKS.map((link, index) => (
                    <AnimationContainer
                      key={index}
                      animation="fadeLeft"
                      delay={0.7 + index * 0.1}
                      data-oid="hm9u832"
                    >
                      <li data-oid="robbe-u">
                        <Link
                          href={link.href}
                          className="hover:text-foreground transition-colors duration-300"
                          data-oid="4j9_r-:"
                        >
                          {link.label}
                        </Link>
                      </li>
                    </AnimationContainer>
                  ))}
                </ul>
              </div>
            </AnimationContainer>

            <AnimationContainer
              animation="fadeUp"
              delay={0.5}
              data-oid="iukq:q2"
            >
              <div data-oid="wzsigb6">
                <h3 className="text-base font-medium" data-oid="8ba3bp-">
                  Company
                </h3>
                <ul
                  className="mt-4 space-y-2 text-sm text-muted-foreground"
                  data-oid="2qbc9tz"
                >
                  {COMPANY_LINKS.map((link, index) => (
                    <AnimationContainer
                      key={index}
                      animation="fadeLeft"
                      delay={0.8 + index * 0.1}
                      data-oid="bnqs.v_"
                    >
                      <li data-oid="xoj4oss">
                        <Link
                          href={link.href}
                          className="hover:text-foreground transition-colors duration-300"
                          data-oid="wagv_bl"
                        >
                          {link.label}
                        </Link>
                      </li>
                    </AnimationContainer>
                  ))}
                </ul>
              </div>
            </AnimationContainer>

            <AnimationContainer
              animation="fadeUp"
              delay={0.5}
              data-oid="legal-links"
            >
              <div data-oid="legal-links-container">
                <h3 className="text-base font-medium" data-oid="legal-title">
                  Legal
                </h3>
                <ul
                  className="mt-4 space-y-2 text-sm text-muted-foreground"
                  data-oid="legal-list"
                >
                  {LEGAL_LINKS.map((link, index) => (
                    <AnimationContainer
                      key={index}
                      animation="fadeLeft"
                      delay={0.9 + index * 0.1}
                      data-oid={`legal-link-${index}`}
                    >
                      <li data-oid={`legal-item-${index}`}>
                        <Link
                          href={link.href}
                          className="hover:text-foreground transition-colors duration-300"
                          data-oid={`legal-anchor-${index}`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    </AnimationContainer>
                  ))}
                </ul>
              </div>
            </AnimationContainer>
          </div>
        </div>

        <AnimationContainer animation="fadeUp" delay={1} data-oid="-5e34p8">
          <div
            className="mt-16 border-t border-border/40 pt-6 md:pt-8 w-full"
            data-oid="a_0h:hq"
          >
            <div
              className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
              data-oid="2t820jb"
            >
              <p
                className="text-xs text-muted-foreground text-center md:text-left"
                data-oid="zmm3p85"
              >
                © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
              </p>

              <div
                className="flex flex-wrap justify-center md:justify-end gap-3 mt-4 md:mt-0"
                data-oid="dft1.h-"
              >
                {INDUSTRY_TAGS.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs text-muted-foreground bg-background/30 px-2 py-1 rounded-full"
                    data-oid="m_0zzj4"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="h-[12rem] md:h-[16rem] lg:h-[20rem] flex items-center justify-center"
              data-oid="ak5.5y_"
            >
              <TextHoverEffect
                text={APP_NAME.toUpperCase()}
                data-oid="fqkn-_q"
              />
            </div>
          </div>
        </AnimationContainer>
      </Wrapper>
    </footer>
  );
};

export default Footer;
