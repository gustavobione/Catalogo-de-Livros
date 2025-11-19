// Entidade Principal
export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  addedAt?: string;
}

// --- Props dos Componentes ---

export interface BookStatsProps {
  total: number;
  filtered: number;
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