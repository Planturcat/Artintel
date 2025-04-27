export interface HowItWorksItem {
    title: string;
    description: string;
    image: string;
}

export const ARTINTEL_HOW_IT_WORKS: HowItWorksItem[] = [
    {
        title: "Model Discovery & Selection",
        description: "Easily browse and select from our curated collection of state-of-the-art AI models that best fit your specific use case.",
        image: "/images/artintel/model-selection.svg"
    },
    {
        title: "Fine-Tune & Customize",
        description: "Connect models to your data, customize parameters, and fine-tune with your domain-specific information for optimal performance.",
        image: "/images/artintel/fine-tune.svg"
    },
    {
        title: "Deploy & Scale",
        description: "Launch your AI solutions with confidence using our robust deployment tools and scale seamlessly as your needs grow.",
        image: "/images/artintel/deploy-scale.svg"
    }
]; 