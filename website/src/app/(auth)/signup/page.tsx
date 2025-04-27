"use client";

import Icons from "@/components/global/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { useSignUp } from "@clerk/nextjs";
import { LoaderIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const SignUpPage = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const router = useRouter();

  const [name, setName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [code, setCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    if (!name || !emailAddress || !password) {
      return toast.warning("Please fill in all fields");
    }

    setIsLoading(true);

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setVerified(true);

      await signUp.update({
        firstName: name.split(" ")[0],
        lastName: name.split(" ")[1],
      });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));

      switch (err.errors[0]?.code) {
        case "form_identifier_exists":
          toast.error("This email is already registered. Please sign in.");
          break;
        case "form_password_pwned":
          toast.error(
            "The password is too common. Please choose a stronger password.",
          );
          break;
        case "form_param_format_invalid":
          toast.error(
            "Invalid email address. Please enter a valid email address.",
          );
          break;
        case "form_password_length_too_short":
          toast.error(
            "Password is too short. Please choose a longer password.",
          );
          break;
        default:
          toast.error("An error occurred. Please try again");
          break;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    if (!code) {
      return toast.warning("Verification code is required");
    }

    setIsVerifying(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/dashboard");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
        toast.error("Invalid verification code");
      }
    } catch (err: any) {
      console.error("Error:", JSON.stringify(err, null, 2));
      toast.error("An error occurred. Please try again");
    } finally {
      setIsVerifying(false);
    }
  };

  return verified ? (
    <div className="flex flex-col space-y-6" data-oid="n8pdvas">
      <div className="flex flex-col space-y-2 text-center" data-oid="0z309ga">
        <Icons.icon className="h-6 mx-auto" data-oid="a:79wxs" />
        <h1
          className="text-2xl font-semibold tracking-tight pt-2"
          data-oid="ml6qait"
        >
          Please check your email
        </h1>
        <p className="text-sm text-muted-foreground" data-oid="98i7fsa">
          We&apos;ve sent a verification code to {emailAddress}
        </p>
      </div>

      <form
        onSubmit={handleVerify}
        className="flex flex-col gap-6"
        data-oid="ombpged"
      >
        <div className="grid gap-2" data-oid="5xzslb5">
          <Label htmlFor="code" data-oid="iq2h._t">
            Verification code
          </Label>
          <InputOTP
            maxLength={6}
            value={code}
            disabled={isVerifying}
            onChange={(e) => setCode(e)}
            data-oid=":wiu2wl"
          >
            <InputOTPGroup className="justify-center w-full" data-oid="egzh8ke">
              <InputOTPSlot index={0} data-oid="q67u-3r" />
              <InputOTPSlot index={1} data-oid="pygv68a" />
              <InputOTPSlot index={2} data-oid="okyyxrb" />
              <InputOTPSlot index={3} data-oid="fbdh3sd" />
              <InputOTPSlot index={4} data-oid="9gzd7nl" />
              <InputOTPSlot index={5} data-oid="i8tjbok" />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button type="submit" disabled={isVerifying} data-oid="bm0mqqd">
          {isVerifying ? (
            <LoaderIcon className="w-5 h-5 animate-spin" data-oid="khjoocu" />
          ) : (
            "Verify"
          )}
        </Button>
        <p
          className="text-center text-sm text-muted-foreground"
          data-oid="wg.b37s"
        >
          Back to signup{" "}
          <Button
            variant="link"
            type="button"
            disabled={isVerifying}
            onClick={() => setVerified(false)}
            data-oid="w3rz22k"
          >
            Sign up
          </Button>
        </p>
      </form>
    </div>
  ) : (
    <div className="flex flex-col space-y-6" data-oid="8tuwgo9">
      <div className="flex flex-col space-y-2 text-center" data-oid="q8p:-n4">
        <Icons.icon className="h-6 mx-auto" data-oid="pne_962" />
        <h1
          className="text-2xl font-semibold tracking-tight pt-2"
          data-oid="ereulzw"
        >
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground" data-oid="l9a6b9k">
          Enter your details below to create your account
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6"
        data-oid="pircr_5"
      >
        <div className="grid gap-2" data-oid="13qq3v8">
          <Label htmlFor="name" data-oid="3ukxkqq">
            Full Name
          </Label>
          <Input
            id="name"
            type="text"
            name="name"
            value={name}
            disabled={isLoading}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            data-oid="emudixj"
          />
        </div>
        <div className="grid gap-2" data-oid="cbq6vc2">
          <Label htmlFor="email" data-oid="r-pvpsj">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            name="email"
            disabled={isLoading}
            value={emailAddress}
            placeholder="name@example.com"
            onChange={(e) => setEmailAddress(e.target.value)}
            data-oid="mpt8lri"
          />
        </div>
        <div className="grid gap-2" data-oid="y9.hv.-">
          <Label htmlFor="password" data-oid="rj01d6v">
            Password
          </Label>
          <div className="relative" data-oid="yfw652c">
            <Input
              id="password"
              type="password"
              name="password"
              disabled={isLoading}
              value={password}
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              data-oid="91lrc.z"
            />
          </div>
        </div>
        <div id="clerk-captcha" data-oid="k:ebsse"></div>
        <Button type="submit" disabled={isLoading} data-oid="5xb1gsb">
          {isLoading ? (
            <LoaderIcon className="w-4 h-4 animate-spin" data-oid="hb3y7ls" />
          ) : (
            "Continue"
          )}
        </Button>
      </form>

      <p
        className="text-center text-sm text-muted-foreground"
        data-oid="6yp4puv"
      >
        Already have an account?{" "}
        <Link
          href="/signin"
          className="underline underline-offset-4 hover:text-primary"
          data-oid="d1-1qp0"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
