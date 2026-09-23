# Kampüs Etkinlikleri

Kampüs Etkinlikleri uygulamasının Sprint 1 teslimi. Bu aşamada uygulamanın iskeleti yalnızca HTML ile kurulmuş ve canlı bir adrese yayına alınmıştır. CSS ve JavaScript yoktur.

## Klasör yapısı

```
kampus-etkinlik/
  index.html
  etkinlikler.html
  etkinlik-detay.html
  etkinlik-ekle.html
  etkinlik-guncelle.html
  .gitignore
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

## Yayına alma

- Deploy: [Vercel](https://vercel.com) — Framework: `Other`, Root Directory: proje kökü (`kampus-etkinlik/`)
- Canlı adres: https://web-tech-preflight-beryl.vercel.app/

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
