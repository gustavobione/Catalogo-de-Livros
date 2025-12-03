import { useNavigate } from "react-router-dom";
import type { Book, BookStatus } from "@/types/types";
import { Button } from "@/components/ui/button";
import { 
    Clock, BookOpen, CheckCircle2, Star, Eye, Trash2 
} from "lucide-react";

interface BookListProps {
    books: Book[];
    loading: boolean;
    onRemove: (id: string) => void;
    onUpdateStatus: (id: string, status: BookStatus) => void; // Nova prop
    onToggleFavorite: (id: string) => void; // Nova prop
}

export function BookList({ 
    books, 
    loading, 
    onRemove, 
    onUpdateStatus, 
    onToggleFavorite 
}: BookListProps) {
    const navigate = useNavigate();

    if (loading) {
        return <div className="text-center py-10 animate-pulse text-muted-foreground">Carregando sua biblioteca...</div>;
    }

    if (books.length === 0) {
        return <div className="text-center py-20 text-muted-foreground">Nenhum livro encontrado.</div>;
    }

    return (
        <div className="space-y-3">
            {books.map((book) => (
                <div 
                    key={book.id}
                    className="group flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border bg-card hover:shadow-md transition-all gap-4"
                >
                    {/* COLUNA 1: INFO + FAVORITO */}
                    <div className="flex items-center gap-4 flex-1">
                        {/* Capa */}
                        <div 
                            className="h-16 w-12 bg-muted rounded overflow-hidden shrink-0 shadow-sm cursor-pointer"
                            onClick={() => navigate(`/catalogo/${book.id}`)}
                        >
                            {book.cover ? (
                                <img src={book.cover} alt="" className="h-full w-full object-cover" />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center text-[10px] text-muted-foreground text-center p-1">Sem Capa</div>
                            )}
                        </div>

                        {/* Textos */}
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 
                                    className="font-semibold text-lg leading-none cursor-pointer hover:text-primary transition-colors"
                                    onClick={() => navigate(`/catalogo/${book.id}`)}
                                >
                                    {book.title}
                                </h3>
                                
                                {/* BOTÃO ESTRELA (FAVORITO) */}
                                <button 
                                    onClick={() => onToggleFavorite(book.id)}
                                    className="focus:outline-none transition-transform active:scale-95"
                                    title={book.isFavorite ? "Remover favorito" : "Favoritar"}
                                >
                                    <Star 
                                        className={`w-5 h-5 transition-colors ${
                                            book.isFavorite 
                                            ? "fill-yellow-400 text-yellow-400" 
                                            : "text-muted-foreground/20 hover:text-yellow-400"
                                        }`} 
                                    />
                                </button>
                            </div>
                            <p className="text-sm text-muted-foreground">{book.author}</p>
                        </div>
                    </div>

                    {/* COLUNA 2: BOTÃO TRIPLO DE STATUS + AÇÕES */}
                    <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto">
                        
                        {/* BOTÃO TRIPLO (Status Switcher) */}
                        <div className="flex bg-muted/50 p-1 rounded-lg border">
                            <StatusButton 
                                active={book.status === 'ler_depois' || !book.status} 
                                icon={Clock} 
                                label="Ler Depois"
                                color="text-slate-600 dark:text-slate-300"
                                onClick={() => onUpdateStatus(book.id, 'ler_depois')}
                            />
                            <div className="w-px bg-border mx-1 my-1" />
                            <StatusButton 
                                active={book.status === 'lendo'} 
                                icon={BookOpen} 
                                label="Lendo"
                                color="text-blue-600 dark:text-blue-400"
                                onClick={() => onUpdateStatus(book.id, 'lendo')}
                            />
                            <div className="w-px bg-border mx-1 my-1" />
                            <StatusButton 
                                active={book.status === 'lido'} 
                                icon={CheckCircle2} 
                                label="Lido"
                                color="text-green-600 dark:text-green-400"
                                onClick={() => onUpdateStatus(book.id, 'lido')}
                            />
                        </div>

                        {/* Botões de Ação (Ver / Deletar) */}
                        <div className="flex items-center gap-1">
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-9 w-9 rounded-full text-muted-foreground hover:text-primary"
                                onClick={() => navigate(`/catalogo/${book.id}`)}
                                title="Ver detalhes"
                            >
                                <Eye className="w-4 h-4" />
                            </Button>
                            
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-9 w-9 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                onClick={() => onRemove(book.id)}
                                title="Remover livro"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

interface StatusBtnProps {
    active: boolean;
    icon: React.ElementType;
    onClick: () => void;
    label: string;
    color: string;
}

function StatusButton({ active, icon: Icon, onClick, label, color }: StatusBtnProps) {
    return (
        <button
            onClick={onClick}
            title={label}
            className={`
                p-2 rounded-md transition-all duration-200 flex items-center justify-center
                ${active 
                    ? `bg-background shadow-sm ${color} scale-100 font-medium` 
                    : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
                }
            `}
        >
            <Icon size={16} strokeWidth={active ? 2.5 : 2} />
        </button>
    );
}