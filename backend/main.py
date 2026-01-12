from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from PIL.ExifTags import TAGS, GPSTAGS
import pytesseract
import cv2
import numpy as np
import re
import io
from datetime import datetime
import hashlib
import json

pytesseract.pytesseract.tesseract_cmd = r"/opt/homebrew/bin/tesseract"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def extract_gps_info(exif_data):
    gps_info = {}
    if 34853 in exif_data:
        gps_data = exif_data[34853]
        for tag_id in gps_data:
            tag_name = GPSTAGS.get(tag_id, tag_id)
            gps_info[tag_name] = gps_data[tag_id]
    return gps_info

def convert_to_degrees(value):
    d = float(value[0])
    m = float(value[1])
    s = float(value[2])
    return d + (m / 60.0) + (s / 3600.0)

def get_decimal_coordinates(gps_info):
    lat = None
    lon = None
    
    if 'GPSLatitude' in gps_info and 'GPSLatitudeRef' in gps_info:
        lat = convert_to_degrees(gps_info['GPSLatitude'])
        if gps_info['GPSLatitudeRef'] != 'N':
            lat = -lat
    
    if 'GPSLongitude' in gps_info and 'GPSLongitudeRef' in gps_info:
        lon = convert_to_degrees(gps_info['GPSLongitude'])
        if gps_info['GPSLongitudeRef'] != 'E':
            lon = -lon
    
    return lat, lon

