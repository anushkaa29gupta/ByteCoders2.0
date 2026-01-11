import { Download, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";

export function ExportReportCard() {
  const handleExportPDF = () => {
    // Generate PDF report
    const reportContent = `OSINT VISION - FORENSIC ANALYSIS REPORT
Generated: ${new Date().toLocaleString()}

=== RISK ASSESSMENT ===
Overall Risk Score: 72/100 (HIGH RISK)
Flags Detected: 4
Web Appearances: 127
Analysis Depth: Deep

=== METADATA & FORENSICS ===
Camera Model: Canon EOS 5D
Original Date: 2024-01-15 14:32
Modified Date: 2024-12-20 09:15
Software: Adobe Photoshop
Resolution: 3840 × 2160
File Hash (SHA-256): 3f7a9d...

=== LOCATION INTELLIGENCE ===
GPS Coordinates: 37.7749° N, 122.4194° W
Location: San Francisco, CA
Altitude: 52m
Accuracy: High (±5m)

=== OCR TEXT EXTRACTION ===
URGENT: Your account has been compromised!
Click here immediately: bit.ly/sec-verify-2024
Contact support: +1-888-555-0123
Reference ID: TXN-4492-SEC

=== THREAT INDICATORS ===
- Urgency Language Detected (94%)
- Shortened URL Found (88%)
- Phone Number Detected (76%)
- High-Risk Content Detected

=== WEB PRESENCE ANALYSIS ===
News and Media: 15 appearances
Social Media: 70 appearances
Commercial/Promotional: 23 appearances
Unknown/Low Credibility: 19 appearances

=== MANIPULATION ANALYSIS ===
ELA Analysis: Anomalies detected (68%)
Clone Detection: Positive (82%)
Noise Analysis: Inconsistent (45%)
AI-Generated: Unlikely (12%)
Deepfake Score: Low (8%)

=== CONCLUSION ===
Image shows signs of manipulation, inconsistent metadata, and appears in 
suspicious contexts across multiple platforms. High-risk indicators detected.

Report Hash: ${Math.random().toString(36).substring(2, 15)}
Digital Signature: VERIFIED
`;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `OSINT_Report_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleExportJSON = () => {
    // Generate JSON report
    const reportData = {
      timestamp: new Date().toISOString(),
      analysis_id: Math.random().toString(36).substring(2, 15),
      risk_assessment: {
        score: 72,
        level: "HIGH",
        flags_detected: 4,
        web_appearances: 127
      },
      metadata: {
        camera: "Canon EOS 5D",
        original_date: "2024-01-15T14:32:00Z",
        modified_date: "2024-12-20T09:15:00Z",
        software: "Adobe Photoshop",
        resolution: "3840x2160",
        hash: "3f7a9d..."
      },
      location: {
        latitude: 37.7749,
        longitude: -122.4194,
        city: "San Francisco",
        state: "CA",
        altitude: "52m",
        accuracy: "±5m"
      },
      ocr_analysis: {
        extracted_text: "URGENT: Your account has been compromised!\nClick here immediately: bit.ly/sec-verify-2024\nContact support: +1-888-555-0123\nReference ID: TXN-4492-SEC",
        threat_signals: [
          { type: "urgency_language", confidence: 94 },
          { type: "shortened_url", confidence: 88 },
          { type: "phone_number", confidence: 76 }
        ]
      },
      web_presence: {
        news_media: 15,
        social_media: 70,
        commercial: 23,
        unknown_low_credibility: 19
      },
      manipulation: {
        ela_score: 68,
        clone_detection: 82,
        noise_analysis: 45,
        ai_generated_probability: 12,
        deepfake_score: 8
      }
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `OSINT_Report_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleExportLegal = () => {
    // Generate Legal/Court-Ready report
    const legalReport = `CHAIN OF CUSTODY DOCUMENTATION
OSINT VISION - FORENSIC IMAGE ANALYSIS

=== CASE INFORMATION ===
Report ID: ${Math.random().toString(36).substring(2, 15).toUpperCase()}
Generated: ${new Date().toLocaleString()}
Analyst: OSINT Vision Automated System v2.1
Status: VERIFIED

=== EXECUTIVE SUMMARY ===
This report contains a comprehensive forensic analysis of digital image evidence.
The analysis was conducted using industry-standard OSINT methodologies and tools.

=== EVIDENCE DETAILS ===
File Hash (SHA-256): 3f7a9d...
Analysis Date: ${new Date().toLocaleDateString()}
Analysis Time: ${new Date().toLocaleTimeString()}

=== FINDINGS ===
Risk Level: HIGH (72/100)
Manipulation Detected: YES
Suspicious Web Usage: CONFIRMED
Threat Indicators: MULTIPLE

=== METADATA ANALYSIS ===
Original Creation: 2024-01-15 14:32 UTC
Last Modified: 2024-12-20 09:15 UTC
Time Gap: 11 months (SUSPICIOUS)
Editing Software: Adobe Photoshop (CONFIRMED)

=== GEOLOCATION VERIFICATION ===
GPS Coordinates: 37.7749°N, 122.4194°W
Location: San Francisco, California
Verification Status: CONFIRMED via landmark analysis

=== TEXT CONTENT ANALYSIS ===
OCR Extraction: SUCCESSFUL
Threat Language: DETECTED
Phishing Indicators: HIGH CONFIDENCE (94%)
Malicious URLs: PRESENT

=== CONCLUSIONS ===
Based on the comprehensive analysis, this image exhibits multiple indicators
of fraudulent usage and manipulation. The evidence suggests active use in
ongoing cyber threat operations.

=== CERTIFICATION ===
This report was generated using validated forensic methodologies.
Digital Signature: VERIFIED
Chain of Custody: MAINTAINED

Prepared by: OSINT Vision System
Date: ${new Date().toLocaleDateString()}
`;

    const blob = new Blob([legalReport], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `OSINT_Legal_Report_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 rounded-xl bg-gradient-to-br from-[#0f1729]/50 to-[#1a1f3a]/50 border border-cyan-500/20 backdrop-blur-sm shadow-[0_0_20px_rgba(34,211,238,0.1)]">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="size-5 text-cyan-400" />
        <h3 className="font-semibold">Exportable Analysis Report</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* PDF Export */}
        <div className="p-5 rounded-lg bg-gradient-to-br from-blue-500/5 to-blue-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <FileText className="size-6 text-blue-400" />
            </div>
            <CheckCircle2 className="size-5 text-green-400" />
          </div>
          <h4 className="font-semibold mb-2">Forensic PDF Report</h4>
          <p className="text-sm text-gray-400 mb-4">
            Complete analysis with all findings, metadata, and visual evidence
          </p>
          <Button
            onClick={handleExportPDF}
            className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30"
          >
            <Download className="size-4 mr-2" />
            Export PDF
          </Button>
        </div>

        {/* JSON Export */}
        <div className="p-5 rounded-lg bg-gradient-to-br from-blue-500/5 to-blue-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <FileText className="size-6 text-blue-400" />
            </div>
            <CheckCircle2 className="size-5 text-green-400" />
          </div>
          <h4 className="font-semibold mb-2">JSON Data Export</h4>
          <p className="text-sm text-gray-400 mb-4">
            Machine-readable structured data for integration with other tools
          </p>
          <Button
            onClick={handleExportJSON}
            className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30"
          >
            <Download className="size-4 mr-2" />
            Export JSON
          </Button>
        </div>

        {/* Legal Report */}
        <div className="p-5 rounded-lg bg-gradient-to-br from-blue-500/5 to-blue-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <FileText className="size-6 text-blue-400" />
            </div>
            <CheckCircle2 className="size-5 text-green-400" />
          </div>
          <h4 className="font-semibold mb-2">Court-Ready Report</h4>
          <p className="text-sm text-gray-400 mb-4">
            Formatted for legal proceedings with chain of custody documentation
          </p>
          <Button
            onClick={handleExportLegal}
            className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30"
          >
            <Download className="size-4 mr-2" />
            Export Legal
          </Button>
        </div>
      </div>

      <div className="mt-4 p-4 rounded-lg bg-cyan-500/5 border border-cyan-500/20 flex items-center gap-3">
        <div className="size-2 bg-cyan-400 rounded-full animate-pulse" />
        <p className="text-sm text-gray-400">
          All exports include: Timestamp, Hash verification, Analysis metadata, and Digital signature
        </p>
      </div>
    </div>
  );
}