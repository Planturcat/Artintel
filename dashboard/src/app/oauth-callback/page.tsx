"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

// Simple Spinner component
function Spinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };
  
  return (
    <div className="flex justify-center">
      <div className={`${sizeClasses[size]} border-4 border-primary border-t-transparent rounded-full animate-spin`}></div>
    </div>
  );
}

export default function OAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    // If already authenticated, redirect to dashboard
    if (isAuthenticated) {
      router.push("/dashboard");
      return;
    }

    const handleOAuthCallback = async () => {
      try {
        // Get token from URL query parameters
        const token = searchParams.get("token");
        
        if (!token) {
          setError("No authentication token received");
          return;
        }
        
        // Store token - Just store it in localStorage for now since we don't have
        // a setToken method directly in the useAuth hook
        localStorage.setItem("Artintel_token", token);
        
        // Refresh the page or redirect to force a re-authentication using the token
        router.push("/dashboard");
      } catch (err) {
        console.error("OAuth callback error:", err);
        setError("Failed to complete authentication");
      }
    };

    handleOAuthCallback();
  }, [isAuthenticated, router, searchParams]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
        <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-xl shadow-md">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
              Authentication Error
            </h2>
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          </div>
          <div className="mt-8">
            <button
              onClick={() => router.push("/login")}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Return to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Completing Authentication
        </h2>
        <Spinner size="lg" />
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Please wait while we sign you in...
        </p>
      </div>
    </div>
  );
} 