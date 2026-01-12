import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
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
  analysisData: any;
}

export function ResultsDashboard({ uploadedImage, onReset, analysisData }: ResultsDashboardProps) {
  return (
    <div className="space-y-6">
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

      <div className="rounded-xl overflow-hidden border border-cyan-500/30 bg-[#0f1729]/50 backdrop-blur-sm shadow-[0_0_30px_rgba(34,211,238,0.1)]">
        <div className="aspect-video w-full flex items-center justify-center bg-[#0a0e1a]/50">
          <img
            src={uploadedImage}
            alt="Analyzed"
            className="max-w-full max-h-[400px] object-contain"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
          <RiskScoreCard />
        </div>

        <div className="lg:col-span-3">
          <ExportReportCard />
        </div>

        <div className="lg:col-span-1">
          <MetadataCard metadata={analysisData.metadata} forensics={analysisData.forensics} />
        </div>

        <div className="lg:col-span-1">
          <LocationCard />
        </div>

        <div className="lg:col-span-1">
          <HumanDetectionCard />
        </div>

        <div className="lg:col-span-3">
          <OcrAnalysisCard ocrData={analysisData.ocr} />
        </div>

        <div className="lg:col-span-2">
          <WebPresenceCard />
        </div>

        <div className="lg:col-span-1">
          <ManipulationCard forensics={analysisData.forensics} />
        </div>
      </div>
    </div>
  );
}
