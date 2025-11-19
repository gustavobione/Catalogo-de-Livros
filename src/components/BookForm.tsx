import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import type { Book } from "@/types/types";

interface BookFormProps {
  onAdd: (book: Omit<Book, "id">) => void;
}

export function BookForm({ onAdd }: BookFormProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação simples
    if (!title.trim() || !author.trim() || !year.trim()) {
      toast.warning("Atenção", {
        description: "Preencha todos os campos para adicionar um livro.",
      });
      return;
    }

    onAdd({
      title,
      author,
      year: parseInt(year),
    });

    // Reset e Feedback
    setTitle("");
    setAuthor("");
    setYear("");
    toast.success("Sucesso!", {
      description: "Livro adicionado ao catálogo.",
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <PlusCircle className="h-5 w-5" />
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
            />
          </div>
          <div className="sm:col-span-4 space-y-2">
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
              placeholder="1937" 
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <div className="sm:col-span-1">
            <Button type="submit" className="w-full">Add</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}