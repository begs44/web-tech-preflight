# Kampüs Etkinlikleri

Kampüs Etkinlikleri uygulaması. Sprint 1'de HTML iskeleti kuruldu, Sprint 2'de bu iskelete bozulmadan CSS giydirildi: numaraya özel renk/font paleti, tablodan karta geçiş ve mobil öncelikli responsive tasarım.

## Klasör yapısı

```
kampus-etkinlik/
  sprint1/                    ← Sprint 1 teslimi (CSS yok, sprint-01 etiketi)
    index.html
    etkinlikler.html
    etkinlik-detay.html
    etkinlik-ekle.html
    etkinlik-guncelle.html
  sprint2/                    ← Sprint 2 teslimi (CSS + responsive, sprint-02 etiketi)
    css/
      2416501083.css
    index.html
    etkinlikler.html
    etkinlik-detay.html
    etkinlik-ekle.html
    etkinlik-guncelle.html
  .gitignore
  README.md
```

## Sprint 1 — Sayfalar (`sprint1/`)

| Sayfa | İçerik |
|---|---|
| `index.html` | Uygulama adı, amacı, iki yaklaşan etkinlik, diğer sayfalara linkler |
| `etkinlikler.html` | Etkinlik listesi (çerçeveli tablo, her etkinlik bir hücre) + Ayın Programı özet tablosu |
| `etkinlik-detay.html` | Etkinlik afişi, künye listesi (tarih, yer, kategori, kontenjan), ayrıntılı açıklama |
| `etkinlik-ekle.html` | Yeni etkinlik ekleme formu |
| `etkinlik-guncelle.html` | Etkinlik güncelleme formu (alanlar dolu) |

## Sprint 2 — CSS ve Responsive (`sprint2/`)

- `sprint2/css/2416501083.css`: `--no: 2416501083` → `--ton: mod(--no, 360) = 3` → `--renk-ana`/`--renk-zemin` bu tondan üretiliyor; son hane `3` → `--font: "Trebuchet MS"`.
- Sprint 1'deki geçici çerçeveli etkinlik tablosu kalktı; etkinlikler artık `<section class="etkinlik-listesi"> > <article>` kartları (`display: grid`), mobilde tek sütun, geniş ekranda çok sütun.
- "Ayın Programı" gerçek veri tablosu olduğu için `<table>` olarak kaldı, taşarsa yatay kaydırma sarmalayıcısı var.
- `etkinlik-detay.html`: afiş ve künye (`dl`) mobilde alt alta, geniş ekranda yan yana (`.detay` grid).
- Form sayfalarında boş bırakılan zorunlu alan, gönderim denendiğinde `:user-invalid` ile kırmızı vurgulanır.
- Nav menüsü Sprint 2'de `Ana Sayfa · Etkinlikler · Ekle · Güncelle` (detay sayfasına kartlardaki "Detay →" linkleriyle gidilir).

## Yayına alma

- Deploy: [Vercel](https://vercel.com) — Framework: `Other`
- Sprint 1 canlı adres (Root Directory: `kampus-etkinlik/sprint1`): https://web-tech-preflight-beryl.vercel.app/
- Sprint 2 için Vercel projesinde **Settings → Root Directory**'yi `kampus-etkinlik/sprint2` olarak güncelle (ya da yeni bir proje oluştur); değiştirmezsen canlı adres eski sprinti göstermeye devam eder.

## Git

```bash
git add .
git commit -m "Sprint2 yapıldı"
git tag sprint-02
git push
git push --tags
```

## Teslim

- Sprint 1: GitHub repo linki + `sprint-01` etiketi + Vercel adresi.
- Sprint 2: GitHub repo linki + `sprint-02` etiketi + güncellenmiş Vercel adresi (Root Directory: `kampus-etkinlik/sprint2`).
