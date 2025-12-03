import { type Book } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
    Carousel, 
    CarouselContent, 
    CarouselItem, 
    CarouselNext, 
    CarouselPrevious 
} from "@/components/ui/carousel";
import { BookOpen, Flame } from "lucide-react";
import { HomeBookCard } from "./HomeBookCard";

interface HomeReadingNowProps {
    books: Book[];
    onBookClick: (id: string) => void;
    onGoToCatalog: () => void;
}

export function HomeReadingNow({ books, onBookClick, onGoToCatalog }: HomeReadingNowProps) {
    return (
        <section className="w-full">
            {books.length > 0 ? (
                <Carousel 
                    opts={{ align: "start", loop: true }} 
                    className="w-full"
                >
                    {/* CABEÇALHO FLEXÍVEL */}
                    <div className="flex items-center justify-between mb-4">
                        {/* Lado Esquerdo: Título + Contador */}
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-blue-500" /> 
                                Continue Lendo
                            </h2>
                            <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                                {books.length} ativos
                            </span>
                        </div>

                        {/* Lado Direito: Botões de Navegação */}
                        <div className="flex items-center gap-2">
                            <CarouselPrevious className="static translate-y-0 h-8 w-8 hover:bg-primary hover:text-primary-foreground" />
                            <CarouselNext className="static translate-y-0 h-8 w-8 hover:bg-primary hover:text-primary-foreground" />
                        </div>
                    </div>

                    <CarouselContent className="-ml-4 pb-4">
                        {books.map((book) => (
                            // Ajuste o basis para definir quantos aparecem (md:basis-1/2 = 2 por vez)
                            <CarouselItem key={book.id} className="pl-4 md:basis-1/2 lg:basis-1/2 xl:basis-1/2">
                                <div className="h-full">
                                    <HomeBookCard 
                                        book={book} 
                                        type="reading" 
                                        onClick={() => onBookClick(book.id)} 
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            ) : (
                <>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-blue-500" /> 
                            Continue Lendo
                        </h2>
                    </div>
                    <Card className="bg-muted/20 border-dashed shadow-none">
                        <CardContent className="flex flex-col items-center justify-center py-10 text-center space-y-3">
                            <Flame className="w-10 h-10 text-muted-foreground/30" />
                            <p className="text-muted-foreground">Você não está lendo nada no momento.</p>
                            <Button variant="link" onClick={onGoToCatalog}>
                                Escolher um livro da estante
                            </Button>
                        </CardContent>
                    </Card>
                </>
            )}
        </section>
    );
}