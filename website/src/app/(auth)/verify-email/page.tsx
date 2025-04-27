import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, CheckCircle, RefreshCcw } from "lucide-react";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Email | Artintel",
  description: "Verify your email address to complete your Artintel account setup.",
};

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-md border-border/80">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-6">
              <Link href="/">
                <Image
                  src="/logo/Icon - PNG (1).png"
                  alt="Artintel Logo"
                  width={48}
                  height={48}
                  className="h-12 w-auto"
                />
              </Link>
            </div>
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
            <CardDescription>
              We've sent a verification link to <span className="font-medium">example@email.com</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-muted-foreground">
              Please check your email and click on the verification link to complete your account setup. If you don't see the email, check your spam folder.
            </p>
            <div className="flex flex-col space-y-2">
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <RefreshCcw className="h-4 w-4" />
                <span>Resend Verification Email</span>
              </Button>
              <p className="text-xs text-muted-foreground">
                You can resend the verification email in 60 seconds
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              <Link
                href="/signin"
                className="text-primary hover:underline inline-flex items-center"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Sign In
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <div>© {new Date().getFullYear()} Artintel. All rights reserved.</div>
          <div className="flex gap-4">
            <Link href="/legal/terms" className="hover:underline">Terms</Link>
            <Link href="/legal/privacy-policy" className="hover:underline">Privacy</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
