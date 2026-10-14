https://web-tech-preflight-beryl.vercel.app/

# Sprint 4 — Vite, TypeScript ve React

Kampüs Etkinlikleri, Sprint 3'teki HTML + JavaScript sürümünden React ve TypeScript'e taşındı. Veri tipli (`CampusEvent`), arama/filtre fonksiyonları saf ve sayfa geçişi (`useState`) ile yapılıyor; beş sayfanın hepsi tek `App.tsx` içinde. React Router bu sprintte yok (Sprint 6), bu yüzden adres çubuğu hep aynı kalır.

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

## Dosyalar

| Dosya | Görevi |
|---|---|
| `package.json` | Proje adı, komutlar (`dev`, `build`, `preview`, `lint`) ve paket listesi. |
| `package-lock.json` | Yüklenen paketlerin tam sürümlerini sabitler. |
| `node_modules/` | İndirilen paketler; GitHub'a gitmez (`.gitignore`). |
| `tsconfig*.json` | TypeScript ayarları (`tsconfig.app.json` uygulama kodu, `tsconfig.node.json` Vite ayar dosyası için). |
| `vite.config.ts` | Vite ayarları ve React eklentisi. |
| `index.html` | Tek HTML sayfası; içinde boş `div#root`, `lang="tr"` ve başlık burada. |
| `src/main.tsx` | React'i başlatır ve `App`'i `#root`'a çizer. |
| `src/App.tsx` | Uygulamanın ana bileşeni: başlık, menü, 5 sayfa (ana sayfa, etkinlikler, detay, ekle, güncelle) ve footer. |
| `src/App.css` | Tüm stiller; Sprint 3 CSS'i (öğrenci numarasından türeyen renk ve font) buraya taşındı. |
| `src/index.css` | Tüm sayfaya genel stil; bu sprintte bilerek boş. |
| `public/` | Olduğu gibi kopyalanan dosyalar: `afis.svg` (etkinlik afişi) ve `favicon.svg`. |
| `src/types/campus-event.ts` | `Category` (4 değerli union) ve `CampusEvent` tipi: bir etkinlik neye benzer. |
| `src/data/events.ts` | Tipe uyan 6 etkinlik kaydı (Sprint 3 verisinin tipli hâli). |
| `src/utils/filter-events.ts` | DOM'a dokunmayan saf fonksiyonlar: `searchEvents`, `filterByCategory`, `findEventById`. |

## Sprint 3'ten farklar

- Tarihler `YYYY-MM-DD` tutulur (Sprint 3'te `GG-AA-YYYY`); böylece metin olarak sıralamak tarih sırasını verir.
- `Category` = `"Seminer" | "Atölye" | "Söyleşi" | "Sosyal"`: verideki dört kategoriyle aynı.
- Detay sayfasına adresten (`?id=`) değil state'ten gelinir; Sprint 6'da router ile değişecek.
- Ekle/Güncelle formları sadece görünümdür; kaydetme ve doldurma sonraki sprintlerde gelecek.

## Yayına alma ve teslim

- Vercel: **Settings → Root Directory** = `kampus-etkinlik/frontend`, **Framework Preset** = `Vite` (çıktı klasörü `dist`).
- Canlı adres: https://web-tech-preflight-beryl.vercel.app/

```bash
git add .
git commit -m "Complete sprint 4"
git tag sprint-04
git push
git push --tags
```
