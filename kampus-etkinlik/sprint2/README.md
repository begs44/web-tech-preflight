# Sprint 2 — CSS ve Responsive Tasarım

Sprint 1'deki HTML iskeletine bozulmadan CSS giydirildi: numaraya özel renk/font paleti, tablodan karta geçiş ve mobil öncelikli responsive tasarım.

## Klasör yapısı

```
sprint2/
  css/
    2416501083.css
  afis.svg
  index.html
  etkinlikler.html
  etkinlik-detay.html
  etkinlik-ekle.html
  etkinlik-guncelle.html
```

## css/2416501083.css

```css
:root {
  --no: 2416501083;
  --ton: mod(var(--no), 360);      /* 2416501083 mod 360 = 3 */
  --renk-ana: hsl(var(--ton) 65% 38%);
  --renk-zemin: hsl(var(--ton) 30% 97%);
  --font: "Trebuchet MS", sans-serif;  /* son hane 3 */
  --bosluk-m: 1rem;
  --kose: 8px;
}
```

- `--no` öğrenci numarası, `--ton` bu numaranın 360'a göre modu; ana renk ve zemin rengi bu tondan üretiliyor.
- Font, numaranın son hanesine göre seçildi (`3` → `"Trebuchet MS"`).
- Sayfanın geri kalanında renk, boşluk ve köşe yarıçapı hep `var(--...)` ile kullanılıyor.

## Sayfalar

| Sayfa | Değişiklik |
|---|---|
| `index.html` | "Yaklaşan 2 etkinlik" artık `<section class="etkinlik-listesi"> > <article>` kart grid'i |
| `etkinlikler.html` | Sprint 1'deki geçici çerçeveli tablo kalktı, etkinlikler kart grid'i oldu; "Ayın Programı" gerçek veri tablosu olarak kaldı |
| `etkinlik-detay.html` | Afiş (`afis.svg`) solda, künye (`dl`) sağda — geniş ekranda yan yana, mobilde alt alta |
| `etkinlik-ekle.html` | Boş bırakılan zorunlu alan, gönderim denendiğinde `:user-invalid` ile kırmızı vurgulanır |
| `etkinlik-guncelle.html` | Aynı form, alanlar `value` ile dolu gelir |

Nav menüsü beş sayfada da aynı: `Ana Sayfa · Etkinlikler · Ekle · Güncelle` (etkinlik detayına kartlardaki "Detay →" linkleriyle gidilir).

## Responsive

- Mobil öncelikli: kartlar tek sütun, taşma yok.
- `min-width: 640px` üzerinde kartlar `repeat(auto-fit, minmax(240px, 1fr))` ile çok sütuna geçer.
- `min-width: 700px` üzerinde etkinlik detay sayfasında afiş ve künye yan yana (`display: grid; grid-template-columns: 1fr 1fr`).
- Tablo taşarsa `.tablo-sarici` yatay kaydırma sağlar, sayfa geneli kaymaz.

## Kontrol listesi

- [x] `--no` = öğrenci numarası, `--font` = son hane
- [x] Telefonda yatay kaydırma ve taşma yok
- [x] Kartlar telefonda tek sütun, menü sığıyor
- [x] Boş form gönderince hata belli (`:user-invalid`)

## Yayına alma

- Deploy: [Vercel](https://vercel.com) — Framework: `Other`
- Root Directory: `kampus-etkinlik/sprint2`
- Canlı adres: https://web-tech-preflight-beryl.vercel.app/

## Git

```bash
git add .
git commit -m "Sprint2 yapıldı"
git tag sprint-02
git push
git push --tags
```

## Teslim

GitHub repo linki + `sprint-02` etiketi + Vercel adresi.
