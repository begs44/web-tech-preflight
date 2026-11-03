import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { CATEGORIES } from "../../types/campus-event";
import type { EventFormData, EventFormErrors } from "../../types/campus-event";
import { validateEvent } from "../../utils/validate-event";

interface EventFormProps {
  initialData?: EventFormData;
  submitText: string;
  onSubmit: (data: EventFormData) => void;
}

const emptyForm: EventFormData = {
  title: "",
  category: "",
  date: "",
  time: "",
  location: "",
  capacity: "",
  description: "",
};

function EventForm({
  initialData = emptyForm,
  submitText,
  onSubmit,
}: EventFormProps) {
  const [data, setData] = useState<EventFormData>(initialData);
  const [errors, setErrors] = useState<EventFormErrors>({});

  // Tüm alanlar tek fonksiyonla güncellenir: hangi alan olduğunu name özelliğinden anlarız.
  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    // Kullanıcı düzeltmeye başlayınca o alanın hatasını sil.
    if (errors[name as keyof EventFormData]) {
      setErrors({ ...errors, [name]: undefined });
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateEvent(data);
    setErrors(found);
    if (Object.keys(found).length === 0) onSubmit(data);
  }

  function field(name: keyof EventFormData) {
    return {
      id: name,
      name,
      value: data[name],
      onChange: handleChange,
      "aria-invalid": errors[name] ? true : undefined,
      "aria-describedby": errors[name] ? `${name}-hata` : undefined,
    };
  }

  function error(name: keyof EventFormData) {
    return errors[name] ? (
      <span className="hata" id={`${name}-hata`} role="alert">
        {errors[name]}
      </span>
    ) : null;
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="alan">
        <label htmlFor="title">Etkinlik Adı</label>
        <input type="text" maxLength={80} autoComplete="off" {...field("title")} />
        {error("title")}
      </div>
      <div className="alan">
        <label htmlFor="category">Kategori</label>
        <select {...field("category")}>
          <option value="">Seçiniz</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {error("category")}
      </div>
      <div className="alan">
        <label htmlFor="date">Tarih</label>
        <input type="date" {...field("date")} />
        {error("date")}
      </div>
      <div className="alan">
        <label htmlFor="time">Saat</label>
        <input type="time" {...field("time")} />
        {error("time")}
      </div>
      <div className="alan">
        <label htmlFor="location">Yer</label>
        <input type="text" autoComplete="off" {...field("location")} />
        {error("location")}
      </div>
      <div className="alan">
        <label htmlFor="capacity">Kontenjan</label>
        <input type="number" inputMode="numeric" {...field("capacity")} />
        {error("capacity")}
      </div>
      <div className="alan">
        <label htmlFor="description">Açıklama</label>
        <textarea rows={5} {...field("description")} />
        {error("description")}
      </div>
      <p>
        <button type="submit">{submitText}</button>
      </p>
    </form>
  );
}

export default EventForm;
