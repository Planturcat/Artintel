"use client";

import { PRICING_PLANS } from "@/constants";
import { cn } from "@/lib";
import NumberFlow from "@number-flow/react";
import { Check, X } from "lucide-react";
import { useState } from "react";
import AnimationContainer from "./global/animation-container";
import Wrapper from "./global/wrapper";
import { Button } from "./ui/button";
import SectionBadge from "./ui/section-badge";

const Pricing = () => {
  const [isYearly, setIsYearly] = useState<boolean>(false);

  return (
    <Wrapper className="py-20 lg:py-32" data-oid="whl2lty">
      <div
        className="flex flex-col items-center text-center gap-4"
        data-oid="ki4jsg:"
      >
        <AnimationContainer animation="fadeUp" delay={0.2} data-oid="35lo6dv">
          <SectionBadge title="Pricing" data-oid="uuwpqp0" />
        </AnimationContainer>

        <AnimationContainer animation="fadeUp" delay={0.3} data-oid="-l4z-7z">
          <h2
            className="text-2xl md:text-4xl lg:text-5xl font-medium !leading-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-neutral-400"
            data-oid="oq6kpz0"
          >
            Choose your perfect plan
          </h2>
        </AnimationContainer>

        <AnimationContainer animation="fadeUp" delay={0.4} data-oid="wves0tw">
          <p
            className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto"
            data-oid="o6lx--r"
          >
            Select a plan that best suits your AI implementation needs
          </p>
        </AnimationContainer>
      </div>

      <AnimationContainer animation="fadeUp" delay={0.5} data-oid="gbu26yw">
        <div
          className="flex items-center justify-center gap-4 pt-10"
          data-oid="q9atz6o"
        >
          <button
            onClick={() => setIsYearly(false)}
            className={cn(
              "text-sm font-medium transition-colors",
              !isYearly ? "text-foreground" : "text-muted-foreground",
            )}
            data-oid="2htyl66"
          >
            Monthly
          </button>
          <div
            onClick={() => setIsYearly(!isYearly)}
            className="h-6 w-11 rounded-full bg-neutral-800 p-1 cursor-pointer transition-colors duration-300"
            data-oid="c.6rpv_"
          >
            <div
              className={cn(
                "h-4 w-4 rounded-full bg-gradient-to-b from-primary to-cyan-700 transition-transform duration-300",
                isYearly && "translate-x-5",
              )}
              data-oid="-p-20:s"
            />
          </div>
          <button
            onClick={() => setIsYearly(true)}
            className={cn(
              "text-sm font-medium transition-colors",
              isYearly ? "text-foreground" : "text-muted-foreground",
            )}
            data-oid="ufg5gn5"
          >
            Yearly
          </button>
        </div>
      </AnimationContainer>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-10"
        data-oid="v-44naw"
      >
        {PRICING_PLANS.map((plan, index) => (
          <AnimationContainer
            key={index}
            animation="fadeUp"
            delay={0.6 + index * 0.2}
            data-oid="tuxz.h0"
          >
            <div
              className={cn(
                "relative rounded-3xl backdrop-blur-3xl p-8 flex flex-col overflow-hidden",
                plan.popular && "bg-[#181818]",
                !plan.popular &&
                  "bg-gradient-to-b from-[#181818] to-[#101010]/0",
              )}
              data-oid="lyr:exl"
            >
              {plan.popular && (
                <>
                  <div
                    className="absolute inset-x-0 mx-auto -top-1/8 size-40 rounded-full bg-primary -z-10 blur-[5rem]"
                    data-oid="exma3ty"
                  />

                  <div
                    className="absolute top-0 w-4/5 mx-auto inset-x-0 h-px bg-gradient-to-r from-primary/0 via-primary to-primary/0"
                    data-oid=".hc7i.a"
                  ></div>
                </>
              )}

              <AnimationContainer
                animation="fadeUp"
                delay={0.7 + index * 0.2}
                data-oid="2i2mlm0"
              >
                <div className="mb-8" data-oid="ijvdhxr">
                  <h3 className="text-xl font-medium mb-2" data-oid="i41n5e0">
                    {plan.name}
                  </h3>
                  <p
                    className="text-sm text-muted-foreground"
                    data-oid="9gptwb1"
                  >
                    {plan.description}
                  </p>
                </div>
              </AnimationContainer>

              <AnimationContainer
                animation="fadeUp"
                delay={0.8 + index * 0.2}
                data-oid="rmuri5."
              >
                <div
                  className="flex items-baseline gap-2 mb-8"
                  data-oid="09-k2.o"
                >
                  <span className="text-4xl font-medium" data-oid="3n.ycsd">
                    $
                  </span>
                  <span className="text-5xl font-medium" data-oid="9245z-t">
                    <NumberFlow
                      value={isYearly ? plan.price.yearly : plan.price.monthly}
                      data-oid="jonfz._"
                    />
                  </span>
                  <span className="text-muted-foreground" data-oid="u2oarkv">
                    /{isYearly ? "year" : "month"}
                  </span>
                </div>
              </AnimationContainer>

              <div className="flex-1" data-oid="_0ktt92">
                <AnimationContainer
                  animation="fadeUp"
                  delay={0.9 + index * 0.2}
                  data-oid="04yz05v"
                >
                  <ul className="space-y-4 mb-8" data-oid="s8k2:m5">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-3"
                        data-oid="y2evom_"
                      >
                        {feature.included ? (
                          <Check
                            className="w-5 h-5 text-primary"
                            data-oid="e7nyk.h"
                          />
                        ) : (
                          <X
                            className="w-5 h-5 text-muted-foreground"
                            data-oid="-txmccs"
                          />
                        )}
                        <span
                          className={cn(
                            "text-sm",
                            feature.included
                              ? "text-foreground"
                              : "text-muted-foreground",
                          )}
                          data-oid="byn7s35"
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </AnimationContainer>
              </div>

              <AnimationContainer
                animation="fadeUp"
                delay={1 + index * 0.2}
                data-oid="h.wv7o9"
              >
                <Button
                  variant={plan.popular ? "default" : "secondary"}
                  className="w-full"
                  data-oid="kvev:ih"
                >
                  Get Started
                </Button>
              </AnimationContainer>
            </div>
          </AnimationContainer>
        ))}
      </div>
    </Wrapper>
  );
};

export default Pricing;
