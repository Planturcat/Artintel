"use client";

import Icons from "@/components/global/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignIn } from "@clerk/nextjs";
import { LoaderIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const SignInPage = () => {
  const router = useRouter();

  const { isLoaded, signIn, setActive } = useSignIn();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    if (!emailAddress || !password) {
      return toast.warning("Please fill in all fields");
    }

    setIsLoading(true);

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
        redirectUrl: "/dashboard",
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push("/dashboard");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
        toast.error("Invalid email or password");
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      switch (err.errors[0]?.code) {
        case "form_identifier_not_found":
          toast.error("This email is not registered. Please sign up first.");
          break;
        case "form_password_incorrect":
          toast.error("Incorrect password. Please try again.");
          break;
        case "too_many_attempts":
          toast.error("Too many attempts. Please try again later.");
          break;
        default:
          toast.error("An error occurred. Please try again");
          break;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-6" data-oid="x0sf-b3">
      <div className="flex flex-col space-y-2 text-center" data-oid="o0eyw:y">
        <Icons.icon className="h-6 mx-auto" data-oid="zvj-gc." />
        <h1
          className="text-2xl font-semibold tracking-tight pt-2"
          data-oid="g6p55_u"
        >
          Sign in
        </h1>
        <p className="text-sm text-muted-foreground" data-oid="z7ra0q4">
          Enter your email below to sign in to your account
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6"
        data-oid="9gub7hf"
      >
        <div className="grid gap-2" data-oid="zzz8y1h">
          <Label htmlFor="email" data-oid="tiesdyk">
            Email
          </Label>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            data-oid="850gdn5"
          />
        </div>
        <div className="grid gap-2" data-oid="cs7_tw3">
          <Label htmlFor="password" data-oid="jzxb9y_">
            Password
          </Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            data-oid="x_b2jie"
          />
        </div>
        <div id="clerk-captcha" data-oid="1m:-t-w"></div>
        <Button type="submit" disabled={isLoading} data-oid="z8jsg9l">
          {isLoading ? (
            <LoaderIcon className="w-4 h-4 animate-spin" data-oid="1i1lclu" />
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      <p
        className="text-center text-sm text-muted-foreground"
        data-oid="zvxelf_"
      >
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="underline underline-offset-4 hover:text-primary"
          data-oid="slij.rj"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default SignInPage;
