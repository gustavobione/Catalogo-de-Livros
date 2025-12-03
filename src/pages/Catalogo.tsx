import { useState, useEffect, useMemo } from "react";
import type { Book, BookStatus } from "@/types/types"; // Importe BookStatus se tiver definido, ou use string
import { BookStats } from "@/components/catalogo/BookStats";
import { SearchBar } from "@/components/catalogo/SearchBar";
import { BookForm } from "@/components/catalogo/BookForm";
import { BookList } from "@/components/catalogo/BookList";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { toast } from "sonner";

export function Catalogo() {
    // --- LÓGICA DA VERSÃO 1.0 MANTIDA ---
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
    }, []); 

    // --- HANDLERS ---
    const handleAddBook = (newBook: Omit<Book, "id">) => {
        const bookWithId = { ...newBook, id: crypto.randomUUID() };
        setBooks((prev) => [bookWithId, ...prev]);
        toast.success("Livro adicionado com sucesso!");
    };

    const handleRemoveBook = (id: string) => {
        setBooks((prev) => prev.filter((b) => b.id !== id));
        toast.error("Livro removido.");
    };

    // --- NOVOS HANDLERS (Lógica adicionada) ---
    const handleUpdateStatus = (id: string, newStatus: BookStatus) => {
        setBooks((prev) => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
        toast.success("Status atualizado!");
    };

    const handleToggleFavorite = (id: string) => {
        setBooks((prev) => prev.map(b => b.id === id ? { ...b, isFavorite: !b.isFavorite } : b));
    };

    // --- CÁLCULOS ---
    const filteredBooks = useMemo(() => {
        const lowerSearch = search.toLowerCase();
        return books.filter(
            (book) =>
                book.title.toLowerCase().includes(lowerSearch) ||
                book.author.toLowerCase().includes(lowerSearch)
        );
    }, [books, search]);

    const totalFavorites = books.filter(b => b.isFavorite).length;

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Minha Biblioteca</h1>
                    <p className="text-muted-foreground">Gerencie suas leituras e descobertas.</p>
                </div>
            </div>

            <BookStats 
                total={books.length} 
                filtered={filteredBooks.length} 
                favorites={totalFavorites}
            />

            <div className="space-y-6">
                <SearchBar value={search} onChange={setSearch} />
                
                {/* BookForm Mantido */}
                <BookForm onAdd={handleAddBook} existingBooks={books} />
                
                {/* BookList Atualizado com novas props */}
                <BookList
                    books={filteredBooks}
                    loading={loading}
                    onRemove={handleRemoveBook}
                    onUpdateStatus={handleUpdateStatus}   // Nova prop
                    onToggleFavorite={handleToggleFavorite} // Nova prop
                />
            </div>
        </div>
    );
}