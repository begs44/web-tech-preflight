# Kampüs Etkinlikleri — Backend (Sprint 9)

Frontend'in yanında çalışan, etkinlikleri JSON olarak veren Express REST API'si. Veri MongoDB'de (Mongoose) durur. Sprint 9 ile tam CRUD var: etkinlik eklenir, okunur, güncellenir (`PATCH`), silinir (`DELETE`); başlıkta aranır ve yaklaşan etkinlikler ayrı listelenir.

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

`npm run seed` önce `events` collection'ını boşaltır (`deleteMany`), sonra `src/data/seed-events.js`'teki 6 etkinliği ekler (`insertMany`). Kaç kez çalıştırılırsa çalıştırılsın sonuç 6 kayıttır. İlk iki etkinliğin tarihi geçmişte; bu yüzden `/events/upcoming` listesinde görünmezler.

## Tarih biçimi

API'de tarih her yerde **`GG-AA-YYYY`**: `"15-10-2026"`. Veritabanında gerçek `Date` olarak durur, böylece tarih olarak sıralanır ve karşılaştırılır (metin olsaydı `"05-11-2026"`, `"15-10-2026"`'dan önce gelirdi). Dönüşümü `src/utils/date.js` yapar: schema'daki `set: parseDate` gelen metni `Date`'e, `get: formatDate` yanıtta yeniden metne çevirir. `"2026-12-20"` ya da `"31-02-2026"` gibi tarihler `400` döner.

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarı | Hata | Durum |
|---|---|---|---|---|---|
| GET | `/health` | Sunucu ayakta mı | 200 | — | çalışıyor |
| GET | `/events` | Liste, tarihe göre sıralı; `?search=` başlıkta arar, `?category=` süzer, ikisi birlikte de olur | 200 | — | çalışıyor |
| GET | `/events/upcoming` | Bugün ve sonrası, en yakın önce | 200 | — | çalışıyor |
| GET | `/events/:id` | Tek etkinlik | 200 | 404 | çalışıyor |
| POST | `/events` | Yeni etkinlik | 201 | 400 | çalışıyor |
| PATCH | `/events/:id` | Sadece gönderilen alanları güncelle, güncel kaydı döndür | 200 | 400, 404 | çalışıyor |
| DELETE | `/events/:id` | Sil, gövde yok | 204 | 404 | çalışıyor |

`/events/upcoming` route'u `/events/:id`'den önce yazılı; yoksa Express "upcoming"i bir id sanar ve 404 döner.

### Status code'lar

- **200** tamam
- **201** oluşturuldu
- **204** işlem başarılı, yanıt gövdesi yok
- **400** eksik ya da yanlış veri
- **404** bulunamadı
- **500** beklenmeyen sunucu hatası (ayrıntı sadece terminalde)

### Hata biçimi

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

Geçersiz ya da olmayan id (`/events/yok`, silinmiş bir `_id`) her yerde `404` döner, 500 değil. Tanımsız adreslerde `404` ve `Route not found` döner. Beklenmeyen bir hata olursa hata yakalayıcı middleware `500` ve `Server error` döner; sunucu çökmez.

### Örnekler

`GET /health` → `200`

```json
{ "status": "ok", "time": "2026-11-25T06:47:07.764Z", "student": "2416501083" }
```

`GET /events/<listeden kopyalanan _id>` → `200`

```json
{
  "_id": "6afd49e46a370d5c3cd92c6b",
  "title": "Sıfırdan React Uygulama Atölyesi",
  "category": "Atölye",
  "capacity": 25,
  "date": "21-11-2026",
  "time": "10:00",
  "location": "Bilgisayar Laboratuvarı 3",
  "description": "Bileşen, props ve state kavramlarını adım adım uygulayarak basit bir yapılacaklar listesi yapıyoruz.",
  "createdAt": "2026-11-25T06:47:05.112Z",
  "updatedAt": "2026-11-25T06:47:05.112Z",
  "__v": 0
}
```

`POST /events` → `201`

