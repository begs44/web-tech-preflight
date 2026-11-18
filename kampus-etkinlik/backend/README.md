# Kampüs Etkinlikleri — Backend (Sprint 8)

Frontend'in yanında çalışan, etkinlikleri JSON olarak veren Express REST API'si. Sprint 8'den itibaren veri MongoDB'de (Mongoose) durur; sunucu kapanıp açılınca `POST` ile eklenen kayıtlar kaybolmaz. Adresler ve status code'lar Sprint 7 ile aynı.

Bengüsu İlhan · 2416501083

## Çalıştırma

```bash
cd kampus-etkinlik/backend
npm install
cp .env.example .env     # Windows PowerShell: Copy-Item .env.example .env
                         # .env içindeki MONGODB_URI'ye kendi veritabanı adresini yaz
npm run seed             # veritabanını 6 örnek etkinlikle doldurur
npm run dev              # dosya değişince sunucu yeniden başlar
```

Sunucu önce veritabanına bağlanır, sonra `http://localhost:3000` adresinde açılır. Terminalde `MongoDB bağlandı (Atlas)` ya da `(yerel)` yazısı görünür; bağlantı adresi şifre içerdiği için yazdırılmaz. Üretim gibi çalıştırmak için `npm start`.

## Ortam değişkenleri

| Değişken | Anlamı | Varsayılan |
|---|---|---|
| `PORT` | Sunucunun dinleyeceği port | `3000` |
| `MONGODB_URI` | MongoDB bağlantı adresi (Atlas ya da yerel), sonunda veritabanı adı `/kampus` | yok, zorunlu |

`.env` GitHub'a gitmez; hangi değişkenlerin gerektiği `.env.example`'da yazar. Oradaki adres yer tutucudur; gerçek Atlas adresi ve şifresi sadece `.env`'de durur. Port doluysa `.env` içindeki `PORT` değiştirilir.

## Seed

`npm run seed` önce `events` collection'ını boşaltır (`deleteMany`), sonra `src/data/seed-events.js`'teki 6 etkinliği ekler (`insertMany`). Kaç kez çalıştırılırsa çalıştırılsın sonuç 6 kayıttır.

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarı | Hata | Durum |
|---|---|---|---|---|---|
| GET | `/health` | Sunucu ayakta mı | 200 | — | Sprint 7 |
| GET | `/events` | Listeyi getir (`?category=Atölye` ile süzülür, tarihe göre sıralı) | 200 | — | Sprint 8: MongoDB |
| GET | `/events/:id` | Tek etkinlik | 200 | 404 | Sprint 8: MongoDB |
| POST | `/events` | Yeni etkinlik | 201 | 400 | Sprint 8: MongoDB |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

### Status code'lar

- **200** tamam
- **201** oluşturuldu
- **204** içerik yok
- **400** eksik ya da yanlış veri
- **404** bulunamadı
- **500** beklenmeyen sunucu hatası (ayrıntı sadece terminalde)

### Hata biçimi

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

Tanımsız adreslerde `404` ve `Route not found` döner. Biçimi yanlış id (`/events/yok`) da `findById`'a gitmeden `404` döner, 500 değil. Beklenmeyen bir hata olursa hata yakalayıcı middleware `500` ve `Server error` döner; sunucu çökmez.

### Örnekler

`GET /health` → `200`

```json
{ "status": "ok", "time": "2026-11-18T06:47:07.764Z", "student": "2416501083" }
```

`GET /events/<listeden kopyalanan _id>` → `200`

```json
{
  "_id": "6afd49e46a370d5c3cd92c6b",
  "title": "Sıfırdan React Uygulama Atölyesi",
  "category": "Atölye",
  "capacity": 25,
  "date": "2026-11-21",
  "time": "10:00",
  "location": "Bilgisayar Laboratuvarı 3",
  "description": "Bileşen, props ve state kavramlarını adım adım uygulayarak basit bir yapılacaklar listesi yapıyoruz.",
  "createdAt": "2026-11-18T06:47:05.112Z",
  "updatedAt": "2026-11-18T06:47:05.112Z",
  "__v": 0
}
```

