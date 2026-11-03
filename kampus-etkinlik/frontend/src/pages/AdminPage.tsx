import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import type { CampusEvent } from "../types/campus-event";
import { formatDate } from "../utils/format-date";

function AdminPage() {
  const { events, deleteEvent } = useEvents();

  useEffect(() => {
    document.title = "Kampüs Etkinlikleri — Yönetim";
  }, []);

  function handleDelete(event: CampusEvent) {
    if (window.confirm(`"${event.title}" etkinliği silinsin mi?`)) {
      deleteEvent(event.id);
    }
  }

  return (
    <>
      <p>
        <Link className="buton" to="/admin/add">
          + Yeni etkinlik
        </Link>
      </p>

      {events.length === 0 ? (
        <p className="sonuc">Henüz etkinlik yok.</p>
      ) : (
        <div className="tablo-sarici">
          <table className="tablo">
            <thead>
              <tr>
                <th scope="col">Etkinlik</th>
                <th scope="col">Tarih</th>
                <th scope="col">Kategori</th>
                <th scope="col">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td data-baslik="Etkinlik">{event.title}</td>
                  <td data-baslik="Tarih">{formatDate(event.date)}</td>
                  <td data-baslik="Kategori">{event.category}</td>
                  <td data-baslik="İşlemler">
                    <span className="islemler">
                      <Link className="buton" to={`/admin/${event.id}/edit`}>
                        Düzenle
                      </Link>
                      <button
                        type="button"
                        className="buton-sil"
                        onClick={() => handleDelete(event)}
                      >
                        Sil
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default AdminPage;
