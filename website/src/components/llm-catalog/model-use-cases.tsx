import {
  MessageSquare,
  FileText,
  Code,
  Search,
  Globe,
  Brain,
  Sparkles,
  BarChart,
} from "lucide-react";

export default function ModelUseCases() {
  const useCases = [
    {
      icon: (
        <MessageSquare className="h-8 w-8 text-[#00cddd]" data-oid="hh.bygn" />
      ),

      title: "Conversational AI",
      description:
        "Build chatbots, virtual assistants, and customer support systems that can understand and respond to natural language queries.",
      recommendedModels: ["Phoenix-7B", "Phoenix-20B", "Phoenix-30B"],
      example:
        "A financial services company using Phoenix-20B to power their customer support chatbot, handling 70% of inquiries without human intervention.",
    },
    {
      icon: <FileText className="h-8 w-8 text-[#00cddd]" data-oid="7-o9j6a" />,
      title: "Content Generation",
      description:
        "Generate blog posts, product descriptions, marketing copy, and other text content at scale with human-like quality.",
      recommendedModels: ["Phoenix-20B", "Phoenix-30B"],
      example:
        "An e-commerce platform using Phoenix-30B to automatically generate thousands of unique product descriptions based on technical specifications.",
    },
    {
      icon: <Code className="h-8 w-8 text-[#00cddd]" data-oid="lq9011s" />,
      title: "Code Generation & Assistance",
      description:
        "Generate code snippets, complete functions, debug issues, and provide programming assistance across multiple languages.",
      recommendedModels: ["Codex-12B", "Phoenix-30B"],
      example:
        "A development team using Codex-12B to automate unit test generation, increasing test coverage by 40% while reducing development time.",
    },
    {
      icon: <Search className="h-8 w-8 text-[#00cddd]" data-oid="1czflun" />,
      title: "Semantic Search & Retrieval",
      description:
        "Enhance search functionality with semantic understanding, allowing users to find information using natural language queries.",
      recommendedModels: ["Phoenix-7B", "Scholar-15B"],
      example:
        "A legal research platform using Scholar-15B to power their semantic search, helping lawyers find relevant case law using natural language questions.",
    },
    {
      icon: <Globe className="h-8 w-8 text-[#00cddd]" data-oid="my1w98k" />,
      title: "Translation & Localization",
      description:
        "Translate content between languages while preserving meaning, tone, and cultural nuances for global audiences.",
      recommendedModels: ["Multilingual-10B", "Phoenix-30B"],
      example:
        "A global news organization using Multilingual-10B to automatically translate articles into 15 languages, reaching millions of additional readers.",
    },
    {
      icon: <Brain className="h-8 w-8 text-[#00cddd]" data-oid="xppdqrp" />,
      title: "Research & Analysis",
      description:
        "Analyze documents, extract insights, summarize research papers, and assist with literature reviews across domains.",
      recommendedModels: ["Scholar-15B", "Phoenix-30B"],
      example:
        "A pharmaceutical company using Scholar-15B to analyze thousands of research papers, identifying potential drug interactions and research gaps.",
    },
    {
      icon: <Sparkles className="h-8 w-8 text-[#00cddd]" data-oid="7wns-z9" />,
      title: "Creative Writing & Storytelling",
      description:
        "Generate creative content including stories, poems, scripts, and other narrative formats with engaging style.",
      recommendedModels: ["Phoenix-20B", "Phoenix-30B"],
      example:
        "A game studio using Phoenix-20B to generate dynamic storylines and character dialogue that adapts to player choices.",
    },
    {
      icon: <BarChart className="h-8 w-8 text-[#00cddd]" data-oid="fr_:bpt" />,
      title: "Data Analysis & Reporting",
      description:
        "Extract insights from data, generate reports, and explain complex data patterns in natural language.",
      recommendedModels: ["Scholar-15B", "Phoenix-20B"],
      example:
        "A business intelligence platform using Scholar-15B to automatically generate natural language summaries of complex data visualizations.",
    },
  ];

  return (
    <>
      {useCases.map((useCase, index) => (
        <div
          key={index}
          className="border border-border/40 rounded-lg p-6 bg-card/30 hover:border-[#00cddd]/50 transition-colors"
          data-oid="ji.0rf2"
        >
          <div className="flex items-center gap-3 mb-4" data-oid="o7sp5a1">
            {useCase.icon}
            <h3 className="text-xl font-mono font-bold" data-oid="cjzxn7v">
              {useCase.title}
            </h3>
          </div>

          <p className="text-muted-foreground mb-4" data-oid="zyei8b2">
            {useCase.description}
          </p>

          <div className="mb-4" data-oid="6:k8n3o">
            <div className="text-sm font-medium mb-2" data-oid="vb:w0cs">
              Recommended Models:
            </div>
            <div className="flex flex-wrap gap-2" data-oid="3sq1w8.">
              {useCase.recommendedModels.map((model, modelIndex) => (
                <div
                  key={modelIndex}
                  className="text-xs px-2 py-1 bg-background/50 border border-border/30 rounded text-[#00cddd]"
                  data-oid="zt69cwm"
                >
                  {model}
                </div>
              ))}
            </div>
          </div>

          <div data-oid="bir8om2">
            <div className="text-sm font-medium mb-2" data-oid="vbdc7ya">
              Real-world Example:
            </div>
            <div
              className="text-sm text-muted-foreground italic"
              data-oid="19clwkh"
            >
              "{useCase.example}"
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
