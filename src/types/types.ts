// Entidade Principal
export type BookStatus = 'ler_depois' | 'lendo' | 'lido';

export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  genres?: string[];
  cover?: string;
  rating?: number;
  status?: BookStatus;
  notes?: string;
  isFavorite?: boolean;
  addedAt?: string;
}

// --- Props dos Componentes ---

export interface BookStatsProps {
  total: number;
  filtered: number;
  favorites: number;
}

export interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

export interface BookFormProps {
  onAdd: (book: Omit<Book, "id">) => void;
  existingBooks: Book[];
}

export interface BookListProps {
  books: Book[];
  loading: boolean;
  onRemove: (id: string) => void;
}

export interface DeleteBookDialogProps {
  bookTitle: string;
  onConfirm: () => void;
}

// --- Tipos Auxiliares ---

export type SortConfig = {
  key: keyof Omit<Book, "id">;
  direction: "asc" | "desc";
} | null;