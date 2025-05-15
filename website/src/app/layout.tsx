import { Toaster } from "@/components/ui/sonner";
import { base, heading } from "@/constants/fonts";
import { cn } from "@/lib";
import "@/styles/globals.css";
import { generateMetadata } from "@/utils";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = generateMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning data-oid="i3tjuuv">
      <body
        className={cn(
          "min-h-screen bg-[#101010] text-foreground font-base antialiased overflow-x-hidden dark",
          base.variable,
          heading.variable,
        )}
        data-oid="c9sx6.z"
      >
        <ClerkProvider
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
          data-oid="s_9.trk"
        >
          <Toaster
            richColors
            theme="dark"
            position="bottom-center"
            data-oid="e9b4ub:"
          />

          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
