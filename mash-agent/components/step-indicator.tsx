import type React from "react"
import { CheckCircle2, XCircle, Circle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  name: string
  status: "pending" | "complete" | "error"
  message?: string
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: string | null
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex flex-col gap-2" role="region" aria-label="Operation Steps">
      <div className="text-xs text-white/50 mb-1">Operation Steps:</div>
      <div className="space-y-2">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-2">
            {step.status === "complete" ? (
              <div 
                className="h-4 w-4 rounded-full bg-[#00cbdd] flex items-center justify-center"
                aria-hidden="true"
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#00031b"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            ) : step.status === "error" ? (
              <div 
                className="h-4 w-4 rounded-full bg-white/80 flex items-center justify-center"
                aria-hidden="true"
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#00031b"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
            ) : step.name === currentStep ? (
              <div 
                className="h-4 w-4 rounded-full border-2 border-[#00cbdd] border-t-transparent animate-spin"
                aria-hidden="true"
              ></div>
            ) : (
              <div 
                className="h-4 w-4 rounded-full border border-white/30"
                aria-hidden="true"
              ></div>
            )}

            <div className="flex flex-col">
              <span
                className={cn(
                  "text-xs",
                  step.status === "complete"
                    ? "text-[#00cbdd]"
                    : step.status === "error"
                      ? "text-white"
                      : step.name === currentStep
                        ? "text-[#00cbdd]"
                        : "text-white/70",
                )}
                aria-label={`${step.name} - ${
                  step.status === "complete" 
                    ? "completed" 
                    : step.status === "error"
                    ? "failed"
                    : step.name === currentStep
                    ? "in progress"
                    : "pending"
                }`}
              >
                {step.name}
              </span>

              {step.message && (
                <span 
                  className="text-xs text-white/50"
                  aria-live={step.status === "error" ? "assertive" : "polite"}
                >
                  {step.message}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

