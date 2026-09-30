# Sprint 1 — HTML, Git ve Yayına Alma

Kampüs Etkinlikleri uygulamasının iskeleti yalnızca HTML ile kurulmuş ve canlı bir adrese yayına alınmıştır. CSS ve JavaScript yoktur.

## Klasör yapısı

```
sprint1/
  index.html
  etkinlikler.html
  etkinlik-detay.html
  etkinlik-ekle.html
  etkinlik-guncelle.html
  afis.svg
  README.md
```

## Sayfalar

| Sayfa | İçerik |
|---|---|
| `index.html` | Uygulama adı, amacı, iki yaklaşan etkinlik, diğer sayfalara linkler |
| `etkinlikler.html` | Etkinlik listesi (çerçeveli tablo, her etkinlik bir hücre) + Ayın Programı özet tablosu |
| `etkinlik-detay.html` | Etkinlik afişi, künye listesi (tarih, yer, kategori, kontenjan), ayrıntılı açıklama |
| `etkinlik-ekle.html` | Yeni etkinlik ekleme formu |
| `etkinlik-guncelle.html` | Etkinlik güncelleme formu (alanlar dolu) |

Beş sayfanın hepsinde ortak iskelet: `header` + `nav` + `main` + `footer`. Dosya adlarında Türkçe karakter veya boşluk yok.

## Yayına alma

- Deploy: [Vercel](https://vercel.com) — Framework: `Other`, build komutu yok
- Root Directory: `kampus-etkinlik/sprint1`
- Ana sayfa `index.html` olmalı; adres doğrudan onu açar.

## Git

```bash
git add .
git commit -m "Sprint1 yapıldı"
git tag sprint-01
git push
git push --tags
```

## Teslim

GitHub repo linki + `sprint-01` etiketi + Vercel adresi.
