"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { X, UserPlus } from 'lucide-react';

interface NonExistentUserModalProps {
  email: string;
  onClose: () => void;
}

/**
 * Modal shown when a user tries to login with an email that doesn't exist
 */
export default function NonExistentUserModal({ email, onClose }: NonExistentUserModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-md bg-gray-900 rounded-xl border border-gray-800 shadow-xl overflow-hidden"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="p-6">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-blue-500/20 p-3 rounded-full">
              <UserPlus className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          {/* Content */}
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-white mb-2">
              Account Not Found
            </h3>
            <p className="text-gray-300 mb-2">
              We couldn't find an account with <span className="font-medium text-white">{email}</span>
            </p>
            <p className="text-gray-400 text-sm">
              Would you like to create a new account with this email?
            </p>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col space-y-3">
            <Link
              href={`/register?email=${encodeURIComponent(email)}`}
              className="w-full flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-[#00cbdd] to-blue-600 text-white rounded-lg font-medium hover:from-[#00cbdd]/90 hover:to-blue-700 transition-all duration-300"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Create New Account
            </Link>
            
            <button
              onClick={onClose}
              className="w-full px-4 py-2.5 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Try Different Email
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
