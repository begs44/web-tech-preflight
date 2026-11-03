import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventForm from "../components/forms/EventForm";
import { useEvents } from "../context/EventsContext";

function AddEventPage() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Kampüs Etkinlikleri — Etkinlik Ekle";
  }, []);

  return (
    <EventForm
      submitText="Kaydet"
      onSubmit={(data) => {
        addEvent(data);
        navigate("/admin");
      }}
    />
  );
}

export default AddEventPage;
