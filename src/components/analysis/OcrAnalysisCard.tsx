import { FileText, AlertTriangle, CheckCircle2, Eye, Link } from "lucide-react";

interface OcrAnalysisCardProps {
  ocrData: any;
}

export function OcrAnalysisCard({ ocrData }: OcrAnalysisCardProps) {
  console.log('OcrAnalysisCard received:', ocrData);
  
  if (!ocrData) {
    return (
      <div className="p-6 rounded-xl bg-gradient-to-br from-[#0f1729]/50 to-[#1a1f3a]/50 border border-cyan-500/20">
        <p className="text-yellow-300">Loading OCR data...</p>
      </div>
    );
  }

  const extractedText = ocrData.text || "No text detected in image";
  const signals = ocrData.signals || [];
  const confidence = ocrData.confidence || 0;
  const language = ocrData.language || "Unknown";

  const hasHighRiskSignals = signals.some((s: any) => s.type === "danger");
  const hasWarningSignals = signals.some((s: any) => s.type === "warning");

  return (
    <div className="p-6 rounded-xl bg-gradient-to-br from-[#0f1729]/50 to-[#1a1f3a]/50 border border-cyan-500/20 backdrop-blur-sm shadow-[0_0_20px_rgba(34,211,238,0.1)]">
      <div className="flex items-center gap-2 mb-6">
        <Eye className="size-5 text-cyan-400" />
        <h3 className="font-semibold">OCR-based Text Extraction & Content Signal Analysis</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Extracted Text Content</h4>
            <div className="p-4 rounded-lg bg-[#0a0e1a]/60 border border-cyan-500/20 font-mono text-sm text-cyan-200 whitespace-pre-wrap max-h-64 overflow-y-auto">
              {extractedText}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-xs text-gray-400 mb-1">Text Confidence</p>
              <p className="text-lg font-bold text-blue-400">{confidence.toFixed(1)}%</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
              <p className="text-xs text-gray-400 mb-1">Language</p>
              <p className="text-lg font-bold text-purple-400">{language}</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-3">Content Threat Signals</h4>
          {signals.length > 0 ? (
            <div className="space-y-3">
              {signals.map((signal: any, index: number) => {
                const isRedFlag = signal.type === "danger";
                const isWarning = signal.type === "warning";
                
                return (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border ${
                      isRedFlag 
                        ? "bg-red-500/10 border-red-500/30" 
                        : isWarning 
                        ? "bg-yellow-500/10 border-yellow-500/30" 
                        : "bg-blue-500/10 border-blue-500/30"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {isRedFlag || isWarning ? (
                          <AlertTriangle className={`size-5 ${isRedFlag ? 'text-red-400' : 'text-yellow-400'}`} />
                        ) : (
                          <CheckCircle2 className="size-5 text-blue-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <p className={`font-medium text-sm ${isRedFlag ? 'text-red-300' : isWarning ? 'text-yellow-300' : 'text-blue-300'}`}>
                            {signal.label}
                          </p>
                          <span className={`text-xs px-2 py-0.5 rounded ${isRedFlag ? 'bg-red-500/20 text-red-300' : isWarning ? 'bg-yellow-500/20 text-yellow-300' : 'bg-blue-500/20 text-blue-300'}`}>
                            {signal.confidence}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 flex items-start gap-3">
              <CheckCircle2 className="size-5 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-300">No suspicious content signals detected</p>
            </div>
          )}
        </div>
      </div>

      {hasHighRiskSignals && (
        <div className="mt-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-3">
          <AlertTriangle className="size-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-red-300 mb-1">High-Risk Content Detected</p>
            <p className="text-sm text-gray-400">
              Image contains text patterns commonly associated with phishing attempts and social engineering attacks.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
