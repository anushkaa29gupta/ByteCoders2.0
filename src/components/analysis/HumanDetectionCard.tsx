import { Users, CheckCircle2 } from "lucide-react";

export function HumanDetectionCard() {
  const hasHuman = true;

  return (
    <div className="h-full p-6 rounded-xl bg-gradient-to-br from-[#0f1729]/50 to-[#1a1f3a]/50 border border-cyan-500/20 backdrop-blur-sm shadow-[0_0_20px_rgba(34,211,238,0.1)]">
      <div className="flex items-center gap-2 mb-6">
        <Users className="size-5 text-cyan-400" />
        <h3 className="font-semibold">Human vs Object Detection</h3>
      </div>

      <div className="space-y-4">
        <div className={`
          p-6 rounded-lg text-center
          ${hasHuman 
            ? "bg-green-500/10 border-2 border-green-500/30" 
            : "bg-blue-500/10 border-2 border-blue-500/30"
          }
        `}>
          <CheckCircle2 className={`
            size-12 mx-auto mb-3
            ${hasHuman ? "text-green-400" : "text-blue-400"}
          `} />
          <p className={`
            text-lg font-bold mb-1
            ${hasHuman ? "text-green-300" : "text-blue-300"}
          `}>
            {hasHuman ? "Human detected" : "No human detected – object-only image"}
          </p>
          <p className="text-sm text-gray-400">
            {hasHuman 
              ? "Face and body features identified" 
              : "Only objects and scenery detected"
            }
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
            <p className="text-xs text-gray-400 mb-1">Confidence</p>
            <p className="text-lg font-bold text-cyan-400">98.7%</p>
          </div>
          
          <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
            <p className="text-xs text-gray-400 mb-1">Detected</p>
            <p className="text-lg font-bold text-purple-400">
              {hasHuman ? "3 Faces" : "N/A"}
            </p>
          </div>
        </div>

        {hasHuman && (
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-cyan-500/10">
              <span className="text-gray-400">Age Range</span>
              <span className="text-cyan-300">25-35 years</span>
            </div>
            
            <div className="flex justify-between py-2">
              <span className="text-gray-400">Gender</span>
              <span className="text-cyan-300">Mixed</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
