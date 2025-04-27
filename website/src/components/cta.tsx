import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AnimationContainer from "./global/animation-container";
import Wrapper from "./global/wrapper";
import { Button } from "./ui/button";
import { FlickeringGrid } from "./ui/flickering-grid";
import SectionBadge from "./ui/section-badge";

const HIGHLIGHTS = [
  {
    icon: "/icons/shield.svg",
    label: "Secure Platform",
  },
  {
    icon: "/icons/clock.svg",
    label: "Real-time Updates",
  },
  {
    icon: "/icons/magicpen.svg",
    label: "Smart Features",
  },
];

const CTA = () => {
  return (
    <Wrapper className="py-20 lg:py-32" data-oid="x-:2c27">
      <div
        className="flex flex-col items-center text-center relative gap-4 py-20 lg:py-32 overflow-hidden z-0"
        data-oid="d5aj4f:"
      >
        <div
          className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#101010] w-full h-1/2 z-10"
          data-oid="1t3qfgy"
        ></div>

        <AnimationContainer
          animation="scaleUp"
          delay={0.2}
          className="w-full mx-auto"
          data-oid="olny6tl"
        >
          <div
            className="absolute -top-1/2 inset-x-0 mx-auto bg-foreground/50 rounded-full size-1/2 blur-[4rem] lg:blur-[10rem]"
            data-oid="650p_tq"
          ></div>
        </AnimationContainer>

        <AnimationContainer animation="scaleUp" delay={0.3} data-oid="nrk81:y">
          <div
            className="absolute top-0 w-4/5 mx-auto inset-x-0 h-px bg-gradient-to-r from-foreground/0 via-foreground/50 to-foreground/0"
            data-oid="scbv-i0"
          ></div>
        </AnimationContainer>

        <AnimationContainer animation="scaleUp" delay={0.2} data-oid=".bbpff8">
          <FlickeringGrid
            className="absolute inset-0 -z-10 h-full w-[120%]"
            squareSize={4}
            gridGap={6}
            color="#525252"
            maxOpacity={0.2}
            flickerChance={0.1}
            height={800}
            data-oid="5gp_jle"
          />
        </AnimationContainer>

        <div
          className="flex flex-col items-center justify-center w-full z-30"
          data-oid="ur8f0a2"
        >
          <AnimationContainer animation="fadeUp" delay={0.3} data-oid="m9h5m0m">
            <SectionBadge title="Start now" data-oid="lrp8-98" />
          </AnimationContainer>

          <AnimationContainer animation="fadeUp" delay={0.4} data-oid="fsj5h4u">
            <h2
              className="text-3xl md:text-5xl lg:text-6xl font-medium !leading-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-neutral-400"
              data-oid="w1xpvb3"
            >
              Ready to get started?
            </h2>
          </AnimationContainer>

          <AnimationContainer animation="fadeUp" delay={0.5} data-oid="zzt:gqt">
            <p
              className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-lg mx-auto mt-4"
              data-oid="0kqarfi"
            >
              Sign up for a free trial and see how Artintel can help you manage
              your AI models.
            </p>
          </AnimationContainer>

          <AnimationContainer animation="fadeUp" delay={0.6} data-oid="sfs6t3w">
            <div className="flex items-center mt-4" data-oid="abk_1_4">
              <div
                className="rounded-full px-4 py-2.5 bg-neutral-900 flex flex-wrap md:flex-row items-center justify-center gap-4"
                data-oid="elz4zte"
              >
                {HIGHLIGHTS.map((item, index) => (
                  <AnimationContainer
                    key={index}
                    animation="fadeRight"
                    delay={0.7 + index * 0.1}
                    data-oid="pdky-nk"
                  >
                    <div
                      className="flex items-center gap-2 last:hidden md:last:flex"
                      data-oid="s58mphx"
                    >
                      <Image
                        src={item.icon}
                        alt={item.label}
                        width={1024}
                        height={1024}
                        className="size-5 text-primary"
                        data-oid="n3_ud8_"
                      />

                      <span
                        className="text-sm text-foreground"
                        data-oid=".blx3vn"
                      >
                        {item.label}
                      </span>
                    </div>
                  </AnimationContainer>
                ))}
              </div>
            </div>
          </AnimationContainer>

          <AnimationContainer animation="fadeUp" delay={1} data-oid="73fhrbb">
            <Link href="/signin" data-oid="wage1k3">
              <Button size="lg" className="mt-6" data-oid="3ifab4i">
                Start now
                <ArrowRightIcon className="size-4 ml-2" data-oid="5_2ko4y" />
              </Button>
            </Link>
          </AnimationContainer>
        </div>
      </div>
    </Wrapper>
  );
};

export default CTA;
