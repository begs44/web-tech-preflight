https://bengusuilhan-frontend.vercel.app/

# Sprint 6 + Vize — Router, Context ve Yönetim

Kampüs Etkinlikleri artık gerçek sayfalardan oluşuyor: **React Router** ile 10 adres, **Context** ile tek ortak etkinlik listesi ve **Yönetim** sayfasında ekle / güncelle / sil (silmeden önce onay). Bir sayfada yapılan değişiklik Ana Sayfa ve Etkinlikler'de de görünür, çünkü hepsi aynı `EventsContext`'ten okur.

## Çalıştırma

```bash
cd kampus-etkinlik/frontend
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc -b && vite build, hatasız bitmeli
npm run preview    # build çıktısını aç
npm run lint
```

Node 22+ ve npm 10+ gerekir.

## Sayfalar (10 route)

| Adres | Sayfa | Ne yapar |
|---|---|---|
| `/` | `HomePage` | Yaklaşan 2 etkinlik ve "Tüm etkinlikleri gör" butonu. |
| `/events` | `EventsPage` | Tüm etkinlikler; arama ve kategori filtresi. |
| `/events/:id` | `EventDetailPage` | Tek etkinliğin künyesi; id yoksa "bulunamadı" sayfası. |
| `/admin` | `AdminPage` | Etkinlik tablosu; Detay, Güncelle ve Sil (`window.confirm` onayıyla). |
| `/admin/add` | `AddEventPage` | Yeni etkinlik formu. |
| `/admin/:id/edit` | `EditEventPage` | Dolu gelen form; güncelleyince listede değişir. |
| `/login` | `LoginPage` | E-posta ve şifre doğrulaması. |
| `/register` | `RegisterPage` | Ad, e-posta, şifre ve şifre tekrarı doğrulaması. |
| `/forgot-password` | `ForgotPasswordPage` | E-posta doğrulaması. |
| `*` | `NotFoundPage` | Tanımsız adreslerde 404 ekranı. |

Giriş, kayıt ve şifre sayfalarında sunucu yoktur; form doğrulaması çalışır, geçerliyse bilgi mesajı gösterilir.

## Context nasıl çalışır?

`main.tsx` içinde `BrowserRouter > EventsProvider > App` sırası vardır. `EventsProvider` etkinlik listesini `useState` ile tutar ve `events`, `addEvent`, `updateEvent`, `deleteEvent` değerlerini sağlar. Sayfalar `useEvents()` ile bunlara ulaşır. Liste her değişimde yeni dizi olarak kurulur (`[...events, yeni]`, `map`, `filter`); `push`/`splice` kullanılmaz.

## Form doğrulaması

`src/utils/validate-event.ts` içindeki `validateEvent(data)` saf bir fonksiyondur ve hata nesnesi döner; boşsa form geçerlidir. `EventForm` alanları tek bir state nesnesinde tutar (controlled input), gönderimde doğrular, hatalı alanı `aria-invalid` ile işaretler ve altına hata metnini yazar.

## Klasör yapısı

```
src/
├─ main.tsx                 BrowserRouter + EventsProvider
├─ App.tsx                  Header, Navigation, <Routes> (10 route), Footer
├─ App.css                  Tüm stiller (mobil ve masaüstü)
├─ context/EventsContext.tsx  EventsProvider ve useEvents
├─ pages/                   10 sayfa bileşeni
├─ components/
│  ├─ layout/               Header, Navigation (NavLink), Footer
│  ├─ events/               EventCard, EventList, EventFilter, EventDetail
│  └─ forms/EventForm.tsx   Ekle ve Güncelle'nin ortak formu
├─ data/events.ts           Başlangıç etkinlikleri
├─ types/campus-event.ts    Category, CampusEvent, EventFormData, EventFormErrors
└─ utils/                   filter-events, format-date, validate-event
```

`vercel.json` tüm adresleri `index.html`'e yönlendirir; böylece `/events/event-2` gibi bir adres doğrudan açılınca ya da yenilenince 404 vermez.

## Yayına alma ve teslim

- Vercel ayarı: **Root Directory** = `kampus-etkinlik/frontend`, **Framework Preset** = `Vite`. Push sonrası Vercel kendisi yeniden yayınlar.
- Canlı adres: https://bengusuilhan-frontend.vercel.app/ (eski `web-tech-preflight-beryl.vercel.app` adresi buraya yönlendirir)

```bash
git add .
git commit -m "Complete sprint 6 and midterm frontend"
git tag frontend
git push
git push --tags
```
