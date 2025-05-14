"use client";

import React, { useState } from "react";
import Wrapper from "@/components/global/wrapper";
import AnimationContainer from "@/components/global/animation-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { LoaderIcon, CheckCircle, Users, Clock, Zap, Brain, Cpu } from "lucide-react";
import Link from "next/link";
import IPhoneShowcase from "@/components/waiting-list/iphone-showcase";
import WaitingListStats from "@/components/waiting-list/waiting-list-stats";
import { addToWaitingList } from "@/lib/email";

const WaitingListPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [position, setPosition] = useState(0);

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
      <div className="relative overflow-hidden bg-gradient-to-b from-background to-background/80 py-20 md:py-24">
        {/* Decorative elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute left-1/3 top-1/4 h-64 w-64 rounded-full bg-primary/10 blur-[100px] animate-pulse"></div>
          <div className="absolute right-1/3 bottom-1/4 h-64 w-64 rounded-full bg-primary/10 blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute right-1/4 top-1/3 h-32 w-32 rounded-full bg-primary/15 blur-[80px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Grid pattern background */}
        <div className="absolute inset-0 z-0 opacity-5">
          <div className="h-full w-full grid grid-cols-12 grid-rows-6">
            {Array.from({ length: 72 }).map((_, i) => (
              <div key={i} className="border border-primary/20" />
            ))}
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-primary/30"
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.2,
                animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out,
                           pulse ${Math.random() * 5 + 5}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        <Wrapper className="relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-3 inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-sm text-primary">
              <Clock className="mr-1 h-3 w-3" />
              <span>Limited Access</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-4">
              Join the Artintel{" "}
              <span className="text-primary">Waiting List</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-6">
              Be among the first to experience our AI-powered platform for intelligent content creation and management.
              Early access members receive exclusive benefits and priority support.
            </p>
          </div>
        </Wrapper>
      </div>

      {/* Main Content */}
      <Wrapper className="py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Form */}
          <AnimationContainer animation="fadeLeft" delay={0.2}>
            <Card className="border-none shadow-xl bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-sm relative overflow-hidden">
              {/* Decorative elements for the card */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-xl -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full blur-xl -ml-12 -mb-12"></div>

              <CardContent className="pt-8 pb-8 relative z-10">
                {!isSubmitted ? (
                  <>
                    <h2 className="text-2xl font-bold mb-6 text-center">Reserve Your Spot</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">Name (Optional)</Label>
                        <Input
                          id="name"
                          placeholder="Enter your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          disabled={isLoading}
                          className="bg-background/50 border-primary/20 focus:border-primary focus:ring-primary/30"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={isLoading}
                          className="bg-background/50 border-primary/20 focus:border-primary focus:ring-primary/30"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full btn-reflection"
                      >
                        {isLoading ? (
                          <LoaderIcon className="w-4 h-4 animate-spin mr-2" />
                        ) : null}
                        {isLoading ? "Processing..." : "Join Waiting List"}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-primary/20 blur-md animate-pulse"></div>
                        <CheckCircle className="h-16 w-16 text-primary relative z-10" />
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold">You're on the list!</h2>
                    <p className="text-muted-foreground">
                      You're currently position <span className="font-bold text-primary">#{position}</span> in line
                    </p>
                    <div className="pt-4">
                      <p className="text-sm text-muted-foreground mb-4">
                        Share with friends to move up the list:
                      </p>
                      <div className="flex justify-center space-x-4">
                        <Button variant="outline" size="sm" className="border-primary/30 hover:bg-primary/10 hover:text-primary">
                          Twitter
                        </Button>
                        <Button variant="outline" size="sm" className="border-primary/30 hover:bg-primary/10 hover:text-primary">
                          LinkedIn
                        </Button>
                        <Button variant="outline" size="sm" className="border-primary/30 hover:bg-primary/10 hover:text-primary">
                          Email
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </AnimationContainer>

          {/* Right Column - iPhone Animation */}
          <AnimationContainer animation="fadeRight" delay={0.4}>
            <div className="flex flex-col items-center">
              <FloatingIPhone />
              <div className="mt-8 text-center">
                <h3 className="text-xl font-bold mb-2">Experience Artintel</h3>
                <p className="text-muted-foreground">
                  Our platform makes AI accessible and powerful for everyone.
                </p>
              </div>
            </div>
          </AnimationContainer>
        </div>

        {/* Stats Section */}
        <WaitingListStats />

        {/* Features Section */}
        <AnimationContainer animation="fadeUp" delay={0.6} className="mt-20">
          <div className="text-center mb-12 relative">
            {/* Decorative elements */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-primary/5 rounded-full blur-3xl opacity-70"></div>

            <h2 className="text-3xl font-bold mb-4 relative z-10">Why Join Early?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto relative z-10">
              Early access members receive exclusive benefits and priority features.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-8 w-8 text-primary" />,
                title: "Priority Access",
                description: "Be among the first to experience our platform and new features.",
                gradient: "from-[#00cbdd]/10 to-[#00cbdd]/30"
              },
              {
                icon: <Users className="h-8 w-8 text-primary" />,
                title: "Exclusive Community",
                description: "Join our private community of early adopters and AI enthusiasts.",
                gradient: "from-[#00cbdd]/20 to-[#00cbdd]/40"
              },
              {
                icon: <Clock className="h-8 w-8 text-primary" />,
                title: "Lifetime Discount",
                description: "Early members receive special pricing that's locked in for life.",
                gradient: "from-[#00cbdd]/10 to-[#00cbdd]/30"
              }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg blur-sm -m-1"
                     style={{ background: `linear-gradient(135deg, rgba(0, 203, 221, 0.2), rgba(0, 203, 221, 0))` }}></div>

                <Card className="border-none shadow-lg bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm relative overflow-hidden group-hover:shadow-xl transition-all duration-300">
                  {/* Card glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>

                  <CardContent className="pt-8 pb-8 flex flex-col items-center text-center relative z-10">
                    <div className="mb-4 p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 relative">
                      <div className="absolute inset-0 rounded-full bg-primary/5 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                    <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">{feature.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </AnimationContainer>
      </Wrapper>
    </>
  );
};

export default WaitingListPage;
