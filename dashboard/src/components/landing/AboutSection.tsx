"use client";

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { Sparkles, Shield, Rocket, Target } from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { useRef, useState, useEffect } from 'react';

export default function AboutSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const sectionRef = useRef<HTMLElement>(null);
  const [isClient, setIsClient] = useState(false);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  // Initialize on client-side only
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // For scroll effects, with safeguards
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Transform properties based on scroll, with fallbacks
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0.8, 1, 1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0.95, 1, 1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);

  // Interactive values state (for hover effects)
  const [activeValue, setActiveValue] = useState<number | null>(null);
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };
  
  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  // Split text animation for heading
  const title = "Democratizing language models for enterprises";
  const titleArray = title.split(" ");

  const coreValues = [
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Innovation",
      description: "Constantly pushing boundaries to make advanced AI accessible to everyone",
      color: "from-blue-400 to-indigo-600"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Security",
      description: "End-to-end encryption and compliance with industry standards",
      color: "from-emerald-400 to-teal-600"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Efficiency",
      description: "Optimizing performance while keeping costs manageable",
      color: "from-amber-400 to-orange-600"
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Empowerment",
      description: "Enabling businesses to implement AI solutions independently",
      color: "from-[#00cbdd] to-blue-600"
    }
  ];

  // If we're server-side, render a simpler version to avoid hydration issues
  if (!isClient) {
    return (
      <section 
        id="about" 
        ref={sectionRef}
        className={`w-full py-32 relative overflow-hidden ${
          isDark 
            ? 'bg-gradient-to-b from-[#00091b] to-[#00052d]' 
            : 'bg-gradient-to-b from-gray-50 to-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="block text-lg font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#00cbdd] to-blue-500">
              About Artintel
            </span>
            
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-[#00091b]'}`}>
              {title}
            </h2>
            
            <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              We're building the future where AI technology is accessible to businesses of all sizes
            </p>
          </div>

          {/* Rest of component with minimal animations */}
          {/* Cards section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 mb-24">
            <div className="relative">
              <DashboardCard
                title="Our Mission"
                subtitle="The future of AI within reach"
                className="h-full backdrop-blur-sm border border-[#00cbdd]/20 overflow-hidden"
              >
                <div className={`mt-6 ${isDark ? 'text-gray-300' : 'text-gray-700'} relative z-10`}>
                  <p className="mb-4 leading-relaxed">
                    We are committed to democratizing enterprise AI by making advanced language model technologies accessible, secure, and easy to deploy for businesses of all sizes.
                  </p>
                  <p>
                    Our platform removes technical barriers, enabling organizations to harness the power of cutting-edge AI without requiring specialized expertise or significant resources.
                  </p>
                </div>
              </DashboardCard>
            </div>

            <div className="relative">
              <DashboardCard
                title="What We Do"
                subtitle="No-code AI platform for everyone"
                className="h-full backdrop-blur-sm border border-blue-500/20 overflow-hidden"
              >
                <div className={`mt-6 ${isDark ? 'text-gray-300' : 'text-gray-700'} relative z-10`}>
                  <p className="mb-4 leading-relaxed">
                    We provide a comprehensive no-code platform that allows businesses to easily fine-tune and deploy open-source language models.
                  </p>
                  <p>
                    Our intuitive interface guides you through model selection, data integration, fine-tuning, deployment, and monitoring - all without writing a single line of code.
                  </p>
                </div>
              </DashboardCard>
            </div>
          </div>

          <div className="text-center mb-12">
            <h3 className={`text-2xl font-bold mb-10 inline-block relative ${isDark ? 'text-white' : 'text-[#00091b]'}`}>
              Our Core Values
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#00cbdd] to-blue-500"></span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className={`rounded-xl p-8 relative overflow-hidden ${
                  isDark 
                    ? 'bg-[#00052d]/80 backdrop-blur-sm border border-[#00cbdd]/20' 
                    : 'bg-white/90 backdrop-blur-sm border border-gray-100 shadow-md'
                }`}
              >
                <div className={`p-4 rounded-xl bg-gradient-to-br ${value.color} text-white inline-block mb-6 relative z-10`}>
                  {value.icon}
                </div>
                
                <h4 className={`text-xl font-bold mb-4 relative z-10 ${isDark ? 'text-white' : 'text-[#00091b]'}`}>
                  {value.title}
                </h4>
                
                <p className={`relative z-10 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className={`w-full py-32 relative overflow-hidden ${
        isDark 
          ? 'bg-gradient-to-b from-[#00091b] to-[#00052d]' 
          : 'bg-gradient-to-b from-gray-50 to-white'
      }`}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#00cbdd]/10 blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl"></div>
        
        {/* Animated dots grid - simplified for performance */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <div key={`row-${rowIndex}`} className="flex justify-between">
              {Array.from({ length: 10 }).map((_, colIndex) => (
                <motion.div
                  key={`dot-${rowIndex}-${colIndex}`}
                  className={`h-1 w-1 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-500'}`}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    delay: (rowIndex * colIndex) % 5,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <motion.div 
        style={{ opacity, scale, y }}
        className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10"
      >
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={container}
          className="text-center mb-20"
        >
          <motion.span 
            className="block text-lg font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#00cbdd] to-blue-500"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            About Artintel
          </motion.span>
          
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 flex flex-wrap justify-center ${isDark ? 'text-white' : 'text-[#00091b]'}`}>
            {titleArray.map((word, index) => (
              <motion.span
                key={index}
                className="inline-block mx-1"
                variants={child}
              >
                {word}
              </motion.span>
            ))}
          </h2>
          
          <motion.p 
            className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            We're building the future where AI technology is accessible to businesses of all sizes
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-br from-[#00cbdd]/20 to-blue-500/20 rounded-full blur-2xl"></div>
            <DashboardCard
              title="Our Mission"
              subtitle="The future of AI within reach"
              className="h-full backdrop-blur-sm border border-[#00cbdd]/20 overflow-hidden"
            >
              <div className={`mt-6 ${isDark ? 'text-gray-300' : 'text-gray-700'} relative z-10`}>
                <motion.p 
                  className="mb-4 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  We are committed to democratizing enterprise AI by making advanced language model technologies accessible, secure, and easy to deploy for businesses of all sizes.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Our platform removes technical barriers, enabling organizations to harness the power of cutting-edge AI without requiring specialized expertise or significant resources.
                </motion.p>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute bottom-0 right-0 w-64 h-64 opacity-10">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <path fill={isDark ? "#00cbdd" : "#00cbdd"} d="M39.9,-65.7C51.1,-58.9,59.5,-47.6,66.5,-35.1C73.5,-22.7,79,-9,79.1,4.8C79.2,18.6,74,32.5,65.6,44.1C57.2,55.8,45.7,65.3,32.8,69.8C19.9,74.3,5.7,73.8,-7.8,71.2C-21.2,68.6,-34,64,-45.9,56.2C-57.8,48.4,-68.8,37.3,-75.5,23.5C-82.2,9.6,-84.5,-7,-78.8,-19.6C-73.1,-32.1,-59.3,-40.6,-46,-47.4C-32.7,-54.2,-19.9,-59.2,-5.6,-61.9C8.6,-64.6,28.7,-72.5,39.9,-65.7Z" transform="translate(100 100)" />
                </svg>
              </div>
            </DashboardCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl"></div>
            <DashboardCard
              title="What We Do"
              subtitle="No-code AI platform for everyone"
              className="h-full backdrop-blur-sm border border-blue-500/20 overflow-hidden"
            >
              <div className={`mt-6 ${isDark ? 'text-gray-300' : 'text-gray-700'} relative z-10`}>
                <motion.p 
                  className="mb-4 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  We provide a comprehensive no-code platform that allows businesses to easily fine-tune and deploy open-source language models.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  Our intuitive interface guides you through model selection, data integration, fine-tuning, deployment, and monitoring - all without writing a single line of code.
                </motion.p>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute bottom-0 left-0 w-64 h-64 opacity-10">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <path fill={isDark ? "#4F46E5" : "#4F46E5"} d="M44.7,-76.4C58.9,-69.2,72.2,-58.8,79.6,-45C87.1,-31.2,88.7,-14.5,85.1,0.6C81.5,15.7,72.8,29.9,63.2,42.3C53.6,54.7,43.2,65.3,30.7,71.6C18.2,78,3.7,80.1,-11.9,79.3C-27.6,78.6,-46.4,75,-59.4,65C-72.5,55,-79.8,38.6,-84.4,21.5C-89,4.3,-91,-13.8,-86.6,-29.7C-82.2,-45.6,-71.3,-59.4,-57.6,-66.8C-43.8,-74.3,-27.2,-75.4,-11.9,-74.1C3.4,-72.8,30.5,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
                </svg>
              </div>
            </DashboardCard>
          </motion.div>
        </div>

        <div className="text-center mb-12">
          <motion.h3 
            className={`text-2xl font-bold mb-10 inline-block relative ${isDark ? 'text-white' : 'text-[#00091b]'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            Our Core Values
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#00cbdd] to-blue-500"></span>
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreValues.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.7, delay: 0.3 + (index * 0.1) }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              onHoverStart={() => setActiveValue(index)}
              onHoverEnd={() => setActiveValue(null)}
              className={`rounded-xl p-8 relative overflow-hidden ${
                isDark 
                  ? 'bg-[#00052d]/80 backdrop-blur-sm border border-[#00cbdd]/20' 
                  : 'bg-white/90 backdrop-blur-sm border border-gray-100 shadow-md'
              }`}
            >
              {/* Animated background */}
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0`}
                animate={{ 
                  opacity: activeValue === index ? 0.15 : 0
                }}
                transition={{ duration: 0.3 }}
              />
              
              <div className={`p-4 rounded-xl bg-gradient-to-br ${value.color} text-white inline-block mb-6 relative z-10`}>
                {value.icon}
              </div>
              
              <h4 className={`text-xl font-bold mb-4 relative z-10 ${isDark ? 'text-white' : 'text-[#00091b]'}`}>
                {value.title}
              </h4>
              
              <p className={`relative z-10 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {value.description}
              </p>
              
              {/* Corner decoration */}
              <div className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full bg-gradient-to-br opacity-30" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
} 