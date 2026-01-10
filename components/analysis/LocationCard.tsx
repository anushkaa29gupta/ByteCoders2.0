import { MapPin, CheckCircle2 } from "lucide-react";

export function LocationCard() {
  const latitude = 37.7749;
  const longitude = -122.4194;

  return (
    <div className="h-full p-6 rounded-xl bg-gradient-to-br from-[#0f1729]/50 to-[#1a1f3a]/50 border border-cyan-500/20 backdrop-blur-sm shadow-[0_0_20px_rgba(34,211,238,0.1)]">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="size-5 text-cyan-400" />
        <h3 className="font-semibold">Location Intelligence</h3>
      </div>

      <div className="space-y-4">
        {/* Interactive Map View */}
        <div className="aspect-video rounded-lg overflow-hidden border border-cyan-500/20 relative">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.01},${latitude - 0.01},${longitude + 0.01},${latitude + 0.01}&layer=mapnik&marker=${latitude},${longitude}`}
            allowFullScreen
            title="Location Map"
          />
          <div className="absolute top-2 left-2 bg-[#0a0e1a]/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-cyan-500/30">
            <p className="text-xs text-cyan-300 font-mono">{latitude}° N, {longitude}° W</p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between py-2 border-b border-cyan-500/10">
            <span className="text-gray-400">Location</span>
            <span className="text-cyan-300">San Francisco, CA</span>
          </div>
          
          <div className="flex justify-between py-2 border-b border-cyan-500/10">
            <span className="text-gray-400">Altitude</span>
            <span className="text-cyan-300">52m</span>
          </div>
          
          <div className="flex justify-between py-2">
            <span className="text-gray-400">Accuracy</span>
            <span className="text-green-400">High (±5m)</span>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30 flex items-start gap-2">
          <CheckCircle2 className="size-4 text-green-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-green-300">
            GPS data verified against known landmarks
          </p>
        </div>
      </div>
    </div>
  );
}