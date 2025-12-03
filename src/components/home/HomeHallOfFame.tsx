import { type Book } from "@/types/types";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Trophy } from "lucide-react";
import { HomeBookCard } from "./HomeBookCard";

interface HomeHallOfFameProps {
    books: Book[];
    onBookClick: (id: string) => void;
}

export function HomeHallOfFame({ books, onBookClick }: HomeHallOfFameProps) {
    return (
        <section>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" /> 
                    Hall da Fama
                </h2>
            </div>
            <ScrollArea className="w-full whitespace-nowrap pb-4">
                <div className="flex w-max space-x-4">
                    {books.length > 0 ? books.map(book => (
                        <div key={book.id} className="w-[175px]">
                            <HomeBookCard 
                                book={book} 
                                type="compact" 
                                onClick={() => onBookClick(book.id)} 
                            />
                        </div>
                    )) : (
                        <span className="text-muted-foreground text-sm pl-2">
                            Avalie seus livros para vê-los aqui.
                        </span>
                    )}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </section>
    );
}