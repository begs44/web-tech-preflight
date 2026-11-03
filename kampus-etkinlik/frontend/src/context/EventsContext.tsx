import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { events as initialEvents } from "../data/events";
import type {
  CampusEvent,
  Category,
  EventFormData,
} from "../types/campus-event";

interface EventsContextValue {
  events: CampusEvent[];
  addEvent: (data: EventFormData) => void;
  updateEvent: (id: string, data: EventFormData) => void;
  deleteEvent: (id: string) => void;
}

const EventsContext = createContext<EventsContextValue | null>(null);

// Form verisini CampusEvent'e çevirir. Doğrulamadan geçtiği için kategori boş olamaz.
function toEvent(id: string, data: EventFormData): CampusEvent {
  return {
    id,
    title: data.title.trim(),
    category: data.category as Category,
    date: data.date,
    time: data.time,
    location: data.location.trim(),
    capacity: Number(data.capacity),
    description: data.description.trim(),
  };
}

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);

  // Diziyi değiştirmek (push, splice) yerine her seferinde yenisini kuruyoruz; yoksa React farkı görmez.
  function addEvent(data: EventFormData) {
    setEvents([...events, toEvent(`event-${Date.now()}`, data)]);
  }

  function updateEvent(id: string, data: EventFormData) {
    setEvents(
      events.map((e) => (e.id === id ? { ...e, ...toEvent(id, data) } : e)),
    );
  }

  function deleteEvent(id: string) {
    setEvents(events.filter((e) => e.id !== id));
  }

  return (
    <EventsContext.Provider
      value={{ events, addEvent, updateEvent, deleteEvent }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const value = useContext(EventsContext);
  if (value === null) {
    throw new Error("useEvents, EventsProvider içinde kullanılmalı.");
  }
  return value;
}
