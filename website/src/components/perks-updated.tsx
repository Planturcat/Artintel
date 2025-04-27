"use client";

import { PERKS } from "@/constants";
import { cn } from "@/lib";
import AnimationContainer from "./global/animation-container";
import Wrapper from "./global/wrapper";
import SectionBadge from "./ui/section-badge";
import dynamic from "next/dynamic";

// Dynamically import the dashboard components to avoid SSR issues with animations
const FineTuningDashboard = dynamic(() => import("./perk-dashboards/FineTuningDashboard"), { ssr: false });
const SmartAnalyticsDashboard = dynamic(() => import("./perk-dashboards/SmartAnalyticsDashboard"), { ssr: false });
const APIGatewayDashboard = dynamic(() => import("./perk-dashboards/APIGatewayDashboard"), { ssr: false });
const DeploymentToolsDashboard = dynamic(() => import("./perk-dashboards/DeploymentToolsDashboard"), { ssr: false });

// Import the animations CSS
import "./perk-dashboards/animations.css";

const Perks = () => {
  // Map perk index to dashboard component
  const getDashboardComponent = (index: number) => {
    switch (index) {
      case 0:
        return <FineTuningDashboard />;
      case 1:
        return <SmartAnalyticsDashboard />;
      case 2:
        return <APIGatewayDashboard />;
      case 3:
        return <DeploymentToolsDashboard />;
      default:
        return null;
    }
  };

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
            <div className="size-full opacity-50 grid grid-cols-4 grid-rows-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={`h-${i}`} className="absolute w-full h-px bg-[#00CBDD]/10" style={{ top: `${25 * (i + 1)}%` }}></div>
              ))}
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={`v-${i}`} className="absolute h-full w-px bg-[#00CBDD]/10" style={{ left: `${25 * (i + 1)}%` }}></div>
              ))}
            </div>
          </AnimationContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-20 px-4 md:px-8" data-oid="uodjm98">
          {PERKS.map((perk, index) => (
            <div
              key={index}
              className="flex items-center justify-center"
              data-oid="gqw_gxh"
            >
              <AnimationContainer
                animation={index % 2 === 0 ? "fadeRight" : "fadeLeft"}
                delay={0.2 * (index + 1)}
                data-oid=".kd6y4w"
              >
                <div
                  className="flex flex-col items-center text-center gap-4 w-full"
                  data-oid="eiu34mf"
                >
                  <div
                    className="relative w-full h-[180px] lg:h-[220px] rounded-xl bg-gradient-to-b from-[#00CBDD]/10 to-transparent border border-[#00CBDD]/20 shadow-xl shadow-black/10 backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:border-[#00CBDD]/40 hover:shadow-[#00CBDD]/20 overflow-hidden"
                    data-oid="-bgh7l8"
                  >
                    <div className="absolute inset-0 w-full h-full">
                      {getDashboardComponent(index)}
                    </div>
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
