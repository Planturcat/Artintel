import { HOW_IT_WORKS } from "@/constants";
import { cn } from "@/lib";
import Image from "next/image";
import AnimationContainer from "./global/animation-container";
import Wrapper from "./global/wrapper";
import SectionBadge from "./ui/section-badge";

const HowItWorks = () => {
  return (
    <Wrapper className="py-20 lg:py-32 relative" data-oid="pfvb.ld">
      <div
        className="flex flex-col items-center text-center gap-4 py-8 w-full"
        data-oid="p3ohjrl"
      >
        <AnimationContainer animation="fadeUp" delay={0.2} data-oid="svena6m">
          <SectionBadge title="How it works" data-oid="xodwn64" />
        </AnimationContainer>

        <AnimationContainer animation="fadeUp" delay={0.3} data-oid="s1m9i99">
          <h1
            className="text-2xl md:text-4xl lg:text-5xl font-medium !leading-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-neutral-400"
            data-oid="k2:ab.7"
          >
            Three steps to success
          </h1>
        </AnimationContainer>

        <AnimationContainer animation="fadeUp" delay={0.4} data-oid="tae7joo">
          <p
            className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-lg mx-auto"
            data-oid="7yjrt8d"
          >
            Our three-step process simplifies AI implementation and model
            management.
          </p>
        </AnimationContainer>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 w-full pt-10"
        data-oid="fuobeu5"
      >
        {HOW_IT_WORKS.map((item, index) => (
          <AnimationContainer
            key={index}
            animation="fadeUp"
            delay={0.5 + index * 0.2}
            data-oid="n22g3le"
          >
            <div
              className={cn(
                "flex flex-col items-start gap-4 bg-gradient-to-b rounded-lg lg:rounded-2xl p-4 lg:p-8",
                index % 2 === 0
                  ? "from-neutral-900 to-transparent"
                  : "from-transparent to-neutral-900",
              )}
              data-oid="zmuw-z3"
            >
              <div className="flex items-center gap-x-4" data-oid="v_td0j2">
                <AnimationContainer
                  animation="scaleUp"
                  delay={0.7 + index * 0.2}
                  data-oid="nwj912g"
                >
                  <div
                    className="size-10 rounded-full bg-gradient-to-b from-primary to-cyan-700 flex items-center justify-center"
                    data-oid="jlnd5.t"
                  >
                    <span
                      className="text-lg font-medium text-white"
                      data-oid="w8uts4_"
                    >
                      {index + 1}
                    </span>
                  </div>
                </AnimationContainer>
                <h3 className="text-lg font-medium" data-oid="l1at_tg">
                  {item.title}
                </h3>
              </div>
              <div className="space-y-4 w-full" data-oid="qap4co6">
                <AnimationContainer
                  animation="fadeUp"
                  delay={0.9 + index * 0.2}
                  data-oid="optf.c1"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={1024}
                    height={1024}
                    className="w-full h-52 object-contain"
                    data-oid="to9-vk8"
                  />
                </AnimationContainer>
                <AnimationContainer
                  animation="fadeUp"
                  delay={1.1 + index * 0.2}
                  data-oid="7je8ze5"
                >
                  <p
                    className="text-sm md:text-base text-muted-foreground"
                    data-oid="8s1a9_v"
                  >
                    {item.description}
                  </p>
                </AnimationContainer>
              </div>
            </div>
          </AnimationContainer>
        ))}
      </div>
    </Wrapper>
  );
};

export default HowItWorks;
