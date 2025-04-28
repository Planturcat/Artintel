/**
 * Knowledge Base Service
 * 
 * This service provides access to structured information about Artintel
 * including platform features, pricing tiers, and model differences.
 */

// Knowledge Categories
export enum KnowledgeCategory {
  PlatformOverview = 'platform_overview',
  Features = 'features',
  PricingTiers = 'pricing_tiers',
  ModelTypes = 'model_types',
  Industries = 'industries',
  BestPractices = 'best_practices'
}

// Knowledge Entry structure
export interface KnowledgeEntry {
  category: KnowledgeCategory;
  title: string;
  content: string;
  keywords: string[];
}

// Knowledge Base content extracted from info.md
const knowledgeBase: KnowledgeEntry[] = [
  // Platform Overview
  {
    category: KnowledgeCategory.PlatformOverview,
    title: 'What is Artintel',
    content: 'Artintel is a comprehensive, no-code platform that enables organizations to discover, fine-tune, and deploy open-source Large Language Models (LLMs) and Small Language Models (SLMs). It bridges the gap between cutting-edge AI research and practical industry applications, ensuring that even teams without deep machine learning expertise can leverage powerful language models for their unique use cases.',
    keywords: ['artintel', 'overview', 'platform', 'about', 'what is']
  },
  {
    category: KnowledgeCategory.PlatformOverview,
    title: 'Artintel Philosophy',
    content: 'Artintel\'s core philosophy centers around accessibility, customization, scalability, and security. We believe that AI should be accessible to any team regardless of size, models should be customizable to specific domains, solutions should scale with business needs, and security and compliance should be built-in from the ground up.',
    keywords: ['philosophy', 'values', 'mission', 'approach']
  },
  
  // Features
  {
    category: KnowledgeCategory.Features,
    title: 'Model Selection & Discovery',
    content: 'Artintel offers a curated model catalog with wide variety of models from small, resource-friendly models like DistilBERT to large-scale powerhouses like Falcon 180B. Each model includes performance benchmarks, inference speed estimates, memory footprint, and licensing details. The platform provides intelligent recommendations through smart filters and can suggest models based on your specific data and constraints.',
    keywords: ['model selection', 'discovery', 'catalog', 'recommendations']
  },
  {
    category: KnowledgeCategory.Features,
    title: 'Data Integration & Preprocessing',
    content: 'Artintel supports data ingestion from local uploads (CSV, JSON, text files), cloud storage connections (S3, GCS, Azure Blob), and database integration for enterprise users. Preprocessing pipelines handle deduplication, cleaning, PII detection and redaction, text normalization, and data versioning.',
    keywords: ['data', 'integration', 'preprocessing', 'ingestion', 'pipelines']
  },
  {
    category: KnowledgeCategory.Features,
    title: 'Fine-Tuning Workflows',
    content: 'Artintel\'s no-code fine-tuning studio provides a step-by-step wizard for selecting base models, choosing datasets, configuring hyperparameters, and launching training jobs. The platform supports both default mode for users with minimal ML background and advanced mode for experienced data scientists. Training infrastructure can use on-demand cloud GPUs or on-prem support, with checkpoints and experiment tracking.',
    keywords: ['fine-tuning', 'training', 'tuning', 'adaptation']
  },
  {
    category: KnowledgeCategory.Features,
    title: 'Deployment & Serving',
    content: 'Artintel offers one-click deployment that containers your fine-tuned model, sets up dependencies, and pushes it to your selected environment (cloud, on-prem, or hybrid). The platform supports Kubernetes integration and provides flexible endpoint protocols (REST & gRPC) with authentication, rate limiting, and version management for safe iterations.',
    keywords: ['deployment', 'serving', 'production', 'endpoints', 'containers']
  },
  {
    category: KnowledgeCategory.Features,
    title: 'Monitoring & Alerts',
    content: 'Artintel provides real-time metrics for latency, throughput, and hardware utilization through customizable dashboards. The platform supports custom alerts based on thresholds for performance, cost, or user satisfaction metrics, with notifications via email or Slack.',
    keywords: ['monitoring', 'alerts', 'metrics', 'dashboards', 'notifications']
  },
  {
    category: KnowledgeCategory.Features,
    title: 'Mash AI Agent',
    content: 'Mash is an intelligent assistant that provides context-aware support throughout the entire model lifecycle. It offers best practice recommendations, code generation, documentation assistance, task automation, pipeline optimization, and intelligent alerts. Mash also supports UI & frontend creation with a no-code UI builder, custom dashboard design, and interactive demo interfaces.',
    keywords: ['mash', 'agent', 'assistant', 'automation', 'ui builder']
  },
  
  // Pricing Tiers
  {
    category: KnowledgeCategory.PricingTiers,
    title: 'Free Tier',
    content: 'Artintel\'s Free Tier is designed for startups, educators, solo developers, and non-profits with limited budgets. It provides access to lightweight models like BERT and DistilBERT, community-driven support, local/offline use, and basic model comparison. Limitations include no advanced fine-tuning templates, restricted deployment options, and minimal compliance tools.',
    keywords: ['free tier', 'pricing', 'startups', 'education', 'basic']
  },
  {
    category: KnowledgeCategory.PricingTiers,
    title: 'Pro Tier',
    content: 'The Pro Tier is ideal for SMEs, mid-sized tech teams, and growing startups. It offers access to mid-sized LLMs like Mistral 7B and Falcon 7B, guided fine-tuning with pre-built templates, one-click cloud deployment, real-time cost tracking, and priority support. Pro users benefit from GPU acceleration and higher API rate limits suitable for real-time applications.',
    keywords: ['pro tier', 'pricing', 'business', 'mid-sized', 'professional']
  },
  {
    category: KnowledgeCategory.PricingTiers,
    title: 'Enterprise Premium Tier',
    content: 'Enterprise Premium is designed for regulated industries and large global enterprises. It provides access to the largest models like Falcon 180B and Llama 70B, advanced compliance and security features, hybrid/on-prem deployment options, dedicated SLAs with 24/7 support, and custom pipelines. This tier supports multi-GPU or multi-node configurations and integrates with enterprise observability stacks.',
    keywords: ['enterprise tier', 'premium', 'large organizations', 'regulated industries', 'compliance']
  },
  
  // Model Types
  {
    category: KnowledgeCategory.ModelTypes,
    title: 'Small Language Models (SLMs)',
    content: 'Small Language Models typically range from a few million to a few billion parameters. Examples include BERT (110M parameters), DistilBERT (66M parameters), and smaller GPT variants. SLMs offer a lower resource footprint, faster inference, and cost-effectiveness, making them suitable for devices with limited memory and real-time applications. They excel at classification and basic Q&A but may have limited context windows and less generative capabilities compared to LLMs.',
    keywords: ['SLM', 'small language models', 'bert', 'distilbert', 'lightweight']
  },
  {
    category: KnowledgeCategory.ModelTypes,
    title: 'Large Language Models (LLMs)',
    content: 'Large Language Models range from several billion to hundreds of billions of parameters. Examples include Falcon 40B/180B, Llama 70B, and BLOOM 176B. LLMs offer rich understanding of language with larger context windows and creative, adaptive text generation capabilities. They can handle complex conversation threads and large text inputs but require high computational resources, have slower response times, and may be prone to overfitting without proper regularization.',
    keywords: ['LLM', 'large language models', 'falcon', 'llama', 'bloom', 'powerful']
  },
  {
    category: KnowledgeCategory.ModelTypes,
    title: 'SLM vs LLM Use Cases',
    content: 'SLMs are ideal for text classification, entity recognition, simple chatbots, and edge deployments with limited resources. LLMs excel at complex QA or summarization tasks, creative generation, high-value enterprise use cases, and cross-lingual transfer. The choice between SLM and LLM depends on task complexity, resource constraints, dataset size, and deployment environment.',
    keywords: ['use cases', 'comparison', 'when to use', 'selection', 'differences']
  },
  
  // Industries
  {
    category: KnowledgeCategory.Industries,
    title: 'Healthcare Applications',
    content: 'In healthcare, Artintel can be used for analyzing electronic health records, automating medical coding, patient follow-ups, and clinical decision support. Fine-tuned models can assist with medical research, disease prediction, and healthcare workflow optimization while maintaining HIPAA compliance.',
    keywords: ['healthcare', 'medical', 'clinical', 'EHR', 'HIPAA']
  },
  {
    category: KnowledgeCategory.Industries,
    title: 'Finance Applications',
    content: 'Financial institutions can leverage Artintel for fraud detection, automated loan underwriting, market analysis, risk assessment, and personalized wealth management recommendations. The platform\'s compliance features ensure secure handling of sensitive financial data.',
    keywords: ['finance', 'banking', 'investment', 'trading', 'risk', 'fraud']
  },
  {
    category: KnowledgeCategory.Industries,
    title: 'Legal Applications',
    content: 'In the legal domain, Artintel supports contract analysis, eDiscovery, summarization of legal briefs, compliance checks, and drafting policies or legislative content. Models can be fine-tuned on legal corpora to understand specialized terminology and precedents.',
    keywords: ['legal', 'law', 'compliance', 'contracts', 'policy']
  },
  {
    category: KnowledgeCategory.Industries,
    title: 'Retail & E-Commerce',
    content: 'Retail and e-commerce businesses can use Artintel to build chatbots for customer service, inventory forecasting systems, sentiment analysis of product reviews, and dynamic pricing engines. These applications help improve customer experience and operational efficiency.',
    keywords: ['retail', 'ecommerce', 'shopping', 'customer service', 'inventory']
  },
  
  // Best Practices
  {
    category: KnowledgeCategory.BestPractices,
    title: 'Model Selection Best Practices',
    content: 'When selecting a model, consider your specific use case, performance requirements, and deployment constraints. For real-time applications with limited resources, SLMs are often preferable. For complex tasks requiring deep understanding and reasoning, LLMs may be necessary. Always balance model size with your available infrastructure and latency requirements.',
    keywords: ['best practices', 'model selection', 'guidelines', 'recommendations']
  },
  {
    category: KnowledgeCategory.BestPractices,
    title: 'Fine-Tuning Best Practices',
    content: 'For optimal fine-tuning results: 1) Ensure high-quality, relevant training data; 2) Use appropriate hyperparameters for your model size and dataset; 3) Monitor training to prevent overfitting; 4) Validate results across diverse examples; 5) Consider parameter-efficient techniques like LoRA for large models; 6) Maintain checkpoints throughout the training process.',
    keywords: ['fine-tuning', 'training', 'best practices', 'optimization']
  },
  {
    category: KnowledgeCategory.BestPractices,
    title: 'Deployment Best Practices',
    content: 'When deploying language models: 1) Start with staging environments before production; 2) Implement proper monitoring and alerting; 3) Set up auto-scaling based on traffic patterns; 4) Establish version control for model updates; 5) Plan for fallbacks in case of model errors; 6) Regularly audit performance and costs; 7) Consider A/B testing for major changes.',
    keywords: ['deployment', 'production', 'best practices', 'operations']
  }
];

/**
 * KnowledgeBaseService class for retrieving information about Artintel
 */
class KnowledgeBaseService {
  /**
   * Get knowledge entries by category
   */
  public getByCategory(category: KnowledgeCategory): KnowledgeEntry[] {
    return knowledgeBase.filter(entry => entry.category === category);
  }

  /**
   * Search knowledge base by keywords
   */
  public search(query: string): KnowledgeEntry[] {
    const normalizedQuery = query.toLowerCase();
    
    // First, try to match keywords directly
    const keywordMatches = knowledgeBase.filter(entry => 
      entry.keywords.some(keyword => 
        normalizedQuery.includes(keyword) || keyword.includes(normalizedQuery)
      )
    );
    
    // If we have direct keyword matches, return those
    if (keywordMatches.length > 0) {
      return keywordMatches;
    }
    
    // Otherwise, do a broader content search
    return knowledgeBase.filter(entry => 
      entry.title.toLowerCase().includes(normalizedQuery) || 
      entry.content.toLowerCase().includes(normalizedQuery)
    );
  }

  /**
   * Get a specific knowledge entry by title
   */
  public getByTitle(title: string): KnowledgeEntry | undefined {
    return knowledgeBase.find(entry => 
      entry.title.toLowerCase() === title.toLowerCase()
    );
  }

  /**
   * Get all available knowledge entries
   */
  public getAllEntries(): KnowledgeEntry[] {
    return [...knowledgeBase];
  }
}

// Export singleton instance
export const knowledgeBaseService = new KnowledgeBaseService(); 