"use client";

import { useState, useEffect } from "react";
import { Brain, Database, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import styles from "./hero-animations.module.css";

export default function LlmCatalogHero() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Create the neural network nodes for the animation
  const renderNeuralNetwork = () => {
    const neurons = [];
    const synapses = [];

    // Create 15 neurons in a grid-like pattern
    for (let i = 0; i < 15; i++) {
      const row = Math.floor(i / 5);
      const col = i % 5;
      const top = 40 + row * 80;
      const left = 40 + col * 60;

      neurons.push(
        <div
          key={`neuron-${i}`}
          className={styles.neuron}
          style={{
            top: `${top}px`,
            left: `${left}px`,
            animationDelay: `${i * 0.1}s`,
            animation: `pulse 2s infinite ${i * 0.1}s`,
          }}
          data-oid="fkpkg1w"
        />,
      );

      // Create synapses (connections) between neurons
      if (row < 2) {
        for (let j = 0; j < 2; j++) {
          const targetIndex = (row + 1) * 5 + col - j;
          if (targetIndex >= 0 && targetIndex < 15) {
            const targetRow = Math.floor(targetIndex / 5);
            const targetCol = targetIndex % 5;
            const targetTop = 40 + targetRow * 80;
            const targetLeft = 40 + targetCol * 60;

            // Calculate the length and angle of the synapse
            const deltaX = targetLeft - left;
            const deltaY = targetTop - top;
            const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

            synapses.push(
              <div
                key={`synapse-${i}-${targetIndex}`}
                className={styles.synapse}
                style={{
                  top: `${top}px`,
                  left: `${left}px`,
                  width: `${length}px`,
                  transform: `rotate(${angle}deg)`,
                  animation: `synapseGlow 3s infinite ${(i + targetIndex) * 0.05}s`,
                }}
                data-oid="1r7eexx"
              />,
            );
          }
        }
      }
    }

    return (
      <div className={styles.neuralNetwork} data-oid="lcciqqi">
        {synapses}
        {neurons}
      </div>
    );
  };

  return (
    <section
      className="relative z-10 overflow-hidden px-4 py-20"
      suppressHydrationWarning
      data-oid="h.9tyn."
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0" data-oid="_hk5gp1">
        <div
          className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/10 blur-[100px]"
          data-oid="ljcckmv"
        ></div>
        <div
          className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-primary/10 blur-[100px]"
          data-oid="gotz2:x"
        ></div>
      </div>

      {/* Neural network background pattern */}
      <div className="absolute inset-0 z-0 opacity-10" data-oid="77w26wk">
        <svg
          className="h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          data-oid="ty5r5:b"
        >
          <defs data-oid="glld:5k">
            <pattern
              id="neural-pattern"
              patternUnits="userSpaceOnUse"
              width="100"
              height="100"
              data-oid="xcdajn-"
            >
              <circle
                cx="10"
                cy="10"
                r="2"
                fill="currentColor"
                className="text-primary"
                data-oid="l.:w7hi"
              />

              <circle
                cx="30"
                cy="10"
                r="2"
                fill="currentColor"
                className="text-primary"
                data-oid="uj7adq5"
              />

              <circle
                cx="50"
                cy="10"
                r="2"
                fill="currentColor"
                className="text-primary"
                data-oid="h-g4xj1"
              />

              <circle
                cx="70"
                cy="10"
                r="2"
                fill="currentColor"
                className="text-primary"
                data-oid="qunqatt"
              />

              <circle
                cx="90"
                cy="10"
                r="2"
                fill="currentColor"
                className="text-primary"
                data-oid="oowd6o6"
              />

              <circle
                cx="10"
                cy="30"
                r="2"
                fill="currentColor"
                className="text-primary"
                data-oid="ljr7hpo"
              />

              <circle
                cx="30"
                cy="30"
                r="2"
                fill="currentColor"
                className="text-primary"
                data-oid="rfore:g"
              />

              <circle
                cx="50"
                cy="30"
                r="2"
                fill="currentColor"
                className="text-primary"
                data-oid="2::9xiv"
              />

              <circle
                cx="70"
                cy="30"
                r="2"
                fill="currentColor"
                className="text-primary"
                data-oid="bvk-h71"
              />

              <circle
                cx="90"
                cy="30"
                r="2"
                fill="currentColor"
                className="text-primary"
                data-oid="7-sgyu0"
              />

              <circle
                cx="10"
                cy="50"
                r="2"
                fill="currentColor"
                className="text-primary"
                data-oid="br-nq70"
              />

              <circle
                cx="30"
                cy="50"
                r="2"
                fill="currentColor"
                className="text-primary"
                data-oid="h37mm26"
              />

              <circle
                cx="50"
                cy="50"
                r="2"
                fill="currentColor"
                className="text-primary"
                data-oid="x5r5nyx"
              />

              <circle
                cx="70"
                cy="50"
                r="2"
                fill="currentColor"
                className="text-primary"
                data-oid="bsdr1m."
              />

              <circle
                cx="90"
                cy="50"
                r="2"
                fill="currentColor"
                className="text-primary"
                data-oid="dfeg16j"
              />

              <circle
                cx="10"
                cy="70"
                r="2"
                fill="currentColor"
                className="text-primary"
                data-oid="cv-h0tb"
              />

              <circle
                cx="30"
                cy="70"
                r="2"
                fill="currentColor"
                className="text-primary"
                data-oid="hb1_.:0"
              />

              <circle
                cx="50"
                cy="70"
                r="2"
                fill="currentColor"
                className="text-primary"
                data-oid="zsc2:rj"
              />

              <circle
                cx="70"
                cy="70"
                r="2"
                fill="currentColor"
                className="text-primary"
                data-oid="7duksni"
              />

              <circle
                cx="90"
                cy="70"
                r="2"
                fill="currentColor"
                className="text-primary"
                data-oid="fr5d:u5"
              />

              <circle
                cx="10"
                cy="90"
                r="2"
                fill="currentColor"
                className="text-primary"
                data-oid="5w:dt-d"
              />

              <circle
                cx="30"
                cy="90"
                r="2"
                fill="currentColor"
                className="text-primary"
                data-oid="stjkogk"
              />

              <circle
                cx="50"
                cy="90"
                r="2"
                fill="currentColor"
                className="text-primary"
                data-oid="vwv6md-"
              />

              <circle
                cx="70"
                cy="90"
                r="2"
                fill="currentColor"
                className="text-primary"
                data-oid="nv93hgu"
              />

              <circle
                cx="90"
                cy="90"
                r="2"
                fill="currentColor"
                className="text-primary"
                data-oid="ru-lem4"
              />

              <path
                d="M10 10L30 30M30 10L50 30M50 10L70 30M70 10L90 30M10 30L30 50M30 30L50 50M50 30L70 50M70 30L90 50M10 50L30 70M30 50L50 70M50 50L70 70M70 50L90 70M10 70L30 90M30 70L50 90M50 70L70 90M70 70L90 90"
                stroke="currentColor"
                strokeWidth="0.5"
                fill="none"
                className="text-primary/60"
                data-oid="bkx-yw6"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#neural-pattern)"
            data-oid="z49_17."
          />
        </svg>
      </div>

      <div className="container mx-auto max-w-6xl" data-oid="h3m7_bp">
        <div className="grid gap-8 md:grid-cols-2" data-oid="r-tu2zk">
          {isMounted && (
            <div className="flex flex-col justify-center" data-oid="1wo-:so">
              <div
                className="mb-2 inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-sm text-primary"
                data-oid="_-tc4b3"
              >
                <Brain className="mr-1 h-3 w-3" data-oid="2jvg2au" />
                <span data-oid="k0jkq95">Large Language Models</span>
              </div>

              <h1
                className="mb-4 text-4xl font-bold uppercase tracking-wider text-foreground md:text-5xl"
                data-oid="peuy2j:"
              >
                Advanced{" "}
                <span className="text-primary" data-oid="66l4:hw">
                  AI
                </span>{" "}
                for Complex Tasks
              </h1>

              <p
                className="mb-6 text-lg text-muted-foreground"
                data-oid="hiaq7_j"
              >
                Explore our collection of powerful large language models
                designed for advanced reasoning, creative generation, and
                complex problem-solving.
              </p>

              <div className="mb-8 grid grid-cols-3 gap-4" data-oid="fo56sio">
                <div
                  className="rounded-lg border border-primary/20 bg-card/30 p-3 backdrop-blur-sm"
                  data-oid="w0ayyv3"
                >
                  <div className="mb-1 flex items-center" data-oid="33jjhs7">
                    <Brain
                      className="mr-1 h-4 w-4 text-primary"
                      data-oid="5ck4a.v"
                    />

                    <span
                      className="text-sm font-medium text-foreground"
                      data-oid="tdyagy5"
                    >
                      Powerful
                    </span>
                  </div>
                  <p
                    className="text-xs text-muted-foreground"
                    data-oid="5k.p2.9"
                  >
                    1T-2T parameters
                  </p>
                </div>

                <div
                  className="rounded-lg border border-primary/20 bg-card/30 p-3 backdrop-blur-sm"
                  data-oid="wa7rc3y"
                >
                  <div className="mb-1 flex items-center" data-oid="80z94t3">
                    <Database
                      className="mr-1 h-4 w-4 text-primary"
                      data-oid="8sy87zy"
                    />

                    <span
                      className="text-sm font-medium text-foreground"
                      data-oid="ma9z355"
                    >
                      Expansive
                    </span>
                  </div>
                  <p
                    className="text-xs text-muted-foreground"
                    data-oid="vbnkt1k"
                  >
                    100K+ context
                  </p>
                </div>

                <div
                  className="rounded-lg border border-primary/20 bg-card/30 p-3 backdrop-blur-sm"
                  data-oid="4zbcrv9"
                >
                  <div className="mb-1 flex items-center" data-oid="1znvsv6">
                    <Network
                      className="mr-1 h-4 w-4 text-primary"
                      data-oid="c6sam2-"
                    />

                    <span
                      className="text-sm font-medium text-foreground"
                      data-oid="b:ibot7"
                    >
                      Versatile
                    </span>
                  </div>
                  <p
                    className="text-xs text-muted-foreground"
                    data-oid="g0-5:i8"
                  >
                    Multi-domain
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4" data-oid="gt-0ztg">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full"
                  data-oid="ci4vvmo"
                >
                  <Link href="#models" data-oid="ay-mqot">
                    Browse Models
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full"
                  data-oid="3a4mzs5"
                >
                  <Link href="#capabilities" data-oid="a3_m1x5">
                    Explore Capabilities
                  </Link>
                </Button>
              </div>
            </div>
          )}

          {isMounted && (
            <div
              className="flex items-center justify-center"
              data-oid="iqs3mpl"
            >
              <div className="relative h-[400px] w-[400px]" data-oid="l9d45l6">
                {/* Animated 3D boxes */}
                <div
                  className={styles.llmBoxes}
                  style={{ transform: "scale(3)", margin: "0 auto" }}
                  data-oid=".7v98vb"
                >
                  <div className={styles.box} data-oid="o-_zw0q">
                    <div data-oid="r6q1m.f"></div>
                    <div data-oid="x326g_d"></div>
                    <div data-oid="j037ogj"></div>
                    <div data-oid="i6_8n5i"></div>
                  </div>
                  <div className={styles.box} data-oid="6h6ydob">
                    <div data-oid="nxuhe44"></div>
                    <div data-oid="kub.q0d"></div>
                    <div data-oid="30y:6cu"></div>
                    <div data-oid="ip3yui_"></div>
                  </div>
                  <div className={styles.box} data-oid="th0nmvx">
                    <div data-oid="4j1jdz."></div>
                    <div data-oid="elz2:0k"></div>
                    <div data-oid="ot7-vth"></div>
                    <div data-oid="0i5-i8e"></div>
                  </div>
                  <div className={styles.box} data-oid="06q2hi_">
                    <div data-oid="r:4xf4b"></div>
                    <div data-oid="azl6qec"></div>
                    <div data-oid="l-h5:q9"></div>
                    <div data-oid="d1oj2lx"></div>
                  </div>
                </div>

                {/* Neural network overlay */}
                {renderNeuralNetwork()}

                {/* LLM badge in the center */}
                <div
                  className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/50 bg-card/70 backdrop-blur-md shadow-[0_0_20px_rgba(0,203,221,0.3)]"
                  data-oid="u5bamsq"
                >
                  <div className="text-center" data-oid="wx2k979">
                    <p
                      className="text-2xl font-bold text-primary"
                      data-oid="w-scgl:"
                    >
                      LLM
                    </p>
                    <p
                      className="mt-1 text-[10px] font-medium text-muted-foreground"
                      data-oid="jqutj3u"
                    >
                      LARGE LANGUAGE MODELS
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
