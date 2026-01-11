import { useState } from "react";
import { Upload, Shield, FileText, Download, CheckCircle2, AlertTriangle } from "lucide-react";
import { ImageUploadZone } from "./components/ImageUploadZone";
import { ProcessingSteps } from "./components/ProcessingSteps";
import { ResultsDashboard } from "./components/ResultsDashboard";

export default function App() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      setIsProcessing(true);
      setShowResults(false);
      
      // Simulate processing
      setTimeout(() => {
        setIsProcessing(false);
        setShowResults(true);
      }, 5000);
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    setUploadedImage(null);
    setIsProcessing(false);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0f1729] to-[#1a1f3a] text-white">
      {/* Header */}
      <header className="border-b border-cyan-500/20 bg-[#0a0e1a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-cyan-400 to-blue-500 p-2 rounded-lg shadow-lg shadow-cyan-500/20">
              <Shield className="size-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight">OSINT Vision</h1>
              <p className="text-xs text-cyan-400">Image-Based Cyber Threat Intelligence</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-md">
              <p className="text-xs text-cyan-300">Status: <span className="text-green-400">Active</span></p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-6 py-8">
        {!uploadedImage && !isProcessing && !showResults && (
          <ImageUploadZone onImageUpload={handleImageUpload} />
        )}

        {isProcessing && (
          <ProcessingSteps uploadedImage={uploadedImage} />
        )}

        {showResults && uploadedImage && (
          <ResultsDashboard uploadedImage={uploadedImage} onReset={handleReset} />
        )}
      </main>
    </div>
  );
}
