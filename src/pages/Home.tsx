import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { Book } from "@/types/types";

// Import Dumb Components
import { HomeHero } from "@/components/home/HomeHero";
import { HomeEmptyState } from "@/components/home/HomeEmptyState";
import { HomeReadingNow } from "@/components/home/HomeReadingNow";
import { HomeHallOfFame } from "@/components/home/HomeHallOfFame";
import { HomeInsights } from "@/components/home/HomeInsights";

export function Home() {
    const navigate = useNavigate();
    const [books] = useLocalStorage<Book[]>("my-library-books", []);

    // --- LOGICA DE FILTROS E STATS ---
    const readingNow = useMemo(() => 
        books.filter(b => b.status === 'lendo'), 
    [books]);

    const topRated = useMemo(() => 
        [...books]
            .sort((a, b) => (b.rating || 0) - (a.rating || 0))
            .slice(0, 3)
            .filter(b => (b.rating || 0) > 0), 
    [books]);

    const stats = useMemo(() => {
        if (books.length === 0) return null;

        const authorCounts: Record<string, number> = {};
        const genreCounts: Record<string, number> = {};

        books.forEach(b => {
            authorCounts[b.author] = (authorCounts[b.author] || 0) + 1;
            b.genres?.forEach(g => {
                genreCounts[g] = (genreCounts[g] || 0) + 1;
            });
        });

        const topAuthor = Object.entries(authorCounts).sort((a, b) => b[1] - a[1])[0];
        const topGenre = Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0];

        return {
            topAuthor: topAuthor ? topAuthor[0] : "Nenhum",
            topGenre: topGenre ? topGenre[0] : "Variados",
            totalFavorites: books.filter(b => b.isFavorite).length,
            totalRead: books.filter(b => b.status === 'lido').length
        };
    }, [books]);

    // --- HANDLERS DE NAVEGAÇÃO ---
    const goToCatalog = () => navigate("/catalogo");
    const goToNew = () => navigate("/catalogo");
    const goToBook = (id: string) => navigate(`/catalogo/${id}`);

    // Estado Vazio (Onboarding)
    if (books.length === 0) {
        return <HomeEmptyState onCreateFirst={goToNew} />;
    }

    return (
        <div className="space-y-10 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* 1. Hero */}
            <HomeHero 
                readingCount={readingNow.length} 
                totalCount={books.length} 
                onNavigateCatalog={goToCatalog} 
                onNavigateNew={goToNew} 
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* === COLUNA ESQUERDA (PRINCIPAL) === */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* 2. Continue Lendo */}
                    <HomeReadingNow 
                        books={readingNow} 
                        onBookClick={goToBook} 
                        onGoToCatalog={goToCatalog} 
                    />

                    {/* 3. Hall da Fama */}
                    <HomeHallOfFame 
                        books={topRated} 
                        onBookClick={goToBook} 
                    />
                </div>

                {/* === COLUNA DIREITA (INSIGHTS) === */}
                <HomeInsights stats={stats} />
            </div>
        </div>
    );
}