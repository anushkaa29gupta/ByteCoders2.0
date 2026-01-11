import { Camera, AlertCircle } from "lucide-react";

export function MetadataCard() {
  return (
    <div className="h-full p-6 rounded-xl bg-gradient-to-br from-[#0f1729]/50 to-[#1a1f3a]/50 border border-cyan-500/20 backdrop-blur-sm shadow-[0_0_20px_rgba(34,211,238,0.1)]">
      <div className="flex items-center gap-2 mb-6">
        <Camera className="size-5 text-cyan-400" />
        <h3 className="font-semibold">Metadata & Forensics</h3>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between py-2 border-b border-cyan-500/10">
          <span className="text-gray-400">Camera Model</span>
          <span className="font-mono text-cyan-300">Canon EOS 5D</span>
        </div>
        
        <div className="flex justify-between py-2 border-b border-cyan-500/10">
          <span className="text-gray-400">Original Date</span>
          <span className="font-mono text-cyan-300">2024-01-15 14:32</span>
        </div>
        
        <div className="flex justify-between py-2 border-b border-cyan-500/10">
          <span className="text-gray-400">Modified Date</span>
          <span className="font-mono text-yellow-300">2024-12-20 09:15</span>
        </div>
        
        <div className="flex justify-between py-2 border-b border-cyan-500/10">
          <span className="text-gray-400">Software</span>
          <span className="font-mono text-cyan-300">Adobe Photoshop</span>
        </div>
        
        <div className="flex justify-between py-2 border-b border-cyan-500/10">
          <span className="text-gray-400">Resolution</span>
          <span className="font-mono text-cyan-300">3840 × 2160</span>
        </div>

        <div className="flex justify-between py-2">
          <span className="text-gray-400">File Hash (SHA-256)</span>
          <span className="font-mono text-xs text-cyan-300">3f7a9d...</span>
        </div>
      </div>

      <div className="mt-6 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30 flex items-start gap-2">
        <AlertCircle className="size-4 text-yellow-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-yellow-300">
          Metadata shows image was edited 11 months after capture
        </p>
      </div>
    </div>
  );
}
