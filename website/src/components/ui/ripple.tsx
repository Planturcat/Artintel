"use client";

import React, { CSSProperties } from "react";

import { cn } from "@/lib";

interface RippleProps {
    mainCircleSize?: number;
    mainCircleOpacity?: number;
    numCircles?: number;
    className?: string;
    speed?: 'slow' | 'medium' | 'fast';
    color?: string;
}

const Ripple = React.memo(function Ripple({
    mainCircleSize = 170,
    mainCircleOpacity = 0.24,
    numCircles = 6,
    className,
    speed = 'medium',
    color,
    intensity = 'subtle',
}: RippleProps) {
    // Map speed to animation duration
    const getDuration = () => {
        switch (speed) {
            case 'slow': return 5;
            case 'fast': return 2.5;
            default: return 3.5;
        }
    };
    
    const getScaleVariation = () => {
        switch (intensity) {
            case 'subtle': return 0.01; // 0.99 to 1.01
            case 'strong': return 0.03; // 0.97 to 1.03
            default: return 0.02; // 0.98 to 1.02
        }
    };
    
    const duration = getDuration();
    const scaleVariation = getScaleVariation();

    return (
        <div
            className={cn(
                "pointer-events-none select-none absolute inset-0 [mask-image:linear-gradient(to_bottom,white,transparent)]",
                className,
            )}
        >
            {Array.from({ length: numCircles }, (_, i) => {
                const size = mainCircleSize + i * 110;
                const baseOpacity = mainCircleOpacity - i * 0.03;
                // Sequential delays to create outward ripple effect
                const animationDelay = `${i * 0.3}s`;
                const borderStyle = i === numCircles - 1 ? "dashed" : "solid";
                const borderOpacity = 5 + i * 5;

                return (
                    <div
                        key={i}
                        className={`absolute rounded-full bg-foreground/25 shadow-xl border [--i:${i}]`}
                        style={
                            {
                                width: `${size}px`,
                                height: `${size}px`,
                                opacity: baseOpacity,
                                borderStyle,
                                borderWidth: "1px",
                                borderColor: color ? color : `hsl(var(--foreground), ${borderOpacity / 100})`,
                                backgroundColor: color ? `${color}25` : undefined,
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                animation: `waterRipple ${duration}s infinite ${animationDelay} ease-in-out`,
                            } as CSSProperties
                        }
                    />
                );
            })}

            <style jsx>{`
                @keyframes waterRipple {
                    0% {
                        transform: translate(-50%, -50%) scale(1);
                    }
                    25% {
                        transform: translate(-50%, -50%) scale(${1 - scaleVariation});
                    }
                    50% {
                        transform: translate(-50%, -50%) scale(1);
                    }
                    75% {
                        transform: translate(-50%, -50%) scale(${1 + scaleVariation});
                    }
                    100% {
                        transform: translate(-50%, -50%) scale(1);
                    }
                }
            `}</style>
        </div>
    );
});

Ripple.displayName = "Ripple";

export default Ripple;