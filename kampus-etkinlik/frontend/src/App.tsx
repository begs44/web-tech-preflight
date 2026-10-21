import "./App.css";
import { useEffect, useState } from "react";
import EventDetail from "./components/events/EventDetail";
import EventFilter from "./components/events/EventFilter";
import EventList from "./components/events/EventList";
import ProgramTable from "./components/events/ProgramTable";
import EventForm from "./components/forms/EventForm";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import { events } from "./data/events";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import {
  filterByCategory,
  findEventById,
  searchEvents,
} from "./utils/filter-events";

const SITE_NAME = "Kampüs Etkinlikleri";

const pages: Record<PageName, { title: string; text?: string }> = {
  home: {
    title: SITE_NAME,
    text: "Fakültedeki seminer, atölye, söyleşi ve sosyal etkinlikleri tek yerden takip edin.",
  },
  events: {
    title: "Tüm Etkinlikler",
    text: "Kampüste düzenlenecek tüm etkinlikler; arayın ya da kategoriye göre süzün.",
  },
  detail: { title: "Etkinlik Detayı" },
  add: { title: "Etkinlik Ekle" },
  update: { title: "Etkinlik Güncelle" },
};

const categories = [...new Set(events.map((e) => e.category))];

// date YYYY-MM-DD, time SS:DD olduğu için metin olarak sıralamak tarih sırasını verir.
const sortedByDate = [...events].sort((a, b) =>
  `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`),
);
const upcoming = sortedByDate.slice(0, 2);

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

  const showDetail = (id: string) => go("detail", id);
  const filtered = filterByCategory(searchEvents(events, searchText), category);
  const selected = selectedId ? findEventById(events, selectedId) : undefined;
  const title =
    page === "detail"
      ? (selected?.title ?? "Etkinlik bulunamadı")
      : pages[page].title;
  const text =
    page === "update" && selected
      ? `Seçili etkinlik: ${selected.title}`
      : pages[page].text;

  useEffect(() => {
    document.title = `${SITE_NAME} — ${page === "home" ? "Ana Sayfa" : title}`;
  }, [page, title]);

  return (
    <>
      <div className="site-ust">
        <Header title={title} text={text} />
        <Navigation current={page} onNavigate={go} />
      </div>

      <main>
        {page === "home" && (
          <>
            <h2>Yaklaşan 2 etkinlik</h2>
            <EventList events={upcoming} onShowDetail={showDetail} />
            <p>
              <a
                className="buton"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  go("events");
                }}
              >
                Tüm etkinlikleri gör →
              </a>
            </p>
          </>
        )}

        {page === "events" && (
          <>
            <EventFilter
              searchText={searchText}
              category={category}
              categories={categories}
              onSearchChange={setSearchText}
              onCategoryChange={setCategory}
            />
            <p className="sonuc" role="status">
              {filtered.length} etkinlik listeleniyor.
            </p>
            <h2 className="sr-only">Etkinlik listesi</h2>
            <EventList
              events={filtered}
              onShowDetail={showDetail}
              emptyText="Aramanıza uygun etkinlik bulunamadı."
            />
            <ProgramTable events={sortedByDate} />
          </>
        )}

        {page === "detail" && selected && (
          <EventDetail
            event={selected}
            onBack={() => go("events")}
            onEdit={(id) => go("update", id)}
          />
        )}

        {page === "detail" && !selected && (
          <div className="hata-kutusu" role="alert">
            <p>Seçilen etkinlik bulunamadı.</p>
            <p>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  go("events");
                }}
              >
                ← Listeye dön
              </a>
            </p>
          </div>
        )}

        {(page === "add" || page === "update") && (
          <EventForm
            categories={categories}
            submitLabel={page === "add" ? "Kaydet" : "Güncelle"}
            onSubmit={() => window.scrollTo(0, 0)}
          />
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
