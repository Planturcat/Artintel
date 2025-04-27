"use client";
import {
  useScroll,
  useTransform,
  motion,
  useInView,
  AnimatePresence,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/utils";

export interface TimelineEntry {
  Icon: any;
  name: string;
  description: string;
  href?: string;
  cta?: string;
  background: React.ReactNode;
  className?: string;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState<number | null>(null);

  // Scroll handling
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 40%", "end 60%"],
  });

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div
      ref={containerRef}
      className="relative py-16 md:py-24 px-4 md:px-0 w-full overflow-hidden"
      data-oid="gqpje_6"
    >
      {/* Section title */}
      <div className="text-center mx-auto max-w-3xl mb-20" data-oid="ppzd9no">
        <h2 className="text-3xl md:text-4xl font-bold mb-6" data-oid="5w:mi06">
          Data Integration & Preprocessing
        </h2>
        <p
          className="text-muted-foreground text-lg max-w-2xl mx-auto"
          data-oid="c:ikac8"
        >
          Seamlessly connect your data sources, preprocess your data, and
          prepare it for AI training
        </p>
      </div>

      {/* Background accent */}
      <div
        className="absolute -z-10 top-1/4 -left-64 w-96 h-96 rounded-full bg-primary/5 blur-[100px]"
        data-oid="-66.-41"
      ></div>
      <div
        className="absolute -z-10 bottom-1/4 -right-64 w-96 h-96 rounded-full bg-primary/5 blur-[100px]"
        data-oid="b5ur:t3"
      ></div>

      {/* Timeline content */}
      <div className="max-w-6xl mx-auto relative" data-oid="cof5osy">
        {/* Timeline line */}
        <div
          className="absolute left-9 md:left-1/2 top-0 bottom-0 w-px bg-border transform -translate-x-1/2 md:translate-x-0"
          data-oid="n2r5zti"
        />

        {data.map((item, index) => {
          const itemRef = useRef<HTMLDivElement>(null);
          const isInView = useInView(itemRef, {
            margin: "-40% 0px -40% 0px",
            once: false,
          });

          // Set active index based on which item is in view
          useEffect(() => {
            if (isInView) {
              setActiveIndex(index);
            }
          }, [isInView, index]);

          return (
            <div
              key={index}
              ref={itemRef}
              className={cn(
                "flex flex-col md:flex-row items-start mb-24 last:mb-0 relative",
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse",
              )}
              onMouseEnter={() => setIsHovering(index)}
              onMouseLeave={() => setIsHovering(null)}
              data-oid="ol5m5:p"
            >
              {/* Timeline dot */}
              <motion.div
                className={cn(
                  "absolute left-9 md:left-1/2 w-[18px] h-[18px] rounded-full border-4 transform -translate-x-1/2",
                  isInView || activeIndex === index
                    ? "border-primary bg-background"
                    : "border-border bg-background",
                )}
                animate={{
                  scale: isInView || activeIndex === index ? 1.2 : 1,
                  transition: { duration: 0.3 },
                }}
                data-oid="4i60gm4"
              />

              {/* Content container */}
              <div
                className={cn(
                  "flex flex-col",
                  "pl-16 md:pl-0 md:pr-12 md:w-1/2",
                  index % 2 === 1 && "md:pl-12 md:pr-0 md:text-right",
                )}
                data-oid="71fgmdp"
              >
                <motion.div
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={fadeIn}
                  className="mb-6"
                  data-oid="u_orldt"
                >
                  <h3
                    className="text-xl md:text-2xl font-bold flex items-center gap-3 mb-3"
                    data-oid="8m6um-p"
                  >
                    {index % 2 === 0 || !isInView ? (
                      <>
                        <item.Icon
                          className="h-6 w-6 text-primary hidden md:inline-block"
                          data-oid="nztnbyg"
                        />

                        {item.name}
                      </>
                    ) : (
                      <>
                        {item.name}
                        <item.Icon
                          className="h-6 w-6 text-primary hidden md:inline-block"
                          data-oid=":orrb5w"
                        />
                      </>
                    )}
                  </h3>
                  <p className="text-muted-foreground" data-oid="3s9:8z-">
                    {item.description}
                  </p>

                  {item.cta && item.href && (
                    <a
                      href={item.href}
                      className={cn(
                        "mt-4 inline-flex items-center gap-2 text-primary hover:underline",
                        index % 2 === 1 && "md:flex-row-reverse",
                      )}
                      aria-label={`${item.cta} for ${item.name}`}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          window.location.href = item.href;
                        }
                      }}
                      data-oid="i5pdtvq"
                    >
                      {item.cta}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        data-oid="i.byisg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={
                            index % 2 === 1 ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"
                          }
                          data-oid="3m_wh84"
                        />
                      </svg>
                    </a>
                  )}
                </motion.div>
              </div>

              {/* Visual element */}
              <div
                className={cn(
                  "md:w-1/2",
                  index % 2 === 0 ? "md:pl-12" : "md:pr-12",
                )}
                data-oid="rx85.v-"
              >
                <motion.div
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={fadeIn}
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                  className="relative rounded-lg overflow-hidden border border-border shadow-lg"
                  data-oid="x-.2eey"
                >
                  <div
                    className="relative aspect-[4/3] w-full"
                    data-oid="ea4mmou"
                  >
                    {item.background}
                  </div>

                  {/* Mobile-only icon overlay */}
                  <div
                    className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm p-2 rounded-full border border-border md:hidden"
                    data-oid="qj0ru.o"
                  >
                    <item.Icon
                      className="h-5 w-5 text-primary"
                      data-oid="v9ozrq:"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
