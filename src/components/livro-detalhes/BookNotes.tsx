import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen } from "lucide-react";

interface BookNotesProps {
  initialNotes?: string;
  title: string;
  onSave: (notes: string) => void;
}

export function BookNotes({ initialNotes = "", title, onSave }: BookNotesProps) {
  // Estado local para digitação rápida sem re-renderizar o componente pai a cada tecla
  const [localNotes, setLocalNotes] = useState(initialNotes);

  useEffect(() => {
    setLocalNotes(initialNotes);
  }, [initialNotes]);

  return (
    <Card className="border-t-4 border-t-primary/20">
      <CardContent className="pt-6 space-y-4">
        <Label className="text-lg font-semibold flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Caderno de Anotações
        </Label>
        <Textarea
          placeholder={`Escreva suas observações sobre "${title}" aqui...`}
          className="min-h-[250px] resize-y bg-background/50 text-base leading-relaxed p-4"
          value={localNotes}
          onChange={(e) => setLocalNotes(e.target.value)}
          onBlur={() => onSave(localNotes)}
        />
        <p className="text-xs text-muted-foreground">* Salvo automaticamente ao sair do campo.</p>
      </CardContent>
    </Card>
  );
}