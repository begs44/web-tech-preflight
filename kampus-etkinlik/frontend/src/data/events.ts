import type { CampusEvent } from "../types/campus-event";

export const events: CampusEvent[] = [
  {
    id: "event-1",
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    capacity: 120,
    date: "2026-10-12",
    time: "14:00",
    location: "A Blok Konferans Salonu",
    description:
      "Üniversitemizin kariyer merkezi tarafından düzenlenen bu etkinlikte, çeşitli sektörlerden şirket temsilcileri öğrencilerle bir araya gelerek staj ve iş imkânları hakkında bilgi verecek.",
    image: "/afis.svg",
  },
  {
    id: "event-2",
    title: "Robotik Atölyesi",
    category: "Atölye",
    capacity: 40,
    date: "2026-10-20",
    time: "10:00",
    location: "Lab 2",
    description:
      "Temel robotik ve devre tasarımı üzerine uygulamalı çalışma. Katılımcılar küçük gruplar halinde basit devreler kurup temel sensörlerle çalışacak.",
  },
  {
    id: "event-3",
    title: "Siber Güvenlik Söyleşisi",
    category: "Söyleşi",
    capacity: 80,
    date: "2026-10-27",
    time: "15:00",
    location: "B Blok Amfisi",
    description:
      "Sektör uzmanlarıyla günlük hayatta karşılaşılan siber tehditler, veri gizliliği ve güvenli internet kullanımı üzerine söyleşi.",
  },
  {
    id: "event-4",
    title: "Yapay Zekâ Semineri",
    category: "Seminer",
    capacity: 150,
    date: "2026-11-03",
    time: "13:30",
    location: "Mühendislik Fakültesi Amfisi",
    description:
      "Yapay zekânın günlük hayattaki uygulamaları, güncel gelişmeler ve mühendislik alanındaki fırsatlar üzerine bir seminer.",
  },
  {
    id: "event-5",
    title: "Bahar Şenliği Konseri",
    category: "Sosyal",
    capacity: 500,
    date: "2026-11-05",
    time: "19:00",
    location: "Açık Hava Sahnesi",
    description:
      "Kampüs müzik topluluklarının sahne aldığı açık hava konseri. Yerel gruplar ve öğrenci toplulukları performans sergileyecek.",
  },
  {
    id: "event-6",
    title: "Web Tasarım Atölyesi",
    category: "Atölye",
    capacity: 30,
    date: "2026-11-17",
    time: "10:00",
    location: "Lab 3",
    description:
      "HTML, CSS ve JavaScript ile ilk web sayfanızı adım adım oluşturduğumuz, başlangıç düzeyinde uygulamalı çalışma.",
  },
];