```json
{
  "title": "Git Atölyesi",
  "category": "Atölye",
  "capacity": 30,
  "date": "01-12-2026",
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
| `date` | zorunlu, `GG-AA-YYYY` |
| `capacity` | sayı, en az 0, yoksa 0 |
| `time`, `location` | yoksa boş metin |
| `description` | en çok 500 karakter, yoksa boş metin |

Sadece `title` gönderilirse `400`:

```json
{ "error": { "message": "Event validation failed: date: Path `date` is required., category: Path `category` is required." } }
```

`PATCH /events/:id` sadece gönderilen alanları değiştirir. `findByIdAndUpdate` iki ayarla çalışır: `returnDocument: "after"` yanıtta güncel kaydı döndürür, `runValidators: true` schema kurallarını güncellemede de uygular.

| PATCH gövdesi | Sonuç |
|---|---|
| `{ "capacity": 55 }` | 200, sadece `capacity` değişti |
| `{ "title": "  Yeni Başlık  " }` | 200, `"Yeni Başlık"` (trim) |
| `{ "date": "25-12-2026" }` | 200 |
| `{ }` | 400, `Body is empty` |
| `{ "category": "Parti" }` | 400, enum |
| `{ "_id": "abc" }` | 400, `_id cannot be changed` (`createdAt`, `updatedAt`, `__v` de değiştirilemez) |
| `{ "date": "2026-12-20" }` | 400, tarih biçimi |
| `/events/yok` ya da silinmiş id | 404, `Event not found` |

`DELETE /events/:id` → `204`, gövde yok. Aynı istek bir daha gönderilirse `404`.

`GET /events?search=atölye&category=Atölye`: arama büyük/küçük harfe bakmaz (`$regex`, `$options: "i"`); `(`, `*`, `?` gibi işaretler kaçırıldığı için aramayı bozmaz.

`GET /events/upcoming`: `date` bugünün başına eşit ya da sonraki (`$gte`) etkinlikler, tarih ve saate göre artan sırada.

## Klasör yapısı

```
backend/
├─ src/
│  ├─ app.js                       Express uygulaması, route'lar, 404 ve hata yakalayıcı
│  ├─ server.js                    .env'yi okur, önce veritabanına bağlanır, sonra portu dinler
│  ├─ seed.js                      npm run seed: sil, 6 etkinlik ekle
│  ├─ config/database.js           MongoDB bağlantısı (MONGODB_URI)
│  ├─ utils/date.js                "GG-AA-YYYY" ↔ Date, bugünün başı
│  ├─ models/event-model.js        Event schema'sı ve modeli → "events" collection'ı
│  ├─ data/seed-events.js          Örnek 6 etkinlik (2'si geçmiş tarihli)
│  ├─ routes/event-routes.js       Hangi adres hangi fonksiyona gider (/upcoming, /:id'den önce)
│  └─ controllers/event-controller.js  find / findById / create / findByIdAndUpdate / findByIdAndDelete
├─ requests/kampus-api.json        Postman collection (Sprint 8, 6 istek)
├─ .env.example
├─ .gitignore
└─ package.json
```

Kurallar schema'da, işlemler modelde, istek/yanıt controller'da: her dosyanın tek bir işi var.

## Test

### Sprint 9 collection'ı (Collection Runner)

1. `npm run seed`, sonra `npm run dev`.
2. Postman › **Import** › `https://webdersi.vercel.app/test.json` adresini yapıştırın.
3. Collection › **Run collection** › **Run**. Hedef: 18 istek, 45 test, hepsi yeşil.

Aynı test terminalden de çalışır (backend açıkken):

```bash
npm i -g newman
newman run https://webdersi.vercel.app/test.json
```

Collection id'leri kendisi kaydeder: 02 listedeki ilk `_id`'yi, 05 yeni oluşan kaydın `_id`'sini saklar. PATCH ve DELETE o yeni kayıtla çalıştığı için seed verisi bozulmaz; tekrar tekrar çalıştırılabilir.

### Sprint 8 collection'ı

`requests/kampus-api.json`'u Postman'e Import edip 6 isteği sırayla çalıştırın (seed sonrası). 2. istek listedeki ilk `_id`'yi `eventId` değişkenine kaydeder, 3. istek onu kullanır.

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
