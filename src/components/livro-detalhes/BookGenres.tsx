import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tags } from "lucide-react";

interface BookGenresProps {
    selectedGenres?: string[];
    availableGenres: string[];
    onToggle: (genre: string) => void;
}

export function BookGenres({ selectedGenres = [], availableGenres, onToggle }: BookGenresProps) {
    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                <Tags className="w-4 h-4 text-primary" />
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Gêneros</Label>
            </div>
            <div className="flex flex-wrap gap-2">
                {availableGenres.map((genre) => {
                    const isSelected = selectedGenres.includes(genre);
                    return (
                        <Badge
                            key={genre}
                            variant={isSelected ? "default" : "outline"}
                            className={`
                    cursor-pointer hover:opacity-80 transition-all py-1.5 px-3 text-xs
                    ${!isSelected && "text-muted-foreground border-dashed bg-transparent"}
                `}
                            onClick={() => onToggle(genre)}
                        >
                            {genre}
                        </Badge>
                    );
                })}
            </div>
        </div>
    );
}