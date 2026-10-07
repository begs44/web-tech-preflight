import { events, formatDate, toIsoDate, escapeHtml } from "./data.js";

const container = document.querySelector("#detay");
const id = new URLSearchParams(location.search).get("id");
const event = events.find((e) => e.id === id);

if (!event) {
  document.title = "Etkinlik bulunamadı · Kampüs Etkinlikleri";
  container.classList.remove("detay--afisli");
  container.innerHTML = `<h1>Etkinlik bulunamadı</h1>
    <div class="hata-kutusu" role="alert">
      <p>Adresteki etkinlik numarası geçersiz ya da eksik.</p>
    </div>
    <p><a href="etkinlikler.html">← Listeye dön</a></p>`;
} else {
  const tarihMetni = `${formatDate(event.date)}, ${event.time}`;
  const afis = event.poster
    ? `<figure>
        <img src="${escapeHtml(event.poster)}" alt="${escapeHtml(event.title)} etkinlik afişi">
        <figcaption>Şekil: ${escapeHtml(event.title)} afişi</figcaption>
      </figure>`
    : "";

  document.title = `${event.title} · Kampüs Etkinlikleri`;
  container.classList.toggle("detay--afisli", Boolean(event.poster));
  container.innerHTML = `<h1>${escapeHtml(event.title)}</h1>
    <time datetime="${toIsoDate(event.date)}T${event.time}">${tarihMetni}</time>
    ${afis}
    <dl>
      <dt>Tarih</dt>
      <dd>${tarihMetni}</dd>
      <dt>Yer</dt>
      <dd>${escapeHtml(event.location)}</dd>
      <dt>Kategori</dt>
      <dd>${escapeHtml(event.category)}</dd>
      <dt>Kontenjan</dt>
      <dd>${event.capacity ? `${event.capacity} kişi` : "Belirtilmedi"}</dd>
    </dl>
    <p>${escapeHtml(event.description)}</p>
    <p class="detay-linkler">
      <a href="etkinlikler.html">← Listeye dön</a>
      <a class="buton" href="etkinlik-guncelle.html?id=${encodeURIComponent(event.id)}">Bu etkinliği güncelle</a>
    </p>`;
}
