import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Artintel",
  description:
    "Get in touch with our AI experts for any inquiries, support, or feedback about Artintel's services.",
};

export default function ContactPage() {
  return (
    <main className="flex-1" data-oid="za5:hq8">
      <ContactForm data-oid="fgbpf98" />
    </main>
  );
}
