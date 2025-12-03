import { useState } from "react";
import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface BookRatingProps {
  rating?: number;
  onUpdate: (rating: number) => void;
}

export function BookRating({ rating = 0, onUpdate }: BookRatingProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const handleRate = (index: number) => {
    const fullValue = (index + 1) * 2;
    const halfValue = fullValue - 1;
    if (rating === fullValue) {
      onUpdate(halfValue);
    } else {
      onUpdate(fullValue);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Sua Avaliação
        </Label>
        <span className="text-sm font-bold text-primary">
          {rating > 0 ? rating : "-"} <span className="text-muted-foreground font-normal">/ 10</span>
        </span>
      </div>

      <div
        className="flex items-center justify-between gap-1 px-2 py-3 bg-muted/30 rounded-lg border border-transparent hover:border-border transition-all"
        onMouseLeave={() => setHoverIndex(null)}
      >
        {[0, 1, 2, 3, 4].map((index) => {
          const starValue = (index + 1) * 2;
          const isFull = rating >= starValue;
          const isHalf = rating === starValue - 1;
          const isHovered = hoverIndex !== null && index <= hoverIndex;

          return (
            <button
              key={index}
              type="button"
              className="group focus:outline-none transition-transform hover:scale-110 active:scale-95"
              onClick={() => handleRate(index)}
              onMouseEnter={() => setHoverIndex(index)}
            >
              <div className="relative">
                {isFull ? (
                  <Star
                    className={cn(
                      "w-8 h-8 transition-all duration-300 fill-primary text-primary drop-shadow-[0_0_8px_rgba(255,165,0,0.5)]",
                      isHovered && "scale-110"
                    )}
                    strokeWidth={0}
                  />
                ) : isHalf ? (
                  <StarHalf
                    className={cn(
                      "w-8 h-8 transition-all duration-300 fill-primary text-primary drop-shadow-[0_0_8px_rgba(255,165,0,0.5)]",
                      isHovered && "scale-110"
                    )}
                    strokeWidth={0}
                  />
                ) : (
                  <Star
                    className="w-8 h-8 text-muted-foreground/30 fill-transparent group-hover:text-primary/50 transition-all duration-300"
                    strokeWidth={1.5}
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>
      <p className="text-[10px] text-center text-muted-foreground">
        Toque para alternar entre nota cheia e meia
      </p>
    </div>
  );
}