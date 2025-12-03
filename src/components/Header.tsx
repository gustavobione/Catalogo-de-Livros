// src/components/Header.tsx
import { useTheme } from "@/context/ThemeContext";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { BookOpen, Moon, Sun } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const linkStyle = (path: string) =>
    location.pathname === path
      ? "text-primary font-bold"
      : "text-muted-foreground hover:text-primary transition-colors";

  return (
    <header className="border-b bg-card p-4 rounded-lg mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-primary rounded-lg text-primary-foreground group-hover:opacity-90 transition-opacity">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">MyLib</h1>
          </div>
        </Link>
        <nav className="flex gap-4 text-sm">
          <Link to="/" className={linkStyle("/")}>Home</Link>
          <Link to="/catalogo" className={linkStyle("/catalogo")}>Livros</Link>
        </nav>
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