"use client";

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function CTASection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const planFeatures = [
    { name: "Free trial for 14 days", starter: true, pro: true, enterprise: true },
    { name: "Up to 5 fine-tuned models", starter: true, pro: true, enterprise: true },
    { name: "10K tokens per month", starter: true, pro: false, enterprise: false },
    { name: "100K tokens per month", starter: false, pro: true, enterprise: false },
    { name: "Unlimited tokens", starter: false, pro: false, enterprise: true },
    { name: "5 team members", starter: true, pro: false, enterprise: false },
    { name: "25 team members", starter: false, pro: true, enterprise: false },
    { name: "Unlimited team members", starter: false, pro: false, enterprise: true },
    { name: "Standard support", starter: true, pro: true, enterprise: false },
    { name: "Priority support", starter: false, pro: true, enterprise: true },
    { name: "Dedicated account manager", starter: false, pro: false, enterprise: true },
    { name: "Custom deployment options", starter: false, pro: false, enterprise: true },
  ];

  return (
    <section id="cta" className="w-full py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-[#00091b]'}`}>
            Ready to <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00cbdd] to-blue-500">Transform</span> Your Enterprise?
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-[#00091b]'}`}>
            Choose the plan that's right for your business and start building with Artintel today
          </p>
        </motion.div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Starter Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            className={`rounded-xl overflow-hidden border ${
              isDark 
                ? 'bg-[#00091b]/50 border-gray-700' 
                : 'bg-white border-gray-200'
            } shadow-md hover:shadow-lg transition-all duration-300`}
          >
            <div className="p-6">
              <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-[#00091b]'}`}>
                Starter
              </h3>
              <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Perfect for individuals and small teams
              </p>
              <div className="mb-4">
                <span className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-[#00091b]'}`}>$49</span>
                <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>/month</span>
              </div>

              <ul className="mb-6 space-y-2">
                {planFeatures.map((feature, index) => (
                  feature.starter && (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-[#00cbdd] mr-2 flex-shrink-0" />
                      <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{feature.name}</span>
                    </li>
                  )
                ))}
              </ul>

              <Link
                href="/signup"
                className="w-full flex items-center justify-center py-2 px-4 rounded-md bg-gradient-to-r from-[#00cbdd] to-blue-500 text-white font-medium hover:shadow-lg transition-all duration-300"
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`rounded-xl overflow-hidden border ${
              isDark 
                ? 'bg-[#00091b]/50 border-[#00cbdd]' 
                : 'bg-white border-[#00cbdd]'
            } shadow-lg hover:shadow-xl transition-all duration-300 relative z-10 scale-105`}
          >
            <div className="bg-gradient-to-r from-[#00cbdd] to-blue-500 py-1 text-white text-center text-sm font-medium">
              Most Popular
            </div>
            <div className="p-6">
              <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-[#00091b]'}`}>
                Professional
              </h3>
              <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Ideal for growing teams and businesses
              </p>
              <div className="mb-4">
                <span className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-[#00091b]'}`}>$199</span>
                <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>/month</span>
              </div>

              <ul className="mb-6 space-y-2">
                {planFeatures.map((feature, index) => (
                  feature.pro && (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-[#00cbdd] mr-2 flex-shrink-0" />
                      <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{feature.name}</span>
                    </li>
                  )
                ))}
              </ul>

              <Link
                href="/signup"
                className="w-full flex items-center justify-center py-2 px-4 rounded-md bg-gradient-to-r from-[#00cbdd] to-blue-500 text-white font-medium hover:shadow-lg transition-all duration-300"
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* Enterprise Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`rounded-xl overflow-hidden border ${
              isDark 
                ? 'bg-[#00091b]/50 border-gray-700' 
                : 'bg-white border-gray-200'
            } shadow-md hover:shadow-lg transition-all duration-300`}
          >
            <div className="p-6">
              <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-[#00091b]'}`}>
                Enterprise
              </h3>
              <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                For large organizations with advanced needs
              </p>
              <div className="mb-4">
                <span className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-[#00091b]'}`}>Custom</span>
              </div>

              <ul className="mb-6 space-y-2">
                {planFeatures.map((feature, index) => (
                  feature.enterprise && (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-[#00cbdd] mr-2 flex-shrink-0" />
                      <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{feature.name}</span>
                    </li>
                  )
                ))}
              </ul>

              <Link
                href="/contact"
                className="w-full flex items-center justify-center py-2 px-4 rounded-md border border-[#00cbdd] text-[#00cbdd] font-medium hover:bg-[#00cbdd]/10 transition-all duration-300"
              >
                Contact Sales <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`p-8 rounded-xl ${
            isDark 
              ? 'bg-gradient-to-br from-[#00091b] to-[#00091b]' 
              : 'bg-gradient-to-br from-gray-50 to-white'
          } border border-[#00cbdd]/30 shadow-xl text-center`}
        >
          <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-[#00091b]'}`}>
            Not sure which plan is right for you?
          </h3>
          <p className={`mb-6 max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Schedule a personalized demo with our team to explore how Artintel can meet your specific needs and requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo"
              className="py-3 px-6 rounded-md bg-gradient-to-r from-[#00cbdd] to-blue-500 text-white font-medium hover:shadow-lg transition-all duration-300"
            >
              Schedule a Demo
            </Link>
            <Link
              href="/docs"
              className={`py-3 px-6 rounded-md border ${
                isDark 
                  ? 'border-gray-700 text-gray-300 hover:bg-gray-800' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-100'
              } font-medium transition-all duration-300`}
            >
              Read Documentation
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 