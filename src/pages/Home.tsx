import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Library } from "lucide-react";

export function Home() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
            <div className="p-6 bg-card rounded-full shadow-lg mb-4">
                <Library className="w-16 h-16 text-primary" />
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                Bem-vindo à sua Biblioteca
            </h1>

            <p className="text-xl text-muted-foreground max-w-[600px]">
                Organize seus livros, acompanhe suas leituras e mantenha seu acervo sempre atualizado.
            </p>

            <Button size="lg" onClick={() => navigate("/catalogo")} className="mt-8 text-lg px-8">
                Acessar Catálogo
            </Button>
        </div>
    );
}