import { METRICS } from "@/constants";
import { cn } from "@/lib";
import NumberFlow from "@number-flow/react";
import Image from "next/image";
import AnimationContainer from "./global/animation-container";
import Wrapper from "./global/wrapper";
import { Button } from "./ui/button";
import SectionBadge from "./ui/section-badge";

const PlatformMetrics = () => {
  return (
    <Wrapper className="py-20 lg:py-32" data-oid="bj3ej.s">
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        data-oid="niniydx"
      >
        <div
          className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4"
          data-oid="4ook_2d"
        >
          <AnimationContainer animation="fadeUp" delay={0.2} data-oid="0cpte-x">
            <SectionBadge title="Platform Impact" data-oid="j7.kqsx" />
          </AnimationContainer>

          <AnimationContainer animation="fadeUp" delay={0.3} data-oid="yb8hzu5">
            <h2
              className="text-2xl md:text-4xl lg:text-5xl font-medium !leading-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-neutral-400"
              data-oid="o9-yoxt"
            >
              Transforming AI development
              <br data-oid="__vyhaz" />
              at global scale
            </h2>
          </AnimationContainer>

          <AnimationContainer animation="fadeUp" delay={0.4} data-oid="4yk:rbz">
            <p
              className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto"
              data-oid="g745ig0"
            >
              Join thousands of developers who trust our platform to build, deploy, and scale language models.
            </p>
          </AnimationContainer>

          <AnimationContainer animation="fadeUp" delay={0.5} data-oid="9t1w96q">
            <Button className="mt-4" data-oid="0x2c-um">
              Start your free trial
            </Button>
          </AnimationContainer>
        </div>

        <div className="flex flex-col gap-6 px-1 md:px-0" data-oid="fvx31-b">
          {METRICS.map((metric, index) => (
            <AnimationContainer
              key={index}
              animation={metric.reverse ? "fadeLeft" : "fadeRight"}
              delay={0.6 + index * 0.2}
              data-oid="21wkhgk"
            >
              <div
                className="relative rounded-3xl bg-[#191919] p-4 lg:p-6 overflow-hidden z-0"
                data-oid="s4el7zh"
              >
                <AnimationContainer
                  animation="scaleUp"
                  delay={0.7 + index * 0.2}
                  data-oid="zwcvscw"
                >
                  <div
                    className={cn(
                      "absolute -bottom-1/2 right-0 bg-primary size-20 lg:size-32 blur-[3rem] lg:blur-[5rem] rounded-full -z-10",
                      metric.reverse && "left-0",
                    )}
                    data-oid="qalgh1q"
                  ></div>
                </AnimationContainer>

                <div
                  className={cn(
                    "flex items-center justify-between gap-6 z-30",
                    metric.reverse && "flex-row-reverse",
                  )}
                  data-oid="t-imhgi"
                >
                  <AnimationContainer
                    animation="fadeUp"
                    delay={0.8 + index * 0.2}
                    data-oid="n00j6ca"
                  >
                    <div className="flex flex-col" data-oid="e45e-ct">
                      <div
                        className="flex items-baseline gap-1"
                        data-oid="47ohy9h"
                      >
                        <span
                          className="text-4xl font-medium"
                          data-oid="4neg.b_"
                        >
                          <NumberFlow
                            value={metric.number}
                            data-oid="b5b33w9"
                          />
                        </span>
                        {metric.suffix && (
                          <span
                            className="text-4xl font-medium"
                            data-oid="xkwo1ee"
                          >
                            {metric.suffix}
                          </span>
                        )}
                      </div>
                      <p
                        className="text-sm text-muted-foreground"
                        data-oid="me_4znh"
                      >
                        {metric.label}
                      </p>
                    </div>
                  </AnimationContainer>

                  <AnimationContainer
                    animation={metric.reverse ? "fadeRight" : "fadeLeft"}
                    delay={0.9 + index * 0.2}
                    data-oid="iprlvk9"
                  >
                    <div
                      className={cn(
                        "h-32 absolute inset-y-0 my-auto right-0 rounded-2xl flex items-center justify-center",
                        metric.reverse && "left-0 right-auto",
                      )}
                      data-oid="lxwt6ci"
                    >
                      <Image
                        src={metric.image}
                        alt={metric.label}
                        width={1024}
                        height={1024}
                        className="size-full"
                        data-oid="jj1nf24"
                      />
                    </div>
                  </AnimationContainer>
                </div>
              </div>
            </AnimationContainer>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default PlatformMetrics;
