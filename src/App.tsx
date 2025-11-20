import { useState, useEffect, useMemo } from "react";
import type { Book } from "@/types/types";
import { Header } from "@/components/Header";
import { BookStats } from "@/components/BookStats";
import { SearchBar } from "@/components/SearchBar";
import { BookForm } from "@/components/BookForm";
import { BookList } from "@/components/BookList";
import { useTheme } from "@/context/ThemeContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Toaster, toast } from "sonner";

function App() {
  const [books, setBooks] = useLocalStorage<Book[]>("my-library-books", []);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const { theme } = useTheme();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Se já temos livros salvos, não precisamos carregar o mock inicial.
      if (books.length > 0) {
        setLoading(false);
        return; 
      }
      // Caso contrário (primeira visita ou lista vazia), carregamos o mock inicial.
      try {
        const res = await fetch("/books.json");
        if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);
        
        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("Formato de dados inválido (esperado uma lista)");
        }

        setTimeout(() => {
          setBooks(data);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
        setLoading(false);
        toast.error("Erro de conexão", {
          description: "Não foi possível carregar a lista inicial de livros.",
        });
      }
    };
    
    loadData();
  }, []);

  const handleAddBook = (newBook: Omit<Book, "id">) => {
    const bookWithId = { ...newBook, id: crypto.randomUUID() };
    setBooks((prev) => [bookWithId, ...prev]);
  };

  const handleRemoveBook = (id: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
    toast.error("Livro removido", {
      description: "O item foi excluído da lista.",
      duration: 3000,
    });
  };

  const filteredBooks = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(lowerSearch) ||
        book.author.toLowerCase().includes(lowerSearch)
    );
  }, [books, search]);

  return (
    <div className="relative min-h-screen font-sans transition-colors duration-300 bg-background">
      <div
        className="fixed inset-0 z-0 opacity-20 dark:opacity-40 pointer-events-none mix-blend-multiply dark:mix-blend-soft-light bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/background.jpg')`,
        }}
      />
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="relative z-10 container max-w-4xl mx-auto py-8 px-4">
        <Header />
        <BookStats total={books.length} filtered={filteredBooks.length} />

        <div className="space-y-6">
          <SearchBar value={search} onChange={setSearch} />
          <BookForm onAdd={handleAddBook} existingBooks={books} />

          <BookList
            books={filteredBooks}
            loading={loading}
            onRemove={handleRemoveBook}
          />
        </div>
      </div>

      <Toaster
        position="top-center"
        richColors
        closeButton
        theme={theme as "light" | "dark"}
      />
    </div>
  );
}

export default App;