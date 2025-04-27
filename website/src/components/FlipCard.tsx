"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

interface FlipCardProps {
  frontTitle: string;
  frontDescription: string;
  frontIcon?: React.ReactNode;
  backTitle: string;
  backDescription: string;
  backDetails?: React.ReactNode;
  buttonText?: string;
  buttonHref?: string;
  className?: string;
}

const FlipCard: React.FC<FlipCardProps> = ({
  frontTitle,
  frontDescription,
  frontIcon,
  backTitle,
  backDescription,
  backDetails,
  buttonText = "Learn More",
  buttonHref = "#",
  className = "",
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className={`flip-card-container relative w-full ${className}`}
      style={{ 
        perspective: '1500px',
        height: '400px',
      }}
    >
      <div 
        className={`flip-card w-full h-full transition-all duration-700 relative ${isFlipped ? 'is-flipped' : ''}`}
        style={{ 
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
        }}
      >
        {/* Front of card */}
        <div 
          className="flip-card-front absolute w-full h-full p-6 rounded-xl bg-gradient-to-br from-primary/5 to-primary/20 border border-primary/30 flex flex-col"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
            WebkitTransformStyle: 'preserve-3d',
          }}
        >
          <div className="relative overflow-hidden rounded-xl w-full h-full flex flex-col">
            {/* Reflection effect */}
            <div className="reflection-effect absolute inset-0 opacity-20 pointer-events-none"></div>
            
            {/* Card content */}
            <div className="flex items-start gap-3 mb-4">
              {frontIcon && <div className="text-primary p-2 bg-primary/10 rounded-lg">{frontIcon}</div>}
              <h3 className="text-2xl font-bold">{frontTitle}</h3>
            </div>
            
            <p className="text-muted-foreground mb-4">{frontDescription}</p>
            
            <div className="mt-auto flex justify-center">
              <Button 
                onClick={handleFlip} 
                variant="outline" 
                className="relative btn-reflection w-full rounded-lg"
              >
                <span>View Details</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div 
          className="flip-card-back absolute w-full h-full p-6 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex flex-col"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            transformStyle: 'preserve-3d',
            WebkitTransformStyle: 'preserve-3d',
          }}
        >
          <div className="relative overflow-hidden rounded-xl w-full h-full flex flex-col">
            {/* Reflection effect */}
            <div className="reflection-effect absolute inset-0 opacity-20 pointer-events-none"></div>
            
            {/* Card content */}
            <h3 className="text-2xl font-bold mb-4">{backTitle}</h3>
            <p className="text-muted-foreground mb-4">{backDescription}</p>
            
            {backDetails && <div className="my-4">{backDetails}</div>}
            
            <div className="mt-auto flex flex-col gap-2">
              <Button 
                onClick={handleFlip} 
                variant="outline" 
                className="relative btn-reflection w-full rounded-lg"
              >
                <span>Go Back</span>
              </Button>
              
              {buttonHref && (
                <Button 
                  asChild 
                  className="relative btn-reflection w-full rounded-lg"
                >
                  <a href={buttonHref}>{buttonText}</a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CSS for reflection effects */}
      <style jsx>{`
        .reflection-effect {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: translateY(-100%);
          animation: reflection 6s ease-in-out infinite;
        }

        @keyframes reflection {
          0% {
            transform: translateY(-100%) rotate(0deg);
          }
          30% {
            transform: translateY(100%) rotate(5deg);
          }
          100% {
            transform: translateY(100%) rotate(5deg);
          }
        }

        .btn-reflection {
          box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
          transition: 0.6s;
          -webkit-box-reflect: below 10px linear-gradient(to bottom, rgba(0,0,0,0.0), rgba(0,0,0,0.2));
        }

        .btn-reflection:active {
          scale: 0.95;
        }

        .btn-reflection:hover {
          background: linear-gradient(270deg, rgba(2, 29, 78, 0.4) 0%, rgba(31, 215, 232, 0.6) 60%);
          color: white;
        }

        /* Hover effect for the card */
        .flip-card-container:hover {
          transform: translateY(-10px);
          transition: transform 0.3s ease;
        }

        .flip-card-front, .flip-card-back {
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.5s ease;
        }

        .flip-card-container:hover .flip-card-front,
        .flip-card-container:hover .flip-card-back {
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default FlipCard; 