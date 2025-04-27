import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Ripple from "./ui/ripple";
import Container from "./global/container";
import { Button } from "./ui/button";


const MODEL_LOGOS = [
    { name: "Llama", path: "/model/Llama.png", position: "left-3", size: "small", iconSize: "small", className: "hidden lg:flex" },
    { name: "DeepSeek", path: "/model/DeepSeek.png", position: "left-2", size: "medium", iconSize: "medium" },
    { name: "Falcon", path: "/model/Falcon.png", position: "left-1", size: "large", iconSize: "large" },
    { name: "GPT-J", path: "/model/gpt-j-6b.png", position: "right-1", size: "large", iconSize: "large" },
    { name: "Mistral", path: "/model/Mistral.png", position: "right-2", size: "medium", iconSize: "medium" },
    { name: "MPT", path: "/model/mpt-7b.png", position: "right-3", size: "small", iconSize: "small", className: "hidden lg:flex" }
];

const ModelSelection = () => {

    const getPositionClasses = (position: string) => {
        switch (position) {
            case "left-3": return "-translate-x-[285px]";
            case "left-2": return "-translate-x-[210px]";
            case "left-1": return "-translate-x-[125px]";
            case "right-1": return "translate-x-[125px]";
            case "right-2": return "translate-x-[210px]";
            case "right-3": return "translate-x-[285px]";
            default: return "";
        }
    };

    const getSizeClasses = (size: string) => {
        switch (size) {
            case "large": return "size-20";
            case "medium": return "size-16";
            case "small": return "size-12";
            default: return "size-20";
        }
    };

    const getIconSizeClasses = (size: string) => {
        switch (size) {
            case "large": return "size-10";
            case "medium": return "size-7";
            case "small": return "size-5";
            default: return "size-10";
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center w-full py-20 bg-transparent">
            <Container className="relative">
                <div className="relative flex flex-col lg:hidden items-center justify-center overflow-visible">
                    <div className="absolute top-1/2 -translate-y-1/2 right-1/4 w-3/5 h-14 lg:h-20 bg-gradient-to-r from-[#00CBDD] to-[#00CBDD]/50 rounded-full -rotate-12 blur-[6.5rem] -z-10"></div>

                    <div className="max-w-sm w-full h-auto mx-auto mt-8 flex flex-wrap justify-center gap-4">
                        {MODEL_LOGOS.slice(0, 4).map((model, index) => (
                            <div key={index} className="w-16 h-16 rounded-full bg-gradient-to-b from-[#00CBDD]/10 to-transparent p-2 flex items-center justify-center border border-[#00CBDD]/20 shadow-xl shadow-black/10 backdrop-blur-lg">
                                <Image
                                    src={model.path}
                                    alt={model.name}
                                    width={48}
                                    height={48}
                                    className="object-contain"
                                />
                            </div>
                        ))}
                    </div>

                </div>
            </Container>

            <div className="flex flex-col items-center text-center max-w-3xl mx-auto lg:absolute lg:top-1/4 inset-x-0 mt-12 lg:mt-0">
                <h2 className="text-2xl md:text-4xl lg:text-6xl font-medium whitespace-nowrap overflow-visible text-transparent bg-clip-text bg-gradient-to-r from-[#00CBDD] to-[#00CBDD]">
                    Choose from top open-source models
                </h2>
            </div>
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto lg:absolute lg:bottom-1/4 inset-x-0 z-20 mt-8 lg:mt-0">
                <Link href="#">
                    <Button size="lg">
                        Explore all Models
                        <ArrowRightIcon className="size-4" />
                    </Button>
                </Link>
            </div>

            <Container delay={0.3}>
                <div className="relative hidden lg:flex items-center justify-center overflow-visible">
                    <div className="absolute top-1/2 -translate-y-1/2 right-1/4 w-3/5 h-14 lg:h-20 bg-gradient-to-r from-[#00CBDD] to-[#00CBDD]/50 rounded-full -rotate-12 blur-[6.5rem] -z-10"></div>

                    <div className="relative flex h-dvh w-full flex-col items-center justify-center overflow-visible">
                        <Ripple speed="slow" />
                    </div>

                    <div className="absolute z-20 flex items-center justify-center group">
                        <div className="size-24 rounded-full bg-gradient-to-b from-[#00CBDD]/10 to-transparent p-4 flex items-center justify-center group-hover:scale-110 transition-all duration-500 border border-[#00CBDD]/20 shadow-xl shadow-black/10 backdrop-blur-lg">
                            <Image
                                src="/model/Phi.png"
                                alt="Phi Model"
                                width={80}
                                height={80}
                                className="object-contain"
                            />
                        </div>
                    </div>

                    {MODEL_LOGOS.map((model, index) => (
                        <div
                            key={index}
                            className={cn(
                                "absolute z-20 p-3 rounded-full flex items-center justify-center bg-gradient-to-b from-[#00CBDD]/10 to-transparent shadow-xl shadow-black/10 backdrop-blur-lg transition-all duration-300 hover:scale-110 border border-[#00CBDD]/20",
                                getPositionClasses(model.position),
                                getSizeClasses(model.size),
                                model.className
                            )}
                        >
                            <Image
                                src={model.path}
                                alt={model.name}
                                width={parseInt(getIconSizeClasses(model.iconSize).replace('size-', '')) * 4}
                                height={parseInt(getIconSizeClasses(model.iconSize).replace('size-', '')) * 4}
                                className="object-contain"
                            />
                        </div>
                    ))}

                </div>
            </Container>
        </div>
    )
};

export default ModelSelection;