"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { Shield, CreditCard, Cpu, Clock, Users, BookOpen, BarChart, Server, ArrowRight } from 'lucide-react';
import { useRef, useState } from 'react';
import StatCard from '@/components/dashboard/StatCard';

export default function FeaturesSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState('performance');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [hoverFeature, setHoverFeature] = useState<number | null>(null);
  
  // For parallax effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const statsOpacity = useTransform(scrollYProgress, [0, 0.5, 0.6, 1], [0, 0, 1, 1]);
  const statsY = useTransform(scrollYProgress, [0, 0.5, 0.6, 1], [100, 100, 0, 0]);

  const featureTabs = [
    { id: 'performance', label: 'Performance', icon: <BarChart className="h-4 w-4 mr-2" /> },
    { id: 'security', label: 'Security', icon: <Shield className="h-4 w-4 mr-2" /> },
    { id: 'cost', label: 'Cost Savings', icon: <CreditCard className="h-4 w-4 mr-2" /> },
    { id: 'control', label: 'Control', icon: <Server className="h-4 w-4 mr-2" /> }
  ];

  const features = {
    performance: [
      { 
        title: "10x Faster Deployment", 
        icon: <Clock className="h-10 w-10 text-[#00cbdd]" />,
        description: "Deploy fine-tuned models in minutes instead of weeks with our streamlined pipeline.",
        color: "from-cyan-500 to-blue-500",
        details: "Our optimized deployment pipeline reduces setup time from weeks to minutes. Pre-configured environments, automatic dependency management, and one-click deployment to your infrastructure of choice mean you can go from training to production with minimal delay."
      },
      { 
        title: "Enterprise-Grade Reliability", 
        icon: <Server className="h-10 w-10 text-[#00cbdd]" />,
        description: "99.9% uptime SLA with automatic failover and horizontal scaling capabilities.",
        color: "from-indigo-500 to-purple-500",
        details: "Our platform is built on distributed architecture with redundancy at every level. Automatic failover ensures your AI services stay online even during infrastructure outages, while horizontal scaling handles traffic spikes seamlessly."
      },
      { 
        title: "Advanced Optimization", 
        icon: <Cpu className="h-10 w-10 text-[#00cbdd]" />,
        description: "Automatic quantization and optimization for maximum throughput on your hardware.",
        color: "from-blue-500 to-indigo-500",
        details: "We apply advanced model optimization techniques like quantization, pruning, and distillation automatically. This reduces model size by up to 75% while maintaining accuracy, resulting in faster inference and lower hardware requirements."
      }
    ],
    security: [
      { 
        title: "Complete Data Privacy", 
        icon: <Shield className="h-10 w-10 text-[#00cbdd]" />,
        description: "Your data never leaves your infrastructure with our secure deployment options.",
        color: "from-emerald-500 to-teal-500",
        details: "Our platform can be deployed within your own virtual private cloud or on-premises infrastructure. All data processing happens within your security perimeter, ensuring sensitive information never leaves your control."
      },
      { 
        title: "Role-Based Access", 
        icon: <Users className="h-10 w-10 text-[#00cbdd]" />,
        description: "Granular permissions and audit logs for complete visibility and compliance.",
        color: "from-blue-500 to-indigo-500",
        details: "Define custom roles with precise permissions for model management, deployment, and monitoring. Comprehensive audit logging tracks every action in the system, making compliance and security reviews straightforward."
      },
      { 
        title: "Compliance Ready", 
        icon: <BookOpen className="h-10 w-10 text-[#00cbdd]" />,
        description: "Built-in tools for GDPR, HIPAA, and SOC 2 compliance with data lineage tracking.",
        color: "from-violet-500 to-purple-500",
        details: "Our platform includes compliance-focused features like data lineage tracking, automatic PII detection and redaction, and tools for managing consent and data subject requests, making regulatory compliance significantly easier."
      }
    ],
    cost: [
      { 
        title: "Reduced Hardware Costs", 
        icon: <CreditCard className="h-10 w-10 text-[#00cbdd]" />,
        description: "Optimized models require less computational resources without sacrificing quality.",
        color: "from-amber-500 to-orange-500",
        details: "Our optimization engine reduces the computational requirements of your models by up to 70%. This means you can run high-quality AI on less expensive hardware, dramatically reducing your infrastructure costs."
      },
      { 
        title: "Predictable Pricing", 
        icon: <BarChart className="h-10 w-10 text-[#00cbdd]" />,
        description: "Transparent, usage-based pricing with no surprise costs or hidden fees.",
        color: "from-emerald-500 to-green-500",
        details: "Unlike many AI platforms with complex pricing models, we offer simple, usage-based pricing with clear visibility into your costs. Set budgets and alerts to prevent unexpected expenses, and scale your usage precisely to your needs."
      },
      { 
        title: "ROI Tracking", 
        icon: <BarChart className="h-10 w-10 text-[#00cbdd]" />,
        description: "Built-in dashboards to measure business impact and return on AI investment.",
        color: "from-cyan-500 to-blue-500",
        details: "Connect your business metrics to your AI deployments with our ROI tracking system. Monitor key performance indicators, attribute improvements to specific models, and generate reports that demonstrate the value of your AI investments."
      }
    ],
    control: [
      { 
        title: "Full Ownership", 
        icon: <Server className="h-10 w-10 text-[#00cbdd]" />,
        description: "You own your models, data, and IP - no vendor lock-in or shared ownership.",
        color: "from-violet-500 to-purple-500",
        details: "Unlike proprietary AI solutions, we ensure you retain 100% ownership of your models, training data, and any intellectual property generated. Your competitive advantage stays yours, with no risk of vendor lock-in."
      },
      { 
        title: "Customizable Workflows", 
        icon: <Cpu className="h-10 w-10 text-[#00cbdd]" />,
        description: "Build custom AI pipelines with our flexible API and integration options.",
        color: "from-blue-500 to-indigo-500",
        details: "Our platform's extensible architecture allows you to create custom workflows for your specific needs. Connect to your existing systems through our comprehensive API, or extend functionality with custom plugins and integrations."
      },
      { 
        title: "Governance Framework", 
        icon: <BookOpen className="h-10 w-10 text-[#00cbdd]" />,
        description: "Comprehensive model governance with version control and approval workflows.",
        color: "from-emerald-500 to-teal-500",
        details: "Implement robust AI governance with our built-in tools for model versioning, lineage tracking, and approval workflows. Set quality thresholds, automate testing, and enforce review processes to ensure all deployed models meet your standards."
      }
    ]
  };

  // Stats for the StatCard components
  const stats = [
    { 
      title: "Time Saved", 
      value: "85%", 
      change: "+24%", 
      trend: "up",
      icon: <Clock className="h-6 w-6" /> 
    },
    { 
      title: "Cost Reduction", 
      value: "68%", 
      change: "+15%", 
      trend: "up",
      icon: <CreditCard className="h-6 w-6" /> 
    },
    { 
      title: "Throughput", 
      value: "4.2x", 
      change: "+30%", 
      trend: "up",
      icon: <BarChart className="h-6 w-6" /> 
    }
  ];

  const activeFeatures = features[activeTab as keyof typeof features];

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      } 
    }
  };
  
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section 
      id="features" 
      ref={sectionRef}
      className="w-full py-32 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          style={{ y: bgY }}
          className={`absolute inset-0 ${isDark ? 'bg-[#000514]' : 'bg-gray-50'}`}
        >
          {/* Geometric patterns */}
          <div className="absolute inset-0 opacity-5">
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                key={`line-${i}`} 
                className={`absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00cbdd] to-transparent`}
                style={{ top: `${i * 5}%` }}
              />
            ))}
            
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                key={`line-vert-${i}`} 
                className={`absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent`}
                style={{ left: `${i * 5}%` }}
              />
            ))}
          </div>
        </motion.div>
        
        {/* Floating gradient orbs */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-[#00cbdd]/10 mix-blend-screen blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-500/10 mix-blend-screen blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <motion.span 
            className="block text-lg font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#00cbdd] to-blue-500"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Why Choose Us
          </motion.span>
          
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-[#00091b]'}`}>
            Key <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00cbdd] to-blue-500">Features</span> & Benefits
          </h2>
          
          <motion.p 
            className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Enterprise-ready AI deployment with the features you need to succeed
          </motion.p>
        </motion.div>

        {/* 3D Rotating Feature Categories */}
        <div className="perspective-1000 mb-16">
          <motion.div 
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {featureTabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ 
                  scale: 1.05,
                  rotateX: 5,
                  rotateY: 10,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#00cbdd] to-blue-500 text-white shadow-lg shadow-[#00cbdd]/20'
                    : isDark
                    ? 'bg-[#00091b] text-gray-300 hover:bg-[#000C2A] border border-[#00cbdd]/20'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 shadow-sm'
                }`}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  style={{
                    transform: "translateZ(8px)",
                  }}
                >
                  {tab.icon}
                </motion.div>
                <motion.span
                  style={{
                    transform: "translateZ(8px)",
                  }}
                >
                  {tab.label}
                </motion.span>
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Features grid with 3D card effect */}
        <motion.div
          style={{ y: cardsY }}
          className="mb-24"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 20 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {activeFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={cardVariants}
                  className="perspective-1000"
                  onHoverStart={() => setHoverFeature(index)}
                  onHoverEnd={() => setHoverFeature(null)}
                >
                  <motion.div
                    className={`h-full p-8 rounded-2xl transform-gpu backface-hidden ${
                      isDark 
                        ? 'bg-gradient-to-b from-[#00091b] to-[#00052f] border border-[#00cbdd]/20' 
                        : 'bg-white border border-gray-200'
                    } shadow-xl hover:shadow-2xl transition-all duration-300`}
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                    whileHover={{
                      rotateX: 5,
                      rotateY: 5,
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {/* Gradient background on hover */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0`}
                      animate={{ opacity: hoverFeature === index ? 0.05 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Icon with 3D effect */}
                    <motion.div 
                      className={`p-4 rounded-xl bg-gradient-to-br ${feature.color} text-white inline-block mb-6`}
                      style={{
                        transform: "translateZ(20px)",
                      }}
                      whileHover={{ rotate: 5 }}
                    >
                      {feature.icon}
                    </motion.div>
                    
                    {/* Title with 3D effect */}
                    <motion.h3 
                      className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-[#00091b]'}`}
                      style={{
                        transform: "translateZ(15px)",
                      }}
                    >
                      {feature.title}
                    </motion.h3>
                    
                    {/* Description with 3D effect */}
                    <motion.p
                      className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                      style={{
                        transform: "translateZ(10px)",
                      }}
                    >
                      {feature.description}
                    </motion.p>
                    
                    {/* Additional details that show on hover */}
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: hoverFeature === index ? 'auto' : 0,
                        opacity: hoverFeature === index ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      style={{
                        transform: "translateZ(5px)",
                      }}
                      className="overflow-hidden"
                    >
                      <div className={`p-4 rounded-lg mb-4 text-sm ${
                        isDark 
                          ? 'bg-[#000927]/60 text-gray-300' 
                          : 'bg-gray-50 text-gray-700'
                      }`}>
                        {feature.details}
                      </div>
                      
                      <motion.button
                        className={`flex items-center text-sm font-medium ${
                          isDark ? 'text-[#00cbdd] hover:text-blue-400' : 'text-blue-600 hover:text-blue-800'
                        }`}
                        whileHover={{ x: 5 }}
                      >
                        Learn more <ArrowRight className="ml-1 h-3 w-3" />
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Stats cards with motion effects */}
        <motion.div
          style={{ 
            opacity: statsOpacity,
            y: statsY
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <h3 className={`text-2xl font-bold col-span-1 md:col-span-3 mb-8 text-center ${isDark ? 'text-white' : 'text-[#00091b]'}`}>
            Our Impact <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00cbdd] to-blue-500">By The Numbers</span>
          </h3>
          
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              whileHover={{ 
                scale: 1.03,
                transition: { duration: 0.2 }
              }}
              className="transform perspective-1000"
            >
              <StatCard
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                change={stat.change}
                trend={stat.trend}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 