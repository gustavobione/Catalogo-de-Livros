import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { Book } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { BookCover } from "@/components/livro-detalhes/BookCover";
import { BookStatusSelector } from "@/components/livro-detalhes/BookStatus";
import { BookGenres } from "@/components/livro-detalhes/BookGenres";
import { BookRating } from "@/components/livro-detalhes/BookRating";
import { BookNotes } from "@/components/livro-detalhes/BookNotes";
import { RelatedBooks } from "@/components/livro-detalhes/RelatedBooks";
import { BookHeader } from "@/components/livro-detalhes/BookHeader";
import { BookNotFound } from "@/components/BookNotFound";

const AVAILABLE_GENRES = [
    "Ficção", "Fantasia", "Romance", "Terror", "Técnico",
    "História", "Sci-Fi", "Biografia", "Autoajuda", "Mistério",
    "Clássico", "HQ/Mangá", "Negócios", "Não-ficção"
];

export function LivroDetalhe() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [books, setBooks] = useLocalStorage<Book[]>("my-library-books", []);
    const [currentBook, setCurrentBook] = useState<Book | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (books.length === 0) {
            setIsLoading(false);
            return;
        }
        if (!id) return;
        const found = books.find((b) => String(b.id) === String(id));

        setCurrentBook(found || null);
        setIsLoading(false);
    }, [books, id]);

    const isClassic = currentBook ? currentBook.year < 1960 : false;
    const isNewRelease = currentBook ? currentBook.year >= new Date().getFullYear() - 2 : false;

    const isTopAuthor = useMemo(() => {
        if (!currentBook || books.length === 0) return false;
        const authorCounts: Record<string, number> = {};
        books.forEach(b => {
            authorCounts[b.author] = (authorCounts[b.author] || 0) + 1;
        });
        const maxCount = Math.max(...Object.values(authorCounts));
        return authorCounts[currentBook.author] === maxCount && maxCount > 1;
    }, [books, currentBook]);

    const relatedBooks = useMemo(() => {
        if (!currentBook) return [];

        return books.filter((b) => {
            if (b.id === currentBook.id) return false;
            if (b.status === 'lido') return false;

            const sameAuthor = b.author === currentBook.author;
            const hasSharedGenre = b.genres?.some(g => currentBook.genres?.includes(g));

            return sameAuthor || hasSharedGenre;
        }).slice(0, 5);
    }, [books, currentBook]);

    // --- HANDLERS ---
    const handleUpdate = (field: keyof Book, value: any) => {
        const updatedBooks = books.map((b) =>
            b.id === id ? { ...b, [field]: value } : b
        );
        setBooks(updatedBooks);

        if (field === 'isFavorite') {
            toast.success(value ? "Adicionado aos favoritos!" : "Removido dos favoritos.");
        } else if (field !== 'notes') {
            toast.success("Salvo!", { duration: 1000 });
        }
    };

    const handleToggleGenre = (genre: string) => {
        if (!currentBook) return;
        const currentGenres = currentBook.genres || [];
        const newGenres = currentGenres.includes(genre)
            ? currentGenres.filter(g => g !== genre)
            : [...currentGenres, genre];
        handleUpdate("genres", newGenres);
    };

    const handleToggleFavorite = () => {
        if (!currentBook) return;
        handleUpdate("isFavorite", !currentBook.isFavorite);
    };

    const getRatingLabel = (rating?: number) => {
        if (!rating) return null;
        if (rating <= 2) return { text: "Péssimo", color: "text-red-500 bg-red-500/10 border-red-200" };
        if (rating <= 4) return { text: "Ruim", color: "text-orange-500 bg-orange-500/10 border-orange-200" };
        if (rating <= 6) return { text: "Mediano", color: "text-yellow-500 bg-yellow-500/10 border-yellow-200" };
        if (rating <= 8) return { text: "Muito Bom", color: "text-blue-500 bg-blue-500/10 border-blue-200" };
        if (rating < 10) return { text: "Excelente", color: "text-emerald-500 bg-emerald-500/10 border-emerald-200" };
        return { text: "Obra-prima", color: "text-purple-500 bg-purple-500/10 font-bold border-purple-200" };
    };

    // --- RENDERIZAÇÃO CONDICIONAL ---

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center text-muted-foreground animate-pulse">Carregando detalhes...</div>;
    }

    if (!currentBook) {
        return <BookNotFound />;
    }

    const ratingLabel = getRatingLabel(currentBook.rating);

    return (
        <div className="space-y-6 animate-in slide-in-from-right duration-500 pb-20">
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="gap-2 pl-0 hover:bg-transparent hover:text-primary -ml-2 text-muted-foreground"
                >
                    <ArrowLeft size={20} /> Voltar
                </Button>
            </div>

            <div className="grid md:grid-cols-12 gap-8 items-start">

                {/* === COLUNA ESQUERDA === */}
                <div className="md:col-span-4 lg:col-span-3 space-y-6 sticky top-6">
                    <BookCover
                        cover={currentBook.cover}
                        title={currentBook.title}
                        onUpdate={(url) => handleUpdate("cover", url)}
                    />

                    <BookStatusSelector
                        currentStatus={currentBook.status}
                        onUpdate={(st) => handleUpdate("status", st)}
                    />

                    <Separator />

                    <BookRating
                        rating={currentBook.rating}
                        onUpdate={(rate) => handleUpdate("rating", rate)}
                    />

                    <Separator />

                    <BookGenres
                        selectedGenres={currentBook.genres}
                        availableGenres={AVAILABLE_GENRES}
                        onToggle={handleToggleGenre}
                    />
                </div>

                {/* === COLUNA DIREITA === */}
                <div className="md:col-span-8 lg:col-span-9 space-y-8">

                    <BookHeader
                        currentBook={currentBook}
                        isClassic={isClassic}
                        isNewRelease={isNewRelease}
                        isTopAuthor={isTopAuthor}
                        ratingLabel={ratingLabel}
                        onToggleFavorite={handleToggleFavorite}
                    />

                    <BookNotes
                        title={currentBook.title}
                        initialNotes={currentBook.notes}
                        onSave={(notes) => handleUpdate("notes", notes)}
                    />

                    <RelatedBooks books={relatedBooks} />
                </div>
            </div>
        </div>
    );
}