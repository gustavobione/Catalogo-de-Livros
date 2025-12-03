import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { BookX, ArrowUpDown, ArrowUp, ArrowDown, Eye } from "lucide-react";
import { DeleteBookDialog } from "./DeleteBookDialog";
import type { BookListProps, SortConfig } from "@/types/types";
import { Link } from "react-router-dom";

export function BookList({ books, loading, onRemove }: BookListProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  const handleSort = (key: string) => {
    const validKey = key as keyof Omit<import("@/types/types").Book, "id">;
    setSortConfig((current) => {
      if (current?.key === validKey) {
        if (current.direction === "asc") {
          return { key: validKey, direction: "desc" };
        }
        return null;
      }
      return { key: validKey, direction: "asc" };
    });
  };

  // Lógica de ordenação
  const sortedBooks = [...books].sort((a, b) => {
    if (!sortConfig) return 0;

    const valueA = a[sortConfig.key];
    const valueB = b[sortConfig.key];

    if (valueA === undefined && valueB === undefined) return 0;
    if (valueA === undefined) return 1;
    if (valueB === undefined) return -1;

    if (valueA < valueB) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const getSortIcon = (columnKey: string) => {
    if (sortConfig?.key !== columnKey) {
      return <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground/50" />;
    }
    return sortConfig.direction === "asc" ? (
      <ArrowUp className="ml-2 h-4 w-4 text-primary" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4 text-primary" />
    );
  };

  if (loading) {
    return (
      <div className="rounded-md border bg-card/80 backdrop-blur-sm p-4 space-y-4">
        <div className="flex justify-between items-center mb-4 px-2">
          <Skeleton className="h-6 w-[150px]" />
          <Skeleton className="h-6 w-[100px]" />
          <Skeleton className="h-6 w-[50px]" />
        </div>
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-14 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 border rounded-lg border-dashed bg-card/60 backdrop-blur-md">
        <div className="p-4 bg-background/50 rounded-full mb-4">
          <BookX className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-1">Nenhum livro encontrado</h3>
        <p className="text-sm text-muted-foreground max-w-sm text-center">
          Sua busca não retornou resultados ou sua biblioteca está vazia.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border bg-card/90 backdrop-blur-sm shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="pl-4 w-[45%]">
              <Button
                variant="ghost"
                onClick={() => handleSort("title")}
                className="-ml-4 hover:bg-transparent hover:text-primary font-semibold"
              >
                Título
                {getSortIcon("title")}
              </Button>
            </TableHead>
            <TableHead className="w-[30%]">
              <Button
                variant="ghost"
                onClick={() => handleSort("author")}
                className="-ml-4 hover:bg-transparent hover:text-primary font-semibold"
              >
                Autor
                {getSortIcon("author")}
              </Button>
            </TableHead>
            <TableHead className="text-center">
              <Button
                variant="ghost"
                onClick={() => handleSort("year")}
                className="-ml-4 hover:bg-transparent hover:text-primary font-semibold ml-auto"
              >
                Ano
                {getSortIcon("year")}
              </Button>
            </TableHead>
            <TableHead className="pr-4 w-[80px] text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedBooks.map((book) => (
            <TableRow key={book.id} className="hover:bg-muted/50 transition-colors">
              <TableCell className="pl-4 font-medium py-3">
                {book.title}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {book.author}
              </TableCell>
              <TableCell className="text-center font-mono">
                {book.year}
              </TableCell>
              <TableCell className="pr-4 text-right">
                <Link
                  to={`/catalogo/${book.id}`}
                  className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-muted text-muted-foreground hover:text-primary transition-colors"
                  title="Ver detalhes"
                >
                  <Eye className="h-4 w-4" />
                </Link>
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