import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EventForm from "../components/forms/EventForm";
import { useEvents } from "../context/EventsContext";
import type { EventFormData } from "../types/campus-event";
import { findEventById } from "../utils/filter-events";
import NotFoundPage from "./NotFoundPage";

function EditEventPage() {
  const { id } = useParams();
  const { events, updateEvent } = useEvents();
  const navigate = useNavigate();
  const event = findEventById(events, id ?? "");

  useEffect(() => {
    document.title = "Kampüs Etkinlikleri — Etkinlik Güncelle";
  }, []);

  if (!event) return <NotFoundPage />;

  // Formdaki alanlar metin olduğu için kontenjanı metne çeviriyoruz.
  const initialData: EventFormData = {
    title: event.title,
    category: event.category,
    date: event.date,
    time: event.time,
    location: event.location,
    capacity: String(event.capacity),
    description: event.description,
  };

  return (
    <>
      <h2 className="bolum-baslik">Etkinlik Güncelle</h2>
      <EventForm
        initialData={initialData}
        submitText="Güncelle"
        onSubmit={(data) => {
          updateEvent(event.id, data);
          navigate("/admin");
        }}
      />
    </>
  );
}

export default EditEventPage;
