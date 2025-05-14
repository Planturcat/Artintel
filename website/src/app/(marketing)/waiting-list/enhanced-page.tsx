"use client";

import React, { useState, useEffect, useId } from "react";
import Wrapper from "@/components/global/wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { LoaderIcon, CheckCircle, Users, Clock, Zap, Brain, Cpu, Share2, Mail } from "lucide-react";
import Link from "next/link";
import EnhancedIPhoneShowcase from "@/components/waiting-list/enhanced-iphone-showcase";
import WaitingListStats from "@/components/waiting-list/waiting-list-stats";
import { addToWaitingList } from "@/lib/email";
import { motion } from "framer-motion";
import { Twitter, Linkedin } from "lucide-react";
import ClientOnly from "@/components/client-only";

// Generate deterministic values based on index
const getGridOpacity = (index: number): number => {
  return index % 10 === 0 ? 0.7 : 0.3;
};

const getParticleDelay = (index: number): number => {
  return (index % 6);
};

const getParticleDuration = (index: number): number => {
  return 15 + (index % 6);
};

const getParticlePosition = (index: number, max: number = 100): number => {
  return (index * 13) % max;
};

const EnhancedWaitingListPage = () => {
  const componentId = useId(); // Stable ID for keys
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [position, setPosition] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true when component mounts on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setIsLoading(true);

    try {
      // Add to waiting list and get position
      const position = await addToWaitingList(email, name);
      setPosition(position);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error adding to waiting list:", error);
      // In a real application, you would show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-background/90 py-24 md:py-32">
        {/* Enhanced decorative elements */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute left-1/3 top-1/4 h-80 w-80 rounded-full bg-primary/15 blur-[120px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute right-1/3 bottom-1/4 h-80 w-80 rounded-full bg-primary/10 blur-[120px]"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.6, 0.4]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute right-1/4 top-1/3 h-40 w-40 rounded-full bg-blue-500/10 blur-[100px]"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        {/* Enhanced grid pattern background */}
        <div className="absolute inset-0 z-0 opacity-5">
          <div className="h-full w-full grid grid-cols-12 grid-rows-6">
            {Array.from({ length: 72 }).map((_, i) => (
              <motion.div
                key={i}
                className="border border-primary/30"
                initial={{ opacity: 0.3 }}
                animate={{
                  opacity: Math.random() > 0.7 ? [0.3, 0.7, 0.3] : 0.3
                }}
                transition={{
                  duration: Math.random() * 5 + 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
        </div>

        {/* Enhanced floating particles */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-primary/40 to-blue-500/40"
              style={{
                width: Math.random() * 8 + 2,
                height: Math.random() * 8 + 2,
                filter: "blur(1px)"
              }}
              initial={{
                x: Math.random() * 100,
                y: Math.random() * 100,
                opacity: 0
              }}
              animate={{
                x: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ],
                y: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ],
                opacity: [0, 0.7, 0],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: Math.random() * 20 + 15,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>

        <Wrapper className="relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="mb-4 inline-flex items-center rounded-full border border-primary/40 bg-primary/5 px-4 py-2 text-sm text-primary shadow-lg shadow-primary/10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Clock className="mr-2 h-4 w-4" />
              <span className="font-medium">Limited Early Access</span>
            </motion.div>

            <motion.h1
              className="text-5xl font-bold tracking-tight text-foreground sm:text-7xl mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Join the Artintel{" "}
              <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">Waiting List</span>
            </motion.h1>

            <motion.p
              className="text-xl text-muted-foreground mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Be among the first to experience our AI-powered platform for intelligent content creation and management.
              Early access members receive exclusive benefits and priority support.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Button
                size="lg"
                className="rounded-full px-8 py-6 text-lg shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
                onClick={() => document.getElementById('waiting-list-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Reserve Your Spot Now
              </Button>
            </motion.div>
          </motion.div>
        </Wrapper>
      </div>

      {/* Main Content */}
      <Wrapper className="py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card id="waiting-list-form" className="border-none shadow-2xl bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-sm relative overflow-hidden rounded-3xl">
              {/* Enhanced decorative elements for the card */}
              <motion.div
                className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-xl -mr-20 -mt-20"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.7, 0.5]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-xl -ml-16 -mb-16"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.4, 0.6, 0.4]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />

              <CardContent className="pt-10 pb-10 px-8 relative z-10">
                {!isSubmitted ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h2 className="text-3xl font-bold mb-2 text-center">Reserve Your Spot</h2>
                      <p className="text-center text-muted-foreground mb-8">Join our exclusive waiting list for early access</p>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <motion.div
                        className="space-y-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        <Label htmlFor="name" className="text-sm font-medium flex items-center">
                          <Users className="h-4 w-4 mr-2 text-primary/70" />
                          Name (Optional)
                        </Label>
                        <Input
                          id="name"
                          placeholder="Enter your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          disabled={isLoading}
                          className="bg-background/50 border-primary/20 focus:border-primary focus:ring-primary/30 rounded-xl h-12 px-4"
                        />
                      </motion.div>

                      <motion.div
                        className="space-y-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <Label htmlFor="email" className="text-sm font-medium flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-primary/70" />
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={isLoading}
                          className="bg-background/50 border-primary/20 focus:border-primary focus:ring-primary/30 rounded-xl h-12 px-4"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 shadow-lg shadow-primary/20 transition-all duration-300"
                        >
                          {isLoading ? (
                            <LoaderIcon className="w-5 h-5 animate-spin mr-2" />
                          ) : null}
                          {isLoading ? "Processing..." : "Join Waiting List"}
                        </Button>
                      </motion.div>
                    </form>
                  </>
                ) : (
                  <motion.div
                    className="text-center space-y-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="flex justify-center"
                      initial={{ scale: 0.5 }}
                      animate={{ scale: [0.5, 1.2, 1] }}
                      transition={{ duration: 0.7, times: [0, 0.5, 1] }}
                    >
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-primary/20 blur-md animate-pulse"></div>
                        <CheckCircle className="h-20 w-20 text-primary relative z-10" />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <h2 className="text-3xl font-bold mb-2">You're on the list!</h2>
                      <p className="text-lg text-muted-foreground">
                        You're currently position <motion.span
                          className="font-bold text-primary text-2xl"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                        >#{position}</motion.span> in line
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Enhanced iPhone Animation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center"
          >
            <EnhancedIPhoneShowcase
              features={[
                {
                  title: "AI-Powered Platform",
                  description: "Access cutting-edge AI models for content creation and management"
                },
                {
                  title: "LLM Integration",
                  description: "Leverage large language models for complex reasoning and generation"
                },
                {
                  title: "SLM Efficiency",
                  description: "Use small language models for fast, resource-efficient tasks"
                },
                {
                  title: "Early Access",
                  description: "Join now to be among the first to experience our platform"
                },
                {
                  title: "Exclusive Benefits",
                  description: "Early members receive special pricing and priority support"
                }
              ]}
            />
            <motion.div
              className="mt-10 text-center max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">Experience Artintel</h3>
              <p className="text-muted-foreground text-lg">
                Our platform makes AI accessible and powerful for everyone, with intuitive interfaces and powerful capabilities.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <WaitingListStats />
      </Wrapper>
    </>
  );
};

export default EnhancedWaitingListPage;
