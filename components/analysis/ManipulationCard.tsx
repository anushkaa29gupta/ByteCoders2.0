import { Scissors, AlertTriangle } from "lucide-react";

export function ManipulationCard() {
  return (
    <div className="h-full p-6 rounded-xl bg-gradient-to-br from-[#0f1729]/50 to-[#1a1f3a]/50 border border-cyan-500/20 backdrop-blur-sm shadow-[0_0_20px_rgba(34,211,238,0.1)]">
      <div className="flex items-center gap-2 mb-6">
        <Scissors className="size-5 text-cyan-400" />
        <h3 className="font-semibold">Manipulation Analysis</h3>
      </div>

      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">ELA Analysis</span>
            <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded">Anomalies</span>
          </div>
          <div className="h-2 bg-gray-700/30 rounded-full overflow-hidden">
            <div className="h-full w-[68%] bg-gradient-to-r from-yellow-500 to-orange-500" />
          </div>
        </div>

        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Clone Detection</span>
            <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">Detected</span>
          </div>
          <div className="h-2 bg-gray-700/30 rounded-full overflow-hidden">
            <div className="h-full w-[82%] bg-gradient-to-r from-red-500 to-red-600" />
          </div>
        </div>

        <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Noise Analysis</span>
            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">Inconsistent</span>
          </div>
          <div className="h-2 bg-gray-700/30 rounded-full overflow-hidden">
            <div className="h-full w-[45%] bg-gradient-to-r from-blue-500 to-cyan-500" />
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between py-2 border-b border-cyan-500/10">
            <span className="text-gray-400">AI-Generated</span>
            <span className="text-red-400">Unlikely (12%)</span>
          </div>
          
          <div className="flex justify-between py-2">
            <span className="text-gray-400">Deepfake Score</span>
            <span className="text-green-400">Low (8%)</span>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30 flex items-start gap-2">
          <AlertTriangle className="size-4 text-yellow-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-yellow-300">
            Clone stamp patterns detected - possible content removal
          </p>
        </div>
      </div>
    </div>
  );
}
