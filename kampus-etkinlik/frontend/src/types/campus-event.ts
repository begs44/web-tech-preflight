export const CATEGORIES = ["Seminer", "Atölye", "Söyleşi", "Sosyal"] as const;

export type Category = (typeof CATEGORIES)[number];

export interface CampusEvent {
  id: string;
  title: string;
  category: Category;
  capacity: number;
  /** YYYY-MM-DD */
  date: string;
  /** SS:DD */
  time: string;
  location: string;
  description: string;
  /** public/ içindeki afiş yolu, örn. "/afis.svg" */
  image?: string;
}

// Form verisi: CampusEvent gibi ama id yok. Input'lar hep metin verdiği için capacity string, kategori seçilmemişse "".
export interface EventFormData {
  title: string;
  category: Category | "";
  date: string;
  time: string;
  location: string;
  capacity: string;
  description: string;
}

export type EventFormErrors = Partial<Record<keyof EventFormData, string>>;
