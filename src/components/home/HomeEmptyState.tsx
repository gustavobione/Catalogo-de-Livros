import { Button } from "@/components/ui/button";
import { Library, Plus } from "lucide-react";

interface HomeEmptyStateProps {
    onCreateFirst: () => void;
}

export function HomeEmptyState({ onCreateFirst }: HomeEmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 animate-in zoom-in duration-500">
            <div className="p-6 bg-primary/10 rounded-full shadow-lg mb-4 ring-4 ring-primary/5">
                <Library className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                Sua jornada começa aqui
            </h1>
            <p className="text-xl text-muted-foreground max-w-[600px]">
                Sua biblioteca está vazia. Adicione seu primeiro livro para desbloquear insights e organizar suas leituras.
            </p>
            <Button size="lg" onClick={onCreateFirst} className="mt-8 text-lg px-8 rounded-full shadow-lg shadow-primary/20">
                <Plus className="mr-2 h-5 w-5" /> Adicionar Primeiro Livro
            </Button>
        </div>
    );
}