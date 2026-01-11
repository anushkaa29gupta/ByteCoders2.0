import { useState, useRef } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";

interface ImageUploadZoneProps {
  onImageUpload: (file: File) => void;
}

export function ImageUploadZone({ onImageUpload }: ImageUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      onImageUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[600px]">
      <div
        className={`
          relative w-full max-w-2xl p-12 rounded-2xl
          bg-gradient-to-br from-[#0f1729]/50 to-[#1a1f3a]/50
          border-2 border-dashed transition-all duration-300
          ${isDragging 
            ? "border-cyan-400 shadow-[0_0_40px_rgba(34,211,238,0.3)] scale-[1.02]" 
            : "border-cyan-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
          }
          backdrop-blur-sm cursor-pointer
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />
        
        <div className="flex flex-col items-center gap-6 text-center">
          <div className={`
            p-6 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20
            border border-cyan-500/30 transition-all duration-300
            ${isDragging ? "scale-110 shadow-[0_0_30px_rgba(34,211,238,0.4)]" : ""}
          `}>
            <Upload className={`size-12 text-cyan-400 ${isDragging ? "animate-pulse" : ""}`} />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-2">Upload Image for Analysis</h2>
            <p className="text-gray-400 mb-4">
              Drag and drop or click to select an image
            </p>
            <p className="text-xs text-gray-500">
              Supports: JPG, PNG, WebP, GIF • Max size: 10MB
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4 w-full max-w-md">
            <div className="p-4 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
              <ImageIcon className="size-5 text-cyan-400 mb-2 mx-auto" />
              <p className="text-xs text-gray-400">Metadata</p>
            </div>
            <div className="p-4 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
              <ImageIcon className="size-5 text-cyan-400 mb-2 mx-auto" />
              <p className="text-xs text-gray-400">Forensics</p>
            </div>
            <div className="p-4 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
              <ImageIcon className="size-5 text-cyan-400 mb-2 mx-auto" />
              <p className="text-xs text-gray-400">Web Search</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
