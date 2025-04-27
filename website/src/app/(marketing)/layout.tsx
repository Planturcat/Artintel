import DesignedFooter from "@/components/designed-footer";
import FloatingNavbar from "@/components/floating-navbar";
import FloatingChatIcon from "@/components/mash-chatbot/floating-chat-icon";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full relative">
      <FloatingNavbar />
      {children}
      <DesignedFooter />
      <FloatingChatIcon />
    </main>
  );
}
