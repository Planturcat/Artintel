export interface HowItWorksItem {
    title: string;
    description: string;
    image: string;
}

export const HOW_IT_WORKS: HowItWorksItem[] = [
    {
        title: "Select Your Models",
        description: "Easily browse and select from our curated collection of state-of-the-art AI models that best fit your specific use case.",
        image: "/images/hiw-one.svg"
    },
    {
        title: "Integrate & Customize",
        description: "Connect models to your systems through our API, customize parameters, and fine-tune with your data for optimal performance.",
        image: "/images/hiw-two.svg"
    },
    {
        title: "Deploy & Scale",
        description: "Launch your AI solutions with confidence using our robust deployment tools and scale seamlessly as your needs grow.",
        image: "/images/hiw-three.svg"
    }
];