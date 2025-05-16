"use client";

import Link from "next/link";
import { useTheme } from '@/contexts/ThemeContext';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <footer className={`py-12 px-6 ${isDark ? 'bg-[#00091b]' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Logo and Description */}
        <div className="col-span-2">
          <Link href="/" className={`text-2xl font-bold inline-block mb-4 ${isDark ? 'text-white' : 'text-[#00091b]'}`}>
            Artintel<span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00cbdd] to-blue-500"> LLMs</span>
          </Link>
          <p className={`max-w-md mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Empower your business with our no-code platform that simplifies fine-tuning, deployment, and management of open‑source AI models.
          </p>
          <div className="flex space-x-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={`transition-colors ${isDark ? 'text-gray-400 hover:text-[#00cbdd]' : 'text-gray-500 hover:text-[#00cbdd]'}`}>
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={`transition-colors ${isDark ? 'text-gray-400 hover:text-[#00cbdd]' : 'text-gray-500 hover:text-[#00cbdd]'}`}>
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={`transition-colors ${isDark ? 'text-gray-400 hover:text-[#00cbdd]' : 'text-gray-500 hover:text-[#00cbdd]'}`}>
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-[#00091b]'}`}>Product</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/features" className={`transition-colors ${isDark ? 'text-gray-400 hover:text-[#00cbdd]' : 'text-gray-600 hover:text-[#00cbdd]'}`}>
                Features
              </Link>
            </li>
            <li>
              <Link href="/pricing" className={`transition-colors ${isDark ? 'text-gray-400 hover:text-[#00cbdd]' : 'text-gray-600 hover:text-[#00cbdd]'}`}>
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/documentation" className={`transition-colors ${isDark ? 'text-gray-400 hover:text-[#00cbdd]' : 'text-gray-600 hover:text-[#00cbdd]'}`}>
                Documentation
              </Link>
            </li>
            <li>
              <Link href="/changelog" className={`transition-colors ${isDark ? 'text-gray-400 hover:text-[#00cbdd]' : 'text-gray-600 hover:text-[#00cbdd]'}`}>
                Changelog
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-[#00091b]'}`}>Resources</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/blog" className={`transition-colors ${isDark ? 'text-gray-400 hover:text-[#00cbdd]' : 'text-gray-600 hover:text-[#00cbdd]'}`}>
                Blog
              </Link>
            </li>
            <li>
              <Link href="/tutorials" className={`transition-colors ${isDark ? 'text-gray-400 hover:text-[#00cbdd]' : 'text-gray-600 hover:text-[#00cbdd]'}`}>
                Tutorials
              </Link>
            </li>
            <li>
              <Link href="/case-studies" className={`transition-colors ${isDark ? 'text-gray-400 hover:text-[#00cbdd]' : 'text-gray-600 hover:text-[#00cbdd]'}`}>
                Case Studies
              </Link>
            </li>
            <li>
              <Link href="/guides" className={`transition-colors ${isDark ? 'text-gray-400 hover:text-[#00cbdd]' : 'text-gray-600 hover:text-[#00cbdd]'}`}>
                Guides
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-[#00091b]'}`}>Company</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className={`transition-colors ${isDark ? 'text-gray-400 hover:text-[#00cbdd]' : 'text-gray-600 hover:text-[#00cbdd]'}`}>
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className={`transition-colors ${isDark ? 'text-gray-400 hover:text-[#00cbdd]' : 'text-gray-600 hover:text-[#00cbdd]'}`}>
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy" className={`transition-colors ${isDark ? 'text-gray-400 hover:text-[#00cbdd]' : 'text-gray-600 hover:text-[#00cbdd]'}`}>
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className={`transition-colors ${isDark ? 'text-gray-400 hover:text-[#00cbdd]' : 'text-gray-600 hover:text-[#00cbdd]'}`}>
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom section */}
      <div className={`max-w-7xl mx-auto mt-12 pt-8 flex flex-col md:flex-row justify-between items-center ${
        isDark ? 'border-t border-gray-800' : 'border-t border-gray-200'
      }`}>
        <p className="text-gray-500 text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} Artintel. All rights reserved.
        </p>
        <div className="flex items-center space-x-6">
          <Link href="/terms" className={`text-sm ${isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-600 hover:text-[#00cbdd]'}`}>
            Terms of Service
          </Link>
          <Link href="/privacy" className={`text-sm ${isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-600 hover:text-[#00cbdd]'}`}>
            Privacy Policy
          </Link>
          <Link href="/cookies" className={`text-sm ${isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-600 hover:text-[#00cbdd]'}`}>
            Cookies
          </Link>
        </div>
      </div>
    </footer>
  );
} 