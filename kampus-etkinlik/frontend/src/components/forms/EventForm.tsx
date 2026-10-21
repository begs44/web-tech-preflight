import type { FormEvent } from "react";
import type { Category } from "../../types/campus-event";

interface EventFormProps {
  categories: Category[];
  submitLabel?: string;
  onSubmit: () => void;
}

function EventForm({
  categories,
  submitLabel = "Kaydet",
  onSubmit,
}: EventFormProps) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <>
      <p className="ipucu">
        Form şimdilik sadece görünümden ibaret; kaydetme ve güncelleme sonraki
        sprintlerde eklenecek.
      </p>
      <form className="form" onSubmit={handleSubmit}>
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
          <button type="submit">{submitLabel}</button>
        </p>
      </form>
    </>
  );
}

export default EventForm;
