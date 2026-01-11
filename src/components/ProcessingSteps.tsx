import { useEffect, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

interface ProcessingStepsProps {
  uploadedImage: string | null;
}

const steps = [
  { id: 1, label: "Uploading image", duration: 500 },
  { id: 2, label: "Extracting metadata & EXIF data", duration: 800 },
  { id: 3, label: "Performing reverse image search", duration: 1200 },
  { id: 4, label: "Analyzing manipulation signatures", duration: 900 },
  { id: 5, label: "Running OCR & text extraction", duration: 1000 },
  { id: 6, label: "Generating threat intelligence report", duration: 600 },
];

export function ProcessingSteps({ uploadedImage }: ProcessingStepsProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (currentStep < steps.length) {
      timeoutId = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, steps[currentStep]?.duration || 500);
    }

    return () => clearTimeout(timeoutId);
  }, [currentStep]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] gap-8">
      {/* Image Preview */}
      {uploadedImage && (
        <div className="relative w-64 h-64 rounded-xl overflow-hidden border-2 border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
          <img src={uploadedImage} alt="Uploaded" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a]/80 to-transparent" />
        </div>
      )}

      {/* Processing Steps */}
      <div className="w-full max-w-2xl space-y-3">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          
          return (
            <div
              key={step.id}
              className={`
                p-4 rounded-lg border transition-all duration-300
                ${isCompleted 
                  ? "bg-cyan-500/10 border-cyan-500/30" 
                  : isCurrent 
                  ? "bg-blue-500/10 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.2)]" 
                  : "bg-[#0f1729]/50 border-cyan-500/10"
                }
              `}
            >
              <div className="flex items-center gap-4">
                <div className={`
                  flex-shrink-0 size-8 rounded-full flex items-center justify-center
                  ${isCompleted 
                    ? "bg-cyan-500/20 border border-cyan-500/50" 
                    : isCurrent 
                    ? "bg-blue-500/20 border border-blue-500/50" 
                    : "bg-gray-500/10 border border-gray-500/20"
                  }
                `}>
                  {isCompleted ? (
                    <CheckCircle2 className="size-5 text-cyan-400" />
                  ) : isCurrent ? (
                    <Loader2 className="size-5 text-blue-400 animate-spin" />
                  ) : (
                    <span className="text-sm text-gray-500">{step.id}</span>
                  )}
                </div>
                
                <p className={`
                  text-sm transition-colors
                  ${isCompleted 
                    ? "text-cyan-300" 
                    : isCurrent 
                    ? "text-white font-medium" 
                    : "text-gray-500"
                  }
                `}>
                  {step.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
