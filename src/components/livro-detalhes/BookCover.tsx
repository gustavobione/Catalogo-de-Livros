import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImagePlus, BookMarked } from "lucide-react";

interface BookCoverProps {
  cover?: string;
  title: string;
  onUpdate: (url: string) => void;
}

export function BookCover({ cover, title, onUpdate }: BookCoverProps) {
  const [showInput, setShowInput] = useState(false);
  const [tempUrl, setTempUrl] = useState(cover || "");

  const handleSave = () => {
    onUpdate(tempUrl);
    setShowInput(false);
  };

  return (
    <div className="space-y-2">
      <div className="group relative aspect-[2/3] rounded-lg shadow-xl overflow-hidden bg-muted flex items-center justify-center border">
        {cover ? (
          <img src={cover} alt={title} className="w-full h-full object-cover transition-transform hover:scale-105 duration-700" />
        ) : (
          <div className="text-center p-6 bg-gradient-to-br from-primary/20 to-primary/5 w-full h-full flex flex-col items-center justify-center">
            <BookMarked className="w-16 h-16 text-primary/40 mb-2" />
            <span className="text-muted-foreground text-sm font-medium">{title}</span>
          </div>
        )}
        <Button
          size="icon"
          variant="secondary"
          className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
          onClick={() => setShowInput(!showInput)}
        >
          <ImagePlus className="w-4 h-4" />
        </Button>
      </div>

      {showInput && (
        <div className="flex gap-2 animate-in slide-in-from-top-2">
          <Input 
            placeholder="URL da imagem..." 
            value={tempUrl}
            onChange={(e) => setTempUrl(e.target.value)}
            className="text-xs h-8"
          />
          <Button size="sm" className="h-8" onClick={handleSave}>OK</Button>
        </div>
      )}
    </div>
  );
}