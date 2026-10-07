https://web-tech-preflight-beryl.vercel.app/

# Sprint 3 — JavaScript ve DOM

Sprint 2'deki CSS'li sayfalar canlandı: etkinlikler tek bir veri dosyasından (`js/data.js`) üretiliyor, listede arama ve kategori filtresi çalışıyor, detay sayfası adresteki `?id=` ile doğru etkinliği açıyor, form kendi hata/başarı mesajını gösteriyor. Framework, jQuery ve `localStorage` yok; kalıcı kayıt backend sprintlerinde gelecek.

Canlı adreste dene: [`/etkinlik-detay.html?id=event-3`](https://web-tech-preflight-beryl.vercel.app/etkinlik-detay.html?id=event-3)

## Klasör yapısı

```
sprint3/
  css/
    2416501083.css
  js/
    data.js              ← 6 etkinlik + tarih/güvenli metin yardımcıları (HTML'e bağlanmaz)
    event-list.js        ← kartlar, ana sayfada yaklaşan 2, arama + kategori filtresi
    event-detail.js      ← ?id= ile etkinlik detayı
    event-form.js        ← ekleme/güncelleme formu, doğrulama
  index.html
  etkinlikler.html
  etkinlik-detay.html
  etkinlik-ekle.html
  etkinlik-guncelle.html
  afis.svg
  README.md
```

| Sayfa | Yüklediği modül |
|---|---|
| `index.html`, `etkinlikler.html` | `event-list.js` |
| `etkinlik-detay.html` | `event-detail.js` |
| `etkinlik-ekle.html`, `etkinlik-guncelle.html` | `event-form.js` |

Modüller `<script type="module">` ile yüklenir; bu yüzden sayfa `file://` ile değil bir sunucudan açılmalıdır.

## Nasıl çalıştırılır

VS Code'da **Live Server** eklentisiyle `sprint3/index.html` → *Open with Live Server*
(adres örn. `http://127.0.0.1:5500/kampus-etkinlik/sprint3/`). Terminalden alternatif:

```bash
cd kampus-etkinlik/sprint3
python -m http.server 5500
```

## Nasıl çalışır

- **Veri tek yerde**: `data.js` içindeki `events` dizisi (7 alan: `id, title, category, date, time, location, description` + `capacity`; yalnızca `event-1`'de ek olarak `poster`). Tarih `GG-AA-YYYY`, saat `SS:DD`.
- **Kartlar**: `createCard` her etkinlikten kart üretir (`map` + `join` + `innerHTML`). Tarih `toLocaleDateString("tr-TR")` ile "12 Ekim 2026" olarak görünür. HTML'de elle yazılmış kart yok.
- **Ana sayfa**: container'daki `data-limit="2"` işareti varsa dizinin **kopyası** tarihe göre sıralanır ve ilk 2'si listelenir; liste sayfasında işaret yoktur, hepsi listelenir. Sıralama gerçek `Date` üzerinden yapılır (`GG-AA-YYYY` metin olarak sıralanırsa gün ay'dan önce karşılaştırılır ve yanlış sonuç verir).
- **Filtre**: kategori seçenekleri veriden üretilir (`new Set`). Arama (`input`) ve kategori (`change`) birlikte çalışır; arama başlık, kategori, yer ve açıklamada yapılır, Türkçe harfler için `toLocaleLowerCase("tr-TR")` kullanılır. Sonuç yoksa "bulunamadı" mesajı çıkar, Enter sayfayı yenilemez.
- **Ayın Programı** tablosu da aynı veriden üretilir (elle yazılmış satır yok).
- **Detay**: `URLSearchParams` ile `id` okunur, `find` ile etkinlik bulunur. Bulunamazsa (geçersiz ya da eksik id) kırmızı hata kutusu ve "Listeye dön" gösterilir, konsolda hata oluşmaz. Başlık, sekme adı ve künye (`dl/dt/dd`) etkinliğe göre değişir. Afişi (`poster`) olan etkinlikte afiş solda, künye sağdadır.
- **Form**: `novalidate` ile tarayıcı balonları kapalıdır; `submit` yakalanır, `preventDefault` ile sayfa yenilenmez, `FormData` ile `data.js`'tekiyle aynı adlı bir nesne kurulur. Hatalı alan `aria-invalid="true"` ile kırmızı olur ve altına kısa mesaj yazılır; düzeltilen alanın eski hatası temizlenir; ilk hatalı alana odaklanılır. Her şey doğruysa yeşil kutuda nesne JSON olarak gösterilir (kullanıcı metni `textContent` ile yazılır, HTML olarak yorumlanmaz).
- **Güncelleme** (`etkinlik-guncelle.html?id=...`): `data-mode="guncelle"` ile aynı `event-form.js` kullanılır, form etkinliğin bilgileriyle dolu açılır ve `id` korunur. `id` geçersiz ya da eksikse form yerine uyarı ve "Etkinliklere git" bağlantısı gösterilir. Sayfaya yalnızca detaydaki "Bu etkinliği güncelle" butonuyla gidilir; menüde Güncelle yoktur.

### Doğrulama kuralları

| Alan | Hata sayılır |
|---|---|
| Ad | 3 karakterden kısa |
| Kategori | Seçilmemiş |
| Tarih, saat | Boş |
| Yer | Boş |
| Kontenjan | Girildiyse 1–1000 dışı ya da tam sayı değil (boş bırakılabilir) |

Açıklama isteğe bağlıdır.

## Kontrol listesi

- [x] `data.js`'te 6 etkinlik, `id`'ler benzersiz (`event-1` … `event-6`)
- [x] Liste veriden üretiliyor, HTML'de elle yazılmış kart yok
- [x] Arama + kategori birlikte çalışıyor (`ATÖLYE` → 2, Seminer + `yapay` → 1)
- [x] Sonuç yoksa mesaj çıkıyor (`xyz`)
- [x] `?id=event-3` doğru etkinliği açıyor
- [x] Geçersiz/eksik id'de hata kutusu, sayfa çökmüyor
- [x] Kaydet sayfayı yenilemiyor
- [x] Hata ve başarı mesajı görünüyor
- [x] Konsolda kırmızı hata yok
- [x] Telefonda yatay taşma yok

## Yayına alma ve teslim

- Vercel: **Settings → Root Directory** = `kampus-etkinlik/sprint3`. Vercel bir sunucu olduğu için modüller orada da çalışır.
- Canlı adres: https://web-tech-preflight-beryl.vercel.app/

```bash
git add .
git commit -m "Sprint3 yapıldı"
git tag sprint-03
git push
git push --tags
```
