import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Sparkles } from "lucide-react";
import { toast } from "sonner";
import type { BookFormProps } from "@/types/types";

export function BookForm({ onAdd, existingBooks }: BookFormProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");


  const formatAuthorName = (name: string) => {
    return name
      .split(" ") 
      .map((word) => {
        return word
          .split(".")
          .map((part) =>
            part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
          )
          .join("."); 
      })
      .join(" "); 
  };

  const normalizeText = (text: string) => {
    return text
      .normalize("NFD") 
      .replace(/[\u0300-\u036f]/g, "") 
      .toLowerCase(); 
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validação de campos vazios
    if (!title.trim() || !author.trim() || !year.trim()) {
      toast.warning("Campos incompletos", {
        description: "Por favor, preencha título, autor e ano para continuar.",
      });
      return;
    }

    const cleanTitle = title.trim();
    const formattedAuthor = formatAuthorName(author.trim());
    const yearNumber = parseInt(year);

    // 2. Validação de Ano Negativo
    if (yearNumber < 0) {
      toast.warning("Ano inválido", {
        description: "O ano de publicação não pode ser negativo.",
      });
      return;
    }

    // 3. Validação de Duplicidade (Título)
    const isDuplicate = existingBooks.some(
      (book) => normalizeText(book.title) === normalizeText(cleanTitle)
    );

    if (isDuplicate) {
      toast.error("Livro duplicado", {
        description: `O livro "${cleanTitle}" já está na sua lista (verifique acentos ou variações).`,
      });
      return;
    }

    onAdd({
      title: cleanTitle,
      author: formattedAuthor,
      year: yearNumber,
    });

    setTitle("");
    setAuthor("");
    setYear("");
    
    toast.success("Livro adicionado!", {
      description: `${cleanTitle} já está na sua lista.`,
      icon: <Sparkles className="h-4 w-4 text-green-500" />
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Plus className="h-5 w-5 text-primary" />
          Adicionar Novo Livro
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-12 items-end">
          <div className="sm:col-span-5 space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input 
              id="title" 
              placeholder="Ex: O Hobbit" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="focus-visible:ring-primary"
            />
          </div>
          <div className="sm:col-span-3 space-y-2">
            <Label htmlFor="author">Autor</Label>
            <Input 
              id="author" 
              placeholder="Ex: Tolkien" 
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="sm:col-span-2 space-y-2">
            <Label htmlFor="year">Ano</Label>
            <Input 
              id="year" 
              type="number" 
              min="0" 
              placeholder="1937" 
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" className="w-full font-semibold">Adicionar Livro</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}