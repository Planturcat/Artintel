"use client";

import { useState, useEffect, useRef } from "react";
import {
  Check,
  CheckCircle2,
  Info,
  ArrowLeft,
  Terminal,
  Code,
  Cpu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type PricingTier = "free" | "advanced" | "enterprise";
type DisplayMode = "normal" | "info";

interface TierData {
  name: string;
  price: string;
  period: string;
  buttonText: string;
  features: {
    models: string;
    deployments: string;
    monitoring: string;
  };
  usage: {
    amount: string;
    status: string;
  };
  color: string;
  darkColor: string;
  description: string;
  keyFeatures: string[];
  bestFor: string;
}

export default function PricingSection() {
  const [selectedTier, setSelectedTier] = useState<PricingTier>("free");
  const [displayMode, setDisplayMode] = useState<DisplayMode>("normal");
  const [isPhoneVisible, setIsPhoneVisible] = useState(false);
  const [areSidesVisible, setAreSidesVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const tierData: Record<PricingTier, TierData> = {
    free: {
      name: "Artintel Basic",
      price: "$0",
      period: "Free",
      buttonText: "Jack In",
      features: {
        models: "Limited Models",
        deployments: "Limited Deployments",
        monitoring: "No Monitoring",
      },
      usage: {
        amount: "Limited",
        status: "requests per month",
      },
      color: "from-[#00cbdd]/30 to-[#00cbdd]/50",
      darkColor: "from-[#00cbdd]/40 to-[#00cbdd]/60",
      description:
        "Basic ArtIntel interface with access to essential AI model management features. Suitable for individuals and small teams.",
      keyFeatures: [
        "Limited AI Models & Features",
        "No Model Augmentation",
        "No Data Mesh Access",
        "Basic System Monitoring",
        "No ArtIntel-Augmented Generation (AAG)",
        "Basic Security Protocols",
        "Basic API Integrations",
        "Community Support Network",
      ],

      bestFor: "Individuals & Small Teams",
    },
    advanced: {
      name: "Cyber Enhanced",
      price: "Usage-Based",
      period: "Pricing",
      buttonText: "Establish Uplink",
      features: {
        models: "More Models",
        deployments: "Flexible Deployments",
        monitoring: "Standard Monitoring",
      },
      usage: {
        amount: "Custom",
        status: "based on usage",
      },
      color: "from-[#00cbdd]/30 to-[#00cbdd]/50",
      darkColor: "from-[#00cbdd]/40 to-[#00cbdd]/60",
      description:
        "Enhanced ArtIntel platform with specialized features for growing businesses and AI teams.",
      keyFeatures: [
        "Advanced AI Models & Specialized Interfaces",
        "Model Augmentation Available (X TB Storage)",
        "Limited Data Mesh Access & Experimentation",
        "Standard Model Monitoring",
        "Basic ArtIntel-Augmented Generation (AAG)",
        "Enhanced Security Protocols",
        "Flexible Model Deployments",
        "Priority Support",
      ],

      bestFor: "Growing Businesses & AI Teams",
    },
    enterprise: {
      name: "Quantum Override",
      price: "Custom",
      period: "Pricing",
      buttonText: "Full Neural Merge",
      features: {
        models: "All Models",
        deployments: "Unlimited Deployments",
        monitoring: "Enterprise Monitoring",
      },
      usage: {
        amount: "∞",
        status: "unlimited requests",
      },
      color: "from-[#00cbdd]/30 to-[#00cbdd]/50",
      darkColor: "from-[#00cbdd]/40 to-[#00cbdd]/60",
      description:
        "Full ArtIntel enterprise solution with unlimited access and complete customization for large organizations.",
      keyFeatures: [
        "Unlimited AI Models (Enterprise-Grade)",
        "Full Model Augmentation & Customization",
        "Unlimited Data Mesh Access",
        "Enterprise-Grade Model Monitoring",
        "Advanced ArtIntel-Augmented Generation (AAG)",
        "Enterprise-Grade Security Protocols",
        "Any Infrastructure Support",
        "24/7 Dedicated Support Team",
      ],

      bestFor: "Large Enterprises & Organizations",
    },
  };

  const currentTier = tierData[selectedTier];

  const toggleDisplayMode = () => {
    setDisplayMode(displayMode === "normal" ? "info" : "normal");
  };

  useEffect(() => {
    // Trigger animations immediately on mount for better demo
    setTimeout(() => {
      setIsPhoneVisible(true);
      setTimeout(() => {
        setAreSidesVisible(true);
      }, 600);
    }, 300);

    // Also set up intersection observer for scroll-based animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsPhoneVisible(true);
            setTimeout(() => {
              setAreSidesVisible(true);
            }, 600);
          }, 300);
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Shared phone content component
  const PhoneContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      {/* Status Bar */}
      <div
        className="bg-transparent h-6 w-full flex justify-between items-center px-5 pt-2 text-[#00cbdd]"
        data-oid="y615d0k"
      >
        <div className="text-xs font-mono" data-oid="nju932_">
          23:45
        </div>
        <div
          className={`${isMobile ? "w-24 h-5" : "w-32 h-6"} bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-0`}
          data-oid="fvcerfo"
        ></div>
        <div className="flex items-center gap-1" data-oid="uobv.lx">
          <div
            className={`${isMobile ? "w-0.5" : "w-1"} h-1 bg-[#00cbdd] rounded-full`}
            data-oid="qgnwhrj"
          ></div>
          <div
            className={`${isMobile ? "w-0.5" : "w-1"} h-2 bg-[#00cbdd] rounded-full ml-0.5`}
            data-oid="m3xijof"
          ></div>
          <div
            className={`${isMobile ? "w-0.5" : "w-1"} h-3 bg-[#00cbdd] rounded-full ml-0.5`}
            data-oid="afs.k.t"
          ></div>
          <div
            className={`${isMobile ? "w-0.5" : "w-1"} h-4 bg-[#00cbdd] rounded-full ml-0.5`}
            data-oid="l_z17v6"
          ></div>
          <div className="text-xs font-mono" data-oid="1u94hdp">
            UPLINK
          </div>
        </div>
      </div>

      {/* App Content */}
      <div
        className={`${isMobile ? "p-3" : "p-4"} text-[#00cbdd] font-mono`}
        data-oid="h1ym9hw"
      >
        {displayMode === "normal" ? (
          // Normal content
          <>
            <h3
              className={`${isMobile ? "text-sm" : "text-base"} font-bold mb-2 glitch-text`}
              data-oid="arezuro"
            >
              ArtIntel.OS v4.5.2
            </h3>

            {/* Card */}
            <div
              className={`bg-gradient-to-r ${
                selectedTier === "free"
                  ? "dark:from-[#00031b]/80 dark:to-[#00031b]/60 from-[#00031b]/80 to-[#00031b]/60"
                  : selectedTier === "advanced"
                    ? "dark:from-[#00031b]/80 dark:to-[#00031b]/60 from-[#00031b]/80 to-[#00031b]/60"
                    : "dark:from-[#00031b]/80 dark:to-[#00031b]/60 from-[#00031b]/80 to-[#00031b]/60"
              } rounded-xl ${
                isMobile ? "p-2 mb-3" : "p-3 mb-3"
              } border border-[#00cbdd]/50 backdrop-blur-sm`}
              data-oid="ysdk9sz"
            >
              <div className="flex justify-between" data-oid="-tqhmnz">
                <div data-oid="jnc-whn">
                  <h4
                    className={`font-medium ${isMobile ? "text-xs" : "text-sm"}`}
                    data-oid="ea7k3dh"
                  >
                    ARTINTEL INTERFACE
                  </h4>
                  <div
                    className={`${isMobile ? "text-[8px]" : "text-[10px]"} text-[#00cbdd]/70`}
                    data-oid="yc:oa7."
                  >
                    ID: NEO-7829
                  </div>
                </div>
                <div
                  className={`${isMobile ? "w-8 h-8" : "w-10 h-10"} bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center border border-[#00cbdd]/50`}
                  data-oid="ywi-zu8"
                >
                  <div
                    className={`${isMobile ? "text-[8px]" : "text-[10px]"} font-bold text-[#00cbdd]`}
                    data-oid="2ylc38s"
                  >
                    {currentTier.name}
                  </div>
                </div>
              </div>
              <div
                className={`${isMobile ? "mt-4" : "mt-5"} flex justify-between items-end`}
                data-oid="lh-hkr8"
              >
                <div
                  className={`${isMobile ? "text-[10px]" : "text-xs"} font-medium`}
                  data-oid="h03q95b"
                >
                  Artintel.OS
                </div>
                <div
                  className={`${isMobile ? "w-5 h-3" : "w-6 h-4"} bg-[#00031b]/80 backdrop-blur-sm rounded-md border border-[#00cbdd]/50 animate-pulse`}
                  data-oid="rw2fuj8"
                ></div>
              </div>
            </div>

            {/* Models Section */}
            <div className={`${isMobile ? "mb-3" : "mb-3"}`} data-oid="790li.6">
              <div
                className={`flex items-center gap-1 mb-1`}
                data-oid="k2zsaei"
              >
                <Cpu
                  className={`${isMobile ? "w-2.5 h-2.5" : "w-3 h-3"} text-[#00cbdd]`}
                  data-oid="c:h6uh:"
                />

                <span
                  className={`${isMobile ? "text-[10px]" : "text-xs"} font-medium`}
                  data-oid="qjytzt8"
                >
                  ARTINTEL MODELS
                </span>
              </div>

              <div
                className={`bg-[#00031b]/80 backdrop-blur-sm rounded-xl ${isMobile ? "p-2" : "p-3"} flex flex-col border border-[#00cbdd]/50`}
                data-oid="qw0:spm"
              >
                <div
                  className="flex items-center justify-between mb-2"
                  data-oid="7-aa5a3"
                >
                  <span
                    className={`${isMobile ? "text-[10px]" : "text-xs"} font-medium`}
                    data-oid="8wdtd0d"
                  >
                    ACTIVE MODELS
                  </span>
                  <Info
                    className={`${isMobile ? "w-2.5 h-2.5" : "w-3 h-3"} text-[#00cbdd]/70`}
                    data-oid="_rbs.ef"
                  />
                </div>

                <div
                  className={`flex ${isMobile ? "gap-2 mb-2" : "gap-3 mb-2"}`}
                  data-oid="voic0.l"
                >
                  <div
                    className={`relative ${isMobile ? "w-8 h-8" : "w-10 h-10"}`}
                    data-oid="hbb_026"
                  >
                    <div
                      className="absolute inset-0 bg-[#00cbdd]/20 rounded-full border border-[#00cbdd]/50"
                      data-oid="u6wa3l6"
                    ></div>
                    <div
                      className={`absolute left-1/2 top-1/2 ${isMobile ? "w-1 h-1" : "w-1.5 h-1.5"} bg-[#00cbdd] rounded-full -translate-x-1/2 -translate-y-1/2`}
                      data-oid="1t4wovw"
                    ></div>
                    <div
                      className="absolute inset-0 border-2 border-[#00cbdd]/30 rounded-full animate-ping opacity-75"
                      data-oid="_xsbrq8"
                    ></div>
                  </div>
                  <div
                    className={`${isMobile ? "text-[8px]" : "text-[10px]"} text-[#00cbdd]/70`}
                    data-oid="ijvr9rc"
                  >
                    <div data-oid="49zz0fm">Artintel visualization</div>
                    <div data-oid="p49qj6z">Real-time monitoring</div>
                    <div data-oid="r3h1z0s">Performance tracking</div>
                  </div>
                </div>

                <div
                  className={`${isMobile ? "space-y-1" : "space-y-1.5"}`}
                  data-oid="cw3okl5"
                >
                  <div
                    className="flex items-center justify-between"
                    data-oid="9wg-wj6"
                  >
                    <div
                      className={`flex items-center gap-1`}
                      data-oid="g0ol0zs"
                    >
                      <Terminal
                        className={`${isMobile ? "w-2 h-2" : "w-2.5 h-2.5"} text-[#00cbdd]`}
                        data-oid="uni31do"
                      />

                      <span
                        className={`${isMobile ? "text-[8px]" : "text-[10px]"}`}
                        data-oid="lz7q:im"
                      >
                        Models
                      </span>
                    </div>
                    <div
                      className={`flex items-center gap-1`}
                      data-oid="5wupehi"
                    >
                      {currentTier.features.models === "All Models" ? (
                        <Check
                          className={`${isMobile ? "w-2 h-2" : "w-2.5 h-2.5"} text-[#00cbdd]`}
                          data-oid="ft.k_3c"
                        />
                      ) : null}
                      <span
                        className={`${isMobile ? "text-[8px]" : "text-[10px]"} ${currentTier.features.models === "All Models" ? "text-[#00cbdd]" : ""}`}
                        data-oid="jvsh5sg"
                      >
                        {currentTier.features.models}
                      </span>
                    </div>
                  </div>

                  <div
                    className="flex items-center justify-between"
                    data-oid="iama07_"
                  >
                    <div
                      className={`flex items-center gap-1`}
                      data-oid="i5eslrf"
                    >
                      <Code
                        className={`${isMobile ? "w-2 h-2" : "w-2.5 h-2.5"} text-[#00cbdd]`}
                        data-oid="n-116qy"
                      />

                      <span
                        className={`${isMobile ? "text-[8px]" : "text-[10px]"}`}
                        data-oid="qj2ato8"
                      >
                        Deployments
                      </span>
                    </div>
                    <div
                      className={`flex items-center gap-1`}
                      data-oid="_ctb1gr"
                    >
                      {currentTier.features.deployments ===
                      "Unlimited Deployments" ? (
                        <Check
                          className={`${isMobile ? "w-2 h-2" : "w-2.5 h-2.5"} text-[#00cbdd]`}
                          data-oid="2c9h4yp"
                        />
                      ) : null}
                      <span
                        className={`${isMobile ? "text-[8px]" : "text-[10px]"} ${currentTier.features.deployments === "Unlimited Deployments" ? "text-[#00cbdd]" : ""}`}
                        data-oid="jayjs:i"
                      >
                        {currentTier.features.deployments}
                      </span>
                    </div>
                  </div>

                  <div
                    className="flex items-center justify-between"
                    data-oid=":tre183"
                  >
                    <div
                      className={`flex items-center gap-1`}
                      data-oid="mgsr2if"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className={`${isMobile ? "w-2 h-2" : "w-2.5 h-2.5"} text-[#00cbdd]`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        data-oid="-938ai5"
                      >
                        <path
                          d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                          data-oid="pc-fllo"
                        />

                        <path d="M22 6l-10 7L2 6" data-oid="dw0wcfg" />
                      </svg>
                      <span
                        className={`${isMobile ? "text-[8px]" : "text-[10px]"}`}
                        data-oid="oweka.d"
                      >
                        Monitoring
                      </span>
                    </div>
                    <div
                      className={`flex items-center gap-1`}
                      data-oid=".nbzwrm"
                    >
                      {currentTier.features.monitoring ===
                      "Enterprise Monitoring" ? (
                        <Check
                          className={`${isMobile ? "w-2 h-2" : "w-2.5 h-2.5"} text-[#00cbdd]`}
                          data-oid="r1m6n3c"
                        />
                      ) : null}
                      <span
                        className={`${isMobile ? "text-[8px]" : "text-[10px]"} ${currentTier.features.monitoring === "Enterprise Monitoring" ? "text-[#00cbdd]" : ""}`}
                        data-oid="98xhloo"
                      >
                        {currentTier.features.monitoring}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Usage Data */}
            <div data-oid=".penuff">
              <div className="flex items-center gap-1 mb-1" data-oid="aydaqdz">
                <svg
                  viewBox="0 0 24 24"
                  className={`${isMobile ? "w-2.5 h-2.5" : "w-3 h-3"} text-[#00cbdd]`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  data-oid="ai.vpfd"
                >
                  <path
                    d="M2 20h.01M7 20v-4M12 20v-8M17 20V8"
                    data-oid="n5i0ddl"
                  />
                </svg>
                <span
                  className={`${isMobile ? "text-[10px]" : "text-xs"} font-medium`}
                  data-oid="j0t4u6."
                >
                  ARTINTEL USAGE
                </span>
              </div>

              <div
                className="bg-[#00031b]/80 backdrop-blur-sm rounded-xl p-2 border border-[#00cbdd]/50"
                data-oid="wmsbba3"
              >
                <div className="flex items-center mb-1" data-oid="u7v.j:4">
                  <div
                    className={`${isMobile ? "text-lg" : "text-xl"} font-medium`}
                    data-oid="x-6w1qk"
                  >
                    {currentTier.usage.amount}
                  </div>
                  <div
                    className="ml-1 text-[10px] text-[#00cbdd]/70"
                    data-oid="ze0bp00"
                  >
                    {currentTier.usage.status}
                  </div>
                </div>

                <div
                  className="mt-1 h-1.5 bg-[#00031b] rounded-full overflow-hidden"
                  data-oid="5mxyy5h"
                >
                  <div
                    className={`h-full rounded-full ${
                      selectedTier === "free"
                        ? "w-1/4 bg-[#00cbdd]"
                        : selectedTier === "advanced"
                          ? "w-1/2 bg-[#00cbdd]"
                          : "w-full bg-[#00cbdd]"
                    }`}
                    data-oid="1j5k6yc"
                  ></div>
                </div>
              </div>
            </div>

            {/* Matrix code rain effect */}
            <div
              className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20 z-0"
              data-oid="f:rk_le"
            >
              <div className="matrix-code-rain" data-oid="wqrm2rs"></div>
            </div>

            {/* Info prompt */}
            <div className="mt-6 text-center" data-oid="63ndsq9">
              <div
                className={`${isMobile ? "text-[10px]" : "text-xs"} text-[#00cbdd]/70`}
                data-oid="6s9fb15"
              >
                PRESS INFO FOR ARTINTEL INTERFACE DETAILS
              </div>
              <div
                className={`${isMobile ? "text-[10px]" : "text-xs"} text-[#00cbdd] animate-pulse mt-1`}
                data-oid="zy4uune"
              >
                ↓
              </div>
            </div>
          </>
        ) : (
          // Info content
          <div className="h-full" data-oid="8naa1hf">
            <div
              className="flex items-center justify-between mb-4"
              data-oid="ejm9f3o"
            >
              <button
                onClick={toggleDisplayMode}
                className="flex items-center text-[#00cbdd]"
                data-oid="-lmc02t"
              >
                <ArrowLeft
                  className={`${isMobile ? "h-3 w-3" : "h-4 w-4"} mr-1`}
                  data-oid="0noqbth"
                />

                <span
                  className={`${isMobile ? "text-[10px]" : "text-xs"}`}
                  data-oid="bhn3je2"
                >
                  BACK
                </span>
              </button>
              <h3
                className={`${isMobile ? "text-xs" : "text-sm"} font-bold text-center glitch-text`}
                data-oid="iqs5t40"
              >
                {currentTier.name}
              </h3>
              <div className="w-12" data-oid="xsgg2rs"></div>{" "}
              {/* Spacer for alignment */}
            </div>

            <div
              className={`bg-gradient-to-r rounded-xl mb-4 p-3 border border-[#00cbdd]/50 backdrop-blur-sm ${
                selectedTier === "free"
                  ? "dark:from-[#00031b]/80 dark:to-[#00031b]/60 from-[#00031b]/80 to-[#00031b]/60"
                  : selectedTier === "advanced"
                    ? "dark:from-[#00031b]/80 dark:to-[#00031b]/60 from-[#00031b]/80 to-[#00031b]/60"
                    : "dark:from-[#00031b]/80 dark:to-[#00031b]/60 from-[#00031b]/80 to-[#00031b]/60"
              }`}
              data-oid="42yp6-k"
            >
              <div
                className="flex justify-between items-center mb-2"
                data-oid="vrj-cfi"
              >
                <div data-oid="l:w97ue">
                  <div
                    className={`font-bold ${isMobile ? "text-lg" : "text-xl"} text-[#00cbdd]`}
                    data-oid="1zo:v6w"
                  >
                    {currentTier.price}
                  </div>
                  <div
                    className={`${isMobile ? "text-[10px]" : "text-xs"} text-[#00cbdd]/70`}
                    data-oid="9xcnvgy"
                  >
                    {currentTier.period}
                  </div>
                </div>
                <div
                  className={`${isMobile ? "text-xs" : "text-sm"} px-2 py-1 rounded-full bg-black/50 border border-[#00cbdd]/50 text-[#00cbdd]`}
                  data-oid="33grdl0"
                >
                  {currentTier.name}
                </div>
              </div>

              <div
                className={`${isMobile ? "text-[10px]" : "text-xs"} text-[#00cbdd]/70 mb-3`}
                data-oid="r8gj9ob"
              >
                {currentTier.description}
              </div>

              <div
                className={`${isMobile ? "text-[10px]" : "text-xs"} font-medium mb-1`}
                data-oid="ihu3rz-"
              >
                OPTIMAL FOR:
              </div>
              <div
                className={`${isMobile ? "text-[10px]" : "text-xs"} mb-2 text-[#00cbdd]`}
                data-oid="pholq58"
              >
                {currentTier.bestFor}
              </div>
            </div>

            <div
              className="bg-[#00031b]/80 backdrop-blur-sm rounded-xl p-3 border border-[#00cbdd]/50"
              data-oid="k461s69"
            >
              <div
                className={`${isMobile ? "text-xs" : "text-sm"} font-bold mb-2`}
                data-oid="e8chaoc"
              >
                ARTINTEL CAPABILITIES
              </div>

              <div
                className={`space-y-${isMobile ? "1.5" : "2"}`}
                data-oid="4eqi8_r"
              >
                {currentTier.keyFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2"
                    data-oid="k2suh-b"
                  >
                    <div className="mt-0.5" data-oid="ec_9xad">
                      <CheckCircle2
                        className={`${isMobile ? "h-3 w-3" : "h-3.5 w-3.5"} text-[#00cbdd]`}
                        data-oid="pzso8z2"
                      />
                    </div>
                    <div
                      className={`${isMobile ? "text-[10px]" : "text-xs"}`}
                      data-oid="mk7-0ms"
                    >
                      {feature}
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="mt-4 pt-3 border-t border-[#00cbdd]/50"
                data-oid="jjqmpb1"
              >
                <button
                  className={`w-full py-1.5 rounded-lg ${isMobile ? "text-[10px]" : "text-xs"} font-medium bg-[#00cbdd] text-[#00031b] hover:bg-[#00b0c0] transition-colors`}
                  data-oid="_r:hmoy"
                >
                  {currentTier.buttonText}
                </button>
              </div>
            </div>

            {/* Matrix code rain effect */}
            <div
              className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20 z-0"
              data-oid="h-7ceb6"
            >
              <div className="matrix-code-rain" data-oid="zefgh20"></div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div
        className={`absolute bottom-0 left-0 right-0 ${isMobile ? "h-10" : "h-14"} bg-[#00031b]/80 backdrop-blur-sm border-t border-[#00cbdd]/50 flex justify-around items-center`}
        data-oid="0tld01f"
      >
        <button
          className={`${isMobile ? "w-5 h-5" : "w-7 h-7"} flex items-center justify-center bg-[#00031b] hover:bg-[#00031b]/80 transition-colors rounded-lg border border-[#00cbdd]/50`}
          onClick={toggleDisplayMode}
          data-oid="fe_ef-9"
        >
          <Info
            className={`${isMobile ? "h-3 w-3" : "h-4 w-4"} text-[#00cbdd]`}
            data-oid="3uc8i6-"
          />
        </button>
        <div
          className={`${isMobile ? "w-5 h-5" : "w-7 h-7"} flex items-center justify-center`}
          data-oid="k:l.l2b"
        >
          <div
            className={`${isMobile ? "w-3.5 h-3.5" : "w-5 h-5"} border-2 border-[#00cbdd]/70 rounded-md`}
            data-oid="pqtyi3r"
          ></div>
        </div>
        <div
          className={`${isMobile ? "w-5 h-5" : "w-7 h-7"} flex items-center justify-center`}
          data-oid="q76o04w"
        >
          <div
            className={`${isMobile ? "w-3.5 h-3.5" : "w-5 h-5"} border-2 border-[#00cbdd]/70 rounded-full`}
            data-oid="ldof2v_"
          ></div>
        </div>
      </div>
    </>
  );

  return (
    <div
      ref={sectionRef}
      className="flex flex-col lg:flex-row min-h-screen relative overflow-hidden bg-[#00031b] dark:bg-[#00031b]"
      data-oid="n-mscr_"
    >
      {/* Matrix code rain background */}
      <div className="absolute inset-0 z-0 opacity-30" data-oid="aljgyfb">
        <div className="matrix-code-rain" data-oid="il.tkm3"></div>
      </div>

      {/* Cyberpunk landscape */}
      <div className="absolute inset-0 z-0 opacity-20" data-oid="g_1:x:p">
        <div
          className="absolute bottom-0 w-full h-[30vh] bg-gradient-to-t from-[#00cbdd]/20 to-transparent"
          data-oid="g64gsk7"
        ></div>
        <div className="absolute bottom-0 w-full h-[20vh]" data-oid="uz_rvc0">
          <div className="grid-landscape" data-oid="az-oh.c"></div>
        </div>
      </div>

      {/* Left Section */}
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={
          areSidesVisible ? { x: 0, opacity: 1 } : { x: "-100%", opacity: 0 }
        }
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full lg:w-1/2 bg-[#00031b]/80 dark:bg-[#00031b]/80 p-8 lg:p-16 flex items-center justify-center relative z-10 backdrop-blur-sm border-r border-[#00cbdd]/30"
        data-oid="3.j0nu3"
      >
        <div className="max-w-md relative z-10" data-oid="06wa:i_">
          <h2
            className="text-4xl lg:text-5xl font-bold text-[#00cbdd] mb-8 font-mono glitch-text"
            data-oid="d_skp8u"
          >
            ARTINTEL
            <br data-oid="puo5klk" />
            INTERFACE
          </h2>

          <div className="space-y-4" data-oid=".pjvlq_">
            <div
              className="bg-[#00031b]/50 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4 text-[#00cbdd] border border-[#00cbdd]/50 font-mono"
              data-oid="c4xbjcz"
            >
              <div
                className="bg-[#00cbdd] w-8 h-8 rounded-full flex items-center justify-center text-lg font-medium text-[#00031b]"
                data-oid="k4nfn28"
              >
                1
              </div>
              <span className="text-lg" data-oid="2s20b7v">
                SELECT ARTINTEL MODEL
              </span>
            </div>

            <div
              className="bg-[#00031b]/50 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4 text-[#00cbdd] border border-[#00cbdd]/50 font-mono"
              data-oid="y.btt7_"
            >
              <div
                className="bg-[#00cbdd] w-8 h-8 rounded-full flex items-center justify-center text-lg font-medium text-[#00031b]"
                data-oid="gxi8je0"
              >
                2
              </div>
              <span className="text-lg" data-oid="mbhlt5e">
                CONFIGURE UPLINK
              </span>
            </div>

            <div
              className="bg-[#00031b]/50 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4 text-[#00cbdd] border border-[#00cbdd]/50 font-mono"
              data-oid="1.6:ft2"
            >
              <div
                className="bg-[#00cbdd] w-8 h-8 rounded-full flex items-center justify-center text-lg font-medium text-[#00031b]"
                data-oid="st61wja"
              >
                3
              </div>
              <span className="text-lg" data-oid="wkkc8iv">
                MONITOR ARTINTEL FEED
              </span>
            </div>
          </div>

          <div className="mt-6 ml-auto w-fit" data-oid="oewkq-0">
            <div
              className="bg-[#00031b]/50 backdrop-blur-sm rounded-full py-2 px-4 flex items-center gap-2 text-[#00cbdd] border border-[#00cbdd]/50 font-mono"
              data-oid="jyak:e6"
            >
              <span className="text-sm" data-oid="5gt1mex">
                MILITARY-GRADE ENCRYPTION
              </span>
              <div
                className="bg-[#00cbdd] text-[#00031b] rounded-full p-1"
                data-oid="u1url2l"
              >
                <Check className="w-3 h-3" data-oid="dmhy-rv" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Phone Mockup (Center Overlay) */}
      <motion.div
        initial={{ y: "100%" }}
        animate={
          isPhoneVisible ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }
        }
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:block"
        data-oid="ynvqxa."
      >
        {/* Tier Selection NavPill */}
        <div className="flex justify-center mb-6" data-oid="vxpqibz">
          <div
            className="flex space-x-1 p-1 bg-[#00031b]/80 rounded-full shadow-lg border border-[#00cbdd]/50 backdrop-blur-sm"
            data-oid="szx2y19"
          >
            {(Object.keys(tierData) as PricingTier[]).map((tier) => (
              <button
                key={tier}
                onClick={() => {
                  setSelectedTier(tier);
                  setDisplayMode("normal");
                }}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-colors font-mono",
                  selectedTier === tier
                    ? "bg-[#00cbdd] text-[#00031b] shadow-sm"
                    : "text-[#00cbdd]/70 hover:bg-[#00031b]",
                )}
                data-oid="sto2:7-"
              >
                {tierData[tier].name}
              </button>
            ))}
          </div>
        </div>

        <div className="relative" data-oid="dliyygm">
          <div
            className="w-[340px] h-[680px] bg-black rounded-[45px] p-3 border-4 border-[#00cbdd]/50 shadow-2xl relative overflow-hidden"
            data-oid="af3tv13"
          >
            {/* Circuit board pattern overlay */}
            <div
              className="absolute inset-0 z-0 opacity-10 circuit-pattern"
              data-oid="1duur_3"
            ></div>

            <div
              className="w-full h-full bg-[#00031b] rounded-[38px] overflow-hidden relative border border-[#00cbdd]/30"
              data-oid="7keq_x_"
            >
              <PhoneContent data-oid="79kx2.x" />
            </div>

            {/* Glowing edges */}
            <div
              className="absolute inset-0 rounded-[45px] shadow-[0_0_15px_rgba(0,203,221,0.5)] pointer-events-none"
              data-oid="o3gsldl"
            ></div>
          </div>
        </div>
      </motion.div>

      {/* Right Section */}
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={
          areSidesVisible ? { x: 0, opacity: 1 } : { x: "100%", opacity: 0 }
        }
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        className="w-full lg:w-1/2 bg-[#00031b]/80 dark:bg-[#00031b]/80 text-[#00cbdd] p-8 lg:p-16 flex items-center justify-center relative z-10 backdrop-blur-sm border-l border-[#00cbdd]/30"
        data-oid=".zogf8d"
      >
        <div className="max-w-md relative z-10" data-oid="-vcwhye">
          <h2
            className="text-4xl lg:text-5xl font-bold mb-8 font-mono glitch-text"
            data-oid="g9zgl77"
          >
            ONE SYSTEM,
            <br data-oid="zl0eik8" />
            UNLIMITED ACCESS.
          </h2>

          <div className="mb-8" data-oid="bsh-cko">
            <div
              className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00cbdd] to-[#00cbdd]/70 font-mono"
              data-oid="qu5z-ik"
            >
              {currentTier.price}
            </div>
            <div
              className="text-lg mt-2 text-[#00cbdd]/70 font-mono"
              data-oid="2q80:i9"
            >
              {currentTier.period}
            </div>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-2 items-center"
            data-oid="c8sl4s_"
          >
            {selectedTier === "free" ? (
              <Button
                size="lg"
                className="w-full rounded-full bg-[#00cbdd] text-[#00031b] hover:bg-[#00b0c0] font-mono"
                data-oid="r6fp7l:"
              >
                {currentTier.buttonText}
              </Button>
            ) : (
              <div className="w-full" data-oid="z7.x-ph">
                <div
                  className="flex flex-col sm:flex-row gap-2 items-center bg-[#00031b]/50 rounded-full p-1 overflow-hidden border border-[#00cbdd]/50"
                  data-oid="ylxh8m2"
                >
                  <Input
                    type="email"
                    placeholder="ENTER ACCESS CODE"
                    className="flex-1 border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-[#00cbdd] placeholder:text-[#00cbdd]/70 font-mono"
                    data-oid="2c3zl.6"
                  />

                  <Button
                    className="w-full sm:w-auto rounded-full bg-[#00cbdd] text-[#00031b] hover:bg-[#00b0c0] font-mono"
                    data-oid="lmu::3t"
                  >
                    {currentTier.buttonText}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Feature list */}
          <div className="mt-8 space-y-3 font-mono" data-oid="vky8b16">
            <div className="flex items-start gap-2" data-oid="gopcm5e">
              <CheckCircle2
                className="w-5 h-5 text-[#00cbdd] mt-0.5"
                data-oid="wgrd.ad"
              />

              <span data-oid="d72-jce">
                {selectedTier === "free"
                  ? "Basic artintel interface capabilities"
                  : selectedTier === "advanced"
                    ? "Advanced artintel augmentation & customization"
                    : "Military-grade artintel integration & training"}
              </span>
            </div>
            <div className="flex items-start gap-2" data-oid="czde84i">
              <CheckCircle2
                className="w-5 h-5 text-[#00cbdd] mt-0.5"
                data-oid="6lb.oza"
              />

              <span data-oid="..g0yx0">
                {selectedTier === "free"
                  ? "Standard uplink access"
                  : selectedTier === "advanced"
                    ? "Priority uplink with higher bandwidth"
                    : "Dedicated artintel infrastructure with SLA guarantees"}
              </span>
            </div>
            <div className="flex items-start gap-2" data-oid="3bfajk8">
              <CheckCircle2
                className="w-5 h-5 text-[#00cbdd] mt-0.5"
                data-oid="flpxbil"
              />

              <span data-oid="nvjityh">
                {selectedTier === "free"
                  ? "Community support network"
                  : selectedTier === "advanced"
                    ? "24/7 technical support uplink"
                    : "Dedicated support team & artintel architect"}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Phone Display (for small screens) */}
      <div className="lg:hidden py-12 px-4 bg-[#00031b]" data-oid="8v.immn">
        {/* Tier Selection NavPill for Mobile */}
        <div className="flex justify-center mb-6" data-oid="tuvm.f8">
          <div
            className="flex space-x-1 p-1 bg-[#00031b]/80 rounded-full shadow-md border border-[#00cbdd]/50"
            data-oid=".vsce_3"
          >
            {(Object.keys(tierData) as PricingTier[]).map((tier) => (
              <button
                key={tier}
                onClick={() => {
                  setSelectedTier(tier);
                  setDisplayMode("normal");
                }}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-colors font-mono",
                  selectedTier === tier
                    ? "bg-[#00cbdd] text-[#00031b] shadow-sm"
                    : "text-[#00cbdd]/70 hover:bg-[#00031b]",
                )}
                data-oid="jnwmzvz"
              >
                {tierData[tier].name}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-xs mx-auto" data-oid="00._5fx">
          <div
            className="w-full aspect-[1/2.2] bg-black rounded-[40px] p-3 border-4 border-[#00cbdd]/50 shadow-xl relative"
            data-oid="9xhd6jx"
          >
            {/* Circuit board pattern overlay */}
            <div
              className="absolute inset-0 z-0 opacity-10 circuit-pattern"
              data-oid="s617jx3"
            ></div>

            <div
              className="w-full h-full bg-[#00031b] rounded-[32px] overflow-hidden relative border border-[#00cbdd]/30"
              data-oid="oc9fco2"
            >
              <PhoneContent isMobile={true} data-oid="6ew.4_9" />
            </div>

            {/* Glowing edges */}
            <div
              className="absolute inset-0 rounded-[40px] shadow-[0_0_10px_rgba(0,203,221,0.5)] pointer-events-none"
              data-oid="24:m8tq"
            ></div>
          </div>
        </div>
      </div>

      {/* Global styles */}
      <style jsx global data-oid="f3et765">{`
        .matrix-code-rain {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 203, 221, 0.05) 75%,
            rgba(0, 203, 221, 0.1) 100%
          );
          background-size: 100% 20px;
          animation: rain 2s linear infinite;
        }

        @keyframes rain {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 100%;
          }
        }

        .circuit-pattern {
          background-image:
            radial-gradient(
              circle,
              rgba(0, 203, 221, 0.1) 1px,
              transparent 1px
            ),
            linear-gradient(
              to right,
              rgba(0, 203, 221, 0.05) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(0, 203, 221, 0.05) 1px,
              transparent 1px
            );
          background-size:
            20px 20px,
            10px 10px,
            10px 10px;
        }

        .grid-landscape {
          width: 100%;
          height: 100%;
          background:
            linear-gradient(90deg, rgba(0, 203, 221, 0.3) 1px, transparent 1px),
            linear-gradient(rgba(0, 203, 221, 0.3) 1px, transparent 1px);
          background-size: 40px 40px;
          transform: perspective(500px) rotateX(60deg);
          transform-origin: bottom;
        }

        .glitch-text {
          position: relative;
          text-shadow:
            0 0 5px rgba(0, 203, 221, 0.7),
            0 0 10px rgba(0, 203, 221, 0.5);
          animation: glitch 3s infinite;
        }

        @keyframes glitch {
          0% {
            text-shadow:
              0 0 5px rgba(0, 203, 221, 0.7),
              0 0 10px rgba(0, 203, 221, 0.5);
          }
          2% {
            text-shadow:
              3px 0 5px rgba(255, 0, 140, 0.7),
              -3px 0 10px rgba(0, 255, 255, 0.5);
          }
          4% {
            text-shadow:
              0 0 5px rgba(0, 203, 221, 0.7),
              0 0 10px rgba(0, 203, 221, 0.5);
          }
          50% {
            text-shadow:
              0 0 5px rgba(0, 203, 221, 0.7),
              0 0 10px rgba(0, 203, 221, 0.5);
          }
          52% {
            text-shadow:
              -3px 0 5px rgba(255, 0, 140, 0.7),
              3px 0 10px rgba(0, 255, 255, 0.5);
          }
          54% {
            text-shadow:
              0 0 5px rgba(0, 203, 221, 0.7),
              0 0 10px rgba(0, 203, 221, 0.5);
          }
          100% {
            text-shadow:
              0 0 5px rgba(0, 203, 221, 0.7),
              0 0 10px rgba(0, 203, 221, 0.5);
          }
        }
      `}</style>
    </div>
  );
}
