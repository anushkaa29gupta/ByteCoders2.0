import { Globe, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

export function WebPresenceCard() {
  const appearances = [
    { 
      platform: "News and Media", 
      count: 15, 
      category: "News Outlets",
      context: "Verified news articles, editorial content",
      verdict: "Legitimate",
      color: "blue"
    },
    { 
      platform: "Social Media", 
      count: 70, 
      category: "Social Networks",
      context: "Instagram, Facebook, Twitter - personal profiles and public posts",
      verdict: "Legitimate",
      color: "blue"
    },
    { 
      platform: "Commercial/Promotional", 
      count: 23, 
      category: "Marketing Sites",
      context: "E-commerce platforms, advertising campaigns, promotional materials",
      verdict: "Neutral",
      color: "yellow"
    },
    { 
      platform: "Unknown and Low Credibility", 
      count: 19, 
      category: "Unverified Sites",
      context: "Low-trust domains, scraped content, questionable sources",
      verdict: "Suspicious",
      color: "red"
    },
  ];

  return (
    <div className="h-full p-6 rounded-xl bg-gradient-to-br from-[#0f1729]/50 to-[#1a1f3a]/50 border border-cyan-500/20 backdrop-blur-sm shadow-[0_0_20px_rgba(34,211,238,0.1)]">
      <div className="flex items-center gap-2 mb-6">
        <Globe className="size-5 text-cyan-400" />
        <h3 className="font-semibold">Web Presence & Context Consistency Analysis</h3>
      </div>

      <div className="space-y-3 mb-6">
        {appearances.map((item, index) => {
          const isLegit = item.verdict === "Legitimate";
          const isNeutral = item.verdict === "Neutral";
          const isSuspicious = item.verdict === "Suspicious";
          
          return (
            <div 
              key={index}
              className={`
                p-4 rounded-lg border transition-all hover:scale-[1.01]
                ${isSuspicious 
                  ? "bg-red-500/10 border-red-500/30" 
                  : isNeutral 
                  ? "bg-yellow-500/10 border-yellow-500/30" 
                  : "bg-blue-500/10 border-blue-500/30"
                }
              `}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-semibold ${
                      isSuspicious ? "text-red-300" : isNeutral ? "text-yellow-300" : "text-blue-300"
                    }`}>
                      {item.platform}
                    </h4>
                    <span className={`
                      text-xs px-2 py-0.5 rounded
                      ${isSuspicious 
                        ? "bg-red-500/20 text-red-300" 
                        : isNeutral 
                        ? "bg-yellow-500/20 text-yellow-300" 
                        : "bg-blue-500/20 text-blue-300"
                      }
                    `}>
                      {item.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{item.context}</p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-gray-500">Appearances: <span className="text-white font-mono">{item.count}</span></span>
                    <span className="flex items-center gap-1">
                      {isSuspicious ? (
                        <><XCircle className="size-3 text-red-400" /> <span className="text-red-400">Suspicious</span></>
                      ) : isNeutral ? (
                        <><AlertTriangle className="size-3 text-yellow-400" /> <span className="text-yellow-400">Neutral</span></>
                      ) : (
                        <><CheckCircle2 className="size-3 text-blue-400" /> <span className="text-blue-400">Legitimate</span></>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Platform Distribution Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 text-center">
          <p className="text-2xl font-bold text-blue-400">15</p>
          <p className="text-xs text-gray-400 mt-1">News & Media</p>
        </div>
        <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-center">
          <p className="text-2xl font-bold text-cyan-400">70</p>
          <p className="text-xs text-gray-400 mt-1">Social Media</p>
        </div>
        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-center">
          <p className="text-2xl font-bold text-yellow-400">23</p>
          <p className="text-xs text-gray-400 mt-1">Commercial</p>
        </div>
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-center">
          <p className="text-2xl font-bold text-red-400">19</p>
          <p className="text-xs text-gray-400 mt-1">Low Credibility</p>
        </div>
      </div>

      {/* Context Consistency Summary */}
      <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30 flex items-start gap-3">
        <AlertTriangle className="size-5 text-yellow-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-yellow-300 mb-1">Mixed Context Usage Detected</p>
          <p className="text-sm text-gray-400">
            Image appears across 127 total sites with varying credibility levels. 
            While majority usage appears legitimate (67%), presence on 19 low-credibility sites warrants investigation.
          </p>
        </div>
      </div>
    </div>
  );
}