export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  addedAt?: string; // Opcional, para ordenação futura se quiser
}