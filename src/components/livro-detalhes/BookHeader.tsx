import { type Book } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, User, Crown, Sparkles, Hourglass, Clock, BookOpen, CheckCircle2 } from "lucide-react";

interface BookHeaderProps {
    currentBook: Book;
    isClassic: boolean;
    isNewRelease: boolean;
    isTopAuthor: boolean;
    ratingLabel: { text: string; color: string } | null;
    onToggleFavorite: () => void;
}

const statusConfig = {
    ler_depois: { label: "Ler depois", color: "bg-slate-500", icon: Clock },
    lendo: { label: "Lendo", color: "bg-blue-500", icon: BookOpen },
    lido: { label: "Lido", color: "bg-green-500", icon: CheckCircle2 },
};

export function BookHeader({
    currentBook,
    isClassic,
    isNewRelease,
    isTopAuthor,
    ratingLabel,
    onToggleFavorite
}: BookHeaderProps) {
    
    const currentStatus = currentBook.status || 'ler_depois';
    const StatusIcon = statusConfig[currentStatus].icon;

    return (
        <div>
            <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge className={`${statusConfig[currentStatus].color} gap-1 pr-3 py-1`}>
                    <StatusIcon className="w-3 h-3" />
                    {statusConfig[currentStatus].label}
                </Badge>
                <Badge variant="outline" className="py-1">{currentBook.year}</Badge>

                {isClassic && (
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 gap-1">
                        <Hourglass className="w-3 h-3" /> Clássico
                    </Badge>
                )}
                {isNewRelease && (
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 gap-1">
                        <Sparkles className="w-3 h-3" /> Lançamento
                    </Badge>
                )}
                {currentBook.genres?.map(genre => (
                    <Badge
                        key={genre}
                        variant="secondary"
                        className="bg-primary/10 text-primary hover:bg-primary/20 py-1 transition-colors"
                    >
                        {genre}
                    </Badge>
                ))}
            </div>
            <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                    <div className="flex items-center gap-3">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-foreground">
                            {currentBook.title}
                        </h1>
                        <Button
                            variant="ghost"
                            className="!p-1 -mb-2 h-auto w-auto hover:bg-transparent shrink-0"
                            onClick={onToggleFavorite}
                            title={currentBook.isFavorite ? "Remover dos favoritos" : "Favoritar"}
                        >
                            <Star
                                className={`!w-7 !h-7 md:!w-9 md:!h-9 transition-all duration-300 ${
                                    currentBook.isFavorite
                                    ? "fill-yellow-400 text-yellow-400 drop-shadow-md scale-110"
                                    : "text-muted-foreground/30 hover:text-yellow-400"
                                }`}
                                strokeWidth={currentBook.isFavorite ? 0 : 2}
                            />
                        </Button>
                    </div>

                    {ratingLabel && (
                        <Badge variant="outline" className={`mt-3 px-3 py-1 text-sm ${ratingLabel.color}`}>
                            {ratingLabel.text}
                        </Badge>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-3 text-xl text-muted-foreground">
                <div className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <span className="font-medium">{currentBook.author}</span>
                </div>
                {isTopAuthor && (
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 gap-1 px-2 py-0.5 text-xs animate-in zoom-in">
                        <Crown className="w-3 h-3 fill-white" /> Top Autor
                    </Badge>
                )}
            </div>
        </div>
    );
}