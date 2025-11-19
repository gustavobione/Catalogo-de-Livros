import type { Book } from "@/types/types";
import { Skeleton } from "@/components/ui/skeleton";
import { DeleteBookDialog } from "@/components/DeleteBookDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookX } from "lucide-react";

interface BookListProps {
  books: Book[];
  loading: boolean;
  onRemove: (id: string) => void;
}

export function BookList({ books, loading, onRemove }: BookListProps) {

  // Estado de Carregamento (Skeleton)
  if (loading) {
    return (
      <div className="rounded-md border bg-card p-4 space-y-3">
        <div className="flex justify-between mb-4">
            <Skeleton className="h-6 w-[100px]" />
            <Skeleton className="h-6 w-[100px]" />
            <Skeleton className="h-6 w-[50px]" />
        </div>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  // Estado Vazio
  if (books.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg border-dashed">
        <BookX className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
        <h3 className="text-lg font-medium">Nenhum livro encontrado</h3>
        <p className="text-sm text-muted-foreground">
          Tente ajustar sua busca ou adicione um novo livro.
        </p>
      </div>
    );
  }

  // Lista (Tabela)
  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50%]">Título</TableHead>
            <TableHead>Autor</TableHead>
            <TableHead className="text-right">Ano</TableHead>
            <TableHead className="w-[100px] text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell className="font-medium">{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell className="text-right">{book.year}</TableCell>
              <TableCell className="text-right">
                <DeleteBookDialog 
                    bookTitle={book.title}
                    onConfirm={() => onRemove(book.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}