import { events, formatDate, toIsoDate, compareByDate, escapeHtml } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");

// Ana sayfada kartlar "Yaklaşan etkinlikler" (h2) başlığının altında, liste sayfasında sayfa başlığının (h1) altında durur.
const headingTag = list.dataset.limit ? "h3" : "h2";

function createCard(event) {
  return `<article class="kart">
    <${headingTag}>${escapeHtml(event.title)}</${headingTag}>
    <p>Kategori: ${escapeHtml(event.category)}</p>
    <time datetime="${toIsoDate(event.date)}">${formatDate(event.date)}</time>
    <p>Yer: ${escapeHtml(event.location)}</p>
    <p>${escapeHtml(event.description)}</p>
    <p><a href="etkinlik-detay.html?id=${encodeURIComponent(event.id)}">Detayları gör →</a></p>
  </article>`;
}

function render(dizi) {
  list.innerHTML = dizi.map(createCard).join("");
}

function renderProgram() {
  const govde = document.querySelector("#program-govdesi");
  if (!govde) return;
  govde.innerHTML = [...events]
    .sort(compareByDate)
    .map(
      (event) => `<tr>
        <td>${formatDate(event.date)}</td>
        <td>${escapeHtml(event.title)}</td>
        <td>${escapeHtml(event.location)}</td>
      </tr>`
    )
    .join("");
}

function setupFilter() {
  const form = document.querySelector("#filtre-formu");
  const arama = document.querySelector("#arama");
  const kategoriSecim = document.querySelector("#kategori-filtre");
  const sonucSatiri = document.querySelector("#sonuc");

  const kategoriler = [...new Set(events.map((event) => event.category))].sort((a, b) =>
    a.localeCompare(b, "tr-TR")
  );
  kategoriler.forEach((kategori) => kategoriSecim.append(new Option(kategori, kategori)));

  function metinUyuyor(event, aranan) {
    const metin = [event.title, event.category, event.location, event.description]
      .join(" ")
      .toLocaleLowerCase("tr-TR");
    return metin.includes(aranan);
  }

  function filtrele() {
    const aranan = arama.value.trim().toLocaleLowerCase("tr-TR");
    const kategori = kategoriSecim.value;
    const sonuc = events.filter(
      (event) => metinUyuyor(event, aranan) && (kategori === "" || event.category === kategori)
    );
    render(sonuc);
    sonucSatiri.textContent =
      sonuc.length === 0
        ? "Aramanıza uygun etkinlik bulunamadı."
        : `${sonuc.length} etkinlik listeleniyor.`;
  }

  arama.addEventListener("input", filtrele);
  kategoriSecim.addEventListener("change", filtrele);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    filtrele();
  });

  filtrele();
}

if (list.dataset.limit) {
  const yaklasan = [...events].sort(compareByDate).slice(0, Number(list.dataset.limit));
  render(yaklasan);
} else {
  renderProgram();
  if (document.querySelector("#filtre-formu")) {
    setupFilter();
  } else {
    render(events);
  }
}
