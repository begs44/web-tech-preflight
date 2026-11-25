// Örnek veri: npm run seed ile veritabanına girer. id alanı yok, MongoDB _id verir.
// Tarihler "GG-AA-YYYY"; ilk ikisi geçmişte, /events/upcoming listesinde görünmez.
export const seedEvents = [
  {
    title: "Yazılımda Yapay Zekâ Dönemi Semineri",
    category: "Seminer",
    capacity: 80,
    date: "18-11-2026",
    time: "13:30",
    location: "E8 Konferans Salonu",
    description:
      "Yapay zekâ araçlarıyla küçük programların nasıl yazılıp test edildiğini canlı örneklerle gösteren seminer.",
  },
  {
    title: "Sıfırdan React Uygulama Atölyesi",
    category: "Atölye",
    capacity: 25,
    date: "21-11-2026",
    time: "10:00",
    location: "Bilgisayar Laboratuvarı 3",
    description:
      "Bileşen, props ve state kavramlarını adım adım uygulayarak basit bir yapılacaklar listesi yapıyoruz.",
  },
  {
    title: "Siber Dünyada Güvende Kalmak Söyleşisi",
    category: "Söyleşi",
    capacity: 60,
    date: "25-11-2026",
    time: "14:00",
    location: "E8 Konferans Salonu",
    description:
      "Güvenlik uzmanıyla parola, oltalama ve veri sızıntıları üzerine günlük hayattan örnekler konuşuyoruz.",
  },
  {
    title: "SQL ile Veri Sorgulama Atölyesi",
    category: "Atölye",
    capacity: 30,
    date: "02-12-2026",
    time: "15:00",
    location: "Bilgisayar Laboratuvarı 1",
    description:
      "Tablo, kayıt ve sorgu kavramlarını örnek bir etkinlik veritabanı üzerinde uygulamalı olarak öğreniyoruz.",
  },
  {
    title: "Bahar Şenliği Planlama Buluşması",
    category: "Sosyal",
    capacity: 120,
    date: "05-12-2026",
    time: "17:00",
    location: "Öğrenci Kulübü Salonu",
    description:
      "Şenliğin standları, konser programı ve gönüllü görevleri için öğrenci kulüpleri bir araya geliyor.",
  },
  {
    title: "Mezunlarla Kahve ve Kariyer Sohbeti",
    category: "Sosyal",
    capacity: 40,
    date: "10-12-2026",
    time: "16:30",
    location: "Cam Kafe",
    description:
      "Farklı sektörlerde çalışan mezunlarla rahat bir ortamda staj ve iş hayatı hakkında sohbet ediyoruz.",
  },
];
