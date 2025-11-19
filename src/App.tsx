import { useState, useEffect, useMemo } from "react";
import type { Book } from "@/types/types";
import { Header } from "@/components/Header";
import { BookStats } from "@/components/BookStats";
import { SearchBar } from "@/components/SearchBar";
import { BookForm } from "@/components/BookForm";
import { BookList } from "@/components/BookList";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // 1. Carregar dados (Simulando API com delay)
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const res = await fetch("/books.json");
        if (!res.ok) throw new Error("Falha ao carregar");
        const data = await res.json();
        
        // Pequeno delay artificial para mostrar o Skeleton (UX)
        setTimeout(() => {
          setBooks(data);
          setLoading(false);
        }, 800); 
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // 2. Adicionar Livro
  const handleAddBook = (newBook: Omit<Book, "id">) => {
    const bookWithId = { ...newBook, id: crypto.randomUUID() };
    setBooks((prev) => [bookWithId, ...prev]);
  };

  // 3. Remover Livro
  const handleRemoveBook = (id: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  // 4. Lógica de Filtro (Otimizada com useMemo)
  const filteredBooks = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(lowerSearch) ||
        book.author.toLowerCase().includes(lowerSearch)
    );
  }, [books, search]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans transition-colors duration-300">
      <div className="container max-w-4xl mx-auto py-8 px-4">
        
        {/* Cabeçalho e Tema */}
        <Header />

        {/* Contadores */}
        <BookStats total={books.length} filtered={filteredBooks.length} />

        {/* Busca e Formulário */}
        <div className="space-y-6">
          <SearchBar value={search} onChange={setSearch} />
          
          <BookForm onAdd={handleAddBook} />
          
          <BookList 
            books={filteredBooks} 
            loading={loading} 
            onRemove={handleRemoveBook} 
          />
        </div>
      </div>
      
      {/* Componente de Notificações (Sonner) */}
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;