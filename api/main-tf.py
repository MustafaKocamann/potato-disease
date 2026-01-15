"""
============================================================================
POTATO GUARD - FastAPI + TensorFlow Serving Backend
============================================================================

Bu dosya, TensorFlow Serving ile entegre çalışan API sunucusunu içerir.
Model, Docker container'ında çalışan TF Serving'e HTTP isteği gönderilir.

Avantajları:
- Model sürüm yönetimi (A/B testing)
- Yüksek performans ve ölçeklenebilirlik
- Model güncellemelerinde sıfır kesinti

Geliştirici: Mustafa
Tarih: 2026

Endpoint'ler:
- GET  /ping    : Sunucu sağlık kontrolü
- POST /predict : Resim yükleyip hastalık tahmini al
============================================================================
"""

# ===== KÜTÜPHANE İMPORTLARI =====
from fastapi import FastAPI, File, UploadFile  # Web framework
from fastapi.middleware.cors import CORSMiddleware  # CORS desteği
import uvicorn  # ASGI sunucusu
import numpy as np  # Sayısal işlemler
from io import BytesIO  # Bellek içi dosya işlemleri
from PIL import Image  # Resim işleme
import requests  # HTTP istekleri için (TF Serving ile iletişim)

# ===== FASTAPI UYGULAMASI =====
app = FastAPI(
    title="PotatoGuard API",
    description="TensorFlow Serving ile Patates Hastalık Tespit API'si",
    version="1.0.0"
)

# ===== CORS AYARLARI =====
# Frontend uygulamasının API'ye erişimi için gerekli
origins = [
    "http://localhost",
    "http://localhost:3000",  # React frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===== TENSORFLOW SERVING ENDPOINTİ =====
# Docker'da çalışan TF Serving modeli için REST API endpoint'i
# Port 8501: TF Serving REST API portu
# potatoes_model: models.config'de tanımlanan model adı
endpoint = "http://localhost:8501/v1/models/potatoes_model:predict"

# ===== SINIF İSİMLERİ =====
# Modelin tahmin edebildiği patates yaprak durumları
CLASS_NAMES = ["Early Blight", "Late Blight", "Healthy"]


@app.get("/ping")
async def ping():
    """
    API sağlık kontrolü.
    
    Returns:
        str: API'nin aktif olduğunu belirten mesaj
    """
    return "PotatoGuard API aktif!"


def read_file_as_image(data) -> np.ndarray:
    """
    Binary resim verisini numpy array'e dönüştürür.
    
    Args:
        data: Resim dosyasının binary içeriği
        
    Returns:
        np.ndarray: Resmin piksel değerlerini içeren array
    """
    image = np.array(Image.open(BytesIO(data)))
    return image


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    """
    Patates yaprağı hastalık tahmini.
    
    Bu endpoint:
    1. Yüklenen resmi alır
    2. TensorFlow Serving'e gönderir
    3. Tahmin sonucunu döndürür
    
    Args:
        file: Yüklenen patates yaprağı görüntüsü
        
    Returns:
        dict: Hastalık tahmini ve güven oranı
    """
    # Resmi oku ve array'e çevir
    image = read_file_as_image(await file.read())
    
    # Batch boyutu ekle (TF Serving batch input bekler)
    img_batch = np.expand_dims(image, 0)

    # TF Serving için JSON formatında veri hazırla
    json_data = {
        "instances": img_batch.tolist()  # numpy array -> Python list
    }

    # TF Serving'e POST isteği gönder
    response = requests.post(endpoint, json=json_data)
    
    # Yanıttan tahmin değerlerini al
    prediction = np.array(response.json()["predictions"][0])

    # En yüksek olasılıklı sınıfı belirle
    predicted_class = CLASS_NAMES[np.argmax(prediction)]
    
    # Güven oranını hesapla
    confidence = np.max(prediction)

    return {
        "class": predicted_class,
        "confidence": float(confidence)
    }


# ===== ANA ÇALIŞTIRMA =====
if __name__ == "__main__":
    # Sunucuyu başlat
    uvicorn.run(app, host='localhost', port=8000)


