"use client";

import React from "react";
import AnimationContainer from "@/components/global/animation-container";
import { Users, Clock, Zap } from "lucide-react";
import { motion } from "framer-motion";

const WaitingListStats = () => {
  const stats = [
    {
      value: "2,500+",
      label: "People on the list",
      icon: <Users className="h-6 w-6 text-primary" />,
      color: "rgba(0, 203, 221, 0.2)",
    },
    {
      value: "14",
      label: "Days until beta launch",
      icon: <Clock className="h-6 w-6 text-primary" />,
      color: "rgba(0, 203, 221, 0.3)",
    },
    {
      value: "50%",
      label: "Discount for early access",
      icon: <Zap className="h-6 w-6 text-primary" />,
      color: "rgba(0, 203, 221, 0.2)",
    },
  ];

  return (
    <AnimationContainer animation="fadeUp" delay={0.5} className="mt-20">
      <div className="relative">
        {/* Background decorative element */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/0 to-primary/5 rounded-xl -m-4 blur-xl opacity-50"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-8 rounded-xl border border-primary/10 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm relative overflow-hidden group hover:border-primary/20 transition-all duration-300"
              whileHover={{
                y: -5,
                boxShadow: `0 10px 30px -10px ${stat.color}`,
                transition: { duration: 0.3 }
              }}
            >
              {/* Background glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${stat.color}, transparent 70%)`,
                  filter: 'blur(20px)'
                }}
              ></div>

              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6">
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 relative">
                    <div className="absolute inset-0 rounded-full bg-primary/5 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative">
                      {stat.icon}
                    </div>
                  </div>
                </div>
                <h3 className="text-4xl md:text-5xl font-bold text-primary mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </h3>
                <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimationContainer>
  );
};

export default WaitingListStats;
