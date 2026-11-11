# Web Teknolojileri ve Programlama

Kampüs Etkinlikleri: fakültedeki seminer, atölye, söyleşi ve sosyal etkinlikleri listeleyen, arayan ve yöneten React uygulaması ve etkinlikleri JSON olarak veren Express REST API'si.

Bengüsu İlhan · 2416501083

## Canlı adres

https://bengusuilhan-frontend.vercel.app

## Kurulum

```bash
cd kampus-etkinlik/frontend
npm install
npm run dev
```

Üretim derlemesi için `npm run build`.

### Backend (Sprint 7)

```bash
cd kampus-etkinlik/backend
npm install
cp .env.example .env     # Windows PowerShell: Copy-Item .env.example .env
npm run dev              # http://localhost:3000
```

Endpoint'ler: `GET /health`, `GET /events`, `GET /events/:id`, `POST /events`. REST sözleşmesi ve Postman adımları için `kampus-etkinlik/backend/README.md`.

## Route listesi

| Adres | Sayfa |
|---|---|
| `/` | Ana sayfa |
| `/events` | Etkinlik listesi, arama ve kategori filtresi |
| `/events/:id` | Etkinlik detayı |
| `/login` | Giriş |
| `/register` | Kayıt |
| `/forgot-password` | Şifremi unuttum |
| `/admin` | Yönetim: etkinlik tablosu, düzenle, sil |
| `/admin/add` | Yeni etkinlik ekle |
| `/admin/:id/edit` | Etkinlik güncelle |
| `*` | Sayfa bulunamadı |

## Proje yapısı

```
kampus-etkinlik/
├─ sprint1/    HTML iskeleti
├─ sprint2/    CSS ve responsive tasarım
├─ sprint3/    JavaScript ve DOM
├─ frontend/   Vite · TypeScript · React · React Router  ← yayınlanan ürün
└─ backend/    Node · Express · bellek içi veri  (Sprint 7, localhost:3000)
```

Dosya ayrıntıları için `kampus-etkinlik/frontend/README.md` ve `kampus-etkinlik/backend/README.md`.
