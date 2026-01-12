import { Camera, AlertCircle } from "lucide-react";

interface MetadataCardProps {
  metadata: any;
  forensics: any;
}

export function MetadataCard({ metadata, forensics }: MetadataCardProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const getWarningMessage = () => {
    if (metadata.warnings && metadata.warnings.length > 0) {
      const dangerWarnings = metadata.warnings.filter((w: any) => w.type === 'danger');
      if (dangerWarnings.length > 0) {
        return dangerWarnings[0].message;
      }
      return metadata.warnings[0].message || metadata.warnings[0];
    }
    return null;
  };

  const warningMessage = getWarningMessage();

  return (
    <div className="h-full p-6 rounded-xl bg-gradient-to-br from-[#0f1729]/50 to-[#1a1f3a]/50 border border-cyan-500/20 backdrop-blur-sm shadow-[0_0_20px_rgba(34,211,238,0.1)]">
      <div className="flex items-center gap-2 mb-6">
        <Camera className="size-5 text-cyan-400" />
        <h3 className="font-semibold">Metadata & Forensics</h3>
      </div>

      <div className="space-y-3 text-sm">
        {metadata.exif?.Make && (
          <div className="flex justify-between py-2 border-b border-cyan-500/10">
            <span className="text-gray-400">Camera Make</span>
            <span className="font-mono text-cyan-300">{metadata.exif.Make}</span>
          </div>
        )}

        {metadata.exif?.Model && (
          <div className="flex justify-between py-2 border-b border-cyan-500/10">
            <span className="text-gray-400">Camera Model</span>
            <span className="font-mono text-cyan-300">{metadata.exif.Model}</span>
          </div>
        )}

        {metadata.exif?.DateTime && (
          <div className="flex justify-between py-2 border-b border-cyan-500/10">
            <span className="text-gray-400">Date Taken</span>
            <span className="font-mono text-cyan-300">{metadata.exif.DateTime}</span>
          </div>
        )}

        {metadata.exif?.Software && (
          <div className="flex justify-between py-2 border-b border-cyan-500/10">
            <span className="text-gray-400">Software</span>
            <span className="font-mono text-yellow-300">{metadata.exif.Software}</span>
          </div>
        )}

        {metadata.size && (
          <div className="flex justify-between py-2 border-b border-cyan-500/10">
            <span className="text-gray-400">Resolution</span>
            <span className="font-mono text-cyan-300">
              {metadata.size.width} × {metadata.size.height}
            </span>
          </div>
        )}

        {metadata.file_size && (
          <div className="flex justify-between py-2 border-b border-cyan-500/10">
            <span className="text-gray-400">File Size</span>
            <span className="font-mono text-cyan-300">{formatFileSize(metadata.file_size)}</span>
          </div>
        )}

        {metadata.format && (
          <div className="flex justify-between py-2 border-b border-cyan-500/10">
            <span className="text-gray-400">Format</span>
            <span className="font-mono text-cyan-300">{metadata.format}</span>
          </div>
        )}

        {forensics?.hashes?.sha256 && (
          <div className="flex justify-between py-2">
            <span className="text-gray-400">File Hash (SHA-256)</span>
            <span className="font-mono text-xs text-cyan-300">
              {forensics.hashes.sha256.substring(0, 8)}...
            </span>
          </div>
        )}

        {forensics?.hashes?.md5 && (
          <div className="flex justify-between py-2">
            <span className="text-gray-400">MD5 Hash</span>
            <span className="font-mono text-xs text-cyan-300">
              {forensics.hashes.md5.substring(0, 8)}...
            </span>
          </div>
        )}
      </div>

      {warningMessage && (
        <div className="mt-6 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30 flex items-start gap-2">
          <AlertCircle className="size-4 text-yellow-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-yellow-300">{warningMessage}</p>
        </div>
      )}

      {!metadata.exif || Object.keys(metadata.exif).length === 0 && (
        <div className="mt-6 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-start gap-2">
          <AlertCircle className="size-4 text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-blue-300">
            No EXIF metadata found - image may have been processed or edited
          </p>
        </div>
      )}
    </div>
  );
}
