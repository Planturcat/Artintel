"use client";

import React, { useState, useEffect } from 'react';
import { cn, createCssVars, prefersReducedMotion } from '@/lib';

export interface AdvancedLoaderProps {
  className?: string;
  type?: 'pulse' | 'spin' | 'bounce' | 'wave' | 'server';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  secondaryColor?: string;
  speed?: 'slow' | 'normal' | 'fast';
  showProgress?: boolean;
  progress?: number;
  text?: string;
  showShadow?: boolean;
  interactive?: boolean;
  onComplete?: () => void;
}

const AdvancedLoader: React.FC<AdvancedLoaderProps> = ({
  className,
  type = 'pulse',
  size = 'md',
  color = '#3b82f6',
  secondaryColor = '#ffffff',
  speed = 'normal',
  showProgress = false,
  progress = 0,
  text,
  showShadow = true,
  interactive = false,
  onComplete,
}) => {
  const [internalProgress, setInternalProgress] = useState<number>(progress);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Map size to pixel values
  const sizeMap = {
    sm: '100px',
    md: '150px',
    lg: '200px',
    xl: '300px',
  };

  // Map speed to duration values
  const speedMap = {
    slow: '3s',
    normal: '2s',
    fast: '1s',
  };

  // Update progress state when prop changes
  useEffect(() => {
    setInternalProgress(progress);
    if (progress >= 100 && onComplete && !isCompleted) {
      setIsCompleted(true);
      onComplete();
    }
  }, [progress, onComplete, isCompleted]);

  // Handle ESC key to cancel animation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (interactive && e.key === 'Escape') {
      if (onComplete && !isCompleted) {
        setIsCompleted(true);
        onComplete();
      }
    }
  };

  // CSS variables for the loader
  const loaderVars = createCssVars({
    size: sizeMap[size],
    color: color,
    secondaryColor: secondaryColor,
    duration: speedMap[speed],
    progress: `${internalProgress}%`,
  });

  // Check if reduced motion is preferred
  const reducedMotion = prefersReducedMotion();

  // Create a text wrapper around the loader if text is provided
  const renderLoader = () => {
    // Common props for all loaders
    const commonProps = {
      className: cn(
        'advanced-loader',
        interactive && 'cursor-pointer',
        isHovered && interactive && 'scale-110',
        showShadow && 'shadow-lg',
        `loader-${type}`,
        className
      ),
      style: {
        ...loaderVars,
        transition: 'transform 0.3s ease-in-out',
      },
      onMouseEnter: interactive ? () => setIsHovered(true) : undefined,
      onMouseLeave: interactive ? () => setIsHovered(false) : undefined,
      onClick: interactive && onComplete && !isCompleted ? onComplete : undefined,
      onKeyDown: handleKeyDown,
      tabIndex: interactive ? 0 : -1,
      role: interactive ? 'button' : 'status',
      'aria-label': text || `${type} loader`,
      'aria-live': 'polite',
      'aria-valuemin': showProgress ? 0 : undefined,
      'aria-valuemax': showProgress ? 100 : undefined,
      'aria-valuenow': showProgress ? internalProgress : undefined,
    };

    switch (type) {
      case 'pulse':
        return (
          <div {...commonProps}>
            <div className="pulse-circle" />
            <div className="pulse-circle" style={{ animationDelay: '0.3s' }} />
            <div className="pulse-circle" style={{ animationDelay: '0.6s' }} />
            {showProgress && (
              <div className="progress-text">{Math.round(internalProgress)}%</div>
            )}
          </div>
        );

      case 'spin':
        return (
          <div {...commonProps}>
            <div className="spinner" />
            {showProgress && (
              <div className="progress-text">{Math.round(internalProgress)}%</div>
            )}
          </div>
        );

      case 'bounce':
        return (
          <div {...commonProps}>
            <div className="bouncer">
              <div className="bounce-dot" />
              <div className="bounce-dot" style={{ animationDelay: '0.2s' }} />
              <div className="bounce-dot" style={{ animationDelay: '0.4s' }} />
            </div>
            {showProgress && (
              <div className="progress-text">{Math.round(internalProgress)}%</div>
            )}
          </div>
        );

      case 'wave':
        return (
          <div {...commonProps}>
            <div className="wave">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="wave-bar"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
            {showProgress && (
              <div className="progress-text">{Math.round(internalProgress)}%</div>
            )}
          </div>
        );

      case 'server':
        return (
          <div {...commonProps}>
            <div className="server-rack">
              <div className="server-unit estrobo_animation" />
              <div className="server-unit estrobo_animationV2" style={{ animationDelay: '0.3s' }} />
              <div className="server-unit estrobo_animation" style={{ animationDelay: '0.6s' }} />
            </div>
            {showProgress && (
              <div className="progress-text">{Math.round(internalProgress)}%</div>
            )}
          </div>
        );

      default:
        return (
          <div {...commonProps}>
            <div className="default-loader" />
            {showProgress && (
              <div className="progress-text">{Math.round(internalProgress)}%</div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="advanced-loader-wrapper">
      {renderLoader()}
      {text && <div className="loader-text mt-3 text-center">{text}</div>}
      <style jsx>{`
        .advanced-loader-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .advanced-loader {
          position: relative;
          width: var(--size);
          height: var(--size);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .progress-text {
          position: absolute;
          font-weight: bold;
          color: var(--color);
        }

        /* Pulse animation */
        .pulse-circle {
          position: absolute;
          width: calc(var(--size) * 0.3);
          height: calc(var(--size) * 0.3);
          border-radius: 50%;
          background-color: var(--color);
          opacity: 0.7;
          animation: ${reducedMotion ? 'none' : `pulse var(--duration) infinite ease-in-out`};
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(0.5);
            opacity: 0.3;
          }
          50% {
            transform: scale(1);
            opacity: 0.7;
          }
        }

        /* Spinner animation */
        .spinner {
          width: calc(var(--size) * 0.8);
          height: calc(var(--size) * 0.8);
          border: calc(var(--size) * 0.08) solid var(--secondaryColor);
          border-top: calc(var(--size) * 0.08) solid var(--color);
          border-radius: 50%;
          animation: ${reducedMotion ? 'none' : `spin var(--duration) infinite linear`};
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* Bounce animation */
        .bouncer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: calc(var(--size) * 0.05);
        }

        .bounce-dot {
          width: calc(var(--size) * 0.15);
          height: calc(var(--size) * 0.15);
          background-color: var(--color);
          border-radius: 50%;
          animation: ${reducedMotion ? 'none' : `bounce var(--duration) infinite ease-in-out`};
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(calc(var(--size) * -0.2));
          }
        }

        /* Wave animation */
        .wave {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: calc(var(--size) * 0.05);
          height: calc(var(--size) * 0.6);
        }

        .wave-bar {
          width: calc(var(--size) * 0.06);
          height: calc(var(--size) * 0.4);
          background-color: var(--color);
          border-radius: calc(var(--size) * 0.03);
          animation: ${reducedMotion ? 'none' : `wave var(--duration) infinite ease-in-out`};
        }

        @keyframes wave {
          0%, 100% {
            height: calc(var(--size) * 0.1);
          }
          50% {
            height: calc(var(--size) * 0.5);
          }
        }

        /* Server animation */
        .server-rack {
          display: flex;
          flex-direction: column;
          gap: calc(var(--size) * 0.1);
          width: calc(var(--size) * 0.8);
          background-color: var(--secondaryColor);
          padding: calc(var(--size) * 0.1);
          border-radius: calc(var(--size) * 0.05);
          box-shadow: inset 0 0 calc(var(--size) * 0.05) rgba(0, 0, 0, 0.2);
        }

        .server-unit {
          height: calc(var(--size) * 0.15);
          background-color: var(--color);
          border-radius: calc(var(--size) * 0.03);
          position: relative;
          animation: ${reducedMotion ? 'none' : `floatAndBounce 4s infinite ease-in-out`};
        }

        .server-unit::after {
          content: '';
          position: absolute;
          top: 50%;
          right: calc(var(--size) * 0.05);
          transform: translateY(-50%);
          width: calc(var(--size) * 0.03);
          height: calc(var(--size) * 0.03);
          border-radius: 50%;
          background-color: ${secondaryColor};
          animation: ${reducedMotion ? 'none' : `blink var(--duration) infinite`};
        }

        @keyframes floatAndBounce {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(calc(var(--size) * 0.1));
          }
        }

        @keyframes blink {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 1;
          }
        }

        /* Default loader */
        .default-loader {
          width: calc(var(--size) * 0.6);
          height: calc(var(--size) * 0.6);
          border: calc(var(--size) * 0.05) solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top-color: var(--color);
          animation: ${reducedMotion ? 'none' : `spin var(--duration) infinite linear`};
        }
      `}</style>
    </div>
  );
};

export default AdvancedLoader;