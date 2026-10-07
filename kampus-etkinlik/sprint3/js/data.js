export const events = [
  {
    id: "event-1",
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    date: "12-10-2026",
    time: "14:00",
    location: "A Blok Konferans Salonu",
    description: "Üniversitemizin kariyer merkezi tarafından düzenlenen bu etkinlikte, çeşitli sektörlerden şirket temsilcileri öğrencilerle bir araya gelerek staj ve iş imkânları hakkında bilgi verecek.",
    capacity: 120,
    poster: "afis.svg",
  },
  {
    id: "event-2",
    title: "Robotik Atölyesi",
    category: "Atölye",
    date: "20-10-2026",
    time: "10:00",
    location: "Lab 2",
    description: "Temel robotik ve devre tasarımı üzerine uygulamalı çalışma. Katılımcılar küçük gruplar halinde basit devreler kurup temel sensörlerle çalışacak.",
    capacity: 40,
  },
  {
    id: "event-3",
    title: "Siber Güvenlik Söyleşisi",
    category: "Söyleşi",
    date: "27-10-2026",
    time: "15:00",
    location: "B Blok Amfisi",
    description: "Sektör uzmanlarıyla günlük hayatta karşılaşılan siber tehditler, veri gizliliği ve güvenli internet kullanımı üzerine söyleşi.",
    capacity: 80,
  },
  {
    id: "event-4",
    title: "Yapay Zekâ Semineri",
    category: "Seminer",
    date: "03-11-2026",
    time: "13:30",
    location: "Mühendislik Fakültesi Amfisi",
    description: "Yapay zekânın günlük hayattaki uygulamaları, güncel gelişmeler ve mühendislik alanındaki fırsatlar üzerine bir seminer.",
    capacity: 150,
  },
  {
    id: "event-5",
    title: "Bahar Şenliği Konseri",
    category: "Sosyal",
    date: "05-11-2026",
    time: "19:00",
    location: "Açık Hava Sahnesi",
    description: "Kampüs müzik topluluklarının sahne aldığı açık hava konseri. Yerel gruplar ve öğrenci toplulukları performans sergileyecek.",
    capacity: 500,
  },
  {
    id: "event-6",
    title: "Web Tasarım Atölyesi",
    category: "Atölye",
    date: "17-11-2026",
    time: "10:00",
    location: "Lab 3",
    description: "HTML, CSS ve JavaScript ile ilk web sayfanızı adım adım oluşturduğumuz, başlangıç düzeyinde uygulamalı çalışma.",
    capacity: 30,
  },
];

// Tarihler GG-AA-YYYY tutuluyor; metin olarak sıralanırsa gün ay'dan önce karşılaştırılır, bu yüzden hep Date'e çevrilir.
export function toIsoDate(date) {
  const [day, month, year] = date.split("-");
  return `${year}-${month}-${day}`;
}

export function fromIsoDate(isoDate) {
  const [year, month, day] = isoDate.split("-");
  return `${day}-${month}-${year}`;
}

export function parseDate(date) {
  return new Date(`${toIsoDate(date)}T00:00:00`);
}

export function formatDate(date) {
  return parseDate(date).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function compareByDate(a, b) {
  return parseDate(a.date) - parseDate(b.date) || a.time.localeCompare(b.time);
}

export function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}
