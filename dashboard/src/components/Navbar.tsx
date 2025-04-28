"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import { useTheme } from '@/contexts/ThemeContext';
import ThemeToggle from "@/components/ThemeToggle";
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? `py-3 backdrop-blur-lg shadow-md ${isDark ? 'bg-[#00031b]/80' : 'bg-white/90'}`
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className={`text-2xl font-bold transition-colors ${isDark ? 'text-white' : 'text-[#00031b]'}`}>
          Artintel<span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00cbdd] to-blue-500"> LLMs</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            href="/features" 
            className={`transition-colors ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-[#00cbdd]'}`}
          >
            Features
          </Link>
          <Link 
            href="/pricing" 
            className={`transition-colors ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-[#00cbdd]'}`}
          >
            Pricing
          </Link>
          <Link 
            href="/docs" 
            className={`transition-colors ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-[#00cbdd]'}`}
          >
            Documentation
          </Link>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link 
              href="/login" 
              className={`transition-colors ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-[#00cbdd]'}`}
            >
              Log in
            </Link>
            <Link 
              href="/register" 
              className="bg-gradient-to-r from-[#00cbdd] to-blue-600 hover:from-[#00cbdd]/90 hover:to-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
            >
              Sign up
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <ThemeToggle className="mr-4" />
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`transition-colors ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden absolute top-full left-0 right-0 backdrop-blur-md p-6 shadow-lg ${
          isDark ? 'bg-[#00031b]/95' : 'bg-white/95'
        }`}>
          <div className="flex flex-col space-y-4">
            <Link 
              href="/features" 
              className={`transition-colors py-2 ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-[#00cbdd]'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="/pricing" 
              className={`transition-colors py-2 ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-[#00cbdd]'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              href="/docs" 
              className={`transition-colors py-2 ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-[#00cbdd]'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Documentation
            </Link>
            <div className="pt-4 flex flex-col space-y-2">
              <Link 
                href="/login" 
                className={`transition-colors py-2 ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-[#00cbdd]'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Log in
              </Link>
              <Link 
                href="/register" 
                className="bg-gradient-to-r from-[#00cbdd] to-blue-600 hover:from-[#00cbdd]/90 hover:to-blue-700 text-white py-3 rounded-lg text-center transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 