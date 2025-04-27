import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, RefreshCcw, HelpCircle, AlertTriangle } from "lucide-react";
import Wrapper from "@/components/global/wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Error | Artintel",
  description: "Something went wrong. We're working to fix the issue.",
};

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Wrapper className="flex-grow flex items-center justify-center py-20">
        <div className="text-center max-w-2xl mx-auto">
          <div className="relative mb-6 mx-auto">
            <div className="absolute inset-0 bg-red-500/10 rounded-full blur-3xl transform scale-75 opacity-50"></div>
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <AlertTriangle className="h-16 w-16 text-red-500" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Something Went Wrong</h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            We're sorry, but we encountered an error while processing your request. Our team has been notified and is working to resolve the issue.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span>Back to Home</span>
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full flex items-center gap-2">
              <RefreshCcw className="h-4 w-4" />
              <span>Refresh Page</span>
            </Button>
          </div>
          
          <div className="bg-card/50 border border-border/80 rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Need assistance?</h2>
            <p className="text-muted-foreground mb-4">
              If the problem persists, please contact our support team for help.
            </p>
            <Button asChild className="rounded-full">
              <Link href="/contact" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                <span>Contact Support</span>
              </Link>
            </Button>
            
            <div className="mt-6 pt-6 border-t border-border/40">
              <h3 className="text-sm font-medium mb-2">Error Information</h3>
              <div className="bg-muted/50 rounded-md p-3 text-sm text-muted-foreground text-left">
                <p>Error ID: <span className="font-mono">ERR_12345678</span></p>
                <p>Time: <span className="font-mono">{new Date().toISOString()}</span></p>
                <p>Path: <span className="font-mono">/current/path</span></p>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
