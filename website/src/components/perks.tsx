import { PERKS } from "@/constants";
import { cn } from "@/lib";
import Image from "next/image";
import AnimationContainer from "./global/animation-container";
import Wrapper from "./global/wrapper";
import SectionBadge from "./ui/section-badge";
import Marquee from "./ui/marquee";

const Perks = () => {
  return (
    <Wrapper className="py-20 lg:py-32 relative" data-oid="iwuz342">
      <div
        className="flex flex-col items-center text-center gap-4"
        data-oid="jicadwc"
      >
        <AnimationContainer animation="fadeUp" delay={0.2} data-oid="lcqdb:4">
          <SectionBadge title="Platform Capabilities" data-oid="s1vpf0o" />
        </AnimationContainer>

        <AnimationContainer animation="fadeUp" delay={0.3} data-oid="lcqdb:4">
          <h2
            className="text-2xl md:text-4xl lg:text-5xl font-medium !leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#00CBDD] to-[#00CBDD] whitespace-nowrap"
            data-oid="jci4he5"
          >
            Powerful AI platform capabilities
          </h2>
        </AnimationContainer>

        <AnimationContainer animation="fadeUp" delay={0.4} data-oid="_1_xj4_">
          <p
            className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto"
            data-oid=":2d:c91"
          >
            Comprehensive tools for fine-tuning, analyzing, and deploying language models.
          </p>
        </AnimationContainer>
      </div>

      <div className="relative pt-10" data-oid="l-z--qx">
        {/* Background glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-1/2 bg-[#00CBDD]/5 blur-[100px] rounded-full z-0"></div>

        <div
          className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-10"
          data-oid="2gt-w:m"
        >
          <AnimationContainer
            animation="scaleUp"
            delay={0.5}
            data-oid="0zgntdg"
          >
            <Image
              src="/images/grid-lines.svg"
              alt="Plus"
              width={32}
              height={32}
              className="size-full opacity-50"
              data-oid="km049qr"
            />
          </AnimationContainer>
        </div>

        <div className="grid grid-cols-2 relative z-20" data-oid="uodjm98">
          {PERKS.map((perk, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center p-2 md:p-16",
                index % 2 === 0 ? "justify-end" : "justify-start",
              )}
              data-oid="gqw_gxh"
            >
              <AnimationContainer
                animation={index % 2 === 0 ? "fadeRight" : "fadeLeft"}
                delay={0.2 * (index + 1)}
                data-oid=".kd6y4w"
              >
                <div
                  className="flex flex-col items-center text-center gap-4"
                  data-oid="eiu34mf"
                >
                  <div
                    className="size-14 lg:size-20 rounded-full bg-gradient-to-b from-[#00CBDD]/10 to-transparent p-3 flex items-center justify-center border border-[#00CBDD]/20 shadow-xl shadow-black/10 backdrop-blur-lg transition-all duration-300 hover:scale-110"
                    data-oid="-bgh7l8"
                  >
                    <Image
                      src={perk.icon}
                      alt={perk.title}
                      width={1024}
                      height={1024}
                      className="size-8 lg:size-12"
                      data-oid=".z.vddz"
                    />
                  </div>
                  <div className="space-y-2" data-oid="ycttj7r">
                    <h3
                      className="text-lg md:text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#00CBDD] to-white"
                      data-oid="6aenw2x"
                    >
                      {perk.title}
                    </h3>
                    <p
                      className="text-xs md:text-sm text-muted-foreground max-w-[280px]"
                      data-oid=":b326bf"
                    >
                      {perk.description}
                    </p>
                  </div>
                </div>
              </AnimationContainer>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default Perks;
