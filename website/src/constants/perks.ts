export interface PerkItem {
    title: string;
    description: string;
    icon: string;
}

export const PERKS: PerkItem[] = [
    {
        title: "Fine-Tuning",
        description: "Customize models for your specific use cases with no-code tools.",
        icon: "/icons/perk-one.svg"
    },
    {
        title: "Smart Analytics",
        description: "Track performance with realtime insights and metrics.",
        icon: "/icons/perk-two.svg"
    },
    {
        title: "API Gateway",
        description: "Seamless integration with your existing systems.",
        icon: "/icons/perk-three.svg"
    },
    {
        title: "Deployment Tools",
        description: "One-click deployment to any environment or device.",
        icon: "/icons/perk-four.svg"
    }
];