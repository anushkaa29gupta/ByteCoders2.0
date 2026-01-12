import { useState } from "react";
import { Upload, Shield, FileText, Download, CheckCircle2, AlertTriangle } from "lucide-react";
import { ImageUploadZone } from "./components/ImageUploadZone";
import { ProcessingSteps } from "./components/ProcessingSteps";
import { ResultsDashboard } from "./components/ResultsDashboard";

export default function App() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);

  const handleImageUpload = async (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    
    setUploadedFile(file);
    setIsProcessing(true);
    setShowResults(false);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const [ocrResponse, metadataResponse, forensicsResponse] = await Promise.all([
        fetch('http://localhost:8000/api/ocr', {
          method: 'POST',
          body: formData,
        }),
        fetch('http://localhost:8000/api/metadata', {
          method: 'POST',
          body: formData,
        }),
        fetch('http://localhost:8000/api/forensics', {
          method: 'POST',
          body: formData,
        }),
      ]);

      const ocrData = await ocrResponse.json();
      const metadataData = await metadataResponse.json();
      const forensicsData = await forensicsResponse.json();

      setAnalysisData({
        ocr: ocrData,
        metadata: metadataData,
        forensics: forensicsData,
      });

      setIsProcessing(false);
      setShowResults(true);
    } catch (error) {
      console.error('Analysis failed:', error);
      setIsProcessing(false);
      alert('Backend connection failed. Make sure the backend is running on http://localhost:8000');
    }
  };

  const handleReset = () => {
    setUploadedImage(null);
    setUploadedFile(null);
    setIsProcessing(false);
    setShowResults(false);
    setAnalysisData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0f1729] to-[#1a1f3a] text-white">
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

      <main className="max-w-[1600px] mx-auto px-6 py-8">
        {!uploadedImage && !isProcessing && !showResults && (
          <ImageUploadZone onImageUpload={handleImageUpload} />
        )}

        {isProcessing && (
          <ProcessingSteps uploadedImage={uploadedImage} />
        )}

        {showResults && uploadedImage && analysisData && (
          <ResultsDashboard 
            uploadedImage={uploadedImage} 
            onReset={handleReset}
            analysisData={analysisData}
          />
        )}
      </main>
    </div>
  );
}
