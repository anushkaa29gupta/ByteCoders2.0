import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, Eye } from "lucide-react";

interface Signal {
  type: "danger" | "warning" | "info";
  label: string;
  confidence: number;
}

export function OcrAnalysisCard({ uploadedImage }: { uploadedImage?: string }) {
  const [loading, setLoading] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [signals, setSignals] = useState<Signal[]>([]);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [language, setLanguage] = useState("Unknown");

  useEffect(() => {
    console.log("Uploaded image URL:", uploadedImage);
    if (!uploadedImage) return;

    const runOCR = async () => {
      setLoading(true);

      try {
        // 🔹 Convert image URL → Blob → File
        const imageResponse = await fetch(uploadedImage);
        const blob = await imageResponse.blob();
        const file = new File([blob], "uploaded-image.png", {
          type: blob.type,
        });

        const formData = new FormData();
        formData.append("file", file);

        // 🔹 Send to backend OCR
        console.log("Calling OCR backend:", uploadedImage);
        const res = await fetch("http://127.0.0.1:8000/api/ocr", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        setExtractedText(
          data.text && data.text.trim()
            ? data.text
            : "No readable text detected in image."
        );

        setSignals(data.signals || []);
        setConfidence(data.confidence ?? null);
        setLanguage(data.language || "Unknown");
      } catch (err) {
        setExtractedText("OCR failed. Backend not reachable.");
        setSignals([]);
      } finally {
        setLoading(false);
      }
    };

    runOCR();
  }, [uploadedImage]);

  return (
    <div className="p-6 rounded-xl bg-gradient-to-br from-[#0f1729]/50 to-[#1a1f3a]/50 border border-cyan-500/20 backdrop-blur-sm shadow-[0_0_20px_rgba(34,211,238,0.1)]">
      <div className="flex items-center gap-2 mb-6">
        <Eye className="size-5 text-cyan-400" />
        <h3 className="font-semibold">
          OCR-based Text Extraction & Content Signal Analysis
        </h3>
      </div>

      {!uploadedImage && (
        <p className="text-sm text-gray-400">
          Upload an image to analyze embedded text.
        </p>
      )}

      {loading && (
        <p className="text-sm text-cyan-300 animate-pulse">
          Extracting text from image…
        </p>
      )}

      {!loading && uploadedImage && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Extracted Text */}
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">
              Extracted Text Content
            </h4>
            <div className="p-4 rounded-lg bg-[#0a0e1a]/60 border border-cyan-500/20 font-mono text-sm text-cyan-200 whitespace-pre-wrap">
              {extractedText}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <p className="text-xs text-gray-400 mb-1">Text Confidence</p>
                <p className="text-lg font-bold text-blue-400">
                  {confidence ? `${confidence}%` : "—"}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
                <p className="text-xs text-gray-400 mb-1">Language</p>
                <p className="text-lg font-bold text-purple-400">
                  {language}
                </p>
              </div>
            </div>
          </div>

          {/* Content Signals */}
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">
              Content Threat Signals
            </h4>

            {signals.length === 0 && (
              <p className="text-sm text-gray-400">
                No suspicious text patterns detected.
              </p>
            )}

            <div className="space-y-3">
              {signals.map((signal, index) => {
                const color =
                  signal.type === "danger"
                    ? "red"
                    : signal.type === "warning"
                    ? "yellow"
                    : "blue";

                return (
                  <div
                    key={index}
                    className={`p-4 rounded-lg bg-${color}-500/10 border border-${color}-500/30`}
                  >
                    <div className="flex items-start gap-3">
                      <AlertTriangle className={`size-5 text-${color}-400`} />
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <p className={`font-medium text-${color}-300`}>
                            {signal.label}
                          </p>
                          <span className={`text-xs text-${color}-300`}>
                            {signal.confidence}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
