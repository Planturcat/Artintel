import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Search, HelpCircle } from "lucide-react";
import Wrapper from "@/components/global/wrapper";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Wrapper className="flex-grow flex items-center justify-center py-20">
        <div className="text-center max-w-2xl mx-auto">
          <div className="relative mb-6 mx-auto">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl transform scale-75 opacity-50"></div>
            <div className="relative text-9xl font-bold text-primary">404</div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span>Back to Home</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="/contact" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                <span>Contact Support</span>
              </Link>
            </Button>
          </div>
          
          <div className="bg-card/50 border border-border/80 rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Looking for something specific?</h2>
            <div className="flex gap-4">
              <div className="flex-grow relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search our site..."
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-border bg-background"
                />
              </div>
              <Button>Search</Button>
            </div>
            
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">Popular pages:</h3>
              <div className="flex flex-wrap gap-2">
                <Button asChild variant="link" size="sm" className="h-auto p-0">
                  <Link href="/docs">Documentation</Link>
                </Button>
                <span className="text-muted-foreground">•</span>
                <Button asChild variant="link" size="sm" className="h-auto p-0">
                  <Link href="/models">Models</Link>
                </Button>
                <span className="text-muted-foreground">•</span>
                <Button asChild variant="link" size="sm" className="h-auto p-0">
                  <Link href="/pricing">Pricing</Link>
                </Button>
                <span className="text-muted-foreground">•</span>
                <Button asChild variant="link" size="sm" className="h-auto p-0">
                  <Link href="/blog">Blog</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
