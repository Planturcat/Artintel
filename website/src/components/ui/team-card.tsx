import React from "react";
import Image from "next/image";
import { cn } from "@/lib";
import AnimationContainer from "../global/animation-container";

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  bio: string;
  className?: string;
  delay?: number;
}

const TeamCard = ({
  name,
  role,
  image,
  bio,
  className,
  delay = 0,
}: TeamMemberProps) => {
  return (
    <AnimationContainer animation="fadeUp" delay={delay}>
      <div
        className={cn(
          "bg-[#181818] rounded-2xl overflow-hidden h-full flex flex-col",
          className,
        )}
      >
        <div className="relative h-64 w-full">
          <Image src={image} alt={name} fill className="object-cover" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] to-transparent opacity-70"></div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-medium text-white">{name}</h3>
          <p className="text-[#00cbdd] mb-3">{role}</p>
          <p className="text-muted-foreground text-sm">{bio}</p>
        </div>
      </div>
    </AnimationContainer>
  );
};

export { TeamCard };
