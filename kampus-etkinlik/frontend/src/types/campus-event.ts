export type Category = "Seminer" | "Atölye" | "Söyleşi" | "Sosyal";

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
