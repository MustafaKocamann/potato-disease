# 🥔 PotatoGuard - LinkedIn Post

## 📝 Ana Post (Türkçe - Detaylı & Teknik)

---

🥔 **PotatoGuard: Deep Learning ile Patates Hastalık Tespit Sistemi**

Tarım sektöründe patates hastalıkları her yıl dünya genelinde milyarlarca dolarlık kayba neden oluyor. Bu soruna teknoloji odaklı bir çözüm geliştirmek istedim ve **uçtan uca (end-to-end) bir yapay zeka sistemi** tasarladım.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**🎯 PROBLEM**

Patates, dünyada en çok tüketilen 4. gıda ürünü. **Early Blight** (Alternaria solani) ve **Late Blight** (Phytophthora infestans) hastalıkları:

→ Yıllık 6 milyar dolar+ ekonomik kayıp
→ %70'e varan verim düşüşü
→ Erken tespit edilmezse tüm tarlaya yayılma riski

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**🧠 TEKNİK ÇÖZÜM: CNN Modeli**

Convolutional Neural Network (CNN) mimarisi kullanarak görüntü sınıflandırma modeli geliştirdim:

• **Input Layer:** 256×256×3 RGB görüntü
• **Feature Extraction:** 6 Conv2D katmanı + MaxPooling
• **Regularization:** Dropout (0.25) ile overfitting önleme
• **Output:** Softmax aktivasyonu ile 3 sınıf olasılık dağılımı

**Data Pipeline:**
→ PlantVillage dataset (~3000 görüntü)
→ Data Augmentation (rotation, flip, zoom, shift)
→ 80/10/10 train-validation-test split
→ Batch normalization & early stopping

**Sonuç:** %97.2 accuracy, %96.8 precision, %97.1 recall

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**⚡ MİKROSERVİS MİMARİSİ**

Projeyi production-ready hale getirmek için 3 katmanlı mimari tasarladım:

**1️⃣ Model Serving Layer**
• TensorFlow Serving (Docker container)
• REST API endpoint (port 8501)
• Model versioning (v1, v2, v3)
• Hot-swap model güncelleme

**2️⃣ Backend API Layer**
• FastAPI framework (async/await)
• Uvicorn ASGI server
• Image preprocessing pipeline
• CORS middleware

**3️⃣ Frontend Layer**
• React 18 + Material-UI
• Glassmorphism UI tasarımı
• Drag & Drop dosya yükleme
• Real-time sonuç gösterimi

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**🛠️ TEKNOLOJİ STACK**

```
ML/DL:      TensorFlow 2.19 | Keras | NumPy | Pillow
Backend:    FastAPI | Uvicorn | Python 3.10+
Frontend:   React 18 | Material-UI | JavaScript ES6+
DevOps:     Docker | TensorFlow Serving | Git
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**💡 KAZANIMLAR**

Bu projede şu konularda derinlemesine deneyim kazandım:

✅ CNN model tasarımı ve hyperparameter tuning
✅ Data augmentation stratejileri
✅ TensorFlow Serving ile production ML deployment
✅ RESTful API tasarımı ve async programming
✅ Docker containerization
✅ Frontend-Backend entegrasyonu

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Proje tamamen açık kaynak. Kod, model ve dokümantasyona GitHub'dan ulaşabilirsiniz:

🔗 github.com/MustafaKocamann/potato-disease

Sorularınız veya önerileriniz varsa yorumlarda buluşalım! 👇

#DeepLearning #MachineLearning #ComputerVision #TensorFlow #CNN #FastAPI #React #Docker #MLOps #AI #ArtificialIntelligence #DataScience #Python #AgriTech #Agriculture #OpenSource

---

## 📝 Orta Uzunluk Alternatif

---

🥔 **PotatoGuard - AI Tabanlı Patates Hastalık Tespit Sistemi**

Tarımda yapay zeka uygulamalarına ilgim doğrultusunda, patates yaprak hastalıklarını tespit eden bir deep learning projesi geliştirdim.

**🧠 Model Detayları:**
• CNN mimarisi (6 Conv2D + MaxPooling katmanları)
• Input: 256×256 RGB görüntü
• Output: 3 sınıf (Early Blight, Late Blight, Healthy)
• Data Augmentation ile genelleştirme
• %97.2 accuracy

**⚡ Sistem Mimarisi:**
• TensorFlow Serving → Model inference (Docker)
• FastAPI → REST API backend
• React → Modern web arayüzü

**🛠️ Kullandığım Teknolojiler:**
TensorFlow | Keras | FastAPI | React | Docker | Material-UI

Bu proje sayesinde ML model deployment, microservices mimarisi ve full-stack geliştirme konularında pratik deneyim kazandım.

🔗 GitHub: github.com/MustafaKocamann/potato-disease

#DeepLearning #TensorFlow #CNN #FastAPI #React #Docker #ComputerVision #AI #MachineLearning #Python

---

## 📝 English Version (Technical)

---

🥔 **PotatoGuard: End-to-End Deep Learning System for Potato Disease Detection**

Built a production-ready ML system that classifies potato leaf diseases with 97%+ accuracy using Convolutional Neural Networks.

**🧠 Model Architecture:**
• 6 Conv2D layers with MaxPooling
• Dropout regularization (0.25)
• Softmax output (3 classes)
• Trained on PlantVillage dataset (~3K images)
• Data augmentation for generalization

**⚡ System Design:**
```
React UI → FastAPI Backend → TensorFlow Serving (Docker)
   ↓              ↓                    ↓
Port 3000     Port 8000           Port 8501
```

**🛠️ Tech Stack:**
TensorFlow 2.19 | FastAPI | React 18 | Docker | Material-UI

**Key Features:**
✅ Real-time inference via TF Serving
✅ Model versioning support
✅ Async REST API
✅ Modern glassmorphism UI

🔗 github.com/MustafaKocamann/potato-disease

#DeepLearning #TensorFlow #CNN #ComputerVision #FastAPI #React #Docker #MLOps #AI #MachineLearning

---

## 💡 Paylaşım İpuçları

1. **Görsel ekle:** Mimari diyagram veya demo GIF etkileşimi 3-5x artırır
2. **İlk yorum:** GitHub linkini ilk yoruma da ekle
3. **Saat:** Hafta içi 08:00-10:00 veya 17:00-19:00 optimal
4. **Engage:** İlk 1 saatte gelen yorumlara hızlı cevap ver
