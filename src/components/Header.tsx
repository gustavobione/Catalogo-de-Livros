import { useTheme } from "@/context/ThemeContext";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { BookOpen, Moon, Sun } from "lucide-react"; // Assumindo lucide-react instalado (padrão shadcn)

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b bg-card p-2 pb-4 rounded-lg mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-primary rounded-lg text-primary-foreground">
          <BookOpen className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Catálogo de Livros</h1>
          <p className="text-sm text-muted-foreground">Gerencie sua leitura pessoal</p>
        </div>
      </div>

      <div className="flex items-center gap-2 border p-2 rounded-full bg-background">
        <Sun className="h-4 w-4 text-muted-foreground" />
        <Switch 
          id="theme-mode" 
          checked={theme === "dark"} 
          onCheckedChange={toggleTheme} 
        />
        <Moon className="h-4 w-4 text-muted-foreground" />
        <Label htmlFor="theme-mode" className="sr-only">Alternar Tema</Label>
      </div>
    </header>
  );
}