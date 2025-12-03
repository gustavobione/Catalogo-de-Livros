import { useState, useEffect, useMemo } from "react";
import type { Book } from "@/types/types";
import { BookStats } from "@/components/catalogo/BookStats";
import { SearchBar } from "@/components/catalogo/SearchBar";
import { BookForm } from "@/components/catalogo/BookForm";
import { BookList } from "@/components/catalogo/BookList";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { toast } from "sonner";

export function Catalogo() {
    // Lógica movida do antigo App.tsx
    const [books, setBooks] = useLocalStorage<Book[]>("my-library-books", []);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            if (books.length > 0) {
                setLoading(false);
                return;
            }
            try {
                const res = await fetch("/books.json");
                if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);
                const data = await res.json();
                if (!Array.isArray(data)) throw new Error("Formato inválido");

                setTimeout(() => {
                    setBooks(data);
                    setLoading(false);
                }, 800);
            } catch (error) {
                console.error("Erro ao buscar livros:", error);
                setLoading(false);
                toast.error("Erro ao carregar dados iniciais");
            }
        };
        loadData();
    }, []); // Array vazio para rodar apenas uma vez

    const handleAddBook = (newBook: Omit<Book, "id">) => {
        const bookWithId = { ...newBook, id: crypto.randomUUID() };
        setBooks((prev) => [bookWithId, ...prev]);
    };

    const handleRemoveBook = (id: string) => {
        setBooks((prev) => prev.filter((b) => b.id !== id));
        toast.error(`Livro ${books.find((b) => b.id === id)?.title} removido`);
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
        <div className="space-y-6">
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
    );
}