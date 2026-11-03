import { useEffect } from "react";
import { useParams } from "react-router-dom";
import EventDetail from "../components/events/EventDetail";
import { useEvents } from "../context/EventsContext";
import { findEventById } from "../utils/filter-events";
import NotFoundPage from "./NotFoundPage";

function EventDetailPage() {
  // useParams'ın tipi string | undefined; undefined gelirse boş metin kullanıyoruz.
  const { id } = useParams();
  const { events } = useEvents();
  const event = findEventById(events, id ?? "");

  useEffect(() => {
    if (event) document.title = `Kampüs Etkinlikleri — ${event.title}`;
  }, [event]);

  if (!event) return <NotFoundPage />;

  return <EventDetail event={event} />;
}

export default EventDetailPage;
