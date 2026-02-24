# Stellar Wallet Mini-dApp

Modern ve kullanıcı dostu bir arayüz ile Stellar ağında cüzdan yönetimi sağlayan bir mini dApp. Bu uygulama, kullanıcıların **Stellar Freighter** cüzdanlarını bağlamalarına ve **Testnet** üzerindeki XLM bakiyelerini anlık olarak görüntülemelerine olanak tanır.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Stellar](https://img.shields.io/badge/Stellar-Network-black?style=flat-square&logo=stellar)](https://stellar.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Jest](https://img.shields.io/badge/Jest-Testing-red?style=flat-square&logo=jest)](https://jestjs.io/)

---

## 🚀 Özellikler

- **Freighter Wallet Entegrasyonu**: Güvenli ve hızlı cüzdan bağlantısı.
- **Canlı Bakiye Sorgulama**: Stellar Horizon API kullanarak Testnet bakiyesi görüntüleme.
- **Modüler Mimari**: Kolay bakım ve geliştirme için `utils` ve `components` ayrımı.
- **Karanlık Mod Desteği**: Sistem tercihlerine uyumlu modern tasarım.
- **Unit Testler**: Jest ve React Testing Library ile %100 kapsama hedefli test süiti.

## 🛠️ Teknolojiler

- **Frontend**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Dil**: [TypeScript](https://www.typescriptlang.org/)
- **Blockchain SDK**: 
  - `@stellar/freighter-api` (Cüzdan etkileşimi)
  - `stellar-sdk` (Horizon API iletişimi)
- **Stil**: Vanilla CSS (Custom Properties)
- **Test**: [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## 📋 Gereksinimler

Uygulamanın çalışması için tarayıcınızda **Stellar Freighter** cüzdan eklentisinin kurulu olması gerekmektedir.

- 🔗 [Freighter Cüzdan eklentisini buradan indirebilirsiniz.](https://www.freighter.app/)
- **Önemli**: Cüzdanınızın **Testnet** ağında olduğundan emin olun.

## ⚙️ Kurulum ve Çalıştırma

### 1. Depoyu Klonlayın
```bash
git clone https://github.com/efekrbas/stellar-wallet-mini-dapp.git
cd stellar-wallet-mini-dapp
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Uygulamayı Başlatın
```bash
npm run dev
```
Uygulama varsayılan olarak `http://localhost:3000` adresinde çalışacaktır.

## 🧪 Testleri Çalıştırma

Unit testleri çalıştırmak için şu komutu kullanın:
```bash
npm test
```

### Test Sonuçları
![Test Sonuçları ScreenShot](URL_BURAYA_GELECEK - Örn: ./public/screenshots/test-results.png)
*(Test süitinin başarıyla geçtiğini gösteren ekran görüntüsü yukarıdaki alana eklenebilir)*

## 🔗 Linkler

- **Live Demo**: [Demo Linki Buraya](https://example.com)
- **Demo Video**: [Video Linki Buraya](https://youtube.com/...)

## 🤝 Katkıda Bulunma

1. Projeyi fork'layın.
2. Yeni bir feature branch açın (`git checkout -b feature/YeniOzellik`).
3. Değişikliklerinizi commit edin (`git commit -m 'feat: yeni özellik eklendi'`).
4. Branch'inizi pushlayın (`git push origin feature/YeniOzellik`).
5. Bir Pull Request oluşturun.

---
Built with ❤️ by [efekrbas](https://github.com/efekrbas)
