import { Scissors, AlertTriangle, CheckCircle2 } from "lucide-react";

interface ManipulationCardProps {
  forensics: any;
}

export function ManipulationCard({ forensics }: ManipulationCardProps) {
  if (!forensics) {
    return (
      <div className="h-full p-6 rounded-xl bg-gradient-to-br from-[#0f1729]/50 to-[#1a1f3a]/50 border border-cyan-500/20">
        <p className="text-yellow-300">Loading forensics...</p>
      </div>
    );
  }

  const analysis = forensics.analysis || {};
  const findings = forensics.findings || [];
  const manipulationLikelihood = forensics.manipulation_likelihood || "low";

  const blurScore = analysis.blur_score || 0;
  const edgeDensity = (analysis.edge_density || 0) * 100;
  const histogramEntropy = analysis.histogram_entropy || 0;

  return (
    <div className="h-full p-6 rounded-xl bg-gradient-to-br from-[#0f1729]/50 to-[#1a1f3a]/50 border border-cyan-500/20 backdrop-blur-sm shadow-[0_0_20px_rgba(34,211,238,0.1)]">
      <div className="flex items-center gap-2 mb-6">
        <Scissors className="size-5 text-cyan-400" />
        <h3 className="font-semibold">Manipulation Analysis</h3>
      </div>

      <div className="space-y-4">
        <div className={`p-4 rounded-lg ${analysis.blur_detected ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-green-500/10 border-green-500/30'} border`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Blur Detection</span>
            <span className={`px-2 py-1 ${analysis.blur_detected ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'} text-xs rounded`}>
              {analysis.blur_detected ? 'Detected' : 'Clear'}
            </span>
          </div>
          <div className="h-2 bg-gray-700/30 rounded-full overflow-hidden">
            <div 
              className={`h-full ${analysis.blur_detected ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gradient-to-r from-green-500 to-emerald-500'}`}
              style={{ width: `${Math.min(100, blurScore / 5)}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">Score: {blurScore.toFixed(2)}</p>
        </div>

        <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Edge Density</span>
            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
              {edgeDensity > 15 ? 'High' : edgeDensity > 8 ? 'Medium' : 'Low'}
            </span>
          </div>
          <div className="h-2 bg-gray-700/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
              style={{ width: `${Math.min(100, edgeDensity * 5)}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">{edgeDensity.toFixed(2)}%</p>
        </div>

        <div className={`p-4 rounded-lg ${histogramEntropy < 6.5 ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-green-500/10 border-green-500/30'} border`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Histogram Entropy</span>
            <span className={`px-2 py-1 ${histogramEntropy < 6.5 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'} text-xs rounded`}>
              {histogramEntropy < 6.5 ? 'Compressed' : 'Normal'}
            </span>
          </div>
          <div className="h-2 bg-gray-700/30 rounded-full overflow-hidden">
            <div 
              className={`h-full ${histogramEntropy < 6.5 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gradient-to-r from-green-500 to-emerald-500'}`}
              style={{ width: `${(histogramEntropy / 8) * 100}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">Entropy: {histogramEntropy.toFixed(2)}</p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between py-2 border-b border-cyan-500/10">
            <span className="text-gray-400">Manipulation Likelihood</span>
            <span className={`capitalize font-medium ${
              manipulationLikelihood === 'high' ? 'text-red-400' : 
              manipulationLikelihood === 'medium' ? 'text-yellow-400' : 
              'text-green-400'
            }`}>
              {manipulationLikelihood}
            </span>
          </div>
        </div>

        {findings.length > 0 && (
          <div className="space-y-2">
            {findings.map((finding: any, index: number) => {
              const findingColor = finding.type === "warning" ? "yellow" : finding.type === "danger" ? "red" : "blue";
              return (
                <div 
                  key={index}
                  className={`p-3 rounded-lg bg-${findingColor}-500/10 border border-${findingColor}-500/30 flex items-start gap-2`}
                >
                  <AlertTriangle className={`size-4 text-${findingColor}-400 flex-shrink-0 mt-0.5`} />
                  <div className="flex-1">
                    <p className={`text-xs text-${findingColor}-300 font-medium mb-0.5`}>{finding.label}</p>
                    {finding.confidence && (
                      <p className="text-xs text-gray-400">Confidence: {finding.confidence}%</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {findings.length === 0 && manipulationLikelihood === "low" && (
          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30 flex items-start gap-2">
            <CheckCircle2 className="size-4 text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-green-300">
              No significant manipulation indicators detected
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
