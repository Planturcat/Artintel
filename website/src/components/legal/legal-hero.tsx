"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, FileText, Scale, Bookmark, Target } from "lucide-react";
import styles from "@/styles/legal-animations.module.css";

interface LegalHeroProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const LegalHero: React.FC<LegalHeroProps> = ({
  title,
  description,
  icon = (
    <ShieldCheck className="w-12 h-12 text-indigo-500/70" data-oid="t:66kyo" />
  ),
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setMousePosition({ x, y });
  };

  // Parallax effect calculations
  const calculateTransform = (depth: number) => {
    const moveX = (mousePosition.x - 0.5) * depth;
    const moveY = (mousePosition.y - 0.5) * depth;
    return `translate(${moveX}px, ${moveY}px)`;
  };

  return (
    <div
      className="relative w-full bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 overflow-hidden py-16 md:py-24"
      onMouseMove={handleMouseMove}
      data-oid="eln6ues"
    >
      {/* Background elements */}
      <div
        className={`${styles.parallaxBg} ${styles.gradientBg} absolute inset-0 opacity-50`}
        style={{ transform: calculateTransform(20) }}
        data-oid="m5joi0b"
      />

      <div
        className={`${styles.glow} absolute top-1/4 left-1/4`}
        style={{ transform: calculateTransform(-30) }}
        data-oid="smtniwj"
      />

      <div
        className={`${styles.glow} absolute bottom-1/4 right-1/4`}
        style={{ transform: calculateTransform(-20) }}
        data-oid="vdj84qn"
      />

      {/* Floating icons */}
      <motion.div
        className={`${styles.iconContainer} ${styles.iconFloat1} top-24 left-[15%] hidden md:block`}
        style={{ transform: calculateTransform(-15) }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1 }}
        data-oid="34d11kb"
      >
        {icon}
      </motion.div>

      <motion.div
        className={`${styles.iconContainer} ${styles.iconFloat2} bottom-20 left-[20%] hidden md:block`}
        style={{ transform: calculateTransform(-10) }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1, delay: 0.2 }}
        data-oid=".-suw1z"
      >
        <FileText className="w-10 h-10 text-blue-500/70" data-oid="csj3aab" />
      </motion.div>

      <motion.div
        className={`${styles.iconContainer} ${styles.iconFloat3} top-32 right-[15%] hidden md:block`}
        style={{ transform: calculateTransform(-12) }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1, delay: 0.4 }}
        data-oid="5_zxusn"
      >
        <Scale className="w-14 h-14 text-purple-500/70" data-oid="k9tqtse" />
      </motion.div>

      <motion.div
        className={`${styles.iconContainer} ${styles.iconPulse} bottom-24 right-[20%] hidden md:block`}
        style={{ transform: calculateTransform(-8) }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1, delay: 0.6 }}
        data-oid="6jcq.cf"
      >
        <Bookmark className="w-10 h-10 text-pink-500/70" data-oid="jjg_ahk" />
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10" data-oid="xoxejqd">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          data-oid="5o06lo7"
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            data-oid="kmptbwt"
          >
            {title}
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            data-oid="saef0ot"
          >
            {description}
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-2 md:gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            data-oid="222fbip"
          >
            <div
              className="px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium"
              data-oid="0j-2dt4"
            >
              Last Updated: June 15, 2023
            </div>
            <div
              className="px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium"
              data-oid="r:38rkz"
            >
              Effective: July 1, 2023
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LegalHero;
