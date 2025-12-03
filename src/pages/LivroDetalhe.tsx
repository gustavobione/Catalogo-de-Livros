import { useParams, useNavigate } from "react-router-dom";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { type Book } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, User } from "lucide-react";

export function LivroDetalhe() {
    const { id } = useParams(); // Pega o ID da URL
    const navigate = useNavigate();

    // Lê do localStorage para achar o livro
    const [books] = useLocalStorage<Book[]>("my-library-books", []);
    const book = books.find((b) => b.id === id);

    if (!book) {
        return (
            <div className="text-center py-10 space-y-4">
                <h2 className="text-2xl font-bold">Livro não encontrado</h2>
                <Button onClick={() => navigate("/catalogo")}>Voltar ao Catálogo</Button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2 pl-0 hover:bg-transparent hover:text-primary">
                <ArrowLeft size={20} /> Voltar
            </Button>

            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl text-primary">{book.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-3 text-xl font-medium text-muted-foreground">
                        <User /> {book.author}
                    </div>

                    <div className="flex items-center gap-3 text-lg text-muted-foreground">
                        <Calendar /> Ano: {book.year}
                    </div>

                    <div className="pt-6 border-t">
                        <p className="text-sm text-muted-foreground font-mono">ID: {book.id}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}