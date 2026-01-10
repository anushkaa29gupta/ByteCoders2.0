import { AlertTriangle, Shield } from "lucide-react";

export function RiskScoreCard() {
  const riskScore = 72;
  const riskLevel = riskScore >= 70 ? "HIGH" : riskScore >= 40 ? "MEDIUM" : "LOW";
  const riskColor = riskScore >= 70 ? "text-red-400" : riskScore >= 40 ? "text-yellow-400" : "text-green-400";
  const riskBg = riskScore >= 70 ? "bg-red-500/10" : riskScore >= 40 ? "bg-yellow-500/10" : "bg-green-500/10";
  const riskBorder = riskScore >= 70 ? "border-red-500/30" : riskScore >= 40 ? "border-yellow-500/30" : "border-green-500/30";

  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (riskScore / 100) * circumference;

  return (
    <div className="p-6 rounded-xl bg-gradient-to-br from-[#0f1729]/50 to-[#1a1f3a]/50 border border-cyan-500/20 backdrop-blur-sm shadow-[0_0_20px_rgba(34,211,238,0.1)]">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="size-5 text-cyan-400" />
        <h3 className="font-semibold">Overall Risk Assessment</h3>
      </div>

      <div className="flex items-center gap-8">
        {/* Circular Risk Meter */}
        <div className="relative flex-shrink-0">
          <svg className="size-48 -rotate-90">
            {/* Background circle */}
            <circle
              cx="96"
              cy="96"
              r="90"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              className="text-gray-700/30"
            />
            {/* Progress circle */}
            <circle
              cx="96"
              cy="96"
              r="90"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className={`${riskColor} transition-all duration-1000 ease-out`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-4xl font-bold ${riskColor}`}>{riskScore}</span>
            <span className="text-sm text-gray-400">Risk Score</span>
          </div>
        </div>

        {/* Risk Indicators */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg ${riskBg} border ${riskBorder}`}>
            <p className="text-xs text-gray-400 mb-1">Risk Level</p>
            <p className={`text-xl font-bold ${riskColor}`}>{riskLevel}</p>
          </div>
          
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
            <p className="text-xs text-gray-400 mb-1">Flags Detected</p>
            <p className="text-xl font-bold text-red-400">4</p>
          </div>

          <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
            <p className="text-xs text-gray-400 mb-1">Web Appearances</p>
            <p className="text-xl font-bold text-yellow-400">127</p>
          </div>

          <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <p className="text-xs text-gray-400 mb-1">Analysis Depth</p>
            <p className="text-xl font-bold text-blue-400">Deep</p>
          </div>
        </div>
      </div>

      {/* Warning Banner */}
      <div className="mt-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-3">
        <AlertTriangle className="size-5 text-red-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-red-300 mb-1">High-Risk Indicators Detected</p>
          <p className="text-sm text-gray-400">
            Image shows signs of manipulation, inconsistent metadata, and appears in suspicious contexts across multiple platforms.
          </p>
        </div>
      </div>
    </div>
  );
}
