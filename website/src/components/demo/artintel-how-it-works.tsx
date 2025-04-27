import { ARTINTEL_HOW_IT_WORKS } from "@/constants";
import { cn } from "@/lib";
import Image from "next/image";
import AnimationContainer from "../global/animation-container";
import Wrapper from "../global/wrapper";
import SectionBadge from "../ui/section-badge";

const ArtintelHowItWorks = () => {
  return (
    <Wrapper className="py-20 lg:py-32 relative" data-oid="artintel-hiw">
      <div
        className="flex flex-col items-center text-center gap-4 py-8 w-full"
        data-oid="artintel-hiw-header"
      >
        <AnimationContainer animation="fadeUp" delay={0.2} data-oid="artintel-badge">
          <SectionBadge title="How Artintel works" data-oid="artintel-badge-title" />
        </AnimationContainer>

        <AnimationContainer animation="fadeUp" delay={0.3} data-oid="artintel-heading">
          <h1
            className="text-2xl md:text-4xl lg:text-5xl font-medium !leading-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-neutral-400"
            data-oid="artintel-heading-text"
          >
            AI implementation simplified
          </h1>
        </AnimationContainer>

        <AnimationContainer animation="fadeUp" delay={0.4} data-oid="artintel-desc">
          <p
            className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-lg mx-auto"
            data-oid="artintel-desc-text"
          >
            Our three-step process makes AI accessible to teams without deep machine learning expertise.
          </p>
        </AnimationContainer>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 w-full pt-10"
        data-oid="artintel-steps"
      >
        {ARTINTEL_HOW_IT_WORKS.map((item, index) => (
          <AnimationContainer
            key={index}
            animation="fadeUp"
            delay={0.5 + index * 0.2}
            data-oid={`artintel-step-${index}`}
          >
            <div
              className={cn(
                "flex flex-col items-start gap-4 bg-gradient-to-b rounded-lg lg:rounded-2xl p-4 lg:p-8",
                index % 2 === 0
                  ? "from-neutral-900 to-transparent"
                  : "from-transparent to-neutral-900",
              )}
              data-oid={`artintel-step-card-${index}`}
            >
              <div className="flex items-center gap-x-4" data-oid={`artintel-step-header-${index}`}>
                <AnimationContainer
                  animation="scaleUp"
                  delay={0.7 + index * 0.2}
                  data-oid={`artintel-step-number-anim-${index}`}
                >
                  <div
                    className="size-10 rounded-full bg-gradient-to-b from-primary to-cyan-700 flex items-center justify-center"
                    data-oid={`artintel-step-number-bg-${index}`}
                  >
                    <span
                      className="text-lg font-medium text-white"
                      data-oid={`artintel-step-number-${index}`}
                    >
                      {index + 1}
                    </span>
                  </div>
                </AnimationContainer>
                <h3 className="text-lg font-medium" data-oid={`artintel-step-title-${index}`}>
                  {item.title}
                </h3>
              </div>
              <div className="space-y-4 w-full" data-oid={`artintel-step-content-${index}`}>
                <AnimationContainer
                  animation="fadeUp"
                  delay={0.9 + index * 0.2}
                  data-oid={`artintel-step-img-anim-${index}`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={1024}
                    height={1024}
                    className="w-full h-52 object-contain"
                    data-oid={`artintel-step-img-${index}`}
                  />
                </AnimationContainer>
                <AnimationContainer
                  animation="fadeUp"
                  delay={1.1 + index * 0.2}
                  data-oid={`artintel-step-desc-anim-${index}`}
                >
                  <p
                    className="text-sm md:text-base text-muted-foreground"
                    data-oid={`artintel-step-desc-${index}`}
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

export default ArtintelHowItWorks; 