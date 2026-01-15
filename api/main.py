"""
============================================================================
POTATO GUARD - FastAPI Backend Sunucusu
============================================================================

Bu dosya, patates hastalık tespit sisteminin REST API sunucusunu içerir.
TensorFlow modelini doğrudan yükleyerek tahmin yapar.

Geliştirici: Mustafa
Tarih: 2026

Endpoint'ler:
- GET  /ping    : Sunucu sağlık kontrolü
- POST /predict : Resim yükleyip hastalık tahmini al
============================================================================
"""

# ===== KÜTÜPHANE İMPORTLARI =====
from fastapi import FastAPI, File, UploadFile  # Web framework ve dosya işlemleri
from fastapi.middleware.cors import CORSMiddleware  # Cross-Origin istekleri için
import uvicorn  # ASGI sunucusu
import numpy as np  # Sayısal işlemler
from io import BytesIO  # Bellek içi dosya işlemleri
from PIL import Image  # Resim işleme
import tensorflow as tf  # Derin öğrenme framework'ü

# ===== FASTAPI UYGULAMASI OLUŞTUR =====
app = FastAPI(
    title="PotatoGuard API",
    description="Yapay Zeka ile Patates Hastalık Tespit API'si",
    version="1.0.0"
)

# ===== CORS AYARLARI =====
# Frontend'in API'ye erişebilmesi için izin verilen origin'ler
origins = [
    "http://localhost",
    "http://localhost:3000",  # React development server
]

# CORS middleware'ini ekle
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Tüm HTTP metodlarına izin ver
    allow_headers=["*"],  # Tüm header'lara izin ver
)

# ===== MODEL YÜKLEME =====
# Kayıtlı TensorFlow modelini yükle
# Model saved_models/1 klasöründen yüklenir
MODEL = tf.keras.models.load_model("../saved_models/1")

# ===== SINIF İSİMLERİ =====
# Model tarafından tahmin edilebilecek hastalık sınıfları
CLASS_NAMES = ["Early Blight", "Late Blight", "Healthy"]


@app.get("/ping")
async def ping():
    """
    Sunucu sağlık kontrolü endpoint'i.
    Sunucunun çalışıp çalışmadığını kontrol etmek için kullanılır.
    
    Returns:
        str: Sunucu çalışıyorsa "PotatoGuard API aktif!" mesajı
    """
    return "PotatoGuard API aktif!"


def read_file_as_image(data) -> np.ndarray:
    """
    Yüklenen dosyayı numpy array'e dönüştürür.
    
    Args:
        data: Yüklenen resim dosyasının binary verisi
        
    Returns:
        np.ndarray: Resmin numpy array formatı
    """
    image = np.array(Image.open(BytesIO(data)))
    return image


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    """
    Patates yaprağı hastalık tahmini endpoint'i.
    
    Yüklenen resmi alır, modelden geçirir ve hastalık tahminini döndürür.
    
    Args:
        file: Yüklenen resim dosyası (patates yaprağı fotoğrafı)
        
    Returns:
        dict: Tahmin edilen sınıf ve güven oranı
            - class: Hastalık sınıfı (Early Blight, Late Blight, Healthy)
            - confidence: Tahmin güven oranı (0-1 arası)
    """
    # Resmi oku ve numpy array'e dönüştür
    image = read_file_as_image(await file.read())
    
    # Batch boyutu ekle (model 4D input bekler: batch, height, width, channels)
    img_batch = np.expand_dims(image, 0)
    
    # Model ile tahmin yap
    predictions = MODEL.predict(img_batch)

    # En yüksek olasılıklı sınıfı bul
    predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
    
    # Güven oranını al
    confidence = np.max(predictions[0])
    
    return {
        'class': predicted_class,
        'confidence': float(confidence)
    }


# ===== ANA ÇALIŞTIRMA BLOĞU =====
if __name__ == "__main__":
    # Uvicorn sunucusunu başlat
    # host='localhost' - sadece yerel erişim
    # port=8000 - dinlenecek port
    uvicorn.run(app, host='localhost', port=8000)


