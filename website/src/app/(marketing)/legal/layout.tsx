import {
  FileText,
  ShieldCheck,
  Lock,
  Cookie as CookieIcon,
  Target,
} from "lucide-react";

const LegalPageLayout = ({
  title,
  children,
  icon: Icon,
}: {
  title: string;
  children: React.ReactNode;
  icon: React.ElementType;
}) => {
  return (
    <main
      className="flex flex-col items-center min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-background/90"
      data-oid="q9ygt3q"
    >
      <div
        className="max-w-3xl w-full prose prose-invert prose-headings:text-primary prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground"
        data-oid="f-2e1eb"
      >
        <div
          className="flex items-center gap-3 mb-6 not-prose"
          data-oid="nca4ztb"
        >
          <Icon className="w-8 h-8 text-primary" data-oid=".6fx83l" />
          <h1
            className="text-4xl font-extrabold tracking-tight sm:text-5xl text-primary !m-0"
            data-oid="me6i-xd"
          >
            {title}
          </h1>
        </div>
        <div
          className="p-6 bg-card/50 border border-border rounded-lg shadow-sm backdrop-blur-sm"
          data-oid="ggh:whj"
        >
          {children}
        </div>
      </div>
    </main>
  );
};

export default LegalPageLayout;