`POST /events` → `201`

```json
{
  "title": "Git Atölyesi",
  "category": "Atölye",
  "capacity": 30,
  "date": "2026-12-01",
  "time": "14:00",
  "location": "Bilgisayar Laboratuvarı 1",
  "description": "Git ve GitHub ile ilk adımlar."
}
```

Yanıtta MongoDB'nin verdiği `_id` ile `createdAt` ve `updatedAt` gelir. Doğrulamayı Mongoose schema'sı yapar, controller `ValidationError`'ı `400`'e çevirir:

| Alan | Kural |
|---|---|
| `title` | zorunlu, baştaki/sondaki boşluk kırpılır, 3–100 karakter |
| `category` | zorunlu; Seminer, Atölye, Söyleşi, Yarışma, Sosyal |
| `date` | zorunlu |
| `capacity` | sayı, en az 0, yoksa 0 |
| `time`, `location` | yoksa boş metin |
| `description` | en çok 500 karakter, yoksa boş metin |

Sadece `title` gönderilirse `400`:

```json
{ "error": { "message": "Event validation failed: date: Path `date` is required., category: Path `category` is required." } }
```

## Klasör yapısı

```
backend/
├─ src/
│  ├─ app.js                       Express uygulaması, route'lar, 404 ve hata yakalayıcı
│  ├─ server.js                    .env'yi okur, önce veritabanına bağlanır, sonra portu dinler
│  ├─ seed.js                      npm run seed: sil, 6 etkinlik ekle
│  ├─ config/database.js           MongoDB bağlantısı (MONGODB_URI)
│  ├─ models/event-model.js        Event schema'sı ve modeli → "events" collection'ı
│  ├─ data/seed-events.js          Örnek 6 etkinlik (id yok, MongoDB verir)
│  ├─ routes/event-routes.js       Hangi adres hangi fonksiyona gider
│  └─ controllers/event-controller.js  Event modeliyle find / findById / create
├─ requests/kampus-api.json        Postman collection (6 istek)
├─ .env.example
├─ .gitignore
└─ package.json
```

Kurallar schema'da, işlemler modelde, istek/yanıt controller'da: her dosyanın tek bir işi var.

## Postman ile test

1. `npm run seed`, sonra `npm run dev`.
2. Postman'de **Import** ile `requests/kampus-api.json` dosyasını açın.
3. "Kampüs API" collection'ındaki 6 isteği sırayla çalıştırın. 2. istek listedeki ilk `_id`'yi `eventId` değişkenine kaydeder, 3. istek onu kullanır.

| # | İstek | Beklenen |
|---|---|---|
| 1 | GET `/health` | 200, `status: ok` ve `student` |
| 2 | GET `/events` | 200, 6 kayıt (seed sonrası), `_id`, `createdAt`, `updatedAt` |
| 3 | GET `/events/{{eventId}}` | 200, listedeki etkinlik |
| 4 | GET `/events/111111` | 404, `error.message` |
| 5 | POST `/events` (tam gövde) | 201, `_id` ve `createdAt` |
| 6 | POST `/events` (sadece `title`) | 400, `error.message` |

### Kalıcılık testi

1. `npm run seed`, sonra `npm run dev`.
2. POST `/events` → 201, `_id`'yi not alın.
3. Terminalde `Ctrl+C` ile sunucuyu durdurun, tekrar `npm run dev`.
4. GET `/events` → 7 kayıt, yeni etkinlik listede; Atlas › Browse Collections › `events`'te de görünür.

Frontend (`localhost:5173`) bu API'ye Sprint 11'de bağlanacak; `cors` paketi frontend'in istek atmasına şimdiden izin verir.
