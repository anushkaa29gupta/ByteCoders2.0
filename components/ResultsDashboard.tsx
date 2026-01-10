import { Button } from "./ui/button";
import { ArrowLeft, Download, FileText, AlertTriangle } from "lucide-react";
import { RiskScoreCard } from "./analysis/RiskScoreCard";
import { MetadataCard } from "./analysis/MetadataCard";
import { LocationCard } from "./analysis/LocationCard";
import { HumanDetectionCard } from "./analysis/HumanDetectionCard";
import { WebPresenceCard } from "./analysis/WebPresenceCard";
import { ManipulationCard } from "./analysis/ManipulationCard";
import { OcrAnalysisCard } from "./analysis/OcrAnalysisCard";
import { ExportReportCard } from "./analysis/ExportReportCard";

interface ResultsDashboardProps {
  uploadedImage: string;
  onReset: () => void;
}

export function ResultsDashboard({ uploadedImage, onReset }: ResultsDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <Button
          onClick={onReset}
          variant="outline"
          className="bg-[#0f1729]/50 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400"
        >
          <ArrowLeft className="size-4 mr-2" />
          New Analysis
        </Button>
        
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-sm text-green-400">✓ Analysis Complete</p>
          </div>
        </div>
      </div>

      {/* Image Preview */}
      <div className="rounded-xl overflow-hidden border border-cyan-500/30 bg-[#0f1729]/50 backdrop-blur-sm shadow-[0_0_30px_rgba(34,211,238,0.1)]">
        <div className="aspect-video w-full flex items-center justify-center bg-[#0a0e1a]/50">
          <img 
            src={uploadedImage} 
            alt="Analyzed" 
            className="max-w-full max-h-[400px] object-contain"
          />
        </div>
      </div>

      {/* Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Score - Full Width on Mobile */}
        <div className="lg:col-span-3">
          <RiskScoreCard />
        </div>

        {/* Export Report - Full Width */}
        <div className="lg:col-span-3">
          <ExportReportCard />
        </div>

        {/* Metadata & Forensics */}
        <div className="lg:col-span-1">
          <MetadataCard />
        </div>

        {/* Location Intelligence */}
        <div className="lg:col-span-1">
          <LocationCard />
        </div>

        {/* Human Detection */}
        <div className="lg:col-span-1">
          <HumanDetectionCard />
        </div>

        {/* OCR & Text Analysis - Full Width */}
        <div className="lg:col-span-3">
          <OcrAnalysisCard />
        </div>

        {/* Web Presence */}
        <div className="lg:col-span-2">
          <WebPresenceCard />
        </div>

        {/* Manipulation Analysis */}
        <div className="lg:col-span-1">
          <ManipulationCard />
        </div>
      </div>
    </div>
  );
}