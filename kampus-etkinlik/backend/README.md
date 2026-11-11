# Kampüs Etkinlikleri — Backend (Sprint 7)

Frontend'in yanında çalışan, etkinlikleri JSON olarak veren Express REST API'si. Veri şimdilik bellekte durur; sunucu yeniden başlayınca `POST` ile eklenenler kaybolur. Veritabanı Sprint 8'de gelecek.

Bengüsu İlhan · 2416501083

## Çalıştırma

```bash
cd kampus-etkinlik/backend
npm install
cp .env.example .env     # Windows PowerShell: Copy-Item .env.example .env
npm run dev              # dosya değişince sunucu yeniden başlar
```

Sunucu `http://localhost:3000` adresinde açılır. Üretim gibi çalıştırmak için `npm start`.

## Ortam değişkenleri

| Değişken | Anlamı | Varsayılan |
|---|---|---|
| `PORT` | Sunucunun dinleyeceği port | `3000` |

`.env` GitHub'a gitmez; hangi değişkenlerin gerektiği `.env.example`'da yazar. Port doluysa `.env` içindeki `PORT` değiştirilir.

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarı | Hata | Durum |
|---|---|---|---|---|---|
| GET | `/health` | Sunucu ayakta mı | 200 | — | Bu sprint |
| GET | `/events` | Listeyi getir (`?category=Atölye` ile süzülür) | 200 | — | Bu sprint |
| GET | `/events/:id` | Tek etkinlik | 200 | 404 | Bu sprint |
| POST | `/events` | Yeni etkinlik | 201 | 400 | Bu sprint |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

### Status code'lar

- **200** tamam
- **201** oluşturuldu
- **204** içerik yok
- **400** eksik ya da yanlış veri
- **404** bulunamadı

### Hata biçimi

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

Tanımsız adreslerde de `404` ve `{ "error": { "message": "Route not found" } }` döner.

### Örnekler

`GET /health` → `200`

```json
{ "status": "ok", "time": "2026-11-11T09:14:55.407Z", "student": "2416501083" }
```

`GET /events/event-2` → `200`

```json
{
  "id": "event-2",
  "title": "Sıfırdan React Uygulama Atölyesi",
  "category": "Atölye",
  "capacity": 25,
  "date": "2026-11-21",
  "time": "10:00",
  "location": "Bilgisayar Laboratuvarı 3",
  "description": "Bileşen, props ve state kavramlarını adım adım uygulayarak basit bir yapılacaklar listesi yapıyoruz."
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

`title`, `category` ve `date` zorunludur; eksikse `400` ve `title, category and date are required` mesajı döner. Diğer alanlar yoksa `capacity` 0, `time`, `location` ve `description` boş metin olur. Yanıttaki `id` sunucu tarafından üretilir. Kategori ve tarih biçiminin doğrulanması Sprint 9'da eklenecek.

## Klasör yapısı

```
backend/
├─ src/
│  ├─ app.js                       Express uygulaması, middleware ve route bağlantısı
│  ├─ server.js                    .env'yi okur, portu dinler
│  ├─ routes/event-routes.js       Hangi adres hangi fonksiyona gider
│  ├─ controllers/event-controller.js  İsteği işler, yanıtı döndürür
│  └─ data/events.js               Bellek içi etkinlik dizisi (6 kayıt)
├─ requests/kampus-api.json        Postman collection (6 istek)
├─ .env.example
├─ .gitignore
└─ package.json
```

Her dosyanın tek bir işi var: route yalnızca adresi eşler, controller isteği işler. Frontend'deki `pages/` ve `components/` ayrımının backend karşılığıdır.

## Postman ile test

1. Postman'de **Import** ile `requests/kampus-api.json` dosyasını açın.
2. `npm run dev` ile sunucuyu başlatın.
3. "Kampüs API" collection'ındaki 6 isteği sırayla çalıştırın. Beklenen status code'lar istek adlarında yazılıdır.

| # | İstek | Beklenen |
|---|---|---|
| 1 | GET `/health` | 200, `status: ok` ve `student` |
| 2 | GET `/events` | 200, 6 kayıt |
| 3 | GET `/events/event-2` | 200, `event-2` |
| 4 | GET `/events/yok` | 404, `error.message` |
| 5 | POST `/events` (tam gövde) | 201, yeni id |
| 6 | POST `/events` (sadece `title`) | 400, `error.message` |

Frontend (`localhost:5173`) bu API'ye Sprint 11'de bağlanacak; `cors` paketi frontend'in istek atmasına şimdiden izin verir.
