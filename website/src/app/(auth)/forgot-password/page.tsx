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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail } from "lucide-react";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | Artintel",
  description: "Reset your password to regain access to your Artintel account.",
};

export default function ForgotPasswordPage() {
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
            <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
            <CardDescription>
              Enter your email address and we'll send you a link to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  className="pl-10"
                />
              </div>
            </div>
            <Button className="w-full">Send Reset Link</Button>
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
