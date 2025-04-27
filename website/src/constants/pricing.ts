export type PlanFeature = {
    text: string;
    included: boolean;
};

export type Plan = {
    name: string;
    description: string;
    price: {
        monthly: number;
        yearly: number;
    };
    features: PlanFeature[];
    popular?: boolean;
};

export const PRICING_PLANS: Plan[] = [
    {
        name: "Basic",
        description: "Perfect for individual developers",
        price: {
            monthly: 29,
            yearly: 290,
        },
        features: [
            { text: "AI Models (up to 5)", included: true },
            { text: "Basic Analytics", included: true },
            { text: "API Management", included: true },
            { text: "Email Support", included: true },
            { text: "Fine-tuning", included: false },
            { text: "Advanced Analytics", included: false },
        ],
    },
    {
        name: "Professional",
        description: "Ideal for growing teams",
        price: {
            monthly: 79,
            yearly: 790,
        },
        popular: true,
        features: [
            { text: "Unlimited AI Models", included: true },
            { text: "Advanced Analytics", included: true },
            { text: "API Management", included: true },
            { text: "Priority Support", included: true },
            { text: "Fine-tuning", included: true },
            { text: "Deployment Tools", included: true },
        ],
    },
    {
        name: "Enterprise",
        description: "For large organizations",
        price: {
            monthly: 199,
            yearly: 1990,
        },
        features: [
            { text: "Unlimited AI Models", included: true },
            { text: "Custom Analytics", included: true },
            { text: "Team Management", included: true },
            { text: "24/7 Support", included: true },
            { text: "API Access", included: true },
            { text: "White Labeling", included: true },
        ],
    },
];