@app.post("/api/ocr")
async def run_ocr(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

        open_cv_image = np.array(image)
        gray = cv2.cvtColor(open_cv_image, cv2.COLOR_RGB2GRAY)

        extracted_text = pytesseract.image_to_string(gray)
        signals = []
        confidence = 95
        language = "English"

        text_confidence = min(98.0, 60 + len(extracted_text) * 0.1)

        if re.search(r"urgent|immediately|alert|warning|act now|verify|suspended|locked", extracted_text, re.I):
            signals.append({
                "type": "danger",
                "label": "Urgency Language Detected",
                "confidence": 92
            })

        if re.search(r"bit\.ly|tinyurl|t\.co|goo\.gl|ow\.ly", extracted_text, re.I):
            signals.append({
                "type": "danger",
                "label": "Shortened URL Found",
                "confidence": 88
            })

        if re.search(r"\+?\d[\d\-\s]{8,}", extracted_text):
            signals.append({
                "type": "warning",
                "label": "Phone Number Detected",
                "confidence": 76
            })

        if re.search(r"password|credit card|ssn|social security|account number", extracted_text, re.I):
            signals.append({
                "type": "danger",
                "label": "Sensitive Information Detected",
                "confidence": 85
            })

        email_matches = re.findall(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', extracted_text)
        if email_matches:
            signals.append({
                "type": "info",
                "label": f"Email Address Found: {len(email_matches)} detected",
                "confidence": 90
            })

        return {
            "text": extracted_text or "No readable text detected in image.",
            "signals": signals,
            "confidence": text_confidence,
            "language": language
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OCR processing failed: {str(e)}")

@app.post("/api/metadata")
async def extract_metadata(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes))
        
        metadata = {
            "filename": file.filename,
            "format": image.format,
            "mode": image.mode,
            "size": {
                "width": image.size[0],
                "height": image.size[1]
            },
            "file_size": len(image_bytes),
            "exif": {},
            "gps": {},
            "warnings": []
        }
        
        exif_data = image.getexif()
        if exif_data:
            for tag_id, value in exif_data.items():
                tag_name = TAGS.get(tag_id, tag_id)
                try:
                    if isinstance(value, bytes):
                        value = value.decode('utf-8', errors='ignore')
                    if tag_name not in ['MakerNote', 'UserComment']:
                        metadata["exif"][tag_name] = str(value)
                except:
                    metadata["exif"][tag_name] = "Unable to decode"
            
            gps_info = extract_gps_info(exif_data)
            if gps_info:
                metadata["gps"] = {k: str(v) for k, v in gps_info.items()}
                lat, lon = get_decimal_coordinates(gps_info)
                if lat and lon:
                    metadata["gps"]["decimal_coords"] = {
                        "latitude": lat,
                        "longitude": lon
                    }
                    metadata["warnings"].append({
                        "type": "danger",
                        "message": f"GPS location data found: {lat:.4f}, {lon:.4f}"
                    })
        else:
            metadata["warnings"].append("No EXIF data found - image may have been processed or stripped")
        
        if "GPSInfo" in metadata["exif"] or metadata["gps"]:
            metadata["warnings"].append({
                "type": "danger",
                "message": "GPS location data present in image"
            })
        
        if "Make" in metadata["exif"] or "Model" in metadata["exif"]:
            device_info = f"{metadata['exif'].get('Make', '')} {metadata['exif'].get('Model', '')}".strip()
            metadata["warnings"].append({
                "type": "warning",
                "message": f"Camera/device information found: {device_info}"
            })
        
        if "Software" in metadata["exif"]:
            metadata["warnings"].append({
                "type": "warning",
                "message": f"Image edited with: {metadata['exif']['Software']}"
            })
        
        if "DateTime" in metadata["exif"] and "DateTimeOriginal" in metadata["exif"]:
            if metadata["exif"]["DateTime"] != metadata["exif"]["DateTimeOriginal"]:
                metadata["warnings"].append({
                    "type": "warning",
                    "message": "Image modification date differs from original capture date"
                })
        
        return metadata
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Metadata extraction failed: {str(e)}")

@app.post("/api/forensics")
async def image_forensics(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes))
        
        md5_hash = hashlib.md5(image_bytes).hexdigest()
        sha256_hash = hashlib.sha256(image_bytes).hexdigest()
        sha1_hash = hashlib.sha1(image_bytes).hexdigest()
        
        open_cv_image = cv2.imdecode(np.frombuffer(image_bytes, np.uint8), cv2.IMREAD_COLOR)
        
        gray = cv2.cvtColor(open_cv_image, cv2.COLOR_BGR2GRAY)
        laplacian_var = cv2.Laplacian(gray, cv2.CV_64F).var()
        blur_detected = laplacian_var < 100
        
        edges = cv2.Canny(gray, 50, 150)
        edge_density = np.sum(edges > 0) / (edges.shape[0] * edges.shape[1])
        
        hist = cv2.calcHist([gray], [0], None, [256], [0, 256])
        hist_entropy = -np.sum((hist / hist.sum()) * np.log2(hist / hist.sum() + 1e-7))
        
        brightness = np.mean(gray)
        contrast = np.std(gray)
        
        forensics_data = {
            "hashes": {
                "md5": md5_hash,
                "sha1": sha1_hash,
                "sha256": sha256_hash
            },
            "analysis": {
                "blur_detected": bool(blur_detected),
                "blur_score": float(laplacian_var),
                "edge_density": float(edge_density),
                "histogram_entropy": float(hist_entropy),
                "brightness": float(brightness),
                "contrast": float(contrast)
            },
            "findings": [],
            "manipulation_likelihood": "low",
            "quality_score": 0
        }
        
        quality_score = 100
        
        if blur_detected:
            forensics_data["findings"].append({
                "type": "warning",
                "label": "Image appears blurred or low quality",
                "confidence": 75
            })
            quality_score -= 20
        
        if edge_density > 0.15:
            forensics_data["findings"].append({
                "type": "info",
                "label": "High edge density - detailed image",
                "confidence": 60
            })
        
        if hist_entropy < 6.5:
            forensics_data["findings"].append({
                "type": "warning",
                "label": "Low histogram entropy - possible compression artifacts or editing",
                "confidence": 70
            })
            forensics_data["manipulation_likelihood"] = "medium"
            quality_score -= 15
        
        if brightness < 50:
            forensics_data["findings"].append({
                "type": "info",
                "label": "Image is very dark",
                "confidence": 80
            })
        elif brightness > 200:
            forensics_data["findings"].append({
                "type": "info",
                "label": "Image is very bright",
                "confidence": 80
            })
        
        if contrast < 30:
            forensics_data["findings"].append({
                "type": "warning",
                "label": "Low contrast detected",
                "confidence": 65
            })
            quality_score -= 10
        
        forensics_data["quality_score"] = max(0, quality_score)
        
        if quality_score < 60:
            forensics_data["manipulation_likelihood"] = "high"
        elif quality_score < 80:
            forensics_data["manipulation_likelihood"] = "medium"
        
        return forensics_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Forensics analysis failed: {str(e)}")

@app.get("/")
async def root():
    return {
        "message": "OSINT Vision API",
        "version": "1.0",
        "endpoints": ["/api/ocr", "/api/metadata", "/api/forensics"]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
