https://web-tech-preflight-beryl.vercel.app/

# Sprint 5 — React Bileşenleri

Kampüs Etkinlikleri, Sprint 4'teki tek parça `App.tsx`'ten bileşenlere bölündü. Her parça kendi dosyasında, `props` ile veri alıyor ve olayları `callback` ile yukarı bildiriyor; state `App`'te kalıyor (lifting state). Ekran Sprint 4 ile aynı: sayfa geçişi hâlâ state ile (React Router Sprint 6'da), form sadece görünüm. `App.tsx` 349 satırdan 157 satıra indi.

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

## Bileşen ağacı

```
App  (state: page, selectedId, searchText, category)
├─ Header            title, text
├─ Navigation        current, onNavigate
├─ <main>: açık sayfa
│  ├─ EventList      events, onShowDetail, emptyText   (ana sayfa ve Etkinlikler)
│  │   └─ EventCard  event, onShowDetail
│  ├─ EventFilter    searchText, category, categories, onSearchChange, onCategoryChange
│  ├─ EventDetail    event, onBack, onEdit
│  └─ EventForm      categories, submitLabel, onSubmit  (Ekle ve Güncelle)
└─ Footer            (props yok)
```

Veri aşağı (props), olay yukarı (callback). Arama kutusu ve liste aynı state'e ihtiyaç duyduğu için state `EventFilter`'da değil `App`'te durur.

## Dosyalar

| Dosya | Görevi |
|---|---|
| `package.json` | Proje adı, komutlar (`dev`, `build`, `preview`, `lint`) ve paket listesi. |
| `package-lock.json` | Yüklenen paketlerin tam sürümlerini sabitler. |
| `node_modules/` | İndirilen paketler; GitHub'a gitmez (`.gitignore`). |
| `tsconfig*.json` | TypeScript ayarları (`tsconfig.app.json` uygulama kodu, `tsconfig.node.json` Vite ayar dosyası için). |
| `vite.config.ts` | Vite ayarları ve React eklentisi. |
| `index.html` | Tek HTML sayfası; içinde boş `div#root`, `lang="tr"` ve başlık burada. |
| `public/` | Olduğu gibi kopyalanan dosyalar: `afis.svg` (etkinlik afişi) ve `favicon.svg`. |
| `src/main.tsx` | React'i başlatır ve `App`'i `#root`'a çizer. |
| `src/App.tsx` | Ana bileşen: state, `go()` ile sayfa geçişi, hesaplanan değerler ve bileşenleri yerleştirir. |
| `src/App.css` | Tüm stiller; Sprint 3 CSS'i (öğrenci numarasından türeyen renk ve font). |
| `src/index.css` | Tüm sayfaya genel stil; bilerek boş. |
| `src/types/campus-event.ts` | `Category` (4 değerli union) ve `CampusEvent` tipi: bir etkinlik neye benzer. |
| `src/types/page.ts` | `PageName` tipi: uygulamadaki 5 sayfanın adı. |
| `src/data/events.ts` | Tipe uyan 6 etkinlik kaydı. |
| `src/utils/filter-events.ts` | DOM'a dokunmayan saf fonksiyonlar: `searchEvents`, `filterByCategory`, `findEventById`. |
| `src/utils/format-date.ts` | Tarihi "12 Ekim 2026" biçimine çeviren `formatDate`; kart ve detay ortak kullanır. |
| `src/components/layout/Header.tsx` | Renkli bandın başlığı ve isteğe bağlı alt yazısı. |
| `src/components/layout/Navigation.tsx` | Menü; tıklayınca `onNavigate` ile hangi sayfanın açılacağını `App`'e bildirir. |
| `src/components/layout/Footer.tsx` | Sayfa altı bilgisi (ad, numara, yıl). |
| `src/components/events/EventCard.tsx` | Tek etkinlik kartı; "Detayları gör" ile `onShowDetail(id)` çağırır. |
| `src/components/events/EventList.tsx` | Etkinlik dizisini alıp her biri için `EventCard` çizer; dizi boşsa `emptyText` gösterir. |
| `src/components/events/EventFilter.tsx` | Arama kutusu ve kategori seçimi; değerleri props ile alır, değişimi `onSearchChange`/`onCategoryChange` ile bildirir. |
| `src/components/events/EventDetail.tsx` | Tek etkinliğin afişi, künyesi ve açıklaması; `onBack` ve `onEdit(id)` butonları. |
| `src/components/forms/EventForm.tsx` | Ekle ve Güncelle'nin ortak formu; gönderimde sayfa yenilenmez, `onSubmit` çağrılır. |

## Sprint 4'ten farklar

- `Header` artık sayfa başlığını (`h1`) ve alt yazıyı renkli bandın içinde gösterir, menü aynı bandın altındadır; sayfa içeriğinde ayrıca `h1` yoktur.
- Kartta "Tarih: 12 Ekim 2026, 14:00" biçiminde saat de görünür; detay sayfasında "Etkinlik Künyesi" ve "Açıklama" başlıkları vardır.
- Etkinlikler sayfasındaki "Ayın Programı" tablosu kaldırıldı; hocanın klasör yapısında ve örnek ekranlarında yok, sayfa sadece filtre ve kartlardan oluşuyor.
- `EventForm` şartnamedeki tek `onSubmit` prop'una ek olarak kategori seçeneklerini `categories` ile alır ve buton yazısını `submitLabel` ile değiştirir (Güncelle sayfasında "Güncelle"); aksi halde Sprint 4'teki davranış kaybolurdu.

## Yayına alma ve teslim

- Vercel ayarı değişmedi: **Root Directory** = `kampus-etkinlik/frontend`, **Framework Preset** = `Vite`. Push sonrası Vercel kendisi yeniden yayınlar.
- Canlı adres: https://web-tech-preflight-beryl.vercel.app/

```bash
git add .
git commit -m "Complete sprint 5 React components"
git tag sprint-05
git push
git push --tags
```
