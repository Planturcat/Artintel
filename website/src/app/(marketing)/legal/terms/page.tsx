"use client";
import { Metadata } from "next";
import TermsHero from "./TermsHero";
import {
  Gavel,
  Shield,
  ScrollText,
  AlertCircle,
  FileCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen" data-oid="f0j20_a">
      <TermsHero data-oid="_jk1gyi" />

      <div className="container px-4 py-16 md:px-6 md:py-24" data-oid="gou96kt">
        <div className="mx-auto max-w-3xl" data-oid="gufmxa2">
          <div className="mb-12 flex items-start space-x-3" data-oid="ncbd98r">
            <Gavel className="h-7 w-7 text-primary mt-1" data-oid=".t28x3u" />
            <div data-oid="spvn23o">
              <h2
                className="text-3xl font-bold tracking-tight mb-4"
                data-oid=":f0u46p"
              >
                Terms of Service
              </h2>
              <p className="text-muted-foreground" data-oid="6wt6ax_">
                These Terms of Service govern your use of the Artintel services
                and products. Please read them carefully.
              </p>
            </div>
          </div>

          <div
            className="prose prose-gray dark:prose-invert max-w-none"
            data-oid="5v87.r:"
          >
            <h3 className="text-2xl font-bold" data-oid="qo3_cyx">
              1. Introduction
            </h3>
            <p data-oid="nco7q1_">
              Welcome to Artintel. By accessing or using our services, you agree
              to be bound by these Terms of Service. If you do not agree to
              these terms, please do not use our services.
            </p>

            <h3 className="text-2xl font-bold" data-oid="xu-km50">
              2. Use of Services
            </h3>
            <p data-oid="396zy-j">
              Artintel provides AI-powered tools and services for creative
              professionals. You agree to use these services only for lawful
              purposes and in accordance with these Terms.
            </p>

            <h3 className="text-2xl font-bold" data-oid="q2m339h">
              3. User Accounts
            </h3>
            <p data-oid="5kfay53">
              To access certain features of our services, you may be required to
              create an account. You are responsible for maintaining the
              confidentiality of your account credentials and for all activities
              that occur under your account.
            </p>

            <h3 className="text-2xl font-bold" data-oid="f6r5iww">
              4. Intellectual Property
            </h3>
            <p data-oid="j62fnk:">
              All content generated through Artintel services is subject to our
              Intellectual Property policies. While you retain rights to your
              original inputs, Artintel maintains ownership of the underlying
              technology and models.
            </p>

            <h3 className="text-2xl font-bold" data-oid=".f-pihf">
              5. Privacy
            </h3>
            <p data-oid="if1rri_">
              Your privacy is important to us. Our Privacy Policy, which is
              incorporated into these Terms, explains how we collect, use, and
              protect your personal information.
            </p>

            <h3 className="text-2xl font-bold" data-oid="d.n0t37">
              6. Limitations and Restrictions
            </h3>
            <p data-oid="er80nzx">
              You agree not to: (a) use our services to create, upload, or share
              content that is illegal, harmful, or violates the rights of
              others; (b) attempt to reverse engineer or extract the underlying
              models or algorithms; (c) use automated means to access or
              interact with our services without our express permission; or (d)
              interfere with the security or functionality of our services.
            </p>

            <h3 className="text-2xl font-bold" data-oid="n-ye:93">
              7. Termination
            </h3>
            <p data-oid="0rvfoio">
              We reserve the right to suspend or terminate your access to our
              services at any time for violations of these Terms or for any
              other reason at our discretion.
            </p>

            <h3 className="text-2xl font-bold" data-oid="zjh1d52">
              8. Changes to Terms
            </h3>
            <p data-oid="skcyye3">
              We may modify these Terms from time to time. We will notify users
              of significant changes. Your continued use of our services after
              such modifications constitutes your acceptance of the updated
              Terms.
            </p>

            <h3 className="text-2xl font-bold" data-oid=".3qnrzr">
              9. Disclaimer of Warranties
            </h3>
            <p data-oid="2ozh056">
              Our services are provided "as is" without any warranties,
              expressed or implied. We do not guarantee that our services will
              meet your requirements or be available on an uninterrupted,
              secure, or error-free basis.
            </p>

            <h3 className="text-2xl font-bold" data-oid=":q49:vn">
              10. Limitation of Liability
            </h3>
            <p data-oid="vgqf9tl">
              To the maximum extent permitted by law, Artintel shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages resulting from your use of or inability to use
              our services.
            </p>
          </div>

          <div className="mt-14 border-t pt-10" data-oid="y1.aia0">
            <div className="grid gap-8 md:grid-cols-2" data-oid="bvb07qe">
              <div
                className="rounded-lg border bg-background p-6"
                data-oid="5ryl-ih"
              >
                <div
                  className="flex items-center space-x-3 mb-4"
                  data-oid="o1876df"
                >
                  <Shield className="h-5 w-5 text-primary" data-oid="ru83qlj" />
                  <h3 className="font-semibold" data-oid="f_-x53o">
                    Privacy Policy
                  </h3>
                </div>
                <p
                  className="text-sm text-muted-foreground mb-4"
                  data-oid="rm3b8vs"
                >
                  Learn how we collect, use, and protect your personal
                  information.
                </p>
                <Button variant="outline" asChild size="sm" data-oid="alr_j_t">
                  <Link href="/legal/privacy" data-oid="appohq_">
                    View Privacy Policy
                  </Link>
                </Button>
              </div>

              <div
                className="rounded-lg border bg-background p-6"
                data-oid="pp679f6"
              >
                <div
                  className="flex items-center space-x-3 mb-4"
                  data-oid="-:tl3gv"
                >
                  <FileCheck
                    className="h-5 w-5 text-primary"
                    data-oid="b-6_nkc"
                  />

                  <h3 className="font-semibold" data-oid="c35lk2b">
                    Acceptable Use Policy
                  </h3>
                </div>
                <p
                  className="text-sm text-muted-foreground mb-4"
                  data-oid="-8zkw02"
                >
                  Guidelines for responsible and ethical use of our AI services.
                </p>
                <Button variant="outline" asChild size="sm" data-oid="-5ay2au">
                  <Link href="/legal/acceptable-use" data-oid="dc.wfe6">
                    View Acceptable Use
                  </Link>
                </Button>
              </div>
            </div>

            <div
              className="mt-12 flex flex-col items-center justify-center space-y-4 text-center"
              data-oid="-_yfwlu"
            >
              <AlertCircle
                className="h-8 w-8 text-muted-foreground"
                data-oid=".rmwvpb"
              />

              <p
                className="text-sm text-muted-foreground max-w-md"
                data-oid="jrwi-0:"
              >
                If you have any questions about these Terms of Service, please
                contact us at legal@artintel.ai
              </p>
              <div className="flex space-x-4" data-oid="n_3go_2">
                <Button variant="link" size="sm" asChild data-oid="yi160zv">
                  <Link href="/contact" data-oid="eim2.8i">
                    Contact Us
                  </Link>
                </Button>
                <Button variant="link" size="sm" asChild data-oid="lg07f4i">
                  <Link href="/support" data-oid="ow8cedn">
                    Support
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
