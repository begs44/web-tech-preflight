import "./App.css";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { events } from "./data/events";
import type { CampusEvent, Category } from "./types/campus-event";
import {
  filterByCategory,
  findEventById,
  searchEvents,
} from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

const menuItems: { page: PageName; label: string }[] = [
  { page: "home", label: "Ana Sayfa" },
  { page: "events", label: "Etkinlikler" },
  { page: "add", label: "Ekle" },
];

const pageTitles: Record<PageName, string> = {
  home: "Ana Sayfa",
  events: "Tüm Etkinlikler",
  detail: "Etkinlik Detayı",
  add: "Etkinlik Ekle",
  update: "Etkinlik Güncelle",
};

const categories = [...new Set(events.map((e) => e.category))];

// date YYYY-MM-DD, time SS:DD olduğu için metin olarak sıralamak tarih sırasını verir.
const sortedByDate = [...events].sort((a, b) =>
  `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`),
);
const upcoming = sortedByDate.slice(0, 2);

const formatDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
    window.scrollTo(0, 0);
  }

  const link = (next: PageName, id: string | null = null) => (e: MouseEvent) => {
    e.preventDefault();
    go(next, id);
  };

  const filtered = filterByCategory(searchEvents(events, searchText), category);
  const selected = selectedId ? findEventById(events, selectedId) : undefined;
  const title =
    page === "detail"
      ? (selected?.title ?? "Etkinlik bulunamadı")
      : pageTitles[page];

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h3>{event.title}</h3>
        <p>
          <span className="etiket">{event.category}</span>
        </p>
        <time dateTime={event.date}>{formatDate(event.date)}</time>
        <p>Yer: {event.location}</p>
        <p>Kontenjan: {event.capacity} kişi</p>
        <p>{event.description}</p>
        <p>
          <a href="#" onClick={link("detail", event.id)}>
            Detayları gör →
          </a>
        </p>
      </article>
    );
  }

  return (
    <>
      <header className="site-baslik">
        <p>Kampüs Etkinlikleri</p>
        <nav className="menu">
          {menuItems.map((item) => (
            <a
              key={item.page}
              href="#"
              aria-current={page === item.page ? "page" : undefined}
              onClick={link(item.page)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {page === "home" && (
          <>
            <h1>Kampüs Etkinlikleri</h1>
            <p className="alt-yazi">
              Fakültedeki seminer, atölye, söyleşi ve sosyal etkinlikleri tek
              yerden takip edin.
            </p>
            <h2>Yaklaşan 2 etkinlik</h2>
            <section className="etkinlik-listesi">
              {upcoming.map(renderCard)}
            </section>
            <p>
              <a className="buton" href="#" onClick={link("events")}>
                Tüm etkinlikleri gör →
              </a>
            </p>
          </>
        )}

        {page === "events" && (
          <>
            <h1>Tüm Etkinlikler</h1>
            <p className="alt-yazi">
              Kampüste düzenlenecek tüm etkinlikler; arayın ya da kategoriye
              göre süzün.
            </p>
            <form className="filtre" onSubmit={(e) => e.preventDefault()}>
              <div className="alan">
                <label htmlFor="arama">Etkinlik ara</label>
                <input
                  type="search"
                  id="arama"
                  placeholder="atölye, kariyer..."
                  autoComplete="off"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div className="alan">
                <label htmlFor="kategori-filtre">Kategori</label>
                <select
                  id="kategori-filtre"
                  value={category}
                  onChange={(e) =>
                    setCategory(
                      categories.find((c) => c === e.target.value) ?? "",
                    )
                  }
                >
                  <option value="">Tümü</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </form>
            <p className="sonuc" role="status">
              {filtered.length === 0
                ? "Aramanıza uygun etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>
            <h2 className="sr-only">Etkinlik listesi</h2>
            <section className="etkinlik-listesi">
              {filtered.map(renderCard)}
            </section>

            <h2>Ayın Programı</h2>
            <div className="tablo-sarici">
              <table>
                <caption>Ayın Programı</caption>
                <thead>
                  <tr>
                    <th scope="col">Tarih</th>
                    <th scope="col">Etkinlik</th>
                    <th scope="col">Yer</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedByDate.map((event) => (
                    <tr key={event.id}>
                      <td>{formatDate(event.date)}</td>
                      <td>{event.title}</td>
                      <td>{event.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {page === "detail" && !selected && (
          <>
            <h1>Etkinlik bulunamadı</h1>
            <div className="hata-kutusu" role="alert">
              <p>Seçilen etkinlik bulunamadı.</p>
            </div>
            <p>
              <a href="#" onClick={link("events")}>
                ← Listeye dön
              </a>
            </p>
          </>
        )}

        {page === "detail" && selected && (
          <article
            className={selected.image ? "detay detay--afisli" : "detay"}
          >
            <h1>{selected.title}</h1>
            <time dateTime={`${selected.date}T${selected.time}`}>
              {formatDate(selected.date)}, {selected.time}
            </time>
            {selected.image && (
              <figure>
                <img
                  src={selected.image}
                  alt={`${selected.title} etkinlik afişi`}
                />
                <figcaption>Şekil: {selected.title} afişi</figcaption>
              </figure>
            )}
            <dl>
              <dt>Tarih</dt>
              <dd>
                {formatDate(selected.date)}, {selected.time}
              </dd>
              <dt>Yer</dt>
              <dd>{selected.location}</dd>
              <dt>Kategori</dt>
              <dd>{selected.category}</dd>
              <dt>Kontenjan</dt>
              <dd>{selected.capacity} kişi</dd>
            </dl>
            <p>{selected.description}</p>
            <p className="detay-linkler">
              <a href="#" onClick={link("events")}>
                ← Listeye dön
              </a>
              <a
                className="buton"
                href="#"
                onClick={link("update", selected.id)}
              >
                Bu etkinliği güncelle
              </a>
            </p>
          </article>
        )}

        {(page === "add" || page === "update") && (
          <>
            <h1>{page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}</h1>
            {page === "update" && selected && (
              <p className="ipucu">
                Seçili etkinlik: <strong>{selected.title}</strong>
              </p>
            )}
            <form className="form" onSubmit={(e) => e.preventDefault()}>
              <div className="alan">
                <label htmlFor="title">Etkinlik Adı</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  maxLength={80}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="alan">
                <label htmlFor="category">Kategori</label>
                <select id="category" name="category" required>
                  <option value="">Seçiniz</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="alan">
                <label htmlFor="date">Tarih</label>
                <input type="date" id="date" name="date" required />
              </div>
              <div className="alan">
                <label htmlFor="time">Saat</label>
                <input type="time" id="time" name="time" required />
              </div>
              <div className="alan">
                <label htmlFor="location">Yer</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  autoComplete="off"
                  required
                />
              </div>
              <div className="alan">
                <label htmlFor="capacity">Kontenjan</label>
                <input
                  type="number"
                  id="capacity"
                  name="capacity"
                  min={1}
                  max={1000}
                  step={1}
                  inputMode="numeric"
                  required
                />
              </div>
              <div className="alan">
                <label htmlFor="description">Açıklama</label>
                <textarea id="description" name="description" rows={5} />
              </div>
              <p>
                <button type="submit">
                  {page === "add" ? "Kaydet" : "Güncelle"}
                </button>
              </p>
            </form>
            <p className="ipucu">
              Form şimdilik sadece görünümden ibaret; kaydetme ve güncelleme
              sonraki sprintlerde eklenecek.
            </p>
          </>
        )}
      </main>

      <footer>
        <p>Bengüsu İlhan · 2416501083 · 2026</p>
      </footer>
    </>
  );
}

export default App;
