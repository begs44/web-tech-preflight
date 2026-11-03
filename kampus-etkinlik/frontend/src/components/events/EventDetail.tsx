import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
}

function EventDetail({ event }: EventDetailProps) {
  return (
    <article className={event.image ? "detay detay--afisli" : "detay"}>
      {event.image && (
        <figure>
          <img src={event.image} alt={`${event.title} etkinlik afişi`} />
          <figcaption>Şekil: {event.title} afişi</figcaption>
        </figure>
      )}
      <section className="kunye">
        <h3>Etkinlik Künyesi</h3>
        <dl>
          <dt>Tarih</dt>
          <dd>
            {formatDate(event.date)}, {event.time}
          </dd>
          <dt>Yer</dt>
          <dd>{event.location}</dd>
          <dt>Kategori</dt>
          <dd>{event.category}</dd>
          <dt>Kontenjan</dt>
          <dd>{event.capacity} kişi</dd>
        </dl>
      </section>
      <section className="aciklama">
        <h3>Açıklama</h3>
        <p>{event.description}</p>
      </section>
      <p className="detay-linkler">
        <Link to="/events">← Listeye dön</Link>
        <Link className="buton" to={`/admin/${event.id}/edit`}>
          Bu etkinliği güncelle
        </Link>
      </p>
    </article>
  );
}

export default EventDetail;
