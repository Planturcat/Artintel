"use client";

import React from "react";
import { motion } from "framer-motion";
import LegalHero from "@/components/legal/legal-hero";
import DocumentDownload from "@/components/legal/document-download";
import DocumentNavigation from "@/components/legal/document-navigation";
import { Target, Shield, FileText, Lock, Users, Database } from "lucide-react";

const GDPRPage = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const sections = [
    { id: "overview", title: "GDPR Overview" },
    { id: "data-rights", title: "Data Subject Rights" },
    { id: "data-processing", title: "Data Processing" },
    { id: "data-transfers", title: "International Transfers" },
    { id: "security-measures", title: "Security Measures" },
  ];

  return (
    <>
      <LegalHero
        title="GDPR Compliance"
        description="Learn how Artintel complies with the General Data Protection Regulation (GDPR) and protects the privacy rights of European users."
        icon={<Target className="h-12 w-12" data-oid="-fktgny" />}
        data-oid="ngu4kuy"
      />

      <DocumentDownload
        title="GDPR Compliance Policy"
        lastUpdated="May 25, 2023"
        pdfUrl="/documents/gdpr-compliance.pdf"
        data-oid="5-dhvgp"
      />

      <div
        className="rounded-xl bg-white dark:bg-gray-900 p-6 shadow-sm border border-gray-100 dark:border-gray-800 my-8"
        data-oid="5zmaih7"
      >
        <DocumentNavigation sections={sections} data-oid="n6.f8as" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-10"
          data-oid="uednb2k"
        >
          <motion.div
            variants={fadeInUp}
            className="scroll-mt-24"
            id="overview"
            data-oid="6m._bb0"
          >
            <div className="flex flex-col md:flex-row gap-6" data-oid="o.5gg3t">
              <div
                className="flex-shrink-0 flex items-start justify-center md:justify-start"
                data-oid="-6165lu"
              >
                <div
                  className="rounded-full bg-indigo-100 dark:bg-indigo-900/30 p-3 text-indigo-600 dark:text-indigo-400"
                  data-oid="unqj5yg"
                >
                  <Target className="h-8 w-8" data-oid="wt63zut" />
                </div>
              </div>
              <div data-oid="frgydb5">
                <h2
                  className="text-2xl font-semibold text-gray-900 dark:text-white mb-4"
                  data-oid="6knqn6b"
                >
                  1. GDPR Overview
                </h2>
                <p
                  className="text-gray-700 dark:text-gray-300 mb-4"
                  data-oid="mtfjdg5"
                >
                  The General Data Protection Regulation (GDPR) is a
                  comprehensive data protection law that applies to the
                  processing of personal data of individuals within the European
                  Union (EU) and the European Economic Area (EEA). As a data
                  processor and controller, Artintel is committed to GDPR
                  compliance across our services and products.
                </p>
                <p
                  className="text-gray-700 dark:text-gray-300 mb-4"
                  data-oid="ix-sqn4"
                >
                  This GDPR Compliance Policy outlines how we collect, use,
                  store, and protect personal data in accordance with the
                  principles of GDPR, including lawfulness, fairness,
                  transparency, purpose limitation, data minimization, accuracy,
                  storage limitation, integrity, and confidentiality.
                </p>
                <div
                  className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg"
                  data-oid="qqrvoj5"
                >
                  <p
                    className="text-blue-800 dark:text-blue-300 text-sm"
                    data-oid="73ltute"
                  >
                    <strong data-oid="chwm9nv">Effective Date:</strong> May 25,
                    2018 (Last Updated: May 25, 2023)
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="scroll-mt-24"
            id="data-rights"
            data-oid="srupux5"
          >
            <div className="flex flex-col md:flex-row gap-6" data-oid="4ts4q5q">
              <div
                className="flex-shrink-0 flex items-start justify-center md:justify-start"
                data-oid="4spvutr"
              >
                <div
                  className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3 text-blue-600 dark:text-blue-400"
                  data-oid="h:s:pmm"
                >
                  <Users className="h-8 w-8" data-oid="znsz6mo" />
                </div>
              </div>
              <div data-oid="oa9ceiv">
                <h2
                  className="text-2xl font-semibold text-gray-900 dark:text-white mb-4"
                  data-oid="b.spin7"
                >
                  2. Data Subject Rights
                </h2>
                <p
                  className="text-gray-700 dark:text-gray-300 mb-4"
                  data-oid="zpz6rz2"
                >
                  Under the GDPR, individuals (data subjects) have several
                  rights regarding their personal data. Artintel acknowledges
                  and respects these rights, which include:
                </p>

                <div className="space-y-4" data-oid="9kw6xcz">
                  <div
                    className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
                    data-oid="4sj2tu:"
                  >
                    <h3
                      className="font-medium text-gray-900 dark:text-white mb-2"
                      data-oid="unh2ngl"
                    >
                      Right to Access
                    </h3>
                    <p
                      className="text-gray-700 dark:text-gray-300 text-sm"
                      data-oid="px0ud4q"
                    >
                      You have the right to request copies of your personal data
                      that we process. We will provide this information in a
                      structured, commonly used, and machine-readable format.
                    </p>
                  </div>

                  <div
                    className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
                    data-oid="y22i.sw"
                  >
                    <h3
                      className="font-medium text-gray-900 dark:text-white mb-2"
                      data-oid="jt0hpn:"
                    >
                      Right to Rectification
                    </h3>
                    <p
                      className="text-gray-700 dark:text-gray-300 text-sm"
                      data-oid="zp_mynk"
                    >
                      If you believe that the personal data we hold about you is
                      inaccurate or incomplete, you have the right to request
                      that we correct or complete it.
                    </p>
                  </div>

                  <div
                    className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
                    data-oid="f0m4cn:"
                  >
                    <h3
                      className="font-medium text-gray-900 dark:text-white mb-2"
                      data-oid="-nufo-c"
                    >
                      Right to Erasure (Right to be Forgotten)
                    </h3>
                    <p
                      className="text-gray-700 dark:text-gray-300 text-sm"
                      data-oid="pb5_3h6"
                    >
                      You have the right to request the deletion of your
                      personal data under certain circumstances, such as when
                      the data is no longer necessary for the purposes for which
                      it was collected.
                    </p>
                  </div>

                  <div
                    className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
                    data-oid="::ioww8"
                  >
                    <h3
                      className="font-medium text-gray-900 dark:text-white mb-2"
                      data-oid="5u26i63"
                    >
                      Right to Restriction of Processing
                    </h3>
                    <p
                      className="text-gray-700 dark:text-gray-300 text-sm"
                      data-oid="edq_z9w"
                    >
                      You have the right to request that we restrict the
                      processing of your personal data in certain circumstances,
                      such as when you contest the accuracy of the data.
                    </p>
                  </div>

                  <div
                    className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
                    data-oid="0xz0043"
                  >
                    <h3
                      className="font-medium text-gray-900 dark:text-white mb-2"
                      data-oid="_i4op4u"
                    >
                      Right to Data Portability
                    </h3>
                    <p
                      className="text-gray-700 dark:text-gray-300 text-sm"
                      data-oid="18.mct3"
                    >
                      You have the right to receive your personal data in a
                      structured, commonly used, and machine-readable format,
                      and to transmit that data to another controller.
                    </p>
                  </div>
                </div>

                <p
                  className="text-gray-700 dark:text-gray-300 mt-4"
                  data-oid="neku08d"
                >
                  To exercise any of these rights, please contact our Data
                  Protection Officer at{" "}
                  <span
                    className="text-indigo-600 dark:text-indigo-400"
                    data-oid="atb8zb."
                  >
                    dpo@artintel.ai
                  </span>
                  .
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="scroll-mt-24"
            id="data-processing"
            data-oid="yi1u_-d"
          >
            <div className="flex flex-col md:flex-row gap-6" data-oid="zy45gj1">
              <div
                className="flex-shrink-0 flex items-start justify-center md:justify-start"
                data-oid="w6c9ppk"
              >
                <div
                  className="rounded-full bg-green-100 dark:bg-green-900/30 p-3 text-green-600 dark:text-green-400"
                  data-oid="_ucxu9m"
                >
                  <Database className="h-8 w-8" data-oid="2-bhq7p" />
                </div>
              </div>
              <div data-oid="svs_j3j">
                <h2
                  className="text-2xl font-semibold text-gray-900 dark:text-white mb-4"
                  data-oid="xl1vrcs"
                >
                  3. Data Processing
                </h2>
                <p
                  className="text-gray-700 dark:text-gray-300 mb-4"
                  data-oid="1dq43vq"
                >
                  Artintel acts as both a data controller and a data processor
                  in different contexts. When you use our services, we process
                  your personal data as necessary to provide those services and
                  to fulfill our contractual obligations to you.
                </p>

                <h3
                  className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-3"
                  data-oid="ka9o:m4"
                >
                  Data Processing Agreement (DPA)
                </h3>
                <p
                  className="text-gray-700 dark:text-gray-300 mb-4"
                  data-oid="qh-2jt:"
                >
                  For customers who require a Data Processing Agreement (DPA) to
                  comply with their GDPR obligations, we offer a comprehensive
                  DPA that outlines our commitments and responsibilities as a
                  data processor. To request a DPA, please contact our support
                  team.
                </p>

                <div
                  className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg"
                  data-oid="tfutyx3"
                >
                  <h4
                    className="font-medium text-green-900 dark:text-green-300 mb-2"
                    data-oid="2:49nyf"
                  >
                    Our Data Processing Principles:
                  </h4>
                  <ul
                    className="space-y-1 text-green-800 dark:text-green-200 text-sm"
                    data-oid="uk88eh8"
                  >
                    <li data-oid=".q9xldq">
                      • We process data only according to your instructions
                    </li>
                    <li data-oid="mocg_av">
                      • We implement appropriate technical and organizational
                      security measures
                    </li>
                    <li data-oid="s2c-j:m">
                      • We assist you in fulfilling your obligations to data
                      subjects
                    </li>
                    <li data-oid="nurxq9r">
                      • We notify you of data breaches without undue delay
                    </li>
                    <li data-oid="7u8uz42">
                      • We delete or return all personal data at the end of our
                      service provision
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="scroll-mt-24"
            id="data-transfers"
            data-oid="i4-z4g4"
          >
            <div className="flex flex-col md:flex-row gap-6" data-oid="smlb88w">
              <div
                className="flex-shrink-0 flex items-start justify-center md:justify-start"
                data-oid="jcfp3pl"
              >
                <div
                  className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-3 text-purple-600 dark:text-purple-400"
                  data-oid="aqnhpmy"
                >
                  <FileText className="h-8 w-8" data-oid="etli22y" />
                </div>
              </div>
              <div data-oid="fay6xk2">
                <h2
                  className="text-2xl font-semibold text-gray-900 dark:text-white mb-4"
                  data-oid="hmwal11"
                >
                  4. International Transfers
                </h2>
                <p
                  className="text-gray-700 dark:text-gray-300 mb-4"
                  data-oid="_:w7t8j"
                >
                  Artintel may transfer personal data outside of the EU/EEA as
                  part of our global operations. When we do, we ensure that
                  appropriate safeguards are in place to protect your data and
                  to comply with GDPR requirements.
                </p>
                <p
                  className="text-gray-700 dark:text-gray-300 mb-4"
                  data-oid="w:wf-ti"
                >
                  We rely on legally-approved mechanisms for such transfers,
                  including:
                </p>

                <div className="space-y-4" data-oid="3:se_4-">
                  <div
                    className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
                    data-oid=".8duvde"
                  >
                    <h3
                      className="font-medium text-gray-900 dark:text-white mb-2"
                      data-oid="nqwp6iz"
                    >
                      Standard Contractual Clauses (SCCs)
                    </h3>
                    <p
                      className="text-gray-700 dark:text-gray-300 text-sm"
                      data-oid="0vwr4be"
                    >
                      We utilize the European Commission's approved Standard
                      Contractual Clauses for data transfers to third countries.
                    </p>
                  </div>

                  <div
                    className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
                    data-oid="4uhtb0y"
                  >
                    <h3
                      className="font-medium text-gray-900 dark:text-white mb-2"
                      data-oid=".fcezqu"
                    >
                      Adequacy Decisions
                    </h3>
                    <p
                      className="text-gray-700 dark:text-gray-300 text-sm"
                      data-oid="ma1awhp"
                    >
                      When transferring data to countries that the European
                      Commission has deemed to provide adequate protection.
                    </p>
                  </div>

                  <div
                    className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
                    data-oid="1od42cy"
                  >
                    <h3
                      className="font-medium text-gray-900 dark:text-white mb-2"
                      data-oid="a_tf9bz"
                    >
                      EU-US Data Privacy Framework
                    </h3>
                    <p
                      className="text-gray-700 dark:text-gray-300 text-sm"
                      data-oid="rs_5lvw"
                    >
                      For transfers to the United States, we comply with the
                      latest frameworks governing EU-US data transfers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="scroll-mt-24"
            id="security-measures"
            data-oid="_vt:rg6"
          >
            <div className="flex flex-col md:flex-row gap-6" data-oid="rs_t4e4">
              <div
                className="flex-shrink-0 flex items-start justify-center md:justify-start"
                data-oid=".3.urwo"
              >
                <div
                  className="rounded-full bg-amber-100 dark:bg-amber-900/30 p-3 text-amber-600 dark:text-amber-400"
                  data-oid=".wra2z8"
                >
                  <Lock className="h-8 w-8" data-oid="we9zz74" />
                </div>
              </div>
              <div data-oid="fgug75s">
                <h2
                  className="text-2xl font-semibold text-gray-900 dark:text-white mb-4"
                  data-oid="-eub0rh"
                >
                  5. Security Measures
                </h2>
                <p
                  className="text-gray-700 dark:text-gray-300 mb-4"
                  data-oid="g0m:v:s"
                >
                  Artintel implements appropriate technical and organizational
                  measures to ensure a level of security appropriate to the
                  risk, including:
                </p>

                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
                  data-oid="4_zcgmr"
                >
                  <div
                    className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg"
                    data-oid="tkm919-"
                  >
                    <h4
                      className="font-medium text-gray-900 dark:text-white mb-1"
                      data-oid="yor8sk_"
                    >
                      Encryption
                    </h4>
                    <p
                      className="text-gray-700 dark:text-gray-300 text-sm"
                      data-oid="-sd785h"
                    >
                      All data is encrypted in transit and at rest using
                      industry-standard encryption protocols.
                    </p>
                  </div>

                  <div
                    className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg"
                    data-oid="znqfw4k"
                  >
                    <h4
                      className="font-medium text-gray-900 dark:text-white mb-1"
                      data-oid="0p1yfrm"
                    >
                      Access Controls
                    </h4>
                    <p
                      className="text-gray-700 dark:text-gray-300 text-sm"
                      data-oid="c:p6d29"
                    >
                      Strict access controls and authentication mechanisms to
                      prevent unauthorized access.
                    </p>
                  </div>

                  <div
                    className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg"
                    data-oid="uxnvz3o"
                  >
                    <h4
                      className="font-medium text-gray-900 dark:text-white mb-1"
                      data-oid="omd03bb"
                    >
                      Regular Testing
                    </h4>
                    <p
                      className="text-gray-700 dark:text-gray-300 text-sm"
                      data-oid="gou8mt9"
                    >
                      Regular security assessments and vulnerability testing of
                      our systems and processes.
                    </p>
                  </div>

                  <div
                    className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg"
                    data-oid="5arj3so"
                  >
                    <h4
                      className="font-medium text-gray-900 dark:text-white mb-1"
                      data-oid="esp36.i"
                    >
                      Data Minimization
                    </h4>
                    <p
                      className="text-gray-700 dark:text-gray-300 text-sm"
                      data-oid="3xszred"
                    >
                      Collection and retention of only the personal data
                      necessary for our services.
                    </p>
                  </div>

                  <div
                    className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg"
                    data-oid="dtgqyk:"
                  >
                    <h4
                      className="font-medium text-gray-900 dark:text-white mb-1"
                      data-oid="65nt_ul"
                    >
                      Staff Training
                    </h4>
                    <p
                      className="text-gray-700 dark:text-gray-300 text-sm"
                      data-oid=".6_-d3q"
                    >
                      Regular privacy and security training for all staff
                      members who process personal data.
                    </p>
                  </div>

                  <div
                    className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg"
                    data-oid="flm:pms"
                  >
                    <h4
                      className="font-medium text-gray-900 dark:text-white mb-1"
                      data-oid="qcx9ync"
                    >
                      Breach Notification
                    </h4>
                    <p
                      className="text-gray-700 dark:text-gray-300 text-sm"
                      data-oid="ru.vizi"
                    >
                      Procedures for timely notification of data breaches to
                      authorities and affected individuals.
                    </p>
                  </div>
                </div>

                <p
                  className="text-gray-700 dark:text-gray-300 mt-6"
                  data-oid="tlca:8l"
                >
                  For more information about our security practices, please
                  visit our{" "}
                  <a
                    href="/legal/security"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline"
                    data-oid="-x6de51"
                  >
                    Security page
                  </a>
                  .
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default GDPRPage;
