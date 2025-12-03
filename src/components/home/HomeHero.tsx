import { Button } from "@/components/ui/button";

interface HomeHeroProps {
    readingCount: number;
    totalCount: number;
    onNavigateCatalog: () => void;
    onNavigateNew: () => void;
}

export function HomeHero({ readingCount, totalCount, onNavigateCatalog}: HomeHeroProps) {
    return (
        <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-muted/30 p-6 rounded-2xl border border-border/50">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">
                    Bem-Vindo, Leitor! 👋
                </h1>
                <p className="text-muted-foreground text-lg">
                    Você tem <strong className="text-foreground">{readingCount} leituras</strong> em andamento e <strong className="text-foreground">{totalCount} livros</strong> na coleção.
                </p>
            </div>
            <div className="flex gap-3">
                <Button onClick={onNavigateCatalog}>
                    Ver Catálogo
                </Button>
            </div>
        </section>
    );
}