import { events, toIsoDate, fromIsoDate } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const mesaj = document.querySelector("#form-mesaj");
const guncelleModu = form.dataset.mode === "guncelle";
const alanAdlari = ["ad", "kategori", "tarih", "saat", "yer", "kontenjan"];
let etkinlik = null;

function readForm() {
  const fd = new FormData(form);
  const kontenjan = fd.get("kontenjan").trim();
  const tarih = fd.get("tarih");
  return {
    title: fd.get("ad").trim(),
    category: fd.get("kategori"),
    date: tarih ? fromIsoDate(tarih) : "",
    time: fd.get("saat"),
    location: fd.get("yer").trim(),
    description: fd.get("aciklama").trim(),
    capacity: kontenjan === "" ? null : Number(kontenjan),
  };
}

function validate(data) {
  const errors = {};
  if (data.title.length < 3) errors.ad = "En az 3 karakter olmalı.";
  if (!data.category) errors.kategori = "Bir kategori seçin.";
  if (!data.date) errors.tarih = "Tarih seçin.";
  if (!data.time) errors.saat = "Saat seçin.";
  if (!data.location) errors.yer = "Yer boş bırakılamaz.";
  if (data.capacity !== null && (!Number.isInteger(data.capacity) || data.capacity < 1 || data.capacity > 1000)) {
    errors.kontenjan = "Kontenjan 1 ile 1000 arasında bir tam sayı olmalı.";
  }
  return errors;
}

function showErrors(errors) {
  alanAdlari.forEach((ad) => {
    const alan = form.elements[ad];
    const hata = document.querySelector(`#${ad}-hata`);
    hata.textContent = errors[ad] ?? "";
    if (errors[ad]) {
      alan.setAttribute("aria-invalid", "true");
    } else {
      alan.removeAttribute("aria-invalid");
    }
  });
}

// Kullanıcı verisi içerebileceği için kutuya metin olarak yazılır (innerHTML değil).
function showMessage(type, text, data) {
  const kutu = document.createElement("div");
  kutu.className = type === "basari" ? "basari" : "hata-kutusu";
  const baslik = document.createElement("p");
  baslik.textContent = text;
  kutu.append(baslik);
  if (data) {
    const pre = document.createElement("pre");
    pre.textContent = JSON.stringify(data, null, 2);
    kutu.append(pre);
  }
  mesaj.replaceChildren(kutu);
  kutu.scrollIntoView({ block: "nearest" });
}

function fillForm(kayit) {
  form.elements.ad.value = kayit.title;
  form.elements.kategori.value = kayit.category;
  form.elements.tarih.value = toIsoDate(kayit.date);
  form.elements.saat.value = kayit.time;
  form.elements.yer.value = kayit.location;
  form.elements.kontenjan.value = kayit.capacity ?? "";
  form.elements.aciklama.value = kayit.description;
}

function showMissingEvent() {
  const uyari = document.createElement("div");
  uyari.className = "hata-kutusu";
  uyari.setAttribute("role", "alert");
  uyari.innerHTML = `<p>Güncellenecek etkinlik bulunamadı. Bir etkinliğin detay sayfasındaki “Bu etkinliği güncelle” bağlantısını kullanın.</p>
    <p><a href="etkinlikler.html">Etkinliklere git</a></p>`;
  form.replaceWith(uyari);
  mesaj.remove();
}

function handleSubmit(e) {
  e.preventDefault();
  const data = readForm();
  const errors = validate(data);
  showErrors(errors);

  if (Object.keys(errors).length > 0) {
    showMessage("hata", "Formda hatalı alanlar var. Kırmızı alanları düzeltip tekrar deneyin.");
    form.querySelector('[aria-invalid="true"]').focus();
    return;
  }

  if (guncelleModu) {
    showMessage("basari", "Etkinlik güncellendi. Güncel nesne aşağıda (kalıcı kayıt backend sprintinde eklenecek).", {
      id: etkinlik.id,
      ...data,
    });
  } else {
    showMessage("basari", "Etkinlik bilgileri geçerli. Oluşan nesne aşağıda (kalıcı kayıt backend sprintinde eklenecek).", data);
  }
}

if (guncelleModu) {
  const id = new URLSearchParams(location.search).get("id");
  etkinlik = events.find((e) => e.id === id);
}

if (guncelleModu && !etkinlik) {
  showMissingEvent();
} else {
  if (guncelleModu) fillForm(etkinlik);
  form.addEventListener("submit", handleSubmit);
}
