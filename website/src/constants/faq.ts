export type FAQItem = {
    question: string;
    answer: string;
};

export const FAQS: FAQItem[] = [
    {
        question: "How does the AI model selection process work?",
        answer: "Our platform makes finding the right AI models simple. Browse our curated collection of models organized by task type, performance metrics, and industry use cases. Each model includes detailed documentation and sample implementations to help you make informed decisions."
    },
    {
        question: "What tools are available for model integration?",
        answer: "We offer a comprehensive suite of tools including REST APIs, SDKs for major programming languages, webhook integrations, and no-code connectors for popular platforms. All these features are documented and supported through our developer portal."
    },
    {
        question: "How secure is your platform?",
        answer: "We implement enterprise-grade security measures throughout our platform. This includes SOC 2 compliance, end-to-end encryption, secure API authentication, and role-based access controls to ensure your data and AI implementations remain protected."
    },
    {
        question: "Can I manage multiple AI models efficiently?",
        answer: "Absolutely! Our platform is designed to handle multiple models with ease. You can organize models by projects, track performance metrics across all deployments, and manage various integrations from a single dashboard."
    },
    {
        question: "What kind of support do you provide?",
        answer: "We offer comprehensive support through multiple channels including documentation, community forums, email, and priority support tickets. Our dedicated AI engineering team is available to help with technical issues, implementation strategies, and best practices."
    },
    {
        question: "Do you offer custom model development?",
        answer: "Yes, we provide custom AI model development services for enterprises with specific requirements. Our team of ML engineers can build, train, and deploy bespoke models tailored to your unique business challenges and data environments."
    }
];
