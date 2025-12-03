import { useNavigate } from "react-router-dom";
import { type Book } from "@/types/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Star } from "lucide-react";

interface RelatedBooksProps {
  books: Book[];
}

export function RelatedBooks({ books }: RelatedBooksProps) {
  const navigate = useNavigate();

  if (books.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold tracking-tight">
            Veja também
          </h3>

          <div className="flex gap-2">
            <CarouselPrevious className="static translate-y-0 hover:bg-primary hover:text-primary-foreground" />
            <CarouselNext className="static translate-y-0 hover:bg-primary hover:text-primary-foreground" />
          </div>
        </div>
        <CarouselContent className="-ml-4">
          {books.map((book) => (
            <CarouselItem key={book.id} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/3 xl:basis-1/4">
              <div
                className="group cursor-pointer h-full"
                onClick={() => navigate(`/catalogo/${book.id}`)}
              >
                <Card className="border-0 shadow-none bg-transparent hover:bg-muted/50 transition-colors h-full">
                  <CardContent className="p-2 space-y-3">
                    <div className="relative aspect-[2/3] overflow-hidden rounded-md shadow-sm group-hover:shadow-md transition-all group-hover:-translate-y-1">
                      {book.cover ? (
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-xs p-2 text-center">
                          Sem Capa
                        </div>
                      )}

                      {book.rating && book.rating > 0 && (
                        <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs px-1.5 py-0.5 rounded flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          {book.rating}
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                        {book.title}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {book.author}
                      </p>
                      {book.genres && book.genres.length > 0 && (
                        <Badge variant="secondary" className="text-[10px] px-1 h-5 mt-1">
                          {book.genres[0]}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}