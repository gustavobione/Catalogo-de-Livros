import { type Book } from "@/types/types";
import { Card } from "@/components/ui/card";
import { BookOpen, Flame, Star, Library } from "lucide-react";

interface HomeBookCardProps {
    book: Book;
    type: 'reading' | 'compact';
    onClick: () => void;
}

export function HomeBookCard({ book, type, onClick }: HomeBookCardProps) {

    if (type === 'reading') {
        return (
            <Card 
                className="py-3 h-full group cursor-pointer hover:shadow-lg hover:border-primary/50 transition-all duration-300 overflow-hidden flex flex-row items-stretch"
                onClick={onClick}
            >
                <div className="flex px-2 h-full">
                    {/* Capa Esquerda */}
                    <div className="w-32 rounded-lg bg-muted shrink-0 relative">
                        {book.cover ? (
                            <img src={book.cover} alt={book.title} className="rounded-lg w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-muted/50">
                                <BookOpen className="text-muted-foreground/30" />
                            </div>
                        )}
                        {/* Overlay ao passar o mouse */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    </div>

                    {/* Conteúdo */}
                    <div className="p-4 flex flex-col justify-center w-full">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-base leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                                    {book.title}
                                </h3>
                                <p className="text-sm text-muted-foreground line-clamp-1">{book.author}</p>
                            </div>
                        </div>
                        
                        <div className="mt-4 flex items-center text-xs font-medium text-blue-600 dark:text-blue-400 gap-1">
                            <Flame className="w-3 h-3" fill="currentColor" />
                            Lendo agora
                        </div>
                    </div>
                </div>
            </Card>
        );
    }

    // TIPO 2: COMPACTO (HALL DA FAMA)
    return (
        <Card 
            className="group cursor-pointer border-0 shadow-none bg-transparent hover:bg-muted/50 transition-colors"
            onClick={onClick}
        >
            <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-md group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300">
                {book.cover ? (
                    <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                        <Library className="text-muted-foreground/20" />
                    </div>
                )}
                
                {/* Badge de Nota */}
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    {book.rating}
                </div>
            </div>
            <div className="mt-3 space-y-1">
                <h3 className="font-semibold text-sm truncate group-hover:text-primary">{book.title}</h3>
                <p className="text-xs text-muted-foreground truncate">{book.author}</p>
            </div>
        </Card>
    );
}