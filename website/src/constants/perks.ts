export interface PerkItem {
    title: string;
    description: string;
    icon: string;
}

export const PERKS: PerkItem[] = [
    {
        title: "Fine-Tuning",
        description: "Customize models for your specific use cases with no-code tools.",
        icon: "/icons/conversation-fine-tuning.svg"
    },
    {
        title: "Smart Analytics",
        description: "Track performance with realtime insights and metrics.",
        icon: "/icons/conversation-analytics.svg"
    },
    {
        title: "API Gateway",
        description: "Seamless integration with your existing systems.",
        icon: "/icons/conversation-api.svg"
    },
    {
        title: "Deployment Tools",
        description: "One-click deployment to any environment or device.",
        icon: "/icons/conversation-deployment.svg"
    }
];