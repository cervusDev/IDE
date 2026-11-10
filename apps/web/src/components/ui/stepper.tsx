import React from "react";
import { Check } from "lucide-react";

interface StepperProps {
  currentStep: number;
  steps: string[];
}

export const Stepper: React.FC<StepperProps> = ({ currentStep, steps }) => {
  return (
    <div className="w-full py-4 mb-8">
      <div className="flex items-center justify-between w-full relative">
        {steps.map((stepLabel, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;
          const isCurrent = currentStep === stepNumber;

          return (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center flex-shrink-0 z-10 group">
                <div
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-sm sm:text-base font-bold transition-all duration-300 ${
                    isCompleted
                      ? "bg-[#43B02A] text-white shadow-sm"
                      : isCurrent
                      ? "bg-[#EAB308] text-white ring-4 ring-yellow-100 shadow-md"
                      : "bg-zinc-100 text-zinc-500 border border-zinc-200"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                  ) : (
                    stepNumber
                  )}
                </div>

                <span
                  className={`text-xs sm:text-sm mt-2 font-semibold tracking-wide transition-colors duration-200 max-w-[80px] sm:max-w-none text-center truncate ${
                    isCurrent
                      ? "text-zinc-900 font-bold"
                      : isCompleted
                      ? "text-zinc-700"
                      : "text-zinc-400"
                  }`}
                >
                  {stepLabel}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-[2px] mx-2 sm:mx-4 transition-colors duration-300 ${
                    currentStep > stepNumber ? "bg-[#43B02A]" : "bg-zinc-200"
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};