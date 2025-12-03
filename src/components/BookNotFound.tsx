import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { SearchX, BookOpen } from "lucide-react";

export function BookNotFound() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 animate-in fade-in zoom-in duration-500">
            <Card className="w-full max-w-md border-2 border-dashed border-muted shadow-lg text-center bg-card/50 backdrop-blur-sm">
                <CardContent className="pt-10 pb-6 flex flex-col items-center gap-6">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl scale-150" />
                        <div className="relative bg-background p-6 rounded-full border-2 border-muted shadow-sm">
                            <SearchX className="w-16 h-16 text-muted-foreground" strokeWidth={1.5} />
                            <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground p-1.5 rounded-full shadow-md">
                                <BookOpen size={16} />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold tracking-tight text-foreground">
                            Livro não encontrado
                        </h2>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                            Ops! Parece que este livro sumiu da nossa prateleira ou nunca esteve aqui. Que tal procurar outra história?
                        </p>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center pb-8">
                    <Button
                        size="lg"
                        onClick={() => navigate("/catalogo")}
                        className="font-semibold px-8 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
                    >
                        Voltar ao Catálogo
                    </Button>
                </CardFooter>
            </Card>
            <p className="mt-6 text-xs text-muted-foreground/50 uppercase tracking-widest font-mono">
                Erro 404 • Biblioteca Pessoal
            </p>
        </div>
    );
}