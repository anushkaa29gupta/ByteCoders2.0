import { FileText, AlertTriangle, CheckCircle2, Eye, Link } from "lucide-react";

export function OcrAnalysisCard() {
  const extractedText = `URGENT: Your account has been compromised!
Click here immediately: bit.ly/sec-verify-2024
Contact support: +1-888-555-0123
Reference ID: TXN-4492-SEC`;

  const signals = [
    { 
      type: "danger", 
      label: "Urgency Language Detected", 
      description: "Phrases like 'URGENT', 'immediately' commonly used in scams",
      confidence: 94
    },
    { 
      type: "danger", 
      label: "Shortened URL Found", 
      description: "bit.ly link detected - commonly used to hide malicious destinations",
      confidence: 88
    },
    { 
      type: "warning", 
      label: "Phone Number Detected", 
      description: "Unverified contact number found in image",
      confidence: 76
    },
    { 
      type: "info", 
      label: "Transaction Reference", 
      description: "Reference ID present - verify authenticity with official sources",
      confidence: 92
    },
  ];

  return (
    <div className="p-6 rounded-xl bg-gradient-to-br from-[#0f1729]/50 to-[#1a1f3a]/50 border border-cyan-500/20 backdrop-blur-sm shadow-[0_0_20px_rgba(34,211,238,0.1)]">
      <div className="flex items-center gap-2 mb-6">
        <Eye className="size-5 text-cyan-400" />
        <h3 className="font-semibold">OCR-based Text Extraction & Content Signal Analysis</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Extracted Text */}
        <div>
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Extracted Text Content</h4>
            <div className="p-4 rounded-lg bg-[#0a0e1a]/60 border border-cyan-500/20 font-mono text-sm text-cyan-200 whitespace-pre-wrap">
              {extractedText}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-xs text-gray-400 mb-1">Text Confidence</p>
              <p className="text-lg font-bold text-blue-400">96.3%</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
              <p className="text-xs text-gray-400 mb-1">Language</p>
              <p className="text-lg font-bold text-purple-400">English</p>
            </div>
          </div>
        </div>

        {/* Content Signals */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-3">Content Threat Signals</h4>
          <div className="space-y-3">
            {signals.map((signal, index) => {
              const isRedFlag = signal.type === "danger";
              const isWarning = signal.type === "warning";
              const color = isRedFlag ? "red" : isWarning ? "yellow" : "blue";
              
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
                      {isRedFlag ? (
                        <AlertTriangle className={`size-5 text-${color}-400`} />
                      ) : isWarning ? (
                        <AlertTriangle className={`size-5 text-${color}-400`} />
                      ) : (
                        <CheckCircle2 className={`size-5 text-${color}-400`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <p className={`font-medium text-sm text-${color}-300`}>{signal.label}</p>
                        <span className={`text-xs px-2 py-0.5 rounded bg-${color}-500/20 text-${color}-300`}>
                          {signal.confidence}%
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">{signal.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Overall Assessment */}
      <div className="mt-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-3">
        <AlertTriangle className="size-5 text-red-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-red-300 mb-1">High-Risk Content Detected</p>
          <p className="text-sm text-gray-400">
            Image contains text patterns commonly associated with phishing attempts and social engineering attacks. 
            Multiple red flags detected including urgency language and unverified contact methods.
          </p>
        </div>
      </div>
    </div>
  );
}
