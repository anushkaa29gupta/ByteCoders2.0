from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import pytesseract
import cv2
import numpy as np
import re
import io

pytesseract.pytesseract.tesseract_cmd = r"/opt/homebrew/bin/tesseract"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/ocr")
async def run_ocr(file: UploadFile = File(...)):
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    open_cv_image = np.array(image)
    gray = cv2.cvtColor(open_cv_image, cv2.COLOR_RGB2GRAY)

    extracted_text = pytesseract.image_to_string(gray)
    signals = []
    confidence = 95
    language = "English"

    text_confidence = min(98.0, 60 + len(extracted_text) * 0.1)

    signals = []

    if re.search(r"urgent|immediately|alert|warning", extracted_text, re.I):
        signals.append({
            "type": "danger",
            "label": "Urgency Language Detected",
            "confidence": 92
        })

    if re.search(r"bit\.ly|tinyurl|t\.co", extracted_text, re.I):
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

    return {
        "text": extracted_text or "No readable text detected in image.",
        "signals": signals,
        "confidence": text_confidence,
        "language": language
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
