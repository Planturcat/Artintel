"use client";
import { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import MaxWidthWrapper from "@/components/global/max-width-wrapper";
import { cn } from "@/utils";

export const metadata: Metadata = {
  title: "Security | Artintel",
  description:
    "Learn about Artintel's security practices and how we protect your data.",
};

const SecurityPage = () => {
  return (
    <main
      className="flex flex-col items-center min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-background/90"
      data-oid="weavvy3"
    >
      <MaxWidthWrapper className="max-w-3xl w-full" data-oid="cxkzhqj">
        <div
          className="prose prose-invert prose-headings:text-primary prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground"
          data-oid="2wdf6m:"
        >
          <div
            className="flex items-center gap-3 mb-6 not-prose"
            data-oid="f5hg18p"
          >
            <ShieldCheck className="w-8 h-8 text-primary" data-oid="sxpp_0j" />
            <h1
              className="text-4xl font-extrabold tracking-tight sm:text-5xl text-primary !m-0"
              data-oid="r4z078k"
            >
              Security Practices
            </h1>
          </div>
          <div
            className="p-6 bg-card/50 border border-border rounded-lg shadow-sm backdrop-blur-sm"
            data-oid="l5mf8_x"
          >
            <h2
              className="text-2xl font-semibold text-white"
              data-oid="r38r4g_"
            >
              Our Commitment to Security
            </h2>
            <p data-oid="ta41a98">
              At Artintel, we prioritize the security and privacy of your data.
              We implement industry-standard and advanced security measures to
              ensure your information and AI models remain protected at all
              times.
            </p>

            <h2
              className="text-2xl font-semibold text-white mt-8"
              data-oid="j6jrkm7"
            >
              Data Encryption
            </h2>
            <p data-oid="l:5l-l8">
              All data is encrypted both in transit and at rest:
            </p>
            <ul data-oid=":s_.p3w">
              <li data-oid="wki6bc1">
                TLS 1.3 encryption for all data in transit
              </li>
              <li data-oid="e00yi4r">AES-256 encryption for data at rest</li>
              <li data-oid="vdw2xdi">
                End-to-end encryption for sensitive communications
              </li>
            </ul>

            <h2
              className="text-2xl font-semibold text-white mt-8"
              data-oid="gvvjp9u"
            >
              Infrastructure Security
            </h2>
            <p data-oid="m2r6ap2">
              Our infrastructure employs multiple layers of security:
            </p>
            <ul data-oid="2145yd2">
              <li data-oid="u3j-pg.">SOC 2 Type II certified data centers</li>
              <li data-oid="739uy6k">
                Regular penetration testing and vulnerability scanning
              </li>
              <li data-oid="5n_e32y">
                24/7 security monitoring and intrusion detection
              </li>
              <li data-oid="wuanmmv">
                Distributed denial-of-service (DDoS) protection
              </li>
            </ul>

            <h2
              className="text-2xl font-semibold text-white mt-8"
              data-oid="68uvda_"
            >
              Access Controls
            </h2>
            <p data-oid="w0o8p07">
              We enforce strict access controls to protect your data:
            </p>
            <ul data-oid="ohx-lqq">
              <li data-oid=".8996fr">
                Role-based access control (RBAC) for all systems
              </li>
              <li data-oid="_hv502_">
                Multi-factor authentication (MFA) for all staff
              </li>
              <li data-oid="y:1ls5q">
                Least privilege principle for all access permissions
              </li>
              <li data-oid="05wgik_">
                Regular access reviews and logging of all admin actions
              </li>
            </ul>

            <h2
              className="text-2xl font-semibold text-white mt-8"
              data-oid="c8ptht-"
            >
              AI Model Security
            </h2>
            <p data-oid="fl1bl._">
              We implement specialized security measures for AI models:
            </p>
            <ul data-oid="n0qd1o5">
              <li data-oid="276.qvu">Model isolation and containerization</li>
              <li data-oid="z7ma88u">
                Secure API endpoints with rate limiting and authentication
              </li>
              <li data-oid="5cj_yv7">
                Regular security audits of model behavior
              </li>
              <li data-oid="rlce3w6">
                Monitoring for prompt injection and other AI-specific
                vulnerabilities
              </li>
            </ul>

            <h2
              className="text-2xl font-semibold text-white mt-8"
              data-oid=".jx_zkg"
            >
              Compliance
            </h2>
            <p data-oid="z07v..0">
              Artintel complies with the following security standards and
              regulations:
            </p>
            <ul data-oid="-9k_qo5">
              <li data-oid="ueh0t6m">SOC 2 Type II</li>
              <li data-oid="ljj76vl">GDPR</li>
              <li data-oid="je466.t">CCPA/CPRA</li>
              <li data-oid="_94nu1l">ISO 27001</li>
              <li data-oid="rxylb53">HIPAA (for customers in healthcare)</li>
            </ul>

            <h2
              className="text-2xl font-semibold text-white mt-8"
              data-oid="g6_p1ew"
            >
              Security Team
            </h2>
            <p data-oid="53dh5lj">
              Our dedicated security team works around the clock to protect your
              data. We employ security professionals with backgrounds in AI
              security, cloud security, and application security.
            </p>

            <h2
              className="text-2xl font-semibold text-white mt-8"
              data-oid="afs_eu6"
            >
              Responsible Disclosure
            </h2>
            <p data-oid="zg85gq2">
              We appreciate the work of security researchers. If you discover a
              security vulnerability, please report it to{" "}
              <a href="mailto:security@artintel.com" data-oid="o8olv.s">
                security@artintel.com
              </a>
              .
            </p>

            <h2
              className="text-2xl font-semibold text-white mt-8"
              data-oid="saq7aj8"
            >
              Questions?
            </h2>
            <p data-oid="lcdd94k">
              For more information about our security practices, please contact
              our security team at{" "}
              <a href="mailto:security@artintel.com" data-oid="vs9.b_g">
                security@artintel.com
              </a>
              .
            </p>

            <div
              className="mt-10 pt-6 border-t border-border/40"
              data-oid="29_m.sz"
            >
              <p className="text-sm text-muted-foreground" data-oid="524-5gi">
                <strong data-oid="m464q0_">Last Updated:</strong> April 25, 2024
              </p>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </main>
  );
};

export default SecurityPage;
